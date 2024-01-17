import * as htmlParser from 'node-html-parser'
import slugify from 'slugify'
import { UploadFileEntity } from '../../../lib/strapi/strapi.generated'
import { LPE } from '../../../types/lpe.types'
import { convertToIframe } from '../../../utils/string.utils'

let assetsBaseUrl = process.env.NEXT_PUBLIC_ASSETS_BASE_URL ?? ''
if (assetsBaseUrl.endsWith('/')) assetsBaseUrl = assetsBaseUrl.slice(1)

export const transformStrapiImageUrl = (url: string): string =>
  assetsBaseUrl + url

export const transformStrapiImageData = (
  image:
    | Pick<UploadFileEntity, 'attributes'>
    | {
        data: {
          attributes: Partial<UploadFileEntity['attributes']>
        }
      },
): LPE.Image.Document => {
  const attributes = 'data' in image ? image.data.attributes : image.attributes

  return {
    height: attributes.height || 0,
    width: attributes.width || 0,
    caption: attributes.caption || '',
    alt: attributes.caption || attributes.alternativeText || '',
    url: attributes.url ? transformStrapiImageUrl(attributes.url) : '',
  }
}

export const transformStrapiHtmlContent = ({
  html,
}: {
  html: string
}): {
  toc: LPE.Post.TocItem[]
  blocks: LPE.Post.ContentBlock[]
  html: string
  text: string
} => {
  const toc: LPE.Post.TocItem[] = []
  const blocks: LPE.Post.ContentBlock[] = []

  // split paragraphs with <br> into multiple paragraphs
  html = html.replaceAll(
    /<p(\s+[^>]*)?>(.*?)<br>(.*?)<\/p>/g,
    (match, p1, p2, p3) =>
      [p2, p3]
        .join('<br>')
        .split('<br>')
        .map((p) => `<p${p1 || ''}>${p}</p>`)
        .join(''),
  )

  let root = htmlParser.parse(html, { parseNoneClosedTags: true })

  let blockIndex = -1

  for (const child of root.childNodes) {
    if (!(child instanceof htmlParser.HTMLElement)) {
      continue
    }

    const tagName = child.tagName.toLowerCase()
    const isFigure = tagName === 'figure'
    const isMedia = isFigure && !!child.querySelector('oembed')
    const isImage = isFigure && !isMedia && !!child.querySelector('img')
    const empty = child.text.length === 0

    if (!isFigure && empty) continue

    blockIndex++

    if (isImage) {
      const image = child.querySelector('img')
      if (!image) {
        blockIndex--
        continue
      }

      const caption = child.textContent || ''
      const alt = image.getAttribute('alt') || ''
      const url = image.getAttribute('src') || ''
      const width = parseInt(image.getAttribute('width') || '0', 10)
      const height = parseInt(image.getAttribute('height') || '0', 10)

      blocks.push({
        id: '',
        caption,
        type: 'image',
        width,
        height,
        alt: alt || caption,
        labels: [],
        order: blockIndex,
        url: url.startsWith('/') ? transformStrapiImageUrl(url) : url,
      })

      continue
    }

    if (isMedia) {
      const labels: LPE.Post.ContentBlockLabel[] = ['embed']

      const oembed = child.querySelector('oembed')
      const url = oembed?.getAttribute('url') || ''
      if (!url) {
        blockIndex--

        continue
      }

      const youtube = html.match(
        /(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/[^ "]+/gi,
      )

      const simplecast = html.match(
        /(https?\:\/\/)?((player\.)?simplecast\.com)\/[^ "]+/gi,
      )

      const label = youtube?.[0]
        ? LPE.Post.ContentBlockLabels.YoutubeEmbed
        : LPE.Post.ContentBlockLabels.SimplecastEmbed

      const src = youtube?.[0] || simplecast?.[0]
      if (src && src.length > 0) {
        labels.push(label)
        labels.push(LPE.Post.ContentBlockLabels.Embed)
      }

      blocks.push({
        id: `p-${blockIndex}`,
        order: 0,
        type: 'text',
        classNames: [],
        footnotes: [],
        html: child.outerHTML,
        labels,
        tagName: 'p',
        text: url,
        embed: {
          src: url,
          html: convertToIframe(url),
        },
      })
    }

    const text = child.text || ''
    const isHeading = tagName.startsWith('h')
    const id =
      child.id ||
      (isHeading && slugify(text, { lower: true, trim: true })) ||
      `p-${blockIndex}`
    child.setAttribute('id', id)

    if (isHeading) {
      toc.push({
        blockIndex,
        href: `#${id}`,
        level: parseInt(tagName[1], 10),
        tag: tagName,
        title: text.trim(),
      })
    }

    blocks.push({
      id: '',
      footnotes: [],
      html: child.outerHTML,
      labels: [],
      tagName,
      text,
      order: blockIndex,
      classNames: Array.from(child.classList.values()),
      type: 'text',
    } as LPE.Post.TextBlock)
  }

  return {
    toc,
    blocks,
    text: root.text,
    html: root.innerHTML,
  }
}
