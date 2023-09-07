import { LPE } from '../../../types/lpe.types'
import { UnbodyResGoogleDocData } from '../unbody.types'
import { UnbodyDataTypeConfig } from './types'

export const StaticPageDataType: UnbodyDataTypeConfig<
  UnbodyResGoogleDocData,
  LPE.StaticPage.Document
> = {
  key: 'StaticPageDocument',
  objectType: 'GoogleDoc',
  classes: ['static-page', 'document'],

  isMatch: (helpers, data) =>
    !!data?.pathString && data.pathString.includes('/Static pages/'),

  transform: async (helpers, data) => {
    const textBlock = helpers.dataTypes.get({
      objectType: 'TextBlock',
    })
    const imageBlock = helpers.dataTypes.get({
      objectType: 'ImageBlock',
    })

    const blocks =
      await helpers.dataTypes.transformMany<LPE.Article.ContentBlock>(
        [...textBlock, ...imageBlock],
        [...(data.blocks || [])].sort((a, b) => a.order - b.order),
        data,
      )

    return {
      id: data._additional.id,
      slug: data.slug,
      title: data.title,
      subtitle: data.subtitle || '',
      summary: data.summary || '',
      createdAt: data.createdAt || null,
      modifiedAt: data.modifiedAt || null,
      content: blocks,
      type: 'static_page',
      isDraft: data.pathString.includes('/draft/'),
    }
  },
}
