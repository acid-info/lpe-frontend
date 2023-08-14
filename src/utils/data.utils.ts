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

export const unique = (arr: any[]) => Array.from(new Set(arr))

export const getAudioSourceFromEpisode = async (episodId: string) => {
  const myHeaders = new Headers()
  myHeaders.append(
    'Authorization',
    'Bearer eyJhcGlfa2V5IjoiMzg3OTdhY2Y5N2NmZjgzZjQxNGI5ODNiN2E2MjY3NmQifQ==',
  )

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  }

  const result = await fetch(
    `https://api.simplecast.com/episodes/${episodId}`,
    requestOptions,
  )

  const data = await result.json()
  return data
}
