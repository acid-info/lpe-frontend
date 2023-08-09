import { LPE } from '../../../types/lpe.types'
import { similarity } from '../../../utils/string.utils'
import { UnbodyResGoogleDocData, UnbodyResTextBlockData } from '../unbody.types'
import { UnbodyDataTypeConfig } from './types'

export const ArticleTextBlockDataType: UnbodyDataTypeConfig<
  LPE.Article.TextBlock,
  LPE.Article.TextBlock,
  UnbodyResTextBlockData,
  UnbodyResGoogleDocData
> = {
  key: 'ArticleTextBlock',
  objectType: 'TextBlock',
  classes: ['article'],

  isMatch: (helpers, data, original, root) => data.type === 'text',

  transform: (helpers, data, original, root) => {
    if (!root) return data

    const { summary, tags, mentionsObj: mentions } = root

    const labels: LPE.Article.ContentBlockLabel[] = []
    const classNames = data.classNames || []

    const isTitle = classNames.includes('title')
    const isSubtitle = classNames.includes('subtitle')

    const isAuthor =
      similarity(data.text, mentions.map((m) => m.name).join('')) > 0.8

    const isSummary = summary === data.text

    const isTag =
      similarity(data.text, tags.map((t) => `#${t}`).join(' ')) > 0.8

    //TODO this is a hack to remove the footnotes from the body
    // we should find a better way to do this
    const isFootnotes = data.html.match(`<a href="#ftnt_ref`)?.length

    isTitle && labels.push(LPE.Article.ContentBlockLabels.Title)
    isSubtitle && labels.push(LPE.Article.ContentBlockLabels.Subtitle)
    isAuthor && labels.push(LPE.Article.ContentBlockLabels.Authors)
    isSummary && labels.push(LPE.Article.ContentBlockLabels.Summary)
    isTag && labels.push(LPE.Article.ContentBlockLabels.Tags)
    isFootnotes && labels.push(LPE.Article.ContentBlockLabels.Footnote)

    return {
      ...data,
      labels: [...data.labels, ...labels],
    }
  },
}
