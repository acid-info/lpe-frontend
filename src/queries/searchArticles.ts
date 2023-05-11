import { GetGoogleDocQuery } from '.'
import { UnbodyGetFilters } from '../lib/unbody/unbody.types'

const defaultArgs: UnbodyGetFilters = {}

export const getSearchArticlesQuery = (args: UnbodyGetFilters = defaultArgs) =>
  GetGoogleDocQuery(args)(`
        remoteId
        title
        subtitle
        summary
        tags
        modifiedAt
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
