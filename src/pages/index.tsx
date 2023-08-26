import { CustomNextPage, GetStaticProps } from 'next'
import SEO from '../components/SEO/SEO'
import { HomePage, HomePageProps } from '../containers/HomePage'
import { DefaultLayout } from '../layouts/DefaultLayout'
import unbodyApi from '../services/unbody/unbody.service'

type PageProps = Pick<HomePageProps, 'data'>

const Page: CustomNextPage<PageProps> = (props) => {
  return (
    <>
      <SEO
        description={
          'Logos online publishing and blogging platform for writers and readers.'
        }
        title={'Logos Press Engine'}
      />
      <HomePage data={props.data} />
    </>
  )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <DefaultLayout
      mainProps={{ spacing: false }}
      navbarProps={{ defaultState: { showTitle: false } }}
    >
      {page}
    </DefaultLayout>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const { data: tags = [] } = await unbodyApi.getTopics(true)
  const { data: highlighted } = await unbodyApi.getHighlightedPosts()
  const { data: latest = [] } = await unbodyApi.getRecentPosts({
    skip: 0,
    limit: 15,
  })

  const { data: _shows = [] } = await unbodyApi.getPodcastShows({
    populateEpisodes: true,
    episodesLimit: 10,
  })

  const shows = [..._shows].sort((a, b) => (a.title > b.title ? -1 : 1))

  return {
    props: {
      data: {
        tags,
        shows,
        latest,
        highlighted,
      },
    },
  }
}

export default Page
