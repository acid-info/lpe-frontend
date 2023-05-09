import { UnbodyGetFilters } from '@/lib/unbody/unbody.types'
import { parseFilterArgs } from '@/lib/unbody/unbody.utils'

export const GetQuery = (q: string) => `query { Get{ ${q} } }`

export const GetGoogleDocQuery = (args: UnbodyGetFilters) => (q: string) => {
  if (Object.keys(args).length === 0) return GetQuery(`GoogleDoc{ ${q} }`)
  return GetQuery(`GoogleDoc(${parseFilterArgs(args)}){ ${q} }`)
}

export const GetTextBlockQuery = (args: UnbodyGetFilters) => (q: string) => {
  if (Object.keys(args).length === 0) return `TextBlock{ ${q} }`
  return `TextBlock(${parseFilterArgs(args)}){ ${q} }`
}

export const GetImageBlockQuery = (args: UnbodyGetFilters) => (q: string) => {
  if (Object.keys(args).length === 0) return `ImageBlock{ ${q} }`
  return `ImageBlock(${parseFilterArgs(args)}){ ${q} }`
}
