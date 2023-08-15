import { SEO } from '@/components/SEO'
import EpisodeContainer from '@/containers/EpisodeContainer'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { LPE } from '../../types/lpe.types'
import EpisodeLayout from '@/layouts/EpisodeLayout/Episode.layout'
import { EpisodeProvider } from '@/context/episode.context'

import TEMP_DATA from './episode-temp-data.json'

type EpisodeProps = {
  data: LPE.Podcast.Document
  errors: string | null
}

const EpisodePage = ({ data, errors }: EpisodeProps) => {
  const {
    query: { slug },
  } = useRouter()

  if (!data) return null
  if (errors) return <div>{errors}</div>

  return (
    <>
      <SEO
        title={data.title}
        description={data.description}
        image={data.coverImage}
        imageUrl={undefined}
        pagePath={`/episode/${slug}`}
        tags={[...data.tags, ...data.authors.map((author) => author.name)]}
      />
      <EpisodeContainer data={data} />
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: `test` } }],
    fallback: true,
  }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { slug } = params!

  if (!slug) {
    return {
      notFound: true,
      props: { why: 'no slug' },
    }
  }

  const { data, errors } = TEMP_DATA

  if (!data) {
    return {
      notFound: true,
      props: { why: 'no article' },
    }
  }

  return {
    props: {
      data: data,
      error: JSON.stringify(errors),
    },
  }
}

EpisodePage.getLayout = function getLayout(page: ReactNode) {
  return (
    <EpisodeProvider>
      <EpisodeLayout>{page}</EpisodeLayout>
    </EpisodeProvider>
  )
}

export default EpisodePage
