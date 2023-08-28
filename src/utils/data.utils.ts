function hasClassName(inputString: string, className: string) {
  const regex = new RegExp(`class\\s*=\\s*"[^"]*\\b${className}\\b[^"]*"`)
  return regex.test(inputString)
}

export const shuffle = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

export const parseInt = (
  inp: any,
  defaultValue?: number,
): number | undefined => {
  if (Array.isArray(inp))
    return (
      inp
        .map((value) => parseInt(value))
        .find((value) => typeof value === 'number') ?? defaultValue
    )

  let val = inp
  if (typeof val === 'number') return val
  if (typeof val === 'string') {
    val = Number.parseInt(val, 10)
    return Number.isNaN(val) ? defaultValue : val
  }

  return defaultValue
}
