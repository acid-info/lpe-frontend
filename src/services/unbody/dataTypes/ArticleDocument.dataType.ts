import { LPE } from '../../../types/lpe.types'
import { calcReadingTime } from '../../../utils/string.utils'
import { UnbodyResGoogleDocData } from '../unbody.types'
import { UnbodyDataTypeConfig } from './types'

export const ArticleDataType: UnbodyDataTypeConfig<
  UnbodyResGoogleDocData,
  LPE.Article.Data
> = {
  key: 'ArticleDocument',
  objectType: 'GoogleDoc',
  classes: ['article', 'podcast', 'document'],

  isMatch: (helpers, data) =>
    data.pathString.includes('/Articles/') ||
    data.pathString.includes('/Podcasts/'),

  transform: async (helpers, data) => {
    const textBlock = helpers.dataTypes.get({
      objectType: 'TextBlock',
      classes: 'article',
    })
    const imageBlock = helpers.dataTypes.get({
      objectType: 'ImageBlock',
      classes: 'article',
    })

    const blocks =
      await helpers.dataTypes.transformMany<LPE.Article.ContentBlock>(
        [...textBlock, ...imageBlock],
        [...(data.blocks || [])].sort((a, b) => a.order - b.order),
        data,
      )

    const readingTime = calcReadingTime(
      (data.blocks || [])
        .filter((block) => block.__typename === 'TextBlock')
        .map((block) => ('text' in block ? block.text : ''))
        .join(' '),
    )

    return {
      id: data._additional.id,
      slug: data.slug,
      tags: data.tags ?? [],
      title: data.title,
      subtitle: data.subtitle || '',
      summary: data.summary || '',
      authors: data.mentionsObj ?? [],
      createdAt: data.createdAt || null,
      modifiedAt: data.modifiedAt || null,
      content: blocks,
      coverImage:
        (blocks.find((block) =>
          (block.labels || []).includes(
            LPE.Article.ContentBlockLabels.CoverImage,
          ),
        ) as LPE.Article.ImageBlock) || null,
      readingTime,
      toc: data.tocObj ?? [],
    }
  },
}