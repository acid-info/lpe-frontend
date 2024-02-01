import { Transformer } from '../../../lib/TransformPipeline/types'
import { LPE } from '../../../types/lpe.types'
import { StrapiStaticPageData } from '../strapi.types'
import { transformStrapiHtmlContent } from './utils'

export const staticPageTransformer: Transformer<
  StrapiStaticPageData,
  LPE.StaticPage.Document,
  StrapiStaticPageData,
  undefined,
  undefined
> = {
  key: 'StaticPageTransformer',
  classes: ['static_page'],
  objectType: 'StaticPage',
  isMatch: (helpers, object) => object.__typename === 'PageEntity',
  transform: async (helpers, data, original, root, ctx) => {
    const { id, attributes } = data

    const title = attributes.title
    const subtitle = attributes.subtitle
    const slug = attributes.slug
    const description = attributes.description

    const { blocks: content } = await transformStrapiHtmlContent({
      html: attributes.body || '',
    })

    return {
      id,
      slug,
      title,
      subtitle,
      content,
      summary: description,
      createdAt: attributes.publishedAt,
      modifiedAt: attributes.publishedAt,
      isDraft: !attributes.publishedAt,
      type: 'static_page',
    }
  },
}
