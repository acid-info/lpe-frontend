import { getBodyBlocks } from '@/utils/data.utils'
import { RenderArticleBlock } from './Article.Block'
import { ArticlePostData } from '@/types/data.types'

type Props = {
  data: ArticlePostData
}

const ArticleBlocks = ({ data }: Props) => {
  return data?.article.blocks.length ? (
    <>
      {getBodyBlocks(data.article).map((block, idx) => (
        <RenderArticleBlock key={'block-' + idx} block={block} />
      ))}
    </>
  ) : null
}

export default ArticleBlocks
