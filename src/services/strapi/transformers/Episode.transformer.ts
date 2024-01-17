import { Transformer } from '../../../lib/TransformPipeline/types'
import { LPE } from '../../../types/lpe.types'
import { settle } from '../../../utils/promise.utils'
import { simplecastApi } from '../../simplecast.service'
import { StrapiPostData } from '../strapi.types'
import { transformStrapiHtmlContent } from './utils'

export const episodeTransformer: Transformer<
  LPE.Podcast.Document,
  LPE.Podcast.Document,
  StrapiPostData,
  undefined,
  undefined
> = {
  key: 'EpisodeTransformer',
  classes: ['episode'],
  objectType: 'Post',
  isMatch: (helpers, object) => object.type === LPE.PostTypes.Podcast,
  transform: async (helpers, data, original, root, ctx) => {
    return {
      ...data,
      credits: transformStrapiHtmlContent({
        html: original.attributes.credits || '',
      }).blocks as LPE.Post.TextBlock[],
      channels: original.attributes.channel
        ? await transformChannels(original.attributes.channel)
        : [],
    }
  },
}

const transformChannels = async (
  channels: StrapiPostData['attributes']['channel'] = [],
) => {
  const transformed: LPE.Podcast.Content['channels'] = []

  for (const channel of channels) {
    const { channel: name, link } = channel

    switch (name) {
      case 'Apple_Podcasts':
        transformed.push({
          name: LPE.Podcast.ChannelNames.ApplePodcasts,
          url: link,
        })
        break

      case 'Google_Podcasts': {
        transformed.push({
          name: LPE.Podcast.ChannelNames.GooglePodcasts,
          url: link,
        })
        break
      }

      case 'Spotify': {
        transformed.push({
          name: LPE.Podcast.ChannelNames.Spotify,
          url: link,
        })
        break
      }

      case 'Youtube': {
        transformed.push({
          name: LPE.Podcast.ChannelNames.Youtube,
          url: link,
        })
        break
      }

      case 'Simplecast': {
        const episodeId = simplecastApi.extractEpisodeIdFromUrl(link)

        if (!episodeId) {
          console.error('invalid Simplecast player url!')
          continue
        }

        const [res, err] = await settle(() =>
          simplecastApi.getEpisode({ id: episodeId }),
        )

        if (err) {
          console.error('failed to fetch Simplecast episode ', link)
          console.error(err)
          continue
        }

        transformed.push({
          name: LPE.Podcast.ChannelNames.Simplecast,
          url: link,
          data: {
            duration: res.duration,
            audioFileUrl: res.ad_free_audio_file_url ?? res.audio_file?.url,
          },
        })
        break
      }
    }
  }

  return transformed
}
