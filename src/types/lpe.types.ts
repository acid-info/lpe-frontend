export namespace LPE {
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
      image?: Image.Document
      url?: string
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

    export type ContentBlockType = 'image' | 'text'

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

    export type ContentBlockLabel =
      (typeof ContentBlockLabels)[keyof typeof ContentBlockLabels]

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
      title: string
      description: string
      logo: Image.Document
      hosts: Author.Document[]
      episodes?: Omit<Podcast.Document, 'show'>[]
    }

    export type Metadata = {
      id: string
      slug: string
      title: string
      tags: string[]
      summary: string
      publishedAt: string
      episodeNumber: number
    }

    export type TranscriptionItem = {
      text: string
      start?: number
      end?: number
      speaker?: string
    }

    export type Content = {
      coverImage?: Post.ImageBlock
      transcription: TranscriptionItem[]
      references?: Post.TextBlock[]
      credits?: Post.TextBlock[]
    }

    export type Document = Metadata &
      Content & {
        show: Show
      }
  }
}
