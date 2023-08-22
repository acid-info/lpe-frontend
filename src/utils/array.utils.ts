export const chunkArray = <T>(arr: T[], ...pattern: number[]): T[][] => {
  const result: T[][] = []

  let index = 0
  let iteration = 0

  while (index < arr.length) {
    const take = pattern[iteration % pattern.length]
    const elements = arr.slice(index, index + take)

    result.push(elements)

    iteration++
    index += elements.length
  }

  return result
}
