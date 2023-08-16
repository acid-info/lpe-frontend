import { SEO } from '@/components/SEO'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { LPE } from '../../../types/lpe.types'
import PodcastsLayout from '@/layouts/PodcastsLayout/Podcasts.layout'

type PodcastShowProps = {
  data: LPE.Podcast.Document
  errors: string | null
}

const PodcastShowPage = ({ data, errors }: PodcastShowProps) => {
  const {
    query: { showSlug },
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
        pagePath={`/podcasts/${showSlug}`}
        tags={[...data?.tags]}
      />
      <div style={{ marginTop: '200px' }}>Single Podcasts Page WIP</div>
    </>
  )
}

export async function getStaticPaths() {
  // TODO : dynamic paths
  return {
    paths: [{ params: { showSlug: `hashing-it-out` } }],
    fallback: true,
  }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { showSlug } = params!

  if (!showSlug) {
    return {
      notFound: true,
      props: { why: 'no slug' },
    }
  }

  return {
    props: {
      data: { tags: ['Social', 'Political'] },
      error: null,
    },
  }
}

PodcastShowPage.getLayout = function getLayout(page: ReactNode) {
  return <PodcastsLayout>{page}</PodcastsLayout>
}

export default PodcastShowPage
