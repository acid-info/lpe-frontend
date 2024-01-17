import {
  GetPodcastShowsQuery,
  GetPostsQuery,
  GetStaticPagesQuery,
} from '../../lib/strapi/strapi.generated'

export type StrapiPostData = GetPostsQuery['posts']['data'][number]
export type StrapiPodcastShowData =
  GetPodcastShowsQuery['podcastShows']['data'][number]
export type StrapiStaticPageData = GetStaticPagesQuery['pages']['data'][number]
