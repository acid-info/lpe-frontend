import { useArticleContainerContext } from '@/containers/ArticleContainer.Context'
import { Typography } from '@acid-info/lsd-react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { LPE } from '../../types/lpe.types'
import { Collapse } from '../Collapse'
import styles from './Article.module.css'

type Props = {
  toc: LPE.Article.TocItem[]
}

export const MobileToc = ({ toc }: Props) => {
  const { tocId } = useArticleContainerContext()

  return toc?.length > 0 ? (
    <Collapse className={styles.mobileToc} label="Contents" initOpen={false}>
      {toc.map((toc, idx) => (
        <TocItem
          href={`${idx === 0 ? '#' : toc.href}`}
          key={idx}
          active={tocId ? toc.href.substring(1) === tocId : idx === 0}
        >
          <CustomTypography variant="label2" genericFontFamily="sans-serif">
            {(tocId ? toc.href.substring(1) === tocId : idx === 0)
              ? `☞ ${toc.title} ☜`
              : toc.title}
          </CustomTypography>
        </TocItem>
      ))}
    </Collapse>
  ) : null
}

const CustomTypography = styled(Typography)`
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: pre-wrap;
`

const TocItem = styled(Link)<{ active: boolean }>`
  padding: 8px 14px;
  text-decoration: none;

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
