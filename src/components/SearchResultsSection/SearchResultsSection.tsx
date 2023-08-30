import { Section } from '@/components/Section/Section'
import { Typography } from '@acid-info/lsd-react'
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  resultSize: number
  loading: boolean
  title: string
}>

export const SearchResultsSection = ({
  resultSize,
  loading,
  title,
  children,
}: Props) => (
  <Section
    title={title}
    subtitle={
      loading ? (
        <Typography genericFontFamily="sans-serif" variant="body2">
          Loading...
        </Typography>
      ) : (
        <>
          <Typography genericFontFamily="sans-serif" variant="body2">
            {resultSize} matches
          </Typography>
        </>
      )
    }
  >
    {children}
  </Section>
)
