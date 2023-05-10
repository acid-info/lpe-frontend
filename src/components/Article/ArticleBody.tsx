import { Tag, Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { useMemo } from 'react'
import { PostImageRatio, PostImageRatioOptions } from '../Post/Post'
import styles from './Article.module.css'
import { Collapse } from '@/components/Collapse'
import { useArticleContainerContext } from '@/containers/ArticleContainer.Context'
import { moreFromAuthor, references, relatedArticles } from './tempData'
import { ArticleReference } from '../ArticleReference'
import {
  UnbodyGoogleDoc,
  UnbodyImageBlock,
  UnbodyTextBlock,
} from '@/lib/unbody/unbody.types'
import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'

import { RenderArticleBlock } from './Article.Block'
import { ArticleImageBlockWrapper } from './Article.ImageBlockWrapper'
import { getArticleCover, getContentBlocks } from '@/utils/data.utils'

interface Props {
  data: UnbodyGoogleDoc
}

export default function ArticleBody({ data }: Props) {
  const { title, summary, blocks, toc, createdAt, tags } = data
  const articleContainer = useArticleContainerContext()
  const { tocIndex, setTocIndex } = articleContainer

  // temporary data - unbody doesn't provide
  const author = 'John Doe'
  const authorEmail = 'john@acid.info'

  const date = new Date(createdAt)

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

  const _blocks = useMemo(() => {
    return getContentBlocks(blocks).map((block, idx) => (
      <RenderArticleBlock key={'block-' + idx} block={block} />
    ))
  }, [blocks])

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
    <ArticleContainer>
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

      <Title
        /*
                // @ts-ignore */
        id={toc[0].href.substring(1)}
        variant={'h1'}
        genericFontFamily="serif"
      >
        {title}
      </Title>

      {_thumbnail}

      {/* subtitle returns "" so using summary instead  */}
      <Summary variant={'body1'} genericFontFamily="sans-serif">
        {summary}
      </Summary>

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

      <TextContainer>{_blocks}</TextContainer>

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
  padding-bottom: 80px;

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

const Summary = styled(CustomTypography)`
  margin-top: 24px;
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

const ArticleReferences = styled.div`
  margin-top: 16px;
`

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
`
