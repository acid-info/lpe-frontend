import { Typography, TypographyProps } from '@acid-info/lsd-react'
import React from 'react'

type UrlReplacerProps = {
  rawHtml: string
} & TypographyProps

function extractHostname(url: string): string {
  // Use an anchor element to extract the hostname
  const a = document.createElement('a')
  a.href = url

  return a.hostname.split('.').slice(-2, -1).join('.')
}

function formatHtmlWithUrls(rawHtml: string): string {
  // Regular expression to match URLs
  const urlRegex = /https?:\/\/([a-zA-Z0-9.-]+)\/[^ ]*/g

  return rawHtml.replace(urlRegex, (match) => {
    const readableHost = extractHostname(match)
    return `<a href="${match}" target="_blank" rel="noopener noreferrer">${readableHost}</a>`
  })
}

export const NicerTextFormat: React.FC<TypographyProps> = ({
  children,
  ...props
}) => {
  const formattedHtml = formatHtmlWithUrls(children as string)
  return (
    <Typography
      {...props}
      dangerouslySetInnerHTML={{ __html: formattedHtml }}
    />
  )
}
