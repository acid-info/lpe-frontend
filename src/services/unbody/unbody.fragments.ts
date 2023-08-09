import { gql } from 'graphql-request'

export const TEXT_BLOCK_FRAGMENT_COMMON = gql`
  fragment TextBlockCommon on TextBlock {
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
`

export const IMAGE_BLOCK_FRAGMENT_COMMON = gql`
  fragment ImageBlockCommon on ImageBlock {
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
`

export const GOOGLE_DOC_FRAGMENT_COMMON = gql`
  fragment GoogleDocCommon on GoogleDoc {
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
  }
`

export const GOOGLE_DOC_FRAGMENT_MENTIONS = gql`
  fragment GoogleDocMentions on GoogleDoc {
    mentions
    mentionsObj @client(always: true) {
      name
      emailAddress
    }
  }
`

export const GOOGLE_DOC_FRAGMENT_TOC = gql`
  fragment GoogleDocTOC on GoogleDoc {
    toc
    tocObj @client(always: true) {
      level
      tag
      href
      title
      blockIndex
    }
  }
`

export const SEARCH_IMAGE_BLOCK_FRAGMENT = gql`
  fragment SearchImageBlock on ImageBlock {
    __typename

    ...ImageBlockCommon

    _additional {
      id
      score
      certainty
    }

    document {
      ... on GoogleDoc {
        ...GoogleDocCommon
        ...GoogleDocMentions
      }
    }
  }

  ${IMAGE_BLOCK_FRAGMENT_COMMON}
  ${GOOGLE_DOC_FRAGMENT_COMMON}
  ${GOOGLE_DOC_FRAGMENT_MENTIONS}
`

export const SEARCH_TEXT_BLOCK_FRAGMENT = gql`
  fragment SearchTextBlock on TextBlock {
    ...TextBlockCommon

    _additional {
      id
      score
      certainty
    }

    document {
      ... on GoogleDoc {
        ...GoogleDocCommon
        ...GoogleDocMentions
      }
    }
  }

  ${TEXT_BLOCK_FRAGMENT_COMMON}
  ${GOOGLE_DOC_FRAGMENT_COMMON}
  ${GOOGLE_DOC_FRAGMENT_MENTIONS}
`

export const SEARCH_GOOGLE_DOC_FRAGMENT = gql`
  fragment SearchGoogleDoc on GoogleDoc {
    ...GoogleDocCommon
    ...GoogleDocMentions

    blocks {
      ... on ImageBlock {
        ...ImageBlockCommon
      }
    }

    _additional {
      id
      score
      certainty
    }
  }

  ${TEXT_BLOCK_FRAGMENT_COMMON}
  ${IMAGE_BLOCK_FRAGMENT_COMMON}
  ${GOOGLE_DOC_FRAGMENT_COMMON}
  ${GOOGLE_DOC_FRAGMENT_MENTIONS}
`
