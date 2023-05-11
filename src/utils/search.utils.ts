import { SearchResultItem } from '@/types/data.types'
import { ParsedUrlQuery } from 'querystring'

export const extractTopicsFromQuery = (query: ParsedUrlQuery): string[] => {
  return query.topics ? (query.topics as string).split(',') : []
}

export const addTopicsToQuery = (topics: string[]) => {
  return {
    ...(topics.length > 0 && { topics: topics.join(',') }),
  }
}

export const extractQueryFromQuery = (queryObj: ParsedUrlQuery): string => {
  return (queryObj.query as string) || ''
}

export const addQueryToQuery = (query: string) => {
  return {
    ...(query && query.length > 0 && { query }),
  }
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
