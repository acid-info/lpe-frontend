import { gql } from '@apollo/client'

export const COUNT_DOCUMENTS_QUERY = gql`
  query CountDocuments($filter: AggregateObjectsGoogleDocWhereInpObj) {
    Aggregate {
      GoogleDoc(where: $filter) {
        meta {
          count
        }
      }
    }
  }
`
export const GET_POSTS_QUERY = gql`
  query GetPosts(
    $filter: GetObjectsGoogleDocWhereInpObj
    $sort: [GetObjectsGoogleDocSortInpObj]
    $searchResult: Boolean = false
    $nearText: Txt2VecOpenAIGetObjectsGoogleDocNearTextInpObj
    $hybrid: GetObjectsGoogleDocHybridInpObj
    $nearObject: GetObjectsGoogleDocNearObjectInpObj
    $skip: Int = 0
    $limit: Int = 10
    $toc: Boolean = false
    $mentions: Boolean = false
    $textBlocks: Boolean = false
    $imageBlocks: Boolean = false
  ) {
    Get {
      GoogleDoc(
        where: $filter
        hybrid: $hybrid
        nearText: $nearText
        nearObject: $nearObject
        sort: $sort
        offset: $skip
        limit: $limit
      ) {
        _additional {
          id
          score @include(if: $searchResult)
          distance @include(if: $searchResult)
          certainty @include(if: $searchResult)
        }
        title
        subtitle
        summary
        slug
        tags
        path
        createdAt
        modifiedAt
        pathString
        mentions @include(if: $mentions)
        mentionsObj @client(always: true) @include(if: $mentions) {
          name
          emailAddress
        }
        toc @include(if: $toc)
        tocObj @client(always: true) @include(if: $toc) {
          level
          tag
          href
          title
          blockIndex
        }
        blocks {
          ... on ImageBlock @include(if: $imageBlocks) {
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
          ... on TextBlock @include(if: $textBlocks) {
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
    $textHybrid: GetObjectsTextBlockHybridInpObj
    $imageHybrid: GetObjectsImageBlockHybridInpObj
    $text: Boolean = true
    $image: Boolean = true
  ) {
    Get {
      TextBlock(
        where: $textFilter
        nearText: $textNearText
        hybrid: $textHybrid
        limit: $limit
        offset: $skip
      ) @include(if: $text) {
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
        hybrid: $imageHybrid
        limit: $limit
        offset: $skip
      ) @include(if: $image) {
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
