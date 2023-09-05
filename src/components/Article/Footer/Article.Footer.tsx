import styled from '@emotion/styled'
import { useMemo } from 'react'
import { LPE } from '../../../types/lpe.types'
import { lsdUtils } from '../../../utils/lsd.utils'
import ArticleFootnotes from './Article.Footnotes'
import FromSameAuthorsArticles from './Article.FromSameAuthorsArticles'
import ArticleRelatedArticles from './Article.RelatedArticles'

const ArticleFooter = ({ data: post }: { data: LPE.Article.Document }) => {
  const { data, relatedArticles, articlesFromSameAuthors } = post

  const footnotes = useMemo(() => {
    return data.content.flatMap((b) =>
      // @ts-ignore
      b.type === 'text' ? b.footnotes : [],
    )
  }, [data])

  return (
    <ArticleFooterContainer>
      <ArticleFootnotes footnotes={footnotes} />
      <ArticleRelatedArticles data={relatedArticles} />
      <FromSameAuthorsArticles data={articlesFromSameAuthors} />
    </ArticleFooterContainer>
  )
}

const ArticleFooterContainer = styled.div`
  margin-top: 16px;

  & > div:not(:first-child) > div > button,
  & > div:not(:first-child) > div {
    border-top: none;
  }

  ${(props) => lsdUtils.breakpoint(props.theme, 'xs', 'down')} {
    margin-top: 72px;
  }
`
export default ArticleFooter
