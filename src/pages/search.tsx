import { useSearchGeneric } from '@/hooks/useSearch'
import {
  UnbodyGoogleDoc,
  UnbodyImageBlock,
  UnbodyTextBlock,
} from '@/lib/unbody/unbody.types'
import { UnbodyGraphQl } from '@/lib/unbody/unbody-content.types'

import Image from 'next/image'

import unbodyApi from '@/services/unbody.service'
import {
  PostTypes,
  SearchHook,
  SearchHookDataPayload,
  SearchResultItem,
  SearchResults,
} from '@/types/data.types'
import {
  createMinimizedSearchText,
  extractQueryFromQuery,
  extractTopicsFromQuery,
} from '@/utils/search.utils'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { SearchLayout } from '@/layouts/SearchLayout'
import { Section } from '@/components/Section/Section'
import { PostsList } from '@/components/PostList/PostList'
import { getArticleCover } from '@/utils/data.utils'

interface SearchPageProps {
  articles: SearchResultItem<UnbodyGoogleDoc>[]
  blocks: SearchResultItem<UnbodyTextBlock | UnbodyImageBlock>[]
}

export default function SearchPage({
  articles: initialArticles = [],
  blocks: initialBlocks = [],
}: SearchPageProps) {
  const router = useRouter()
  const hasUpdated = useRef(false)
  const [mounted, setMounted] = useState(false)

  const {
    query: { query = '', topics = [] },
  } = router

  const articles = useSearchGeneric<UnbodyGoogleDoc>(
    initialArticles,
    PostTypes.Article,
  )

  const blocks = useSearchGeneric<UnbodyTextBlock | UnbodyImageBlock>(
    initialBlocks,
    PostTypes.Block,
  )

  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      if (query.length > 0 || topics.length > 0) {
        const serchArgs = [
          extractQueryFromQuery(router.query),
          extractTopicsFromQuery(router.query),
        ]
        articles.search(...(serchArgs as [string, string[]]))
        blocks.search(...(serchArgs as [string, string[]]))
      } else {
        articles.reset(initialArticles)
        blocks.reset(initialBlocks)
      }
    } else {
      hasUpdated.current = true
    }
  }, [mounted, router.query])

  return (
    <div>
      {articles.data?.length && (
        <Section title={'Related Articles'} matches={articles.data?.length}>
          <PostsList
            posts={articles.data.map((article) => ({
              remoteId: article.doc.remoteId,
              date: article.doc.modifiedAt,
              title: article.doc.title,
              description: article.doc.subtitle, // TODO: summary is not available
              author: 'Jinho',
              tags: article.doc.tags,
              coverImage: getArticleCover(article.doc.blocks),
            }))}
          />
        </Section>
      )}

      <section>
        <strong>Related content blocks</strong>
        <hr />
        <div>
          {blocks.loading && <div>...</div>}
          {!blocks.error && blocks.data && blocks.data.length > 0 ? (
            blocks.data.map(
              (block: SearchResultItem<UnbodyImageBlock | UnbodyTextBlock>) => {
                if (!block.doc.document || !block.doc.document[0]) return null

                let refArticle = null
                if (UnbodyGraphQl.UnbodyDocumentTypeNames.GoogleDoc) {
                  refArticle = block.doc.document[0]
                }

                switch (block.doc.__typename) {
                  case UnbodyGraphQl.UnbodyDocumentTypeNames.TextBlock:
                    return (
                      <div key={block.doc.remoteId}>
                        {refArticle && (
                          <h3>
                            <Link href={`/articles/${refArticle.remoteId}`}>
                              {refArticle.title}
                            </Link>
                          </h3>
                        )}
                        {
                          <p
                            dangerouslySetInnerHTML={{ __html: block.doc.html }}
                          />
                        }
                      </div>
                    )
                  case UnbodyGraphQl.UnbodyDocumentTypeNames.ImageBlock: {
                    return (
                      <div key={block.doc.remoteId}>
                        {refArticle && (
                          <h3>
                            <Link href={`/articles/${refArticle.remoteId}`}>
                              {refArticle.title}
                            </Link>
                          </h3>
                        )}
                        <Image
                          title={block.doc.alt}
                          src={block.doc.url}
                          width={block.doc.width}
                          height={block.doc.height}
                          alt={block.doc.alt}
                        />
                      </div>
                    )
                  }
                }
              },
            )
          ) : (
            <div>Nothing found</div>
          )}
        </div>
      </section>
    </div>
  )
}

SearchPage.getLayout = function getLayout(page: ReactNode) {
  return <SearchLayout>{page}</SearchLayout>
}

export async function getStaticProps() {
  const { data: articles = [] } = await unbodyApi.searchArticles()
  const { data: blocks = [] } = await unbodyApi.serachBlocks()

  return {
    props: {
      articles,
      blocks,
    },
  }
}
