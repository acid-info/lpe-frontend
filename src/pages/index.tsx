import { CustomNextPage, GetStaticProps } from 'next'
import SEO from '../components/SEO/SEO'
import { HomePage, HomePageProps } from '../containers/HomePage'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { strapiApi } from '../services/strapi'

type PageProps = Pick<HomePageProps, 'data'>

const Page: CustomNextPage<PageProps> = (props) => {
  return (
    <>
      <SEO />
      <HomePage data={props.data} />
    </>
  )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <DefaultLayout
      mainProps={{ spacing: false, contentPadding: false }}
      navbarProps={{ defaultState: { showTitle: false } }}
    >
      {page}
    </DefaultLayout>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const { data: latest } = await strapiApi.getRecentPosts({
    highlighted: 'exclude',
    limit: 15,
  })

  const { data: highlighted } = await strapiApi.getHighlightedPosts()
  const { data: _shows = [] } = await strapiApi.getPodcastShows({
    populateEpisodes: true,
    episodesLimit: 10,
  })

  const shows = [...(_shows ?? [])].sort((a, b) => (a.title > b.title ? -1 : 1))

  const { data: tags = [] } = await strapiApi.getTopics()

  return {
    props: {
      data: {
        tags,
        shows,
        latest: {
          data: latest?.data || [],
          hasMore: latest?.hasMore,
        },
        highlighted,
      },
    },
    revalidate: 10,
  }
}

export default Page
