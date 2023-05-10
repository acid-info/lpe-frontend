import { PostDataProps } from '@/components/Post/Post'
import PostsDemo from '@/components/Post/PostsDemo'
import { UnbodyGoogleDoc, UnbodyImageBlock } from '@/lib/unbody/unbody.types'
import api from '@/services/unbody.service'
import { ESearchStatus } from '@/types/ui.types'
import { GetStaticProps } from 'next'

type Props = {
  posts: PostDataProps[]
  featured: PostDataProps | null
  error: string | null
}

export default function Home({ posts, featured }: Props) {
  return (
    <>
      <PostsDemo posts={posts} featuredPost={featured} />
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
            description: featured.summary,
            author: 'Jinho',
            tags: featured.tags,
            ...(featured.blocks && featured.blocks!.length > 0
              ? { coverImage: featured.blocks![0] as UnbodyImageBlock }
              : {}),
          }
        : null,
      posts: posts.map((post) => ({
        remoteId: post.remoteId,
        date: post.modifiedAt,
        title: post.title,
        description: post.summary,
        author: 'Jinho',
        tags: post.tags,
        ...(post.blocks && post.blocks!.length > 0
          ? { coverImage: post.blocks![0] as UnbodyImageBlock }
          : {}),
      })),
      errors,
    },
  }
}
