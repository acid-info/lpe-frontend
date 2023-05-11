import { GetGoogleDocQuery } from '.'
import { UnbodyGetFilters } from '@/lib/unbody/unbody.types'

const defaultArgs: UnbodyGetFilters = {
  limit: 1,
}

export const getArticlePostQuery = (args: UnbodyGetFilters = defaultArgs) =>
  GetGoogleDocQuery(args)(`
        sourceId
        title
        subtitle
        summary
        tags
        createdAt
        modifiedAt
        toc
        slug
        mentions
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
            text
            tagName
            __typename
            classNames
          }
        }
        _additional{
            id
       }
    `)

export const getRelatedArticlesQuery = (args: UnbodyGetFilters = defaultArgs) =>
  GetGoogleDocQuery(args)(`
        title
        mentions
        modifiedAt
        slug
    `)

export const getArticlesFromSameAuthor = (
  args: UnbodyGetFilters = defaultArgs,
) =>
  GetGoogleDocQuery(args)(`
        title
        mentions
        modifiedAt
        slug
    `)
