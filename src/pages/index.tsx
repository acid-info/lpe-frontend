import { PostDataProps } from '@/components/Post/Post'
import PostsDemo from '@/components/Post/PostsDemo'
import { SearchContainer } from '@/containers/SearchContainer'
import { useSearchContext } from '@/context/SearchContext'
import { UnbodyGoogleDoc, UnbodyImageBlock } from '@/lib/unbody/unbody.types'
import api from '@/services/unbody.service'
import { ESearchStatus } from '@/types/ui.types'
import { GetStaticProps } from 'next'

type Props = {
  posts: PostDataProps[]
  error: string | null
}

export default function Home({ posts }: Props) {
  const { status } = useSearchContext()

  return (
    <>
      {status === ESearchStatus.NOT_ACTIVE ? (
        <PostsDemo posts={posts} featuredPost={posts[0]} />
      ) : (
        <SearchContainer />
      )}
    </>
  )
}

export const getStaticProps = async () => {
  const { data: posts, errors } = await api.getHomepagePosts()

  return {
    props: {
      posts: posts.map((post) => ({
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
