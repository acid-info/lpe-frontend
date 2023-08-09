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

  export namespace Article {
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

    export type ContentBlockCommon = {
      id: string
      order: number
      labels: ContentBlockLabel[]
      document?: Partial<Article.Metadata>
    }

    export type TextBlock = ContentBlockCommon & {
      text: string
      html: string
      tagName: string
      classNames: string[]
      type: Extract<ContentBlockType, 'text'>
      footnotes: Article.Footnotes
    }

    export type ImageBlock = ContentBlockCommon &
      Image.Document & {
        type: Extract<ContentBlockType, 'image'>
      }

    export type ContentBlock = TextBlock | ImageBlock

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
      toc: Article.Toc
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
    export type Info = {
      id: string
      slug: string
      title: string
      description: string
      coverImage: Image.Document | null
    }

    export type TranscriptionItem = {
      text: string
      start: number
      end: number
      speaker: string
    }

    export type EpisodeExtra = {
      info: Partial<Podcast.Info>
      transcription: TranscriptionItem[]
    }

    export type Episode = Article.Data & EpisodeExtra

    export type Document = Info & { episodes: Podcast.Episode[] }
  }
}
