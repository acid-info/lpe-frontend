import SEO from '../components/SEO/SEO'
import unbodyApi from '../services/unbody/unbody.service'
import { SearchBox } from '@/components/SearchBox'

interface SearchPageProps {
  topics: string[]
  // articles: SearchResultItem<LPE.Article.Data>[]
  // blocks: SearchResultItem<LPE.Article.ContentBlock>[]
}

export default function SearchPage({
  topics: allTopics = [],
}: SearchPageProps) {
  const handleSearch = (query: string, tags: string[], types: string[]) => {
    console.log('searching for', query, tags, types)
  }

  return (
    <div style={{ minHeight: '80vh' }}>
      <SEO
        description={
          'Logos online publishing and blogging platform for writers and readers.'
        }
        title={'Logos Press Engine'}
      />
      <SearchBox tags={allTopics} onSearch={handleSearch} resultsNumber={7} />
    </div>
  )
}

export async function getStaticProps() {
  // const { data: articles = [] } = await unbodyApi.searchArticles()
  // const { data: blocks = [] } = await unbodyApi.searchBlocks()
  const { data: topics, errors: topicErrors } = await unbodyApi.getTopics()

  return {
    props: {
      // articles,
      // blocks: shuffle(blocks),
      topics,
    },
  }
}
