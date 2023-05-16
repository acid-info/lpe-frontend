import { GoogleDocEnhanced } from '@/lib/unbody/unbody.types'
import { getArticleCover } from '@/utils/data.utils'
import React, { useMemo } from 'react'
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
  summary,
  subtitle,
  mentions,
  tags,
  modifiedAt,
  blocks,
}: GoogleDocEnhanced) => {
  const { setTocId } = useArticleContainerContext()
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
    <ArticleHeaderContainer>
      <ArticleStats dateStr={modifiedAt} readingLength={readingTime} />
      <ArticleTitle
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
      <Tags tags={tags} className={'articleTags'} />
      <AuthorsContainer>
        <Authors mentions={mentions} email={true} gap={12} />
      </AuthorsContainer>
      {/*<MobileCollapseContainer>*/}
      {/*  {resultsNumber === null && <MobileToc toc={toc} />}*/}
      {/*  {resultsNumber === null && <MobileSummary summary={summary} />}*/}
      {/*</MobileCollapseContainer>*/}
      <ArticleSummary
        summary={summary}
        className={'mobileSummary'}
        showLabel={false}
      />
      {_thumbnail}
      <ArticleSummary
        summary={summary}
        className={'desktopSummary'}
        showLabel={true}
      />
    </ArticleHeaderContainer>
  )
}

const ArticleHeaderContainer = styled.header`
  .mobileSummary {
    display: none;
  }

  .desktopSummary {
    display: block;
  }

  @media (max-width: 768px) {
    .mobileSummary {
      display: block;
      p {
        font-size: var(--lsd-body3-fontSize);
        line-height: var(--lsd-body3-lineHeight);
        margin-bottom: 24px;
      }
      hr {
        display: none;
      }
    }

    .desktopSummary {
      display: none;
    }

    .articleTags {
      display: none;
    }
  }
`

const CustomTypography = styled(Typography)`
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: pre-wrap;
`

const ArticleTitle = styled(ArticleHeading)`
  margin-bottom: 16px;
  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`

const ArticleSubtitle = styled(CustomTypography)`
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: var(--lsd-subtitle1-fontSize);
  }
`

const AuthorsContainer = styled.div`
  //margin-block: 24px;
  margin-top: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-top: 16px;
    margin-bottom: 24px;

    a[href^='mailto:'] {
      display: none;
    }
  }
`

export default ArticleHeader
