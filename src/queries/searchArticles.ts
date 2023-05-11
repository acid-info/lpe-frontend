import { GetGoogleDocQuery } from '.'
import { UnbodyGetFilters } from '../lib/unbody/unbody.types'

const defaultArgs: UnbodyGetFilters = {}

export const getSearchArticlesQuery = (args: UnbodyGetFilters = defaultArgs) =>
  GetGoogleDocQuery(args)(`
        slug
        title
        subtitle
        summary
        tags
        modifiedAt
        mentions
        blocks{
          ...on ImageBlock{
                url
                alt
                order
                __typename
          }
        }
        _additional{
          certainty 
        }
    `)
