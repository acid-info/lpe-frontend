import { gql } from 'graphql-request'

import { GetGoogleDocQuery, GetQuery } from '.'
import { pareseExploreArgs } from '@/lib/unbody/unbody.utils'
import { UnbodyExploreArgs } from '@/lib/unbody/unbody.types'

const defaultArgs: UnbodyExploreArgs = {
  limit: 10,
  nearText: { concepts: ['home'] },
}

export const getHomePagePostsQuery = (args: UnbodyExploreArgs = defaultArgs) =>
  GetGoogleDocQuery(args)(`
        title
        summary
        tags
        createdAt
        modifiedAt
        blocks{
          ...on ImageBlock{
                url
                alt
          }
        }
   `)
