import { TransformPipeline } from '../../../lib/TransformPipeline/TransformPipeline'
import { episodeTransformer } from './Episode.transformer'
import { podcastShowTransformer } from './PodcastShow.transformer'
import { postTransformer } from './Post.transformer'
import { staticPageTransformer } from './StaticPage.transformer'

export const strapiTransformers = new TransformPipeline([
  podcastShowTransformer,
  staticPageTransformer,
  postTransformer,
  episodeTransformer,
])
