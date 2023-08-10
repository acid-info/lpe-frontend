import { LPE } from '../../../types/lpe.types'
import { UnbodyResGoogleDocData } from '../unbody.types'
import { UnbodyDataTypeConfig } from './types'

export const PodcastShowDataType: UnbodyDataTypeConfig<
  LPE.Article.Data,
  LPE.Podcast.Show,
  UnbodyResGoogleDocData
> = {
  key: 'PodcastShowDocument',
  objectType: 'GoogleDoc',
  classes: ['podcast', 'show', 'document'],

  isMatch: (helpers, data, original) =>
    original
      ? original.pathString.includes('/Podcasts/') && original.slug === 'index'
      : false,
  transform: async (helpers, data, original) => {
    if (!original) return data as any

    const description = data.content.find((block) =>
      block.labels.includes(LPE.Article.ContentBlockLabels.Subtitle),
    )

    const image = data.content.find(
      (block) => block.type === 'image',
    ) as LPE.Article.ImageBlock

    return {
      id: data.id,
      slug: original.path[2],
      title: data.title,
      description: (description?.type === 'text' && description.html) || '',
      coverImage: image
        ? {
            alt: image.alt,
            url: image.url,
            width: image.width,
            height: image.height,
          }
        : {},
    }
  },
}
