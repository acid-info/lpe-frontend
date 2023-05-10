import api from '@/services/unbody.service'

import Post, { PostDataProps } from '@/components/Post/Post'
import { PostsList } from '@/components/PostList/PostList'
import { Section } from '@/components/Section/Section'
import { UnbodyGoogleDoc, UnbodyImageBlock } from '@/lib/unbody/unbody.types'

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
      {/* For Demo purposes only. Use inline CSS and styled components temporarily */}
      {/*@TODO @jinho, wht PostContainer should recive an array of postData instead of only One?*/}
      {featured && (
        <Section title={'Featured'}>
          <Post data={featured} />
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
