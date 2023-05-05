export namespace UnbodyGraphQl {
  export interface Get<T> {
    Get: T
  }

  export namespace Additional {
    interface AdditionalAnswer {
      endPosition: number
      hasAnswer: boolean
      property: string
      result: string
      startPosition: number
    }
    interface AdditionalnumbererpretationSource {
      concept: string
      occurrence: number
      weight: number
    }

    interface Additionalnumbererpretation {
      source: [AdditionalnumbererpretationSource]
    }

    interface AdditionalFeatureProjection {
      vector: [number]
    }

    interface AdditionalNearestNeighborsNeighbor {
      concept: string
      distance: number
    }

    interface AdditionalNearestNeighbors {
      neighbors: [AdditionalNearestNeighborsNeighbor]
    }

    interface AdditionalSemanticPath {
      concept: string
      distanceToNext: number
      distanceToPrevious: number
      distanceToQuery: number
      distanceToResult: number
    }

    interface AdditionalClassification {
      basedOn: [string]
      classifiedFields: [string]
      completed: string
      id: string
      scope: [string]
    }

    export interface AdditionalProps {
      certainty: number
      creationTimeUnix: string
      distance: number
      explainScore: string
      id: string
      lastUpdateTimeUnix: string
      score: string
      vector: [number]

      interpretation: Additionalnumbererpretation
      nearestNeighbors: AdditionalNearestNeighbors
      semanticPath: AdditionalSemanticPath
      answer: AdditionalAnswer
      classification: AdditionalClassification
      featureProjection: AdditionalFeatureProjection
    }
  }

  export interface BaseObject {
    _additional: Additional.AdditionalProps
  }

  export interface BaseObjectWithRef<T> extends BaseObject {
    document: Array<T>
  }

  export interface Beacon {
    beacon: string
  }

  export namespace Fragments {
    export interface TocItem {}
    export interface FootnoteItem {}
  }

  export interface ImageBlock
    extends BaseObjectWithRef<GoogleDoc | GoogleCalendarEvent | Beacon> {
    alt: string
    createdAt: string
    ext: string
    height: number
    mimeType: string
    modifiedAt: string
    order: number
    originalName: string
    path: string[]
    pathstring: string
    remoteId: string
    size: number
    sourceId: string
    url: string
    width: number
  }

  export interface TextBlock extends BaseObjectWithRef<GoogleDoc | Beacon> {
    footnotes: string | Array<Fragments.FootnoteItem>
    html: string
    order: number
    remoteId: string
    sourceId: string
    tagName: string
    text: string
  }

  export interface AudioFile
    extends BaseObjectWithRef<GoogleDoc | GoogleCalendarEvent | Beacon> {
    duration: number
    ext: string
    mimeType: string
    order: number
    originalName: string
    remoteId: string
    size: number
    sourceId: string
    url: string
  }

  export interface GoogleDoc extends BaseObject {
    blocks: Array<ImageBlock | TextBlock>
    createdAt: string
    html: string
    mimeType: string
    modifiedAt: string
    originalName: string
    path: string[]
    pathstring: string
    remoteId: string
    size: number
    sourceId: string
    subtitle: string
    summary: string
    tags: string[]
    text: string
    title: string
    toc: string | Array<Fragments.TocItem>
  }

  export interface GoogleCalendarEvent extends BaseObject {
    createdAt: string
    creatorDisplayName: string
    creatorEmail: string
    creatorId: string
    creatorSelf: boolean
    descriptionHtml: string
    descriptionText: string
    end: string
    htmlLink: string
    location: string
    organizerDisplayName: string
    organizerEmail: string
    organizerId: string
    organizerSelf: boolean
    recurrence: [string]
    remoteId: string
    sequence: number
    sourceId: string
    start: string
    status: string
    summary: string
    title: string
    updatedAt: string

    attachments: Array<ImageBlock>
  }

  export namespace Explore {
    interface ExploreNearObjectInpObj {
      beacon?: string
      certainty?: number
      distance?: number
      id?: string
    }

    interface Txt2VecC11yExploreMoveToMovementObjectsInpObj {
      id?: string
      beacon?: string
    }

    interface Txt2VecC11yExploreMoveTo {
      concepts?: string[]
      objects?: Txt2VecC11yExploreMoveToMovementObjectsInpObj[]
      force?: number
    }

    interface Txt2VecC11yExploreMoveAwayFromMovementObjectsInpObj {
      id?: string
      beacon?: string
    }

    interface Txt2VecC11yExploreMoveAwayFrom {
      concepts?: string[]
      objects?: Txt2VecC11yExploreMoveAwayFromMovementObjectsInpObj[]
      force?: number
    }

    interface Txt2VecC11yExploreNearTextInpObj {
      moveTo?: Txt2VecC11yExploreMoveTo
      certainty?: number
      distance?: number
      moveAwayFrom?: Txt2VecC11yExploreMoveAwayFrom
      concepts?: string[]
    }

    interface ExploreNearVectorInpObj {
      distance?: number
      vector?: number[]
      certainty?: number
    }

    interface QnATransformersExploreAskInpObj {
      question: string
      properties?: string[]
    }

    export interface ExploreArgs {
      nearObject?: ExploreNearObjectInpObj
      nearText?: Txt2VecC11yExploreNearTextInpObj
      ask?: QnATransformersExploreAskInpObj
      offset?: number
      limit?: number
      nearVector?: ExploreNearVectorInpObj
    }
  }
}
