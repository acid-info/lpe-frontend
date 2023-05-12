import { GoogleDocEnhanced } from '@/lib/unbody/unbody.types'
import { getArticleCover } from '@/utils/data.utils'
import { useMemo } from 'react'
import { ArticleImageBlockWrapper } from '../Article.ImageBlockWrapper'
import { PostImageRatio } from '../../Post/Post'
import ArticleStats from '../Article.Stats'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import ArticleTags from './Article.Tags'
import ArticleAuthors from './Article.Authors'
import ArticleSummary from './Article.Summary'

const ArticleHeader = ({
  title,
  toc,
  summary,
  subtitle,
  mentions,
  tags,
  modifiedAt,
  blocks,
}: GoogleDocEnhanced) => {
  const date = new Date(modifiedAt)

  const _thumbnail = useMemo(() => {
    const coverImage = getArticleCover(blocks)
    if (!coverImage) return null
    return (
      <ArticleImageBlockWrapper
        ratio={PostImageRatio.LANDSCAPE}
        image={coverImage}
      />
    )
  }, [blocks])

  return (
    <header>
      <ArticleStats dateStr={modifiedAt} readingLength={3} />
      <ArticleTitle
        id={toc[0].href.substring(1)}
        variant={'h1'}
        genericFontFamily="serif"
      >
        {title}
      </ArticleTitle>
      {subtitle && <ArticleSubtitle>{subtitle}</ArticleSubtitle>}
      <ArticleTags tags={tags} />
      <ArticleAuthors mentions={mentions} />
      {_thumbnail}
      <ArticleSummary summary={summary} />
    </header>
  )
}

const CustomTypography = styled(Typography)`
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: pre-wrap;
`

const ArticleTitle = styled(CustomTypography)`
  margin-bottom: 24px;
`

const ArticleSubtitle = styled(CustomTypography)``

export default ArticleHeader
