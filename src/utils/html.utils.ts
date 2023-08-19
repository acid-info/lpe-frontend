const regexForInnerHtml = /<[^>]*>/
const regexForId = /id="([^"]*)"/
const regexForClass = /class="([^"]*)"/

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

export const isAuthorsParagraph = (html: string) => {
  const regex = /<a\s+[^>]*href="mailto:([^"]+)"[^>]*>([^<]+)<\/a>/g
  const matches = html.match(regex)
  if (!matches) return false
  // so if the email is in the first 50% of the text, it's probably the author line so we want to exclude it
  return matches.join('').length / html.length > 0.5
}

export function extractContentFromHTML(htmlString: string) {
  const regex = /<[^>]+>([^<]+)<\/[^>]+>/
  const match = regex.exec(htmlString)

  if (match && match.length > 1) {
    return match[1]
  } else {
    return null
  }
}
