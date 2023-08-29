import { LPE } from '@/types/lpe.types'
import styled from '@emotion/styled'
import { ParagraphIcon } from '@/components/Icons/ParagraphIcon'
import { ResponsiveImage } from '@/components/ResponsiveImage/ResponsiveImage'
import { Grid, GridItem } from '@/components/Grid/Grid'
import { Typography } from '@acid-info/lsd-react'
import { uiConfigs } from '@/configs/ui.configs'
import { NicerTextFormat } from '@/components/Search/SearchResult.NicerTextFormat'

interface Props {
  textBlocks: LPE.Post.TextBlock[]
  imageBlocks: LPE.Post.ImageBlock[]
}

export const SearchResultTopPostBlocks = ({
  textBlocks,
  imageBlocks,
}: Props) => {
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
              <NicerTextFormat variant={'subtitle2'}>
                {block.text}
              </NicerTextFormat>
            </TextBlockItem>
          ))}
        </TextBlocks>
      )}
      {imageBlocks.length > 0 && (
        <ImageBlocks>
          {imageBlocks.map((data, index) => {
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
  > *:last-of-type {
    max-width: 70%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`

const ImageBlocks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`
const ImageBlockItem = styled.div`
  width: 20%;
  .refImage__portrait {
    width: 15%;
  }
`
