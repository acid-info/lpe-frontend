import styled from '@emotion/styled'
import React from 'react'
import { useArticleContainerContext } from '@/containers/ArticleContainer.Context'
import { Typography } from '@acid-info/lsd-react'
import styles from './Article.module.css'
import { GoogleDocEnhanced } from '@/lib/unbody/unbody.types'
import { Collapse } from '../Collapse'

type Props = {
  toc: Array<Partial<GoogleDocEnhanced>>
}

export const MobileToc = ({ toc }: Props) => {
  const { tocIndex, setTocIndex } = useArticleContainerContext()

  return toc?.length > 0 ? (
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
  ) : null
}

const CustomTypography = styled(Typography)`
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: pre-wrap;
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
