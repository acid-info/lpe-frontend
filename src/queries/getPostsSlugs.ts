import { GetGoogleDocQuery } from '.'
import { UnbodyGetFilters } from '@/lib/unbody/unbody.types'

const defaultArgs: UnbodyGetFilters = {}

export const getAllPostsSlugQuery = (args: UnbodyGetFilters = defaultArgs) =>
  GetGoogleDocQuery(args)(`
        remoteId
  `)
