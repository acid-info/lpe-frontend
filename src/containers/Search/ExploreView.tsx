import styled from '@emotion/styled'
import { LPE } from '@/types/lpe.types'
import { Grid, GridItem } from '@/components/Grid/Grid'
import { useMemo } from 'react'
import { PostCard } from '@/components/PostCard'
import { ImageBlock, TextBlock } from '@/components/ContentBlock'

interface Props {
  posts: LPE.Search.ResultItemBase<LPE.Post.Document>[]
  blocks: LPE.Search.ResultItemBase<LPE.Post.ContentBlock>[]
  shows: LPE.Podcast.Show[]
}

export const SearchResultsExploreView = (props: Props) => {
  const { posts, shows, blocks } = props
  const results = useMemo(() => {
    return [...posts, ...blocks.slice(0, 30)].sort((a, b) => {
      return b.score - a.score
    })
  }, [posts, blocks])
  return (
    <Container cols={12}>
      {results.map((result, index) => {
        return (
          <ResultItem
            key={index}
            className={result.type === LPE.ContentTypes.Image ? 'w-2' : 'w-4'}
          >
            {(() => {
              switch (result.type) {
                case LPE.ContentTypes.Article:
                case LPE.ContentTypes.Podcast:
                  return (
                    <PostCard
                      data={PostCard.toData(
                        result.data as LPE.Post.Document,
                        shows,
                      )}
                      size={'medium'}
                      contentType={result.type as LPE.PostType}
                    />
                  )
                case LPE.ContentTypes.Image:
                  return (
                    <ImageBlock
                      {...(result as LPE.Search.ResultItemBase<LPE.Post.ImageBlock>)}
                    />
                  )
                case LPE.ContentTypes.Text:
                  return (
                    <TextBlock
                      {...(result as LPE.Search.ResultItemBase<LPE.Post.TextBlock>)}
                    />
                  )
                default:
                  return null
              }
            })()}
          </ResultItem>
        )
      })}
    </Container>
  )
}

const Container = styled(Grid)``
const ResultItem = styled(GridItem)``
