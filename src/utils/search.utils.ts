import { SearchResultItem } from '@/types/data.types'
import { ParsedUrlQuery } from 'querystring'

export const extractTopicsFromQuery = (query: ParsedUrlQuery): string[] => {
  return query.topic ? (query.topic as string).split(',') : []
}

export const extractContentTypesFromQuery = (
  query: ParsedUrlQuery,
): string[] => {
  return query.type ? (query.type as string).split(',') : []
}

export const addTopicsToQuery = (topics: string[]): string | undefined => {
  return topics.length ? `topic=${topics.join(',')}` : undefined
}

export const addContentTypesToQuery = (
  contentTypes: string[],
): string | undefined => {
  return contentTypes.length ? `type=${contentTypes.join(',')}` : undefined
}

export const extractQueryFromQuery = (queryObj: ParsedUrlQuery): string => {
  return (queryObj.query as string) || ''
}

export const addQueryToQuery = (query: string): string | undefined => {
  return query.length > 0 ? `query=${query}` : undefined
}

export const createMinimizedSearchText = (
  query: string,
  filterTags: string[],
) => {
  let txt = ''
  if (query !== undefined && query.length > 0) {
    txt += `<span>${query}</span>`
  }
  if (filterTags.length > 0) {
    if (txt.length > 0) txt += '<b> . </b>'
    txt += `${filterTags.map((t) => `<small>[${t}]</small>`).join(' ')}`
  }
  return txt
}

export const createSearchLink = (query: string, filterTags: string[]) => {
  let link = '/search'
  if (query.length > 0 || filterTags.length > 0) {
    link += '?'
  }
  if (query.length > 0 && filterTags.length > 0) {
    link += `query=${query}&topics=${filterTags.join(',')}`
  } else if (query.length > 0) {
    link += `query=${query}`
  } else if (filterTags.length > 0) {
    link += `topics=${filterTags.join(',')}`
  }

  return link
}
