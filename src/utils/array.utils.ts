export const chunkArray = <T>(arr: T[], ...pattern: number[]): T[][] => {
  const result: T[][] = []

  let index = 0
  let iteration = 0

  if (pattern.length === 0) return [arr]

  while (index < arr.length) {
    const take = pattern[iteration % pattern.length]
    const elements = arr.slice(index, index + take)

    result.push(elements)

    iteration++
    index += elements.length
  }

  return result
}

export const shuffleArray = <T>(arr: T[]): T[] => {
  const result = [...arr]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    const temp = result[i]
    result[i] = result[j]
    result[j] = temp
  }

  return result
}
