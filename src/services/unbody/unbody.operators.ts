import { gql } from '@apollo/client'

export const GET_ARTICLE_POST_QUERY = gql`
  query GetArticlePostQuery($filter: GetObjectsGoogleDocWhereInpObj) {
    Get {
      GoogleDoc(where: $filter) {
        sourceId
        title
        subtitle
        summary
        tags
        createdAt
        modifiedAt
        slug
        path
        pathString
        _additional {
          id
        }
        mentions
        mentionsObj @client(always: true) {
          name
          emailAddress
        }
        toc
        tocObj @client(always: true) {
          level
          tag
          href
          title
          blockIndex
        }
        blocks {
          ... on ImageBlock {
            url
            alt
            order
            width
            height
            __typename
            _additional {
              id
            }
          }
          ... on TextBlock {
            footnotes
            footnotesObj @client(always: true) {
              index
              id
              refId
              refValue
              valueHTML
              valueText
            }
            html
            order
            text
            tagName
            classNames
            __typename
            _additional {
              id
            }
          }
        }
      }
    }
  }
`

export const GET_RELATED_POSTS_QUERY = gql`
  query getRelatedPosts(
    $id: String!
    $filter: GetObjectsGoogleDocWhereInpObj
    $limit: Int = 10
    $skip: Int = 0
  ) {
    Get {
      GoogleDoc(
        where: $filter
        limit: $limit
        offset: $skip
        nearObject: { id: $id }
      ) {
        title
        slug
        path
        pathString
        modifiedAt
        mentions
        mentionsObj @client(always: true) {
          name
          emailAddress
        }
        _additional {
          id
        }
      }
    }
  }
`

export const GET_ARTICLES_FROM_SAME_AUTHORS_QUERY = gql`
  query getArticlesFromSameAuthors(
    $authors: String!
    $filter: GetObjectsGoogleDocWhereOperandsInpObj
    $limit: Int = 10
    $skip: Int = 0
  ) {
    Get {
      GoogleDoc(
        where: {
          operator: And
          operands: [
            { operator: Like, path: ["mentions"], valueText: $authors }
            $filter
          ]
        }
        limit: $limit
        offset: $skip
      ) {
        title
        slug
        path
        pathString
        modifiedAt
        mentions
        mentionsObj @client(always: true) {
          name
          emailAddress
        }
        _additional {
          id
        }
      }
    }
  }
`

export const GET_HOME_PAGE_POSTS_QUERY = gql`
  query getHomepagePosts(
    $filter: GetObjectsGoogleDocWhereInpObj
    $limit: Int = 10
    $skip: Int = 0
  ) {
    Get {
      GoogleDoc(where: $filter, limit: $limit, offset: $skip) {
        sourceId
        title
        subtitle
        summary
        tags
        createdAt
        modifiedAt
        slug
        path
        pathString
        mentions
        mentionsObj @client(always: true) {
          name
          emailAddress
        }
        _additional {
          id
        }
        blocks {
          ... on ImageBlock {
            url
            alt
            order
            width
            height
            __typename
            _additional {
              id
            }
          }
        }
      }
    }
  }
`

export const GET_FEATURED_ARTICLES_QUERY = gql`
  query GetFeaturedArticles(
    $filter: GetObjectsGoogleDocWhereInpObj
    $limit: Int = 10
    $skip: Int = 0
  ) {
    Get {
      GoogleDoc(where: $filter, limit: $limit, offset: $skip) {
        sourceId
        title
        subtitle
        summary
        tags
        createdAt
        modifiedAt
        slug
        path
        pathString
        mentions
        mentionsObj @client(always: true) {
          name
          emailAddress
        }
        _additional {
          id
        }
        blocks {
          ... on ImageBlock {
            url
            alt
            order
            width
            height
            __typename
            _additional {
              id
            }
          }
        }
      }
    }
  }
`

export const GET_ALL_ARTICLE_SLUGS_QUERY = gql`
  query GetAllArticleSlugs(
    $filter: GetObjectsGoogleDocWhereInpObj
    $limit: Int = 10
    $skip: Int = 0
  ) {
    Get {
      GoogleDoc(where: $filter, offset: $skip, limit: $limit) {
        slug
        path
        pathString
      }
    }
  }
`

export const GET_ALL_TOPICS_QUERY = gql`
  query GetAllTopics($filter: AggregateObjectsGoogleDocWhereInpObj) {
    Aggregate {
      GoogleDoc(where: $filter, groupBy: "tags") {
        groupedBy {
          value
        }
      }
    }
  }
`

export const SEARCH_ARTICLES_QUERY = gql`
  query SearchArticles(
    $filter: GetObjectsGoogleDocWhereInpObj
    $nearText: Txt2VecOpenAIGetObjectsGoogleDocNearTextInpObj
  ) {
    Get {
      GoogleDoc(where: $filter, nearText: $nearText) {
        sourceId
        title
        subtitle
        summary
        tags
        createdAt
        modifiedAt
        slug
        path
        pathString
        mentions
        mentionsObj @client(always: true) {
          name
          emailAddress
        }

        blocks {
          ... on ImageBlock {
            url
            alt
            order
            width
            height
            __typename
            _additional {
              id
            }
          }
        }

        _additional {
          id
          score
          certainty
        }
      }
    }
  }
`

export const SEARCH_BLOCKS_QUERY = gql`
  query SearchBlocks(
    $limit: Int
    $skip: Int
    $textNearText: Txt2VecOpenAIGetObjectsTextBlockNearTextInpObj
    $imageNearText: Txt2VecOpenAIGetObjectsImageBlockNearTextInpObj
    $textFilter: GetObjectsTextBlockWhereInpObj
    $imageFilter: GetObjectsImageBlockWhereInpObj
  ) {
    Get {
      TextBlock(
        where: $textFilter
        nearText: $textNearText
        limit: $limit
        offset: $skip
      ) {
        footnotes
        footnotesObj @client(always: true) {
          index
          id
          refId
          refValue
          valueHTML
          valueText
        }
        html
        order
        text
        tagName
        classNames
        __typename

        document {
          ... on GoogleDoc {
            sourceId
            title
            subtitle
            summary
            tags
            createdAt
            modifiedAt
            slug
            path
            pathString
            _additional {
              id
            }
            mentions
            mentionsObj @client(always: true) {
              name
              emailAddress
            }
          }
        }

        _additional {
          certainty
          score
          id
        }
      }

      ImageBlock(
        where: $imageFilter
        nearText: $imageNearText
        limit: $limit
        offset: $skip
      ) {
        url
        alt
        order
        width
        height
        __typename

        document {
          ... on GoogleDoc {
            sourceId
            title
            subtitle
            summary
            tags
            createdAt
            modifiedAt
            slug
            path
            pathString
            _additional {
              id
            }
            mentions
            mentionsObj @client(always: true) {
              name
              emailAddress
            }
          }
        }

        _additional {
          certainty
          score
          id
        }
      }
    }
  }
`
