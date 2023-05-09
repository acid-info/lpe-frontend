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
      vector: number[]
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
      basedOn: string[]
      classifiedFields: string[]
      completed: string
      id: string
      scope: string[]
    }

    export interface AdditionalProps {
      certainty: number
      creationTimeUnix: string
      distance: number
      explainScore: string
      id: string
      lastUpdateTimeUnix: string
      score: string
      vector: number[]

      interpretation: Additionalnumbererpretation
      nearestNeighbors: AdditionalNearestNeighbors
      semanticPath: AdditionalSemanticPath
      answer: AdditionalAnswer
      classification: AdditionalClassification
      featureProjection: AdditionalFeatureProjection
    }
  }

  export enum UnbodyDocumentTypeNames {
    GoogleDoc = 'GoogleDoc',
    GoogleCalendarEvent = 'GoogleCalendarEvent',
    TextBlock = 'TextBlock',
    ImageBlock = 'ImageBlock',
    AudioFile = 'AudioFile',
  }

  export interface BaseObject {
    _additional: Additional.AdditionalProps
    __typename: UnbodyDocumentTypeNames
  }

  export interface BaseObjectWithRef<T> extends BaseObject {
    document: Array<T>
  }

  export interface Beacon {
    beacon: string
    __typename: 'Beacon'
  }

  export namespace Fragments {
    export interface TocItem {}

    export interface FootnoteItem {}
  }

  export interface ImageBlock
    extends BaseObjectWithRef<GoogleDoc | GoogleCalendarEvent> {
    __typename: UnbodyDocumentTypeNames.ImageBlock
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

  export interface TextBlock extends BaseObjectWithRef<GoogleDoc> {
    __typename: UnbodyDocumentTypeNames.TextBlock
    footnotes: string | Array<Fragments.FootnoteItem>
    html: string
    order: number
    remoteId: string
    sourceId: string
    tagName: string
    text: string
  }

  export interface AudioFile
    extends BaseObjectWithRef<GoogleDoc | GoogleCalendarEvent> {
    duration: number
    ext: string
    mimeType: string
    order: number
    originalName: string
    remoteId: string
    size: number
    sourceId: string
    url: string
    __typename: UnbodyDocumentTypeNames.AudioFile
  }

  export interface GoogleDoc extends BaseObject {
    __typename: UnbodyDocumentTypeNames.GoogleDoc
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
    __typename: UnbodyDocumentTypeNames.GoogleCalendarEvent
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
    recurrence: string[]
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

  export namespace Filters {
    interface NearObjectInpObj {
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

    interface Txt2VecC11yNearTextInpObj {
      moveTo?: Txt2VecC11yExploreMoveTo
      certainty?: number
      distance?: number
      moveAwayFrom?: Txt2VecC11yExploreMoveAwayFrom
      concepts?: string[]
    }

    interface NearVectorInpObj {
      distance?: number
      vector?: number[]
      certainty?: number
    }

    interface QnATransformersAskInpObj {
      question: string
      properties?: string[]
    }

    export interface ExploreArgs {
      nearObject?: NearObjectInpObj
      nearText?: Txt2VecC11yNearTextInpObj
      ask?: QnATransformersAskInpObj
      offset?: number
      limit?: number
      nearVector?: NearVectorInpObj
    }

    enum GroupInpObjTypeEnum {
      closest = 'closest',
      merge = 'merge',
    }

    export interface GroupInpObj {
      force: number
      type: GroupInpObjTypeEnum
    }

    export interface HybridInpObj {
      query: string
      alpha: number
      vector: number[]
    }

    interface WhereGeoRangeGeoCoordinatesInpObj {
      latitude: number
      longitude: number
    }

    interface WhereGeoRangeDistanceInpObj {
      max: number
    }

    export interface WhereGeoRangeInpObj {
      geoCoordinates: WhereGeoRangeGeoCoordinatesInpObj
      distance: WhereGeoRangeDistanceInpObj
    }

    export enum WhereOperatorEnum {
      GreaterThanEqual = 'GreaterThanEqual',
      WithinGeoRange = 'WithinGeoRange',
      IsNull = 'IsNull',
      And = 'And',
      Like = 'Like',
      Not = 'Not',
      NotEqual = 'NotEqual',
      GreaterThan = 'GreaterThan',
      LessThan = 'LessThan',
      LessThanEqual = 'LessThanEqual',
      Or = 'Or',
      Equal = 'Equal',
    }

    export interface WhereOperandsInpObj {
      operator?: WhereOperatorEnum
      path: string[]
      operands?: WhereOperandsInpObj[]
      valueGeoRange?: WhereGeoRangeInpObj
      valueNumber?: number
      valueBoolean?: boolean
      valueString?: string
      valueText?: string
      valueDate?: string
      valueInt?: number
    }

    export enum ObjTypeEnum {
      asc = 'asc',
      desc = 'desc',
    }

    export interface Bm25InpObj {
      properties?: string[]
      query: string
    }

    export interface AskInpObj {
      question: string
      properties?: string[]
    }

    export interface SortInpObj {
      path: string[]
      order: string
    }

    export interface WhereInpObj {
      path?: string[]
      valueInt?: number
      valueNumber?: number
      valueGeoRange?: WhereGeoRangeInpObj
      operator?: WhereOperatorEnum
      operands?: WhereOperandsInpObj[]
      valueBoolean?: boolean
      valuestring?: string
      valueDate?: string
      valueText?: string
      valueString?: string
    }

    export interface GetDocsArgs {
      where?: WhereInpObj
      bm25?: Bm25InpObj
      ask?: AskInpObj
      sort?: ObjTypeEnum[]

      nearText?: Txt2VecC11yNearTextInpObj
      nearVector?: NearVectorInpObj
      nearObject?: NearObjectInpObj

      offset?: number
      limit?: number

      group?: GroupInpObj
      hybrid?: HybridInpObj
    }
  }
}
