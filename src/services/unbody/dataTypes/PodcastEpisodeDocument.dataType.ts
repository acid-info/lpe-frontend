import parseISO from 'date-fns/parseISO'
import { LPE } from '../../../types/lpe.types'
import { settle } from '../../../utils/promise.utils'
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
    const [ep, date] = name.split('-')
    const slug = original.slug.slice(`${ep}-${date}-`.length)

    const publishedAt = parseISO(date)
    const episodeNumber = parseInt(ep.slice(2), 10)

    const coverImage = data.content.find(
      (block) => block.type === 'image' && block.order < 20,
    ) as LPE.Podcast.Metadata['coverImage']

    const channels: LPE.Podcast.Content['channels'] = []
    const credits: LPE.Podcast.Content['credits'] = []
    const transcription: LPE.Podcast.Content['transcription'] = []
    const content: LPE.Podcast.Content['content'] = []

    const allBlocks = data.content.filter((block) => {
      if (
        ((block.type === 'text' && block.html) || '').match(
          `<a href="#ftnt_ref`,
        )?.length
      )
        return false

      return true
    })

    if (context?.parseContent) {
      const sections = findSections(
        ['Credits', 'Content', 'Timestamps', 'Transcription'],
        allBlocks,
      )

      const textBlocks = allBlocks.filter(
        (block) => block.type === 'text',
      ) as LPE.Post.TextBlock[]

      sections.forEach((section) => {
        switch (section.name) {
          case 'Credits': {
            credits.push(
              ...(section.blocks.filter(
                (block) => block.type === 'text',
              ) as LPE.Post.TextBlock[]),
            )

            break
          }

          case 'Content':
          case 'Timestamps':
          case 'Transcription': {
            content.push(...section.blocks)

            break
          }

          case 'Transcriptions': {
            break
          }
        }
      })

      channels.push(...(await getDistributionChannels(textBlocks)))
    }

    return {
      id: data.id,
      slug,
      title: data.title,
      authors: data.authors,
      description: data.summary,
      modifiedAt: data.modifiedAt || '',
      publishedAt: publishedAt.toJSON(),
      episodeNumber,
      tags: data.tags,
      credits,
      content,
      transcription,
      channels,
      ...(show ? { show } : {}),
      ...(show ? { showId: show.id } : {}),
      ...(coverImage ? { coverImage } : {}),
      highlighted: data.highlighted,
      isDraft: data.isDraft,
      type: LPE.PostTypes.Podcast,
    } as any
  },
}

const getDistributionChannels = async (blocks: LPE.Post.TextBlock[]) => {
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

  const linkBlocks = blocks.filter((block) =>
    /^(https):\/\/[^ "]+$/.test((block.text || '').trim()),
  )

  for (const block of linkBlocks) {
    const { text } = block
    const url = text

    const name = [
      [/spotify\.com/i, LPE.Podcast.ChannelNames.Spotify],
      [/podcasts\.google\.com/i, LPE.Podcast.ChannelNames.GooglePodcasts],
      [/podcasts\.apple\.com/i, LPE.Podcast.ChannelNames.ApplePodcasts],
      [/simplecast\.com/i, LPE.Podcast.ChannelNames.Simplecast],
    ].find(
      ([reg, name]) => url.match(reg)?.length,
    )?.[1] as LPE.Podcast.ChannelName

    if (!name) continue

    switch (name) {
      case LPE.Podcast.ChannelNames.Simplecast: {
        if (!simplecastApi.isValidPlayerUrl(url)) {
          console.error('invalid Simplecast player url!')
          continue
        }

        const episodeId = simplecastApi.extractEpisodeIdFromUrl(url)
        if (!episodeId) {
          console.error('invalid Simplecast player url!')
          continue
        }

        const [res, err] = await settle(() =>
          simplecastApi.getEpisode({ id: episodeId }),
        )

        if (err) {
          console.error('failed to fetch Simplecast episode ', url)
          console.error(err)
          continue
        }

        const data: LPE.Podcast.SimplecastChannelData = {
          duration: res.duration,
          audioFileUrl: res.ad_free_audio_file_url ?? res.audio_file?.url,
        }

        channels.push({
          name,
          url,
          data,
        })

        break
      }
      default: {
        channels.push({
          name,
          url,
        })
      }
    }
  }

  return channels
}

const findSections = (
  names: string[],
  blocks: LPE.Post.ContentBlock[],
): {
  name: string
  start: number
  end: number
  blocks: LPE.Post.ContentBlock[]
}[] => {
  let sections: {
    name: string
    start: number
    end: number
    blocks: LPE.Post.ContentBlock[]
  }[] = names.map((name) => ({ name, start: -1, end: -1, blocks: [] }))

  blocks.forEach((block, index) => {
    const { type, ...rest } = block
    if (block.type === 'text') {
      const sectionIndex = sections.findIndex(
        ({ name }) => block.text.trim() === `[${name}]`,
      )

      if (sectionIndex === -1) return

      const section = sections[sectionIndex]
      section.start = index
    }
  })

  sections = [...sections]
    .sort((a, b) => (a.start < b.start ? -1 : 1))
    .filter((section) => section.start > -1)

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i]
    const nextSection = sections[i + 1]
    section.end = nextSection ? nextSection.start - 1 : blocks.length - 1

    section.blocks = blocks.slice(section.start + 1, section.end + 1)
  }

  return sections
}
