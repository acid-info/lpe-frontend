import { GetStaticPropsContext } from 'next'
import { ArticleLayout } from '@/layouts/ArticleLayout'
import { ReactNode } from 'react'
import ArticleContainer from '@/containers/ArticleContainer'
import { UnbodyGoogleDoc, UnbodyImageBlock } from '@/lib/unbody/unbody.types'
import { getArticlePost } from '@/services/unbody.service'
import { PostDataProps } from '@/components/Post/Post'

export type ArticleProps = {
  post: PostDataProps
  error: string | null
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const slug = params?.slug
  console.log('slug', slug) // TODO : fetch data based on slug
  let post: Partial<UnbodyGoogleDoc> = {}
  let error = null

  try {
    const posts = await getArticlePost()
    post = posts[0]
  } catch (e) {
    error = JSON.stringify(e)
  }

  return {
    props: {
      post: {
        date: post.modifiedAt,
        title: post.title,
        summary: post.summary,
        text: post.text,
        author: 'Jinho',
        tags: post.tags,
        toc: [
          'The dangers of totalitarian surveillance',
          'Orwellian Future',
          'Privacy-enhancing technology and its benefits',
          'Ethical considerations of privacy-enhancing technology',
        ],
        ...(post.blocks && post.blocks!.length > 0
          ? { coverImage: post.blocks![0] as UnbodyImageBlock }
          : {}),
      },
      error,
    },
  }
}

const ArticlePage = (props: ArticleProps) => {
  return <ArticleContainer post={props.post} error={props.error} />
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'sth' } }],
    fallback: true,
  }
}

ArticlePage.getLayout = function getLayout(page: ReactNode) {
  return <ArticleLayout>{page}</ArticleLayout>
}

export default ArticlePage
