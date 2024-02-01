import { Helpers, Transformer } from './types'

export class TransformPipeline {
  private transformers: Transformer[] = []
  private helpers: Helpers

  constructor(transformers: Transformer<any>[]) {
    this.transformers = transformers

    this.helpers = {
      transformers: this,
    }
  }

  getOne = ({
    key,
    classes,
    objectType,
  }: {
    key?: string
    classes?: string | string[]
    objectType?: string
  }) => {
    let transformers = this.transformers

    if (key) {
      return transformers.find((doc) => doc.key === key)
    }

    return this.get({ classes, objectType })[0]
  }

  get = ({
    classes: _classes,
    objectType,
  }: {
    classes?: string | string[]
    objectType?: string
  }) => {
    let transformers = this.transformers

    if (objectType)
      transformers = transformers.filter(
        (dataType) => dataType.objectType === objectType,
      )

    const classes = !_classes
      ? []
      : Array.isArray(_classes)
      ? _classes
      : [_classes]
    if (classes.length > 0)
      transformers = transformers.filter((dataType) =>
        classes.every((cls) => dataType.classes.includes(cls)),
      )

    return transformers
  }

  transform = async <O = any, T = any>(
    pipeline: Transformer[],
    data: T,
    root?: any,
    context?: any,
  ): Promise<O> => {
    let obj = data

    for (const dataType of pipeline) {
      if (dataType.isMatch(this.helpers, obj, data, root, context)) {
        obj = await dataType.transform(this.helpers, obj, data, root, context)
      }
    }

    return obj as O | Promise<O>
  }

  transformMany = async <O = any, T = any>(
    pipeline: Transformer[],
    data: T[],
    root?: any,
    context?: any,
  ): Promise<O[]> => {
    return Promise.all(
      data.map((d) => this.transform<O, T>(pipeline, d, root, context)),
    )
  }
}
