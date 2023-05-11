import api from '@/services/unbody.service'

import { PostDataProps } from '@/components/Post/Post'
import { PostsList } from '@/components/PostList/PostList'
import { Section } from '@/components/Section/Section'

import { getArticleCover } from '@/utils/data.utils'
import { FeaturedPost } from '@/components/FeaturedPost'

type Props = {
  posts: PostDataProps[]
  featured: PostDataProps | null
  error: string | null
}

export default function Home({ posts, featured }: Props) {
  return (
    <>
      {featured && (
        <Section title={'Featured'}>
          <FeaturedPost post={featured} />
        </Section>
      )}
      <Section title={'Latest posts'}>
        <PostsList posts={posts} />
      </Section>
    </>
  )
}

export const getStaticProps = async () => {
  const {
    data: { posts, featured },
    errors,
  } = await api.getHomepagePosts()

  return {
    props: {
      featured: featured
        ? {
            remoteId: featured.remoteId,
            date: featured.modifiedAt,
            title: featured.title,
            description: featured.subtitle, // TODO: summary is not available
            author: 'Jinho',
            tags: featured.tags,
            coverImage: getArticleCover(featured.blocks),
          }
        : null,
      posts: posts.map((post) => ({
        remoteId: post.remoteId,
        date: post.modifiedAt,
        title: post.title,
        description: post.subtitle, // TODO: summary is not available
        author: 'Jinho',
        tags: post.tags,
        coverImage: getArticleCover(post.blocks),
      })),
      errors,
    },
  }
}
