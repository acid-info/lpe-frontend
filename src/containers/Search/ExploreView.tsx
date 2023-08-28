import styled from '@emotion/styled'
import { LPE } from '@/types/lpe.types'
import { Grid, GridItem } from '@/components/Grid/Grid'
import { useMemo } from 'react'
import { PostCard } from '@/components/PostCard'
import { ImageBlock, TextBlock } from '@/components/ContentBlock'
import { uiConfigs } from '@/configs/ui.configs'

type Block = LPE.Search.ResultItemBase<LPE.Post.ContentBlock>
type Post = LPE.Search.ResultItemBase<LPE.Post.Document>

interface Props {
  posts: Post[]
  blocks: Block[]
  shows: LPE.Podcast.Show[]
}

const distributeBlocks = (blocks: (Block | Post)[]): (Block | Post)[][] => {
  let rows: (Block | Post)[][] = []
  let currentRow: (Block | Post)[] = []
  let currentRowWidth = 0

  const getBlockWidth = (block: Block | Post): number => {
    return block.type === LPE.ContentTypes.Image
      ? uiConfigs.searchExplore.smallColumn
      : uiConfigs.searchExplore.largeColumn
  }

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    const blockWidth = getBlockWidth(block)

    if (currentRowWidth + blockWidth <= uiConfigs.searchExplore.gridColumns) {
      currentRow.push(block)
      currentRowWidth += blockWidth
    } else {
      // Look ahead to find a block that fits.
      let swapIndex = -1
      for (let j = i + 1; j < blocks.length; j++) {
        const nextBlockWidth = getBlockWidth(blocks[j])
        if (
          currentRowWidth + nextBlockWidth <=
          uiConfigs.searchExplore.gridColumns
        ) {
          swapIndex = j
          break
        }
      }

      if (swapIndex !== -1) {
        // Swap blocks and add the fitting block to the current row.
        ;[blocks[i], blocks[swapIndex]] = [blocks[swapIndex], blocks[i]]
        currentRow.push(blocks[i])
        currentRowWidth += blockWidth
      } else {
        // No fitting block found, go with the best fit.
        rows.push([...currentRow])
        currentRow = [block]
        currentRowWidth = blockWidth
      }
    }

    if (currentRowWidth === uiConfigs.searchExplore.gridColumns) {
      rows.push([...currentRow])
      currentRow = []
      currentRowWidth = 0
    }
  }

  if (currentRow.length) {
    rows.push(currentRow)
  }

  return rows
}

export const SearchResultsExploreView = (props: Props) => {
  const { posts, shows, blocks } = props
  const results = useMemo(() => {
    return [...posts, ...blocks.slice(0, 30)].sort((a, b) => {
      return b.score - a.score
    })
  }, [posts, blocks])

  const items = distributeBlocks(results)

  return (
    <Container>
      {items.map((row, idx) => (
        <Row key={`search-result-row-${idx}`} cols={12}>
          {row.map((result, index) => {
            return (
              <ResultItem
                key={index}
                className={
                  result.type === LPE.ContentTypes.Image ? 'w-2' : 'w-4'
                }
              >
                {(() => {
                  switch (result.type) {
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
                    case LPE.ContentTypes.Article:
                      return (
                        <PostCard
                          data={{
                            ...PostCard.toData(
                              result.data as LPE.Post.Document,
                              shows,
                            ),
                            coverImage: null,
                          }}
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
        </Row>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 56px;
`
const Row = styled(Grid)`
  grid-template-columns: repeat(${uiConfigs.searchExplore.gridColumns}, 1fr);
  grid-column-gap: 16px;
`
const ResultItem = styled(GridItem)`
  border-top: 1px solid rgb(var(--lsd-text-primary));
  padding: 24px 0;

  > * {
    padding-top: 0;
  }
`
