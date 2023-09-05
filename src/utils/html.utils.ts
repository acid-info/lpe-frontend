const attributeRegex = (name: string) => new RegExp(`^<[^>]*${name}="([^"]*)"`)

export function extractInnerHtml(htmlString: string) {
  var regex = /^<[^>]+>([\s\S]*)<\/[^>]+>$/
  var match = regex.exec(htmlString)

  if (match) {
    return match[1]
  } else {
    return ''
  }
}

export const extractIdFromFirstTag = (html: string) =>
  extractAttributeFromHTML(html, 'id')

export const extractClassFromFirstTag = (html: string) =>
  extractAttributeFromHTML(html, 'class')

export function extractAttributeFromHTML(
  html: string,
  attribute: string,
): string | null
export function extractAttributeFromHTML(
  html: string,
  attribute: string,
  defaultValue: string,
): string
export function extractAttributeFromHTML(
  html: string,
  attribute: string,
  defaultValue?: string,
): string | null {
  return (
    (html.match(attributeRegex(attribute))?.[1] as string) ||
    defaultValue ||
    null
  )
}

export const setAttributeOnHTML = (
  html: string,
  attribute: string,
  value: string,
) => {
  let result = html.trim()
  const tagName = html.match(/^<([\w])+/)?.[0]?.slice(1)!
  const current = extractAttributeFromHTML(html, attribute)

  if (current) {
    const currentAttribute = `${attribute}="${current}"`
    const index = html.indexOf(currentAttribute)

    result =
      result.slice(0, index) + result.slice(index + currentAttribute.length + 1)
  }

  result = `<${tagName} ${attribute}="${value}"${result.slice(
    tagName.length + 1,
  )}`

  return result
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
