import {
  UnbodyDataTypeClass,
  UnbodyDataTypeConfig,
  UnbodyDataTypeConfigHelpers,
  UnbodyDataTypeKey,
} from './types'

export class UnbodyDataTypes {
  private dataTypes: UnbodyDataTypeConfig[] = []
  private helpers: UnbodyDataTypeConfigHelpers

  constructor(dataTypes: UnbodyDataTypeConfig<any>[]) {
    this.dataTypes = dataTypes

    this.helpers = {
      dataTypes: this,
    }
  }

  getOne = ({
    key,
    classes,
    objectType,
  }: {
    key?: UnbodyDataTypeKey
    classes?: UnbodyDataTypeClass | UnbodyDataTypeClass[]
    objectType?: UnbodyDataTypeConfig['objectType']
  }) => {
    let dataTypes = this.dataTypes

    if (key) {
      return dataTypes.find((doc) => doc.key === key)
    }

    return this.get({ classes, objectType })[0]
  }

  get = ({
    classes: _classes,
    objectType,
  }: {
    classes?: UnbodyDataTypeClass | UnbodyDataTypeClass[]
    objectType?: UnbodyDataTypeConfig['objectType']
  }) => {
    let dataTypes = this.dataTypes

    if (objectType)
      dataTypes = dataTypes.filter(
        (dataType) => dataType.objectType === objectType,
      )

    const classes = !_classes
      ? []
      : Array.isArray(_classes)
      ? _classes
      : [_classes]
    if (classes.length > 0)
      dataTypes = dataTypes.filter((dataType) =>
        classes.every((cls) => dataType.classes.includes(cls)),
      )

    return dataTypes
  }

  transform = async <O = any, T = any>(
    pipeline: UnbodyDataTypeConfig[],
    data: T,
    root?: any,
  ): Promise<O> => {
    let obj = data

    for (const dataType of pipeline) {
      if (dataType.isMatch(this.helpers, obj, data, root)) {
        obj = await dataType.transform(this.helpers, obj, data, root)
      }
    }

    return obj as O | Promise<O>
  }

  transformMany = async <O = any, T = any>(
    pipeline: UnbodyDataTypeConfig[],
    data: T[],
    root?: any,
  ): Promise<O[]> => {
    return Promise.all(data.map((d) => this.transform<O, T>(pipeline, d, root)))
  }
}
