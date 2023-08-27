import { LPE } from '@/types/lpe.types'
import styled from '@emotion/styled'
import { ParagraphIcon } from '@/components/Icons/ParagraphIcon'
import { ResponsiveImage } from '@/components/ResponsiveImage/ResponsiveImage'
import { Grid, GridItem } from '@/components/Grid/Grid'
import { Typography } from '@acid-info/lsd-react'

interface Props {
  blocks: LPE.Search.ResultItemBase<LPE.Post.ContentBlock>[]
}
export const SearchResultTopPostBlocks = ({ blocks }: Props) => {
  const imageBlocks = blocks.filter(
    (block) => block.type === LPE.ContentTypes.Image,
  )
  const textBlocks = blocks.filter(
    (block) => block.type === LPE.ContentTypes.Text,
  )

  return (
    <Container>
      <div>
        <Typography variant={'body3'}>Results in the article:</Typography>
      </div>
      {textBlocks.length > 0 && (
        <TextBlocks>
          {textBlocks.map((block, index) => (
            <TextBlockItem key={`para-${index}`}>
              <ParagraphIcon />
              <Typography variant={'subtitle2'}>
                {(block.data as LPE.Post.TextBlock).text.slice(0, 60)}...
              </Typography>
            </TextBlockItem>
          ))}
        </TextBlocks>
      )}
      {imageBlocks.length > 0 && (
        <ImageBlocks>
          {imageBlocks.map((block, index) => {
            const data = block.data as LPE.Post.ImageBlock
            const isPortrait = data.width < data.height
            return (
              <ImageBlockItem
                key={`image-${index}`}
                className={isPortrait ? `refImage__portrait` : ''}
              >
                <ResponsiveImage data={data} key={index} />
              </ImageBlockItem>
            )
          })}
        </ImageBlocks>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const TextBlocks = styled.div``

const TextBlockItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const ImageBlocks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 8px;
`
const ImageBlockItem = styled.div`
  width: 30%;
  .refImage__portrait {
    width: 15%;
  }
`
