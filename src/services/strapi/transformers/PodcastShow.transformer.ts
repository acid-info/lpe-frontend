import { Transformer } from '../../../lib/TransformPipeline/types'
import { LPE } from '../../../types/lpe.types'
import { getPostLink } from '../../../utils/route.utils'
import { StrapiPodcastShowData } from '../strapi.types'
import { transformStrapiHtmlContent, transformStrapiImageData } from './utils'

export const podcastShowTransformer: Transformer<
  StrapiPodcastShowData,
  LPE.Podcast.Show,
  StrapiPodcastShowData,
  undefined,
  undefined
> = {
  key: 'PodcastShowTransformer',
  classes: ['podcast'],
  objectType: 'PodcastShow',
  isMatch: (helpers, object) => object.__typename === 'PodcastShowEntity',
  transform: async (helpers, data, original, root, ctx) => {
    const { id, attributes } = data

    return {
      id,
      slug: attributes.slug,
      title: attributes.name,
      numberOfEpisodes: 0,
      url: getPostLink('podcast', { showSlug: attributes.slug }),
      description: attributes.description,
      descriptionText: await transformStrapiHtmlContent({
        html: attributes.description || '',
      }).then((h) => h.text),
      hosts: attributes.hosts.data.map((host) => ({
        id: '',
        name: host.attributes.name,
        emailAddress: host.attributes.email_address,
      })),
      logo: await transformStrapiImageData(attributes.logo),
    }
  },
}
