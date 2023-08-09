import { ArticleDataType } from './ArticleDocument.dataType'
import { ArticleImageBlockDataType } from './ArticleImageBlock.dataType'
import { ArticleSearchResultItemDataType } from './ArticleSearchResultItem.dataType'
import { ArticleTextBlockDataType } from './ArticleTextBlock.dataType'
import { ImageBlockDataType } from './ImageBlock.dataType'
import { PodcastInfoDataType } from './PodcastInfoDocument.dataType'
import { TextBlockDataType } from './TextBlock.dataType'
import { UnbodyDataTypes } from './UnbodyDataTypes'

export const unbodyDataTypes = new UnbodyDataTypes([
  ArticleDataType,
  TextBlockDataType,
  ImageBlockDataType,
  ArticleTextBlockDataType,
  ArticleImageBlockDataType,
  ArticleSearchResultItemDataType,
  PodcastInfoDataType,
])
