import { FeaturedPost } from '@/components/FeaturedPost'
import { PostsList } from '@/components/PostList/PostList'
import { Section } from '@/components/Section/Section'
import { useSearchBarContext } from '@/context/searchbar.context'
import { PostListLayout } from '@/types/ui.types'
import { useEffect } from 'react'
import SEO from '../components/SEO/SEO'
import unbodyApi from '../services/unbody/unbody.service'
import { LPE } from '../types/lpe.types'

type Props = {
  posts: LPE.Article.Data[]
  featured: LPE.Article.Data
  error: string | null
  tags: string[]
}

export default function Home({ posts, featured, tags }: Props) {
  const { setTags } = useSearchBarContext()

  useEffect(() => {
    setTags(tags)
  }, [setTags, tags])

  return (
    <>
      <SEO
        description={
          'Logos online publishing and blogging platform for writers and readers.'
        }
        title={'Logos Press Engine'}
      />
      {featured && (
        <Section title={'Featured'}>
          <FeaturedPost post={featured} />
        </Section>
      )}
      <Section title={'Latest posts'}>
        <PostsList posts={posts} layout={PostListLayout.XXXX_XX} />
      </Section>
    </>
  )
}

export const getStaticProps = async () => {
  const {
    data: { featured, posts },
    errors,
  } = await unbodyApi.getHomepagePosts()

  const { data: topics, errors: topicErrors } = await unbodyApi.getTopics()
  await unbodyApi.getPodcastsInfo()

  return {
    props: {
      featured,
      posts,
      errors,
      tags: topics || [],
    },
  }
}
