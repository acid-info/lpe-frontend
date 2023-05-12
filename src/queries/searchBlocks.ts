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
            classNames
            document{
              ...on GoogleDoc{
                    title
                    mentions
                    slug
                    modifiedAt
                    __typename
                    }
            }
            _additional{
              certainty
              id
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
                    slug
                    mentions
                    modifiedAt
                    __typename
                   }
            }
            _additional{
              certainty
              id
            }
        `),
    ].join(' '),
  )
