import { gql } from 'graphql-request'

import { GetGoogleDocQuery, GetQuery } from '.'
import { UnbodyGetFilters } from '@/lib/unbody/unbody.types'

const defaultArgs: UnbodyGetFilters = {
  limit: 10,
  nearText: { concepts: ['home'] },
}

export const getHomePagePostsQuery = (args: UnbodyGetFilters = defaultArgs) =>
  GetGoogleDocQuery(args)(`
        remoteId
        title
        subtitle
        summary
        tags
        slug
        createdAt
        modifiedAt
        pathString
        mentions
        blocks{
          ...on ImageBlock{
                url
                alt
                order
                __typename
          }
        }
   `)
