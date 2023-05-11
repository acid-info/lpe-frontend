import { GetGoogleDocQuery } from '.'
import { UnbodyGetFilters } from '@/lib/unbody/unbody.types'

const defaultArgs: UnbodyGetFilters = {
  limit: 1,
}

export const getArticlePostQuery = (args: UnbodyGetFilters = defaultArgs) =>
  GetGoogleDocQuery(args)(`
        sourceId
        remoteId
        title
        subtitle
        summary
        tags
        createdAt
        modifiedAt
        toc
        slug
        blocks{
          ...on ImageBlock{
                url
                alt
                order
                __typename
          }
          ... on TextBlock {
            footnotes
            html
            order
            tagName
            __typename
          }
        }
    `)
