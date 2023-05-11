import { Quote, Tag, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { useMemo } from 'react'
import { PostImageRatio, PostImageRatioOptions } from '../Post/Post'
import styles from './Article.module.css'
import { Collapse } from '@/components/Collapse'
import { useArticleContainerContext } from '@/containers/ArticleContainer.Context'
import { ArticleReference } from '../ArticleReference'
import {
  GoogleDocEnhanced,
  UnbodyGoogleDoc,
  UnbodyImageBlock,
  UnbodyTextBlock,
  UnbodyTocItem,
} from '@/lib/unbody/unbody.types'
import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'

import { RenderArticleBlock } from './Article.Block'
import { ArticleImageBlockWrapper } from './Article.ImageBlockWrapper'
import { getArticleCover, getBodyBlocks } from '@/utils/data.utils'
import { ArticlePostData } from '@/types/data.types'

interface Props {
  data: ArticlePostData
}

//@jinho
//TODO please move everything to a separate file
const ArticleTags = ({ tags }: { tags: string[] }) =>
  tags.length > 0 ? (
    <TagContainer>
      {tags.map((tag) => (
        <Tag size="small" disabled={false} key={tag}>
          {tag}
        </Tag>
      ))}
    </TagContainer>
  ) : null

const ArticleAuthor = ({
  mention,
}: {
  mention: UnbodyGraphQl.Fragments.MentionItem
}) => (
  <AuthorInfo key={mention.name}>
    <Typography variant="body3" component="p" genericFontFamily="sans-serif">
      {mention.name}
    </Typography>
    <Typography
      href={`mailto:${mention.emailAddress}`}
      variant="body3"
      component="a"
      genericFontFamily="sans-serif"
    >
      {mention.emailAddress}
    </Typography>
  </AuthorInfo>
)

const ArticleAuthors = ({
  mentions,
}: {
  mentions: UnbodyGraphQl.Fragments.MentionItem[]
}) =>
  mentions.length > 0 ? (
    <div>
      {mentions.map((mention) => (
        <ArticleAuthor key={mention.name} mention={mention} />
      ))}
    </div>
  ) : null

const ArticleStats = ({
  dateStr,
  readingLength,
}: {
  dateStr: string
  readingLength: number
}) => (
  <div>
    <Row>
      <Typography variant="body3" genericFontFamily="sans-serif">
        {readingLength} minutes read
      </Typography>
      <Typography variant="body3">•</Typography>
      <Typography variant="body3" genericFontFamily="sans-serif">
        {new Date(dateStr).toLocaleString('en-GB', {
          day: 'numeric',
          month: 'long', // TODO: Should be uppercase
          year: 'numeric',
        })}
      </Typography>
    </Row>
  </div>
)

const ArticleSummary = ({ summary }: { summary: string }) => (
  //TODO for ihor to work out the design for this
  <ArticleSummaryContainer>
    <Quote>{summary}</Quote>
  </ArticleSummaryContainer>
)

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

const ArticleFootenotes = ({
  footnotes,
}: {
  footnotes: UnbodyGraphQl.Fragments.FootnoteItem[]
}) =>
  footnotes.length > 0 ? (
    <Collapse label="Footenotes">
      {footnotes.map((footnote, idx) => (
        <Reference key={idx}>
          <Typography
            component="a"
            variant="body3"
            href={`#${footnote.refId}`}
            target="_blank"
            id={footnote.id.replace('#', '')}
          >
            {footnote.refValue}
          </Typography>
          <p dangerouslySetInnerHTML={{ __html: footnote.valueHTML }} />
        </Reference>
      ))}
    </Collapse>
  ) : null

const RelatedArticles = ({ data }: { data: GoogleDocEnhanced[] }) =>
  data.length > 0 ? (
    <Collapse label="Related Articles">
      {data.map((article, idx) => (
        <ArticleReference key={idx} data={article} />
      ))}
    </Collapse>
  ) : null

const FromSameAuthorsArticles = ({ data }: { data: GoogleDocEnhanced[] }) =>
  data.length > 0 ? (
    <Collapse label="From same authors">
      {data.map((article, idx) => (
        <ArticleReference key={idx} data={article} />
      ))}
    </Collapse>
  ) : null

const ArticleFooter = ({ data }: { data: ArticlePostData }) => {
  const { article, relatedArticles, articlesFromSameAuthors } = data

  const footnotes = useMemo(() => {
    return (
      article.blocks
        // @ts-ignore
        .flatMap((b) =>
          b.__typename === UnbodyGraphQl.UnbodyDocumentTypeNames.TextBlock
            ? b.footnotes
            : [],
        )
    )
  }, [article])

  return (
    <ArticleFooterContainer>
      <ArticleFootenotes
        footnotes={footnotes as Array<UnbodyGraphQl.Fragments.FootnoteItem>}
      />
      <RelatedArticles data={relatedArticles} />
      <FromSameAuthorsArticles data={articlesFromSameAuthors} />
    </ArticleFooterContainer>
  )
}

const CustomTypography = styled(Typography)`
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: pre-wrap;
`

const ArticleTitle = styled(CustomTypography)`
  //margin-bottom: 24px;
`

const ArticleSubtitle = styled(CustomTypography)``

const ArticleSummaryContainer = styled('div')`
  padding-left: 40px;
`

export default function ArticleBody({ data }: Props) {
  const { title, summary, subtitle, blocks, toc, createdAt, tags, mentions } =
    data.article
  const articleContainer = useArticleContainerContext()
  const { tocIndex, setTocIndex } = articleContainer

  const _blocks = useMemo(() => {
    return getBodyBlocks(data.article).map((block, idx) => (
      <RenderArticleBlock key={'block-' + idx} block={block} />
    ))
  }, [data.article])

  console.log(data)

  //TODO
  //@Jinho please move everything (starts with _ ) to a separate file and import it here
  const _mobileToc = useMemo(
    () =>
      toc?.length > 0 && (
        <Collapse className={styles.mobileToc} label="Contents">
          {toc.map((toc, idx) => (
            <Content
              onClick={() => setTocIndex(idx)}
              active={idx === tocIndex}
              variant="body3"
              key={idx}
            >
              {toc.title}
            </Content>
          ))}
        </Collapse>
      ),
    [toc, tocIndex],
  )

  return (
    <ArticleContainer>
      <ArticleHeader {...data.article} />
      {_mobileToc}
      <TextContainer>{_blocks}</TextContainer>
      <ArticleFooter data={data} />
    </ArticleContainer>
  )
}

const ArticleContainer = styled.article`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 16px;
  max-width: 700px;
  margin-inline: 5%;
  padding-bottom: 80px;

  // temporary breakpoint
  @media (max-width: 1024px) {
    margin-inline: 16px;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
  margin-bottom: 80px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`
const TagContainer = styled.div`
  display: flex;
  gap: 8px;
`

const Content = styled(CustomTypography)<{ active: boolean }>`
  padding: 8px 14px;
  background-color: ${(p) =>
    p.active
      ? 'rgb(var(--lsd-theme-primary))'
      : 'rgb(var(--lsd-theme-secondary))'};
  color: ${(p) =>
    p.active
      ? 'rgb(var(--lsd-theme-secondary))'
      : 'rgb(var(--lsd-theme-primary))'};
`

const Reference = styled.div`
  display: flex;
  padding: 8px 14px;
  gap: 8px;
`

const ArticleFooterContainer = styled.div`
  margin-top: 16px;
`

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
`
