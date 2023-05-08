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
        summary
        tags
        createdAt
        modifiedAt
        toc
        blocks{
          ...on ImageBlock{
                url
                alt
          }
          ... on TextBlock {
            footnotes
            html
          }
        }
    `)
