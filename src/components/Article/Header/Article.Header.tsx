import { GoogleDocEnhanced } from '@/lib/unbody/unbody.types'
import { getArticleCover } from '@/utils/data.utils'
import { useMemo } from 'react'
import { ArticleImageBlockWrapper } from '../Article.ImageBlockWrapper'
import { PostImageRatio } from '../../Post/Post'
import ArticleStats from '../Article.Stats'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import ArticleSummary from './Article.Summary'
import { calcReadingTime } from '@/utils/string.utils'
import { Authors } from '@/components/Authors'
import { Tags } from '@/components/Tags'
import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'
import { ArticleHeading } from '@/components/Article/Article.Heading'
import { useArticleContainerContext } from '@/containers/ArticleContainer.Context'
import { useIntersectionObserver } from '@/utils/ui.utils'

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
  const { setTocId, tocId } = useArticleContainerContext()
  const headingElementsRef = useIntersectionObserver(setTocId)

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

  const readingTime = useMemo(() => {
    return calcReadingTime(
      blocks
        .map((block) => {
          if (
            block.__typename === UnbodyGraphQl.UnbodyDocumentTypeNames.TextBlock
          ) {
            return block.text
          }
          return ''
        })
        .join(' '),
    )
  }, [blocks])

  return (
    <header>
      <ArticleStats dateStr={modifiedAt} readingLength={readingTime} />
      <ArticleHeading
        block={blocks[0] as any}
        typographyProps={{
          variant: 'h1',
          genericFontFamily: 'serif',
          component: 'h1',
        }}
        headingElementsRef={headingElementsRef}
      />
      {subtitle && (
        <ArticleSubtitle
          variant="body1"
          genericFontFamily="sans-serif"
          component="div"
        >
          {subtitle}
        </ArticleSubtitle>
      )}
      <Tags tags={tags} />
      <AuthorsContainer>
        <Authors mentions={mentions} email={true} />
      </AuthorsContainer>
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

const ArticleSubtitle = styled(CustomTypography)`
  margin-bottom: 16px;
`

const AuthorsContainer = styled.div`
  margin-block: 24px;
`

export default ArticleHeader
