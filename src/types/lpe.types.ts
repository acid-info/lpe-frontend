import { DictValues } from '../utils/type.utils'

export namespace LPE {
  export const PostTypes = {
    Podcast: 'podcast',
    Article: 'article',
  } as const

  export type PostType = DictValues<typeof PostTypes>

  export namespace Image {
    export type Document = {
      url: string
      alt: string
      width: number
      height: number
    }
  }

  export namespace Author {
    export type Document = {
      name: string
      emailAddress?: string
    }
  }

  export namespace Post {
    export type Footnote = {
      index: number
      id: string
      refId: string
      refValue: string
      valueHTML: string
      valueText: string
    }

    export type Footnotes = Footnote[]

    export type TocItem = {
      level: number
      tag: string
      href: string
      title: string
      blockIndex: number
    }

    export type Toc = TocItem[]

    export const ContentBlockTypes = {
      Image: 'image',
      Text: 'text',
    } as const

    export type ContentBlockType = DictValues<typeof ContentBlockTypes>

    export const ContentBlockLabels = {
      Title: 'title',
      Subtitle: 'subtitle',
      Authors: 'authors',
      Summary: 'summary',
      Tags: 'tags',
      Footnote: 'footnote',
      Paragraph: 'paragraph',
      CoverImage: 'cover_image',
    } as const

    export type ContentBlockLabel = DictValues<typeof ContentBlockLabels>

    export type ContentBlockCommon<D = any> = {
      id: string
      order: number
      labels: ContentBlockLabel[]
      document?: D
    }

    export type TextBlock<D = any> = ContentBlockCommon<D> & {
      text: string
      html: string
      tagName: string
      classNames: string[]
      type: Extract<ContentBlockType, 'text'>
      footnotes: Post.Footnotes
    }

    export type ImageBlock<D = any> = ContentBlockCommon<D> &
      Image.Document & {
        type: Extract<ContentBlockType, 'image'>
      }

    export type ContentBlock<D = any> = TextBlock<D> | ImageBlock<D>

    export type SearchResultItemData =
      | ({
          type: typeof PostTypes.Article
        } & Article.Metadata)
      | ({
          type: typeof PostTypes.Podcast
        } & Required<Podcast.Document>)
  }

  export namespace Article {
    export type Toc = Post.Toc
    export type TocItem = Post.TocItem
    export type TextBlock = Post.TextBlock<Metadata>
    export type ImageBlock = Post.ImageBlock<Metadata>
    export type ContentBlock = Post.ContentBlock<Metadata>
    export type Footnote = Post.Footnote
    export type Footnotes = Post.Footnotes
    export const ContentBlockLabels = Post.ContentBlockLabels
    export type ContentBlockLabel = Post.ContentBlockLabel

    export type Metadata = {
      id: string
      slug: string
      title: string
      summary: string
      subtitle: string
      authors: Author.Document[]
      tags: string[]
      featured?: boolean
      highlighted?: boolean

      createdAt: string | null
      modifiedAt: string | null
    }

    export type Data = Article.Metadata & {
      toc: Post.Toc
      readingTime: number
      coverImage: Image.Document | null
      content: Array<Article.ContentBlock>
    }

    export type Document = {
      data: Article.Data
      relatedArticles: Article.Metadata[]
      articlesFromSameAuthors: Article.Metadata[]
    }
  }

  export namespace Podcast {
    export type Show = {
      id: string
      slug: string
      url: string
      title: string
      description: string
      logo: Image.Document
      hosts: Author.Document[]
      numberOfEpisodes: number
      episodes?: Omit<Podcast.Document, 'show'>[]
    }

    export const ChannelNames = {
      ApplePodcasts: 'apple_podcasts',
      GooglePodcasts: 'google_podcasts',
      Spotify: 'spotify',
      Youtube: 'youtube',
    } as const

    export type ChannelName = DictValues<typeof ChannelNames>

    export type Channel = {
      name: ChannelName
      url: string
    }

    export type Metadata = {
      id: string
      slug: string
      title: string
      tags: string[]
      description: string
      authors: Author.Document[]
      publishedAt: string
      episodeNumber: number
      showId?: string
      featured?: boolean
      highlighted?: boolean
      coverImage?: Post.ImageBlock
      show?: Show
    }

    export type TranscriptionItem = {
      html: string
      start?: number
      end?: number
      speaker?: string
    }

    export type Content = {
      channels: Channel[]
      credits?: Post.TextBlock[]
      transcription: TranscriptionItem[]
    }

    export type Document = Metadata & Content
  }
}
