import { ArticlePostData } from '@/types/data.types'
import { useMemo } from 'react'
import ArticleFootnotes from './Article.Footnotes'
import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'
import styled from '@emotion/styled'
import FromSameAuthorsArticles from './Article.FromSameAuthorsArticles'
import ArticleRelatedArticles from './Article.RelatedArticles'

const ArticleFooter = ({ data }: { data: ArticlePostData }) => {
  const { article, relatedArticles, articlesFromSameAuthors } = data

  const footnotes = useMemo(() => {
    return article.blocks.flatMap((b) =>
      // @ts-ignore
      b.__typename === UnbodyGraphQl.UnbodyDocumentTypeNames.TextBlock
        ? b.footnotes
        : [],
    )
  }, [article])

  return (
    <ArticleFooterContainer>
      <ArticleFootnotes
        footnotes={footnotes as Array<UnbodyGraphQl.Fragments.FootnoteItem>}
      />
      <ArticleRelatedArticles data={relatedArticles} />
      <FromSameAuthorsArticles data={articlesFromSameAuthors} />
    </ArticleFooterContainer>
  )
}

const ArticleFooterContainer = styled.div`
  margin-top: 16px;
  & > div:not(:first-child) > div > button {
    border-top: none;
  }
`

export default ArticleFooter
