import { UnbodyGetFilters } from '@/lib/unbody/unbody.types'
import { parseFilterArgs } from '@/lib/unbody/unbody.utils'

export const GetQuery = (q: string) => `query { Get{ ${q} } }`

export const GetGoogleDocQuery = (args: UnbodyGetFilters) => (q: string) => {
  if (Object.keys(args).length === 0) return GetQuery(`GoogleDoc{ ${q} }`)
  return GetQuery(`GoogleDoc(${parseFilterArgs(args)}){ ${q} }`)
}
