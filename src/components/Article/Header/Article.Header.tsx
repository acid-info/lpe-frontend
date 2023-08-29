import { ArticleHeading } from '@/components/Article/Article.Heading'
import { Authors } from '@/components/Authors'
import { TagsAndSocial } from '@/components/TagsAndSocial'
import { useArticleContainerContext } from '@/containers/ArticleContainer.Context'
import { useIntersectionObserver } from '@/utils/ui.utils'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import { ArticleBlocksOrders } from '../../../configs/data.configs'
import { LPE } from '../../../types/lpe.types'
import { ArticleImageBlockWrapper } from '../Article.ImageBlockWrapper'
import ArticleStats from '../Article.Stats'
import ArticleSummary from './Article.Summary'

export type ArticleHeaderProps = LPE.Article.Data

const ArticleHeader = ({
  summary,
  subtitle,
  authors,
  coverImage,
  tags,
  modifiedAt,
  readingTime,
  content,
}: ArticleHeaderProps) => {
  const { setTocId } = useArticleContainerContext()
  const headingElementsRef = useIntersectionObserver(setTocId)

  return (
    <ArticleHeaderContainer>
      <ArticleStats
        date={modifiedAt ? new Date(modifiedAt) : null}
        readingLength={readingTime}
      />
      <ArticleTitle
        block={
          content.find((block) =>
            block.labels.includes(LPE.Article.ContentBlockLabels.Title),
          ) as LPE.Article.TextBlock
        }
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
          component="p"
        >
          {subtitle}
        </ArticleSubtitle>
      )}
      <TagsAndSocial tags={tags} className={'articleTags'} />
      <AuthorsContainer>
        <Authors authors={authors} email={true} gap={12} />
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
      {coverImage && (
        <ArticleImageBlockWrapper
          image={coverImage}
          order={ArticleBlocksOrders.cover}
        />
      )}
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
