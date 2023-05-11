import { UnbodyGetFilters } from '@/lib/unbody/unbody.types'
import { parseFilterArgs } from '@/lib/unbody/unbody.utils'

export const GetQuery = (q: string) => `query { Get{ ${q} } }`

export const GetGoogleDocQuery = (args: UnbodyGetFilters) => (q: string) => {
  return GetQuery(GoogleDocQuery(args)(q))
}

export const GetTextBlockQuery = (args: UnbodyGetFilters) => (q: string) => {
  if (Object.keys(args).length === 0) return `TextBlock{ ${q} }`
  return `TextBlock(${parseFilterArgs(args)}){ ${q} }`
}

export const GetImageBlockQuery = (args: UnbodyGetFilters) => (q: string) => {
  if (Object.keys(args).length === 0) return `ImageBlock{ ${q} }`
  return `ImageBlock(${parseFilterArgs(args)}){ ${q} }`
}

export const GoogleDocQuery = (args: UnbodyGetFilters) => (q: string) => {
  if (Object.keys(args).length === 0) return `GoogleDoc{ ${q} }`
  return `GoogleDoc(${parseFilterArgs(args)}){ ${q} }`
}
