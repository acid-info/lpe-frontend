import {
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
    page: (page: number, limit: number = 10) => ({
      limit: this.args.limit(limit),
      skip: this.args.skip(Math.max(0, page - 1) * limit),
    }),
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
