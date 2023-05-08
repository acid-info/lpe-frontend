import { GetGoogleDocQuery } from '.'
import { UnbodyExploreArgs } from '@/lib/unbody/unbody.types'

const defaultArgs: UnbodyExploreArgs = {
  limit: 1,
  nearText: { concepts: ['home'] },
}

export const getArticlePostQuery = (args: UnbodyExploreArgs = defaultArgs) =>
  GetGoogleDocQuery(args)(`
        sourceId
        remoteId
        title
        summary
        tags
        createdAt
        modifiedAt
        text
        blocks{
          ...on ImageBlock{
                url
                alt
          }
        }
    `)
