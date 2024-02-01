import { RenderArticleBlock } from '@/components/Article/Article.Block'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import React from 'react'
import { LPE } from '../../types/lpe.types'

export type StaticPageProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  data: {
    page: LPE.StaticPage.Document
  }
}

export const StaticPage: React.FC<StaticPageProps> = ({
  data,
  data: { page },
  ...props
}) => {
  return (
    <Root {...props}>
      <article>
        <Typography variant={'h1'} genericFontFamily={'serif'}>
          {page.title}
        </Typography>
        {data.page.content.map((block, idx) => (
          <RenderArticleBlock block={block} activeId={null} key={idx} />
        ))}
      </article>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  justify-content: center;
  #p-2 {
    font-size: var(--lsd-body1-fontSize) !important;
    line-height: var(--lsd-body1-lineHeight) !important;
  }
  article {
    width: 700px;
    > * {
      margin-bottom: 1rem;
    }
  }

  .title {
    display: none;
  }
`
