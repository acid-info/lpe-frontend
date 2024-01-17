import { TransformPipeline } from './TransformPipeline'

export type Transformer<D = any, T = any, O = any, R = any, C = any> = {
  key: string
  classes: string[]
  objectType: string

  isMatch: (
    helpers: Helpers,
    object: D,
    original: O,
    root: R | undefined,
    context: C,
  ) => boolean

  transform: (
    helpers: Helpers,
    object: D,
    original: O,
    root: R | undefined,
    context: C,
  ) => T | Promise<T>
}

export type Helpers = {
  transformers: TransformPipeline
}
