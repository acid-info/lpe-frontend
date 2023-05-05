import { UnbodyExploreArgs } from '@/lib/unbody/unbody.types'
import { pareseExploreArgs } from '@/lib/unbody/unbody.utils'

export const GetQuery = (q: string) => `query { Get{ ${q} } }`

export const GetGoogleDocQuery = (args: UnbodyExploreArgs) => (q: string) =>
  GetQuery(`GoogleDoc(${pareseExploreArgs(args)}){ ${q} }`)
