const regexForInnerHtml = /<[^>]*>/

// const regexForInnerHtml = /<[^>]*>([^<]*)<\/[^>]*>/
const regexForId = /id="([^"]*)"/
const regexForClass = /class="([^"]*)"/
//
// export const extractInnerHtml = (html: string) => {
//     const match = html.match(regexForInnerHtml)
//     return match ? match[1] : html
// }

export function extractInnerHtml(htmlString: string) {
  var regex = /^<[^>]+>([\s\S]*)<\/[^>]+>$/
  var match = regex.exec(htmlString)

  if (match) {
    return match[1]
  } else {
    return ''
  }
}

export const extractIdFromFirstTag = (html: string) => {
  const match = html.match(regexForId)
  return match ? match[1] : null
}

export const extractClassFromFirstTag = (html: string) => {
  const match = html.match(regexForClass)
  return match ? match[1] : null
}
