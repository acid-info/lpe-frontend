export const settle = async <R, E = Error>(
  promise: Promise<R> | (() => R | Promise<R>),
): Promise<[R, undefined] | [undefined, E]> => {
  try {
    const result: R =
      typeof promise === 'function' ? await promise() : await promise
    return [result, undefined]
  } catch (error) {
    return [undefined, error as E]
  }
}

export const settleSync = <R, E = Error>(
  func: () => R,
): [R, undefined] | [undefined, E] => {
  try {
    return [func(), undefined]
  } catch (error) {
    return [undefined, error as E]
  }
}

export type CreatePromiseResult<T = any, E = Error> = {
  promise: Promise<T>
  reject: (err: E) => void
  resolve: (result: T) => void
  callback: (data: T, error?: E) => void
}

export const createPromise = <T = any, E = Error>(): CreatePromiseResult<
  T,
  E
> => {
  let resolve: any, reject: any

  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })

  const callback = (data: T, error?: E) => {
    if (error) return void reject(error)
    resolve(data)
  }

  return {
    reject,
    resolve,
    promise,

    callback,
  }
}

export const sleep = (ms: number) =>
  new Promise(() => setTimeout(Promise.resolve, ms))
