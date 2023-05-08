import { Tag, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { useMemo } from 'react'
import { PostProps } from '../Post'
import { PostImageRatio, PostImageRatioOptions, PostSize } from '../Post/Post'
import styles from './Article.module.css'
import { Collapse } from '@/components/Collapse'
import { useArticleContainerContext } from '@/containers/ArticleContainer.Context'
import { moreFromAuthor, references, relatedArticles } from './tempData'
import { ArticleReference } from '../ArticleReference'

export default function Article({
  appearance: { aspectRatio = PostImageRatio.LANDSCAPE } = {},
  data: {
    coverImage = null,
    date: dateStr = '',
    title,
    blocks,
    summary,
    author,
    authorEmail,
    tags = [],
    toc = [],
  },
  ...props
}: PostProps) {
  const articleContainer = useArticleContainerContext()
  const { tocIndex, setTocIndex } = articleContainer

  const date = new Date(dateStr)

  const _thumbnail = useMemo(() => {
    if (!coverImage) return null

    return (
      <ThumbnailContainer aspectRatio={aspectRatio}>
        <Thumbnail fill src={coverImage.url} alt={coverImage.alt} />
      </ThumbnailContainer>
    )
  }, [coverImage])

  // TODO : using typography for the blocks
  const _blocks = useMemo(
    () => <Blocks dangerouslySetInnerHTML={{ __html: blocks ?? '' }} />,
    [blocks],
  )

  const _mobileToc = useMemo(
    () =>
      toc?.length > 0 && (
        <Collapse className={styles.mobileToc} label="Contents">
          {/* @ts-ignore */}
          {toc.map((toc, idx) => (
            <Content
              onClick={() => setTocIndex(idx)}
              active={idx === tocIndex}
              variant="body3"
              key={idx}
            >
              {toc}
            </Content>
          ))}
        </Collapse>
      ),
    [toc, tocIndex],
  )

  const _references = useMemo(
    () =>
      references?.length > 0 && (
        <Collapse label="References">
          {references.map((reference, idx) => (
            <Reference key={idx}>
              <Typography component="span" variant="body3">
                {idx + 1}.
              </Typography>
              <Typography
                component="a"
                variant="body3"
                href={reference.link}
                target="_blank"
              >
                {reference.text}
              </Typography>
            </Reference>
          ))}
        </Collapse>
      ),
    [references],
  )

  const _moreFromAuthor = useMemo(
    () =>
      moreFromAuthor?.length > 0 && (
        <Collapse label="More From The Author">
          {moreFromAuthor.map((article, idx) => (
            <ArticleReference key={idx} data={article} />
          ))}
        </Collapse>
      ),
    [moreFromAuthor],
  )

  const _relatedArticles = useMemo(
    () =>
      relatedArticles?.length > 0 && (
        <Collapse className={styles.relatedArticles} label="Related Articles">
          {relatedArticles.map((article, idx) => (
            <ArticleReference key={idx} data={article} />
          ))}
        </Collapse>
      ),
    [relatedArticles],
  )

  return (
    <ArticleContainer {...props}>
      <div>
        <Row>
          <Typography variant="body3" genericFontFamily="sans-serif">
            10 minutes read
          </Typography>
          <Typography variant="body3">•</Typography>
          <Typography variant="body3" genericFontFamily="sans-serif">
            {date.toLocaleString('en-GB', {
              day: 'numeric',
              month: 'long', // TODO: Should be uppercase
              year: 'numeric',
            })}
          </Typography>
        </Row>
      </div>

      <Title variant={'h1'} genericFontFamily="serif">
        {title}
      </Title>

      {_thumbnail}

      <CustomTypography variant={'body1'} genericFontFamily="sans-serif">
        {summary}
      </CustomTypography>

      {tags.length > 0 && (
        <TagContainer>
          {tags.map((tag) => (
            <Tag size="small" disabled={false} key={tag}>
              {tag}
            </Tag>
          ))}
        </TagContainer>
      )}

      <AuthorInfo>
        <Typography
          variant="body3"
          component="p"
          genericFontFamily="sans-serif"
        >
          {author}
        </Typography>
        <Typography
          href={`mailto:${authorEmail}`}
          variant="body3"
          component="a"
          genericFontFamily="sans-serif"
        >
          {authorEmail}
        </Typography>
      </AuthorInfo>

      {_mobileToc}

      {_blocks}

      {_references}

      <ArticleReferences>
        {_moreFromAuthor}
        {_relatedArticles}
      </ArticleReferences>
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
  padding-bottom: 50px;

  // temporary breakpoint
  @media (max-width: 1024px) {
    margin-inline: 16px;
  }
`

const CustomTypography = styled(Typography)`
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: pre-wrap;
`

const Title = styled(CustomTypography)`
  margin-bottom: 24px;
`

const Blocks = styled.div`
  white-space: pre-wrap;
  margin-top: 24px;
  margin-bottom: 80px;
`

const ThumbnailContainer = styled.div<{
  aspectRatio: PostImageRatio
}>`
  aspect-ratio: ${(p) =>
    p.aspectRatio
      ? PostImageRatioOptions[p.aspectRatio]
      : PostImageRatioOptions[PostImageRatio.PORTRAIT]};
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 458px; // temporary max-height based on the Figma design's max height
`

const Thumbnail = styled(Image)`
  object-fit: cover;
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

const ArticleReferences = styled.div`
  margin-top: 16px;
`

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
`
