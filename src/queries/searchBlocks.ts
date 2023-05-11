import {
  GetGoogleDocQuery,
  GetImageBlockQuery,
  GetQuery,
  GetTextBlockQuery,
} from '.'
import { UnbodyGetFilters } from '../lib/unbody/unbody.types'

const defaultArgs: UnbodyGetFilters = {}

export const getSearchBlocksQuery = (args: UnbodyGetFilters = defaultArgs) =>
  GetQuery(
    [
      GetTextBlockQuery(args)(`
            __typename
            text
            tagName
            document{
              ...on GoogleDoc{
                    title
                    remoteId
                    slug
                    __typename
                    }
            }
            _additional{
              certainty
            }
        `),
      GetImageBlockQuery(args)(`
            __typename
            url
            width
            height
            alt
            document{
              ...on GoogleDoc{
                    title
                    remoteId
                    slug
                    __typename
                   }
            }
            _additional{
              certainty
            }
        `),
    ].join(' '),
  )
