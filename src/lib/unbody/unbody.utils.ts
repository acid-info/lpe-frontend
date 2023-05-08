import { UnbodyGetFilters } from './unbody.types'
import { UnbodyGraphQl } from './unbody-content.types'

const operators = Object.values(UnbodyGraphQl.Filters.WhereOperatorEnum)

export const parseFilterArgs = (args: UnbodyGetFilters = {}): string => {
  const parse = (obj: any): string | number => {
    if (typeof obj === 'number') {
      return obj
    }

    if (
      typeof obj === 'string' &&
      operators.includes(obj as UnbodyGraphQl.Filters.WhereOperatorEnum)
    ) {
      return obj
    }

    //TODO needs to be improved in order to support more complex queries

    if (Array.isArray(obj)) {
      const props = obj.map((value) => `${parse(value)}`).join(',')
      return `[${props}]`
    }

    if (typeof obj === 'object') {
      const props = Object.keys(obj)
        .map((key) => `${key}:${parse(obj[key])}`)
        .join(',')
      return `{${props}}`
    }

    return JSON.stringify(obj)
  }

  const p = parse(args)
  //remove the first and last curly braces
  return typeof p === 'string' ? p.substring(1, p.length - 1) : p + ''
}
