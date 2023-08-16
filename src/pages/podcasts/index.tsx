import { SEO } from '@/components/SEO'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { LPE } from '../../types/lpe.types'
import EpisodeLayout from '@/layouts/EpisodeLayout/Episode.layout'

type PodcastsProps = {
  data: LPE.Podcast.Document
  errors: string | null
}

const PodcastShowPage = ({ data, errors }: PodcastsProps) => {
  if (!data) return null
  if (errors) return <div>{errors}</div>

  return (
    <>
      <SEO
        title={data.title}
        description={data.description}
        image={data.coverImage}
        imageUrl={undefined}
        pagePath={`/podcasts`}
        tags={[...data.tags]}
      />
      <div style={{ marginTop: '200px' }}>Podcasts Page WIP</div>
    </>
  )
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  return {
    props: {
      data: { tags: ['Social', 'Political'] },
      error: null,
    },
  }
}

PodcastShowPage.getLayout = function getLayout(page: ReactNode) {
  return <EpisodeLayout>{page}</EpisodeLayout>
}

export default PodcastShowPage
