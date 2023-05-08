import { GetGoogleDocQuery } from '.'
import { UnbodyGetFilters } from '../lib/unbody/unbody.types'

const defaultArgs: UnbodyGetFilters = {}

export const getSearchArticlesQuery = (args: UnbodyGetFilters = defaultArgs) =>
  GetGoogleDocQuery(args)(`
        remoteId
        title
        summary
        tags
        modifiedAt
        _additional{
          certainty 
        }
    `)
