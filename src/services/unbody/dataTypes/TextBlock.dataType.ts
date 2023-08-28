import { LPE } from '../../../types/lpe.types'
import { convertToIframe } from '../../../utils/string.utils'
import { UnbodyResGoogleDocData, UnbodyResTextBlockData } from '../unbody.types'
import { UnbodyDataTypeConfig } from './types'

export const TextBlockDataType: UnbodyDataTypeConfig<
  UnbodyResTextBlockData,
  LPE.Article.TextBlock,
  UnbodyResTextBlockData,
  UnbodyResGoogleDocData
> = {
  key: 'TextBlock',
  objectType: 'TextBlock',
  classes: ['article'],

  isMatch: (helpers, data, original, root) => data.__typename === 'TextBlock',

  transform: (helpers, data, original, root) => {
    const { text = '', html = '' } = data
    const labels: LPE.Post.ContentBlockLabel[] = []
    let embed: LPE.Post.TextBlockEmbed | null = null

    if (text.length > 0 || html.length > 0) {
      const isLink =
        /^<p[^>]*><span[^>]*><a[^>]*href="(https):\/\/[^ "]+"[^>]*>.*<\/a><\/span><\/p>$/.test(
          html,
        )
      const isIframe = /<iframe[^>]*>(?:<\/iframe>|[^]*?<\/iframe>)/.test(text)

      if (isLink) {
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

          embed = {
            src,
            html: convertToIframe(src),
          }
        }
      }

      if (isIframe) {
        const src = text.match(/(?<=src=").*?(?=[\?"])/g)?.[0]

        if (src) {
          labels.push(LPE.Post.ContentBlockLabels.Embed)

          embed = {
            html: text,
            src,
          }
        }
      }
    }

    return {
      id: data?._additional?.id || `${data.order}`,
      type: 'text',
      html: data.html,
      text: data.text || '',
      classNames: data.classNames,
      footnotes: data.footnotesObj,
      order: data.order,
      tagName: data.tagName,
      labels,
      ...(embed ? { embed } : {}),
    }
  },
}
