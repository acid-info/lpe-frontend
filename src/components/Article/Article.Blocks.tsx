import { getBodyBlocks } from '@/utils/data.utils'
import { RenderArticleBlock } from './Article.Block'
import { ArticlePostData } from '@/types/data.types'
import {
  GoogleDocEnhanced,
  UnbodyImageBlock,
  UnbodyTextBlock,
} from '@/lib/unbody/unbody.types'

type Props = {
  data: GoogleDocEnhanced
}

const ArticleBlocks = ({ data }: Props) => {
  return data.blocks.length ? (
    <>
      {getBodyBlocks(data).map((block, idx) => (
        <RenderArticleBlock key={'block-' + idx} block={block} />
      ))}
    </>
  ) : null
}

export default ArticleBlocks
