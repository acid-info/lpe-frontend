import parseDate from 'date-fns/parse'
import { LPE } from '../../../types/lpe.types'
import { simplecastApi } from '../../simplecast.service'
import { UnbodyResGoogleDocData } from '../unbody.types'
import { UnbodyDataTypeConfig } from './types'

export const PodcastEpisodeDataType: UnbodyDataTypeConfig<
  LPE.Article.Data,
  LPE.Podcast.Document,
  UnbodyResGoogleDocData,
  any,
  | {
      shows: LPE.Podcast.Show[]
      parseContent?: boolean
    }
  | undefined
> = {
  key: 'PodcastEpisodeDocument',
  objectType: 'GoogleDoc',
  classes: ['podcast', 'episode', 'document'],

  isMatch: (helpers, data, original) =>
    original
      ? original.pathString.includes('/Podcasts/') &&
        /^ep\d+-\d{8}-.*/.test(original.slug)
      : false,

  transform: async (helpers, data, original, root, context) => {
    const { shows = [] } = context ?? {}

    const show = shows.find((show) => show.slug === original.path[2])

    const name = original.path[original.path.length - 1]
    const [ep, date, ...rest] = name.split('-')
    const slug = rest.join('-')

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const publishedAt = parseDate(date, 'yyyyMMdd', today)
    const episodeNumber = parseInt(ep.slice(2), 10)

    const coverImage = data.content.find(
      (block) => block.type === 'image' && block.order < 20,
    ) as LPE.Podcast.Metadata['coverImage']

    const channels: LPE.Podcast.Content['channels'] = []
    const credits: LPE.Podcast.Content['credits'] = []
    const transcription: LPE.Podcast.Content['transcription'] = []

    if (context?.parseContent) {
      const textBlocks = data.content.filter(
        (block) => block.type === 'text',
      ) as LPE.Post.TextBlock[]

      const creditsIndex = textBlocks.findIndex(
        (block) => (block.text || '') === '[Credits]',
      )

      const transcriptionIndex = textBlocks.findIndex(
        (block) => (block.text || '') === '[Transcription]',
      )

      if (creditsIndex > -1) {
        textBlocks
          .slice(
            creditsIndex + 1,
            transcriptionIndex > -1 ? transcriptionIndex : textBlocks.length,
          )
          .forEach((block) => {
            credits.push(block)
          })
      }

      if (transcriptionIndex > -1) {
        textBlocks.slice(transcriptionIndex + 1).forEach((block) =>
          transcription.push({
            html: block.html,
          }),
        )
      }

      channels.push(...(await getDistributionChannels(textBlocks, 'content')))
    }

    return {
      id: data.id,
      slug,
      title: data.title,
      authors: data.authors,
      description: data.summary,
      publishedAt: publishedAt.toJSON(),
      episodeNumber,
      tags: data.tags,
      credits,
      transcription,
      channels,
      ...(show ? { show } : {}),
      ...(show ? { showId: show.id } : {}),
      ...(coverImage ? { coverImage } : {}),
      highlighted: data.highlighted,
      type: LPE.PostTypes.Podcast,
    }
  },
}

const getDistributionChannels = async (
  blocks: LPE.Post.TextBlock[],
  source: 'content' | 'simplecast',
) => {
  const channels: LPE.Podcast.Channel[] = []

  {
    const youtubeUrlRegex =
      /(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/[^ "]+/gi

    for (const block of blocks) {
      const match = (block.html || '').match(youtubeUrlRegex)
      if (match && match.length) {
        const url = match[0]

        channels.push({
          name: LPE.Podcast.ChannelNames.Youtube,
          url,
        })

        continue
      }
    }
  }

  if (source === 'simplecast') {
    channels.push(...(await getSimplecastDistributionChannels(blocks)))
  } else if (source === 'content') {
    const linkBlocks = blocks.filter((block) =>
      /^(https):\/\/[^ "]+$/.test(block.text),
    )
    linkBlocks.forEach((block) => {
      const { text } = block
      const url = text

      const name = [
        [/spotify\.com/i, LPE.Podcast.ChannelNames.Spotify],
        [/podcasts\.google\.com/i, LPE.Podcast.ChannelNames.GooglePodcasts],
        [/podcasts\.apple\.com/i, LPE.Podcast.ChannelNames.ApplePodcasts],
      ].find(
        ([reg, name]) => url.match(reg)?.length,
      )?.[1] as LPE.Podcast.ChannelName

      if (!name) return

      if (name)
        channels.push({
          name,
          url,
        })
    })
  }

  return channels
}

const getSimplecastDistributionChannels = async (
  blocks: LPE.Post.TextBlock[],
) => {
  const channels: LPE.Podcast.Channel[] = []

  const simplecastUrl = blocks.find((block) =>
    simplecastApi.isValidPlayerUrl(block.text),
  )?.text

  const episodeId =
    simplecastUrl && simplecastApi.extractEpisodeIdFromUrl(simplecastUrl)

  if (episodeId) {
    const distributionChannels = await simplecastApi.getDistributionChannels({
      episodeId,
    })

    distributionChannels.forEach((channel) => {
      const name = channel?.distribution_channel?.name || ''

      const channelName = [
        [/google\s*podcasts/i, LPE.Podcast.ChannelNames.GooglePodcasts],
        [/apple\s*podcasts/i, LPE.Podcast.ChannelNames.ApplePodcasts],
        [/spotify/i, LPE.Podcast.ChannelNames.Spotify],
      ].find(([regex]) =>
        (regex as RegExp).test(name),
      )?.[1] as LPE.Podcast.ChannelName

      if (!channelName) return

      channels.push({
        name: channelName,
        url: channel.url,
      })
    })

    return channels
  }

  return []
}
