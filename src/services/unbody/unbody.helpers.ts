import {
  GetObjectsGoogleDocWhereInpObj,
  GetObjectsGoogleDocWhereOperandsInpObj,
  GoogleDocAdditional,
  ImageBlockAdditional,
  TextBlockAdditional,
} from '../../lib/unbody/unbody.generated'

export class UnbodyHelpers {
  static resolveScore = (
    _additional: Partial<
      GoogleDocAdditional | ImageBlockAdditional | TextBlockAdditional
    >,
  ): number =>
    _additional?.certainty ||
    (_additional?.score && parseFloat(_additional.score)) ||
    0

  static args = {
    limit: (value: number): any => String(value),
    skip: (value: number): any => String(value),
    page: (skip: number, limit: number = 10) => ({
      limit: this.args.limit(limit),
      skip: this.args.skip(skip),
    }),
    wherePath: (
      path: Array<string | null | undefined | false>,
      key: string[] = ['path'],
    ) => {
      const input = path.filter((p) => p && typeof p === 'string') as string[]
      const paths: string[] = []
      const or: string[] = []
      const exclude: string[] = []

      for (const p of input) {
        if (p.startsWith('!')) exclude.push(p.slice(1))
        else if (p.includes('|'))
          or.push(...p.split('|').filter((s) => s.length > 0))
        else paths.push(p)
      }

      return {
        operator: 'And',
        operands: [
          ...paths.map(
            (p) =>
              ({
                operator: 'Equal',
                path: key,
                valueString: p,
              } as GetObjectsGoogleDocWhereInpObj),
          ),
          ...exclude.map(
            (p) =>
              ({
                operator: 'NotEqual',
                path: key,
                valueString: p,
              } as GetObjectsGoogleDocWhereInpObj),
          ),
          ...(or.length
            ? [
                {
                  operator: 'Or',
                  operands: or.map(
                    (p) =>
                      ({
                        operator: 'Equal',
                        path: key,
                        valueString: p,
                      } as GetObjectsGoogleDocWhereInpObj),
                  ),
                } as GetObjectsGoogleDocWhereInpObj,
              ]
            : []),
        ],
      } as GetObjectsGoogleDocWhereInpObj
    },
    wherePublished: (value: boolean, path: string[] = ['pathString']) =>
      ({
        operator: 'Or',
        operands: value
          ? [
              {
                path,
                operator: 'Like',
                valueString: '/Articles/published/*',
              },
            ]
          : [],
      } as GetObjectsGoogleDocWhereOperandsInpObj),
    whereSlugIs: (slug: string, path = ['slug']) =>
      ({
        operator: 'Equal',
        path,
        valueString: slug,
      } as GetObjectsGoogleDocWhereOperandsInpObj),
    whereSlugIsNot: (slug: string, path = ['slug']) =>
      ({
        operator: 'NotEqual',
        path: path,
        valueString: slug,
      } as GetObjectsGoogleDocWhereOperandsInpObj),
    whereIdIsNot: (id: string) =>
      ({
        operator: 'NotEqual',
        path: ['id'],
        valueString: id,
      } as GetObjectsGoogleDocWhereOperandsInpObj),
  }
}
