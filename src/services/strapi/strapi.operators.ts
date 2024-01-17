import { gql } from '@apollo/client'

export const GET_PODCAST_SHOWS = gql`
  query GetPodcastShows(
    $filters: PodcastShowFiltersInput
    $pagination: PaginationArg
    $sort: [String]
    $publicationState: PublicationState
  ) {
    podcastShows(
      filters: $filters
      pagination: $pagination
      sort: $sort
      publicationState: $publicationState
    ) {
      data {
        id
        attributes {
          name
          slug
          description
          hosts {
            data {
              attributes {
                name
                email_address
              }
            }
          }
          logo {
            data {
              attributes {
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

export const GET_POSTS_QUERY = gql`
  query GetPosts(
    $filters: PostFiltersInput
    $pagination: PaginationArg
    $sort: [String]
    $publicationState: PublicationState
    $withContent: Boolean = false
  ) {
    posts(
      filters: $filters
      pagination: $pagination
      sort: $sort
      publicationState: $publicationState
    ) {
      meta {
        pagination {
          total
          page
          pageSize
          pageCount
        }
      }
      data {
        id
        attributes {
          title
          subtitle
          summary
          slug
          episode_number
          type
          featured
          body @include(if: $withContent)
          credits @include(if: $withContent)
          podcast_show {
            data {
              id
            }
          }
          cover_image {
            data {
              attributes {
                url
                width
                height
                caption
              }
            }
          }
          authors {
            data {
              id
              attributes {
                name
                email_address
              }
            }
          }
          publish_date
          publishedAt
          tags {
            data {
              id
              attributes {
                name
              }
            }
          }
          channel @include(if: $withContent) {
            channel
            link
          }
        }
      }
    }
  }
`

export const GET_STATIC_PAGES = gql`
  query GetStaticPages(
    $filters: PageFiltersInput
    $pagination: PaginationArg
    $sort: [String]
    $publicationState: PublicationState
    $withContent: Boolean = false
  ) {
    pages(
      sort: $sort
      filters: $filters
      pagination: $pagination
      publicationState: $publicationState
    ) {
      data {
        id
        attributes {
          slug
          title
          subtitle
          description
          publishedAt
          body @include(if: $withContent)
        }
      }
    }
  }
`
