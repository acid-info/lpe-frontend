import styled from '@emotion/styled'
import React from 'react'
import { useArticleContainerContext } from '@/containers/ArticleContainer.Context'
import { Typography } from '@acid-info/lsd-react'
import styles from './Article.module.css'
import { Collapse } from '../Collapse'
import Link from 'next/link'
import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'

type Props = {
  toc: UnbodyGraphQl.Fragments.TocItem[]
}

export const MobileToc = ({ toc }: Props) => {
  const { tocId } = useArticleContainerContext()

  return toc?.length > 0 ? (
    <Collapse className={styles.mobileToc} label="Contents">
      {toc.map((toc, idx) => (
        <TocItem
          href={`${idx === 0 ? '#' : toc.href}`}
          key={idx}
          active={tocId ? toc.href.substring(1) === tocId : idx === 0}
        >
          <Typography variant="label2" genericFontFamily="sans-serif">
            {toc.title}
          </Typography>
        </TocItem>
      ))}
    </Collapse>
  ) : null
}

const TocItem = styled(Link)<{ active: boolean }>`
  padding: 8px 14px;
  background-color: ${(p) =>
    p.active
      ? 'rgb(var(--lsd-theme-primary))'
      : 'rgb(var(--lsd-theme-secondary))'};

  label {
    text-decoration: none;
    color: ${(p) =>
      p.active
        ? 'rgb(var(--lsd-theme-secondary))'
        : 'rgb(var(--lsd-theme-primary))'};
  }
`
