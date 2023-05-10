import { useState } from 'react'
import { PostContainer } from '../PostContainer'
import { PostDataProps, PostProps } from './Post'

type Props = {
  posts: PostDataProps[]
  featuredPost: PostDataProps | null
}

const PostsDemo = (props: Props) => {
  const [posts, setPosts] = useState<PostDataProps[]>(props.posts)

  return (
    <div style={{ marginBlock: '78px' }}>
      {/* For Demo purposes only. Use inline CSS and styled components temporarily */}
      {/*@TODO @jinho, wht PostContainer should recive an array of postData instead of only One?*/}
      {props.featuredPost && (
        <PostContainer
          title="Featured"
          postsData={[
            {
              data: props.featuredPost,
            },
          ]}
        />
      )}
      {posts.length > 0 ? (
        <PostContainer
          style={{ marginTop: '108px' }}
          title="Latest Posts"
          postsData={posts.map((post) => ({
            appearance: {},
            data: post,
          }))}
        />
      ) : (
        <div style={{ marginTop: '108px', textAlign: 'center' }}>
          <h3>No Posts found!</h3>
        </div>
      )}
    </div>
  )
}

export default PostsDemo
