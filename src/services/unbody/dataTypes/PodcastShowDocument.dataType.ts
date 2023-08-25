import { LPE } from '../../../types/lpe.types'
import { UnbodyResGoogleDocData } from '../unbody.types'
import { UnbodyDataTypeConfig } from './types'

export const PodcastShowDataType: UnbodyDataTypeConfig<
  LPE.Article.Data,
  LPE.Podcast.Show,
  UnbodyResGoogleDocData,
  any,
  | {
      numberOfEpisodes: number
    }
  | undefined
> = {
  key: 'PodcastShowDocument',
  objectType: 'GoogleDoc',
  classes: ['podcast', 'show', 'document'],

  isMatch: (helpers, data, original) =>
    original
      ? original.pathString.includes('/Podcasts/') && original.slug === 'index'
      : false,

  transform: async (helpers, data, original, root, context) => {
    if (!original) return data as any

    const description = data.content.find(
      (block) =>
        block.labels.length === 0 && block.type === 'text' && block.order > 2,
    )

    const showSlug = original.path[2]

    return {
      id: data.id,
      slug: showSlug,
      title: data.title,
      numberOfEpisodes: context?.numberOfEpisodes || 0,
      hosts: data.authors,
      url: `/podcasts/${showSlug}`,
      description: (description?.type === 'text' && description.html) || '',
      logo: {
        alt: data.title,
        width: 24,
        height: 24,
        url: `/${showSlug}-logo.svg`,
      },
      episodes: [],
    }
  },
}
