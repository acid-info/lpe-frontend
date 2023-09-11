import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T
export type InputMaybe<T> = T
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** Boolean or Boolean[] */
  BooleanAggregateObjectsAudioFile: { input: any; output: any }
  /** Boolean or Boolean[] */
  BooleanAggregateObjectsGoogleCalendarEvent: { input: any; output: any }
  /** Boolean or Boolean[] */
  BooleanAggregateObjectsGoogleDoc: { input: any; output: any }
  /** Boolean or Boolean[] */
  BooleanAggregateObjectsImageBlock: { input: any; output: any }
  /** Boolean or Boolean[] */
  BooleanAggregateObjectsTextBlock: { input: any; output: any }
  /** Boolean or Boolean[] */
  BooleanGetObjectsAudioFile: { input: any; output: any }
  /** Boolean or Boolean[] */
  BooleanGetObjectsGoogleCalendarEvent: { input: any; output: any }
  /** Boolean or Boolean[] */
  BooleanGetObjectsGoogleDoc: { input: any; output: any }
  /** Boolean or Boolean[] */
  BooleanGetObjectsImageBlock: { input: any; output: any }
  /** Boolean or Boolean[] */
  BooleanGetObjectsTextBlock: { input: any; output: any }
  /** Float or Float[] */
  FloatAggregateObjectsAudioFile: { input: any; output: any }
  /** Float or Float[] */
  FloatAggregateObjectsGoogleCalendarEvent: { input: any; output: any }
  /** Float or Float[] */
  FloatAggregateObjectsGoogleDoc: { input: any; output: any }
  /** Float or Float[] */
  FloatAggregateObjectsImageBlock: { input: any; output: any }
  /** Float or Float[] */
  FloatAggregateObjectsTextBlock: { input: any; output: any }
  /** Float or Float[] */
  FloatGetObjectsAudioFile: { input: any; output: any }
  /** Float or Float[] */
  FloatGetObjectsGoogleCalendarEvent: { input: any; output: any }
  /** Float or Float[] */
  FloatGetObjectsGoogleDoc: { input: any; output: any }
  /** Float or Float[] */
  FloatGetObjectsImageBlock: { input: any; output: any }
  /** Float or Float[] */
  FloatGetObjectsTextBlock: { input: any; output: any }
  /** Int or Int[] */
  IntAggregateObjectsAudioFile: { input: any; output: any }
  /** Int or Int[] */
  IntAggregateObjectsGoogleCalendarEvent: { input: any; output: any }
  /** Int or Int[] */
  IntAggregateObjectsGoogleDoc: { input: any; output: any }
  /** Int or Int[] */
  IntAggregateObjectsImageBlock: { input: any; output: any }
  /** Int or Int[] */
  IntAggregateObjectsTextBlock: { input: any; output: any }
  /** Int or Int[] */
  IntGetObjectsAudioFile: { input: any; output: any }
  /** Int or Int[] */
  IntGetObjectsGoogleCalendarEvent: { input: any; output: any }
  /** Int or Int[] */
  IntGetObjectsGoogleDoc: { input: any; output: any }
  /** Int or Int[] */
  IntGetObjectsImageBlock: { input: any; output: any }
  /** Int or Int[] */
  IntGetObjectsTextBlock: { input: any; output: any }
  /** String or String[] */
  TextAggregateObjectsAudioFile: { input: any; output: any }
  /** String or String[] */
  TextAggregateObjectsGoogleCalendarEvent: { input: any; output: any }
  /** String or String[] */
  TextAggregateObjectsGoogleDoc: { input: any; output: any }
  /** String or String[] */
  TextAggregateObjectsImageBlock: { input: any; output: any }
  /** String or String[] */
  TextAggregateObjectsTextBlock: { input: any; output: any }
  /** String or String[] */
  TextDateAggregateObjectsAudioFile: { input: any; output: any }
  /** String or String[] */
  TextDateAggregateObjectsGoogleCalendarEvent: { input: any; output: any }
  /** String or String[] */
  TextDateAggregateObjectsGoogleDoc: { input: any; output: any }
  /** String or String[] */
  TextDateAggregateObjectsImageBlock: { input: any; output: any }
  /** String or String[] */
  TextDateAggregateObjectsTextBlock: { input: any; output: any }
  /** String or String[] */
  TextDateGetObjectsAudioFile: { input: any; output: any }
  /** String or String[] */
  TextDateGetObjectsGoogleCalendarEvent: { input: any; output: any }
  /** String or String[] */
  TextDateGetObjectsGoogleDoc: { input: any; output: any }
  /** String or String[] */
  TextDateGetObjectsImageBlock: { input: any; output: any }
  /** String or String[] */
  TextDateGetObjectsTextBlock: { input: any; output: any }
  /** String or String[] */
  TextGetObjectsAudioFile: { input: any; output: any }
  /** String or String[] */
  TextGetObjectsGoogleCalendarEvent: { input: any; output: any }
  /** String or String[] */
  TextGetObjectsGoogleDoc: { input: any; output: any }
  /** String or String[] */
  TextGetObjectsImageBlock: { input: any; output: any }
  /** String or String[] */
  TextGetObjectsTextBlock: { input: any; output: any }
  /** String or String[] */
  TextStringAggregateObjectsAudioFile: { input: any; output: any }
  /** String or String[] */
  TextStringAggregateObjectsGoogleCalendarEvent: { input: any; output: any }
  /** String or String[] */
  TextStringAggregateObjectsGoogleDoc: { input: any; output: any }
  /** String or String[] */
  TextStringAggregateObjectsImageBlock: { input: any; output: any }
  /** String or String[] */
  TextStringAggregateObjectsTextBlock: { input: any; output: any }
  /** String or String[] */
  TextStringGetObjectsAudioFile: { input: any; output: any }
  /** String or String[] */
  TextStringGetObjectsGoogleCalendarEvent: { input: any; output: any }
  /** String or String[] */
  TextStringGetObjectsGoogleDoc: { input: any; output: any }
  /** String or String[] */
  TextStringGetObjectsImageBlock: { input: any; output: any }
  /** String or String[] */
  TextStringGetObjectsTextBlock: { input: any; output: any }
}

export type AggregateAudioFile = {
  __typename?: 'AggregateAudioFile'
  /** Aggregate this property"document" */
  document: Maybe<AggregateAudioFiledocumentObj>
  /** Aggregate this property"duration" */
  duration: Maybe<AggregateAudioFiledurationObj>
  /** Aggregate this property"ext" */
  ext: Maybe<AggregateAudioFileextObj>
  /** Indicates the group of returned data */
  groupedBy: Maybe<AggregateAudioFileGroupedByObj>
  /** An object used to Get Meta information about Objects on a local Weaviate */
  meta: Maybe<AggregateAudioFileMetaObject>
  /** Aggregate this property"mimeType" */
  mimeType: Maybe<AggregateAudioFilemimeTypeObj>
  /** Aggregate this property"order" */
  order: Maybe<AggregateAudioFileorderObj>
  /** Aggregate this property"originalName" */
  originalName: Maybe<AggregateAudioFileoriginalNameObj>
  /** Aggregate this property"remoteId" */
  remoteId: Maybe<AggregateAudioFileremoteIdObj>
  /** Aggregate this property"size" */
  size: Maybe<AggregateAudioFilesizeObj>
  /** Aggregate this property"sourceId" */
  sourceId: Maybe<AggregateAudioFilesourceIdObj>
  /** Aggregate this property"url" */
  url: Maybe<AggregateAudioFileurlObj>
}

/** An object containing the path and value of the grouped property */
export type AggregateAudioFileGroupedByObj = {
  __typename?: 'AggregateAudioFileGroupedByObj'
  /** The path of the grouped property */
  path: Maybe<Array<Maybe<Scalars['String']['output']>>>
  /** The value of the grouped property */
  value: Maybe<Scalars['String']['output']>
}

export type AggregateAudioFileMetaObject = {
  __typename?: 'AggregateAudioFileMetaObject'
  count: Maybe<Scalars['Int']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateAudioFiledocumentObj = {
  __typename?: 'AggregateAudioFiledocumentObj'
  /**
   * The classes that this object contains a reference to
   * @deprecated Experimental, the format will change
   */
  pointingTo: Maybe<Array<Maybe<Scalars['String']['output']>>>
  /** The datatype of this property */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateAudioFiledurationObj = {
  __typename?: 'AggregateAudioFiledurationObj'
  /** Aggregate on the total amount of found property values */
  count: Maybe<Scalars['Int']['output']>
  /** Aggregate on the maximum of numeric property values */
  maximum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the mean of numeric property values */
  mean: Maybe<Scalars['Float']['output']>
  /** Aggregate on the median of numeric property values */
  median: Maybe<Scalars['Float']['output']>
  /** Aggregate on the minimum of numeric property values */
  minimum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the mode of numeric property values */
  mode: Maybe<Scalars['Float']['output']>
  /** Aggregate on the sum of numeric property values */
  sum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateAudioFileextObj = {
  __typename?: 'AggregateAudioFileextObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<Array<Maybe<AggregateAudioFileextTopOccurrencesObj>>>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateAudioFileextObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateAudioFileextTopOccurrencesObj = {
  __typename?: 'AggregateAudioFileextTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateAudioFilemimeTypeObj = {
  __typename?: 'AggregateAudioFilemimeTypeObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateAudioFilemimeTypeTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateAudioFilemimeTypeObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateAudioFilemimeTypeTopOccurrencesObj = {
  __typename?: 'AggregateAudioFilemimeTypeTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateAudioFileorderObj = {
  __typename?: 'AggregateAudioFileorderObj'
  /** Aggregate on the total amount of found property values */
  count: Maybe<Scalars['Int']['output']>
  /** Aggregate on the maximum of numeric property values */
  maximum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the mean of numeric property values */
  mean: Maybe<Scalars['Float']['output']>
  /** Aggregate on the median of numeric property values */
  median: Maybe<Scalars['Float']['output']>
  /** Aggregate on the minimum of numeric property values */
  minimum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the mode of numeric property values */
  mode: Maybe<Scalars['Float']['output']>
  /** Aggregate on the sum of numeric property values */
  sum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateAudioFileoriginalNameObj = {
  __typename?: 'AggregateAudioFileoriginalNameObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateAudioFileoriginalNameTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateAudioFileoriginalNameObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateAudioFileoriginalNameTopOccurrencesObj = {
  __typename?: 'AggregateAudioFileoriginalNameTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateAudioFileremoteIdObj = {
  __typename?: 'AggregateAudioFileremoteIdObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateAudioFileremoteIdTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateAudioFileremoteIdObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateAudioFileremoteIdTopOccurrencesObj = {
  __typename?: 'AggregateAudioFileremoteIdTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateAudioFilesizeObj = {
  __typename?: 'AggregateAudioFilesizeObj'
  /** Aggregate on the total amount of found property values */
  count: Maybe<Scalars['Int']['output']>
  /** Aggregate on the maximum of numeric property values */
  maximum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the mean of numeric property values */
  mean: Maybe<Scalars['Float']['output']>
  /** Aggregate on the median of numeric property values */
  median: Maybe<Scalars['Float']['output']>
  /** Aggregate on the minimum of numeric property values */
  minimum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the mode of numeric property values */
  mode: Maybe<Scalars['Float']['output']>
  /** Aggregate on the sum of numeric property values */
  sum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateAudioFilesourceIdObj = {
  __typename?: 'AggregateAudioFilesourceIdObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateAudioFilesourceIdTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateAudioFilesourceIdObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateAudioFilesourceIdTopOccurrencesObj = {
  __typename?: 'AggregateAudioFilesourceIdTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateAudioFileurlObj = {
  __typename?: 'AggregateAudioFileurlObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<Array<Maybe<AggregateAudioFileurlTopOccurrencesObj>>>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateAudioFileurlObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateAudioFileurlTopOccurrencesObj = {
  __typename?: 'AggregateAudioFileurlTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

export type AggregateGoogleCalendarEvent = {
  __typename?: 'AggregateGoogleCalendarEvent'
  /** Aggregate this property"attachments" */
  attachments: Maybe<AggregateGoogleCalendarEventattachmentsObj>
  /** Aggregate this property"createdAt" */
  createdAt: Maybe<AggregateGoogleCalendarEventcreatedAtObj>
  /** Aggregate this property"creatorDisplayName" */
  creatorDisplayName: Maybe<AggregateGoogleCalendarEventcreatorDisplayNameObj>
  /** Aggregate this property"creatorEmail" */
  creatorEmail: Maybe<AggregateGoogleCalendarEventcreatorEmailObj>
  /** Aggregate this property"creatorId" */
  creatorId: Maybe<AggregateGoogleCalendarEventcreatorIdObj>
  /** Aggregate this property"creatorSelf" */
  creatorSelf: Maybe<AggregateGoogleCalendarEventcreatorSelfObj>
  /** Aggregate this property"descriptionHtml" */
  descriptionHtml: Maybe<AggregateGoogleCalendarEventdescriptionHtmlObj>
  /** Aggregate this property"descriptionText" */
  descriptionText: Maybe<AggregateGoogleCalendarEventdescriptionTextObj>
  /** Aggregate this property"end" */
  end: Maybe<AggregateGoogleCalendarEventendObj>
  /** Indicates the group of returned data */
  groupedBy: Maybe<AggregateGoogleCalendarEventGroupedByObj>
  /** Aggregate this property"htmlLink" */
  htmlLink: Maybe<AggregateGoogleCalendarEventhtmlLinkObj>
  /** Aggregate this property"location" */
  location: Maybe<AggregateGoogleCalendarEventlocationObj>
  /** An object used to Get Meta information about Objects on a local Weaviate */
  meta: Maybe<AggregateGoogleCalendarEventMetaObject>
  /** Aggregate this property"organizerDisplayName" */
  organizerDisplayName: Maybe<AggregateGoogleCalendarEventorganizerDisplayNameObj>
  /** Aggregate this property"organizerEmail" */
  organizerEmail: Maybe<AggregateGoogleCalendarEventorganizerEmailObj>
  /** Aggregate this property"organizerId" */
  organizerId: Maybe<AggregateGoogleCalendarEventorganizerIdObj>
  /** Aggregate this property"organizerSelf" */
  organizerSelf: Maybe<AggregateGoogleCalendarEventorganizerSelfObj>
  /** Aggregate this property"recurrence" */
  recurrence: Maybe<AggregateGoogleCalendarEventrecurrenceObj>
  /** Aggregate this property"remoteId" */
  remoteId: Maybe<AggregateGoogleCalendarEventremoteIdObj>
  /** Aggregate this property"sequence" */
  sequence: Maybe<AggregateGoogleCalendarEventsequenceObj>
  /** Aggregate this property"sourceId" */
  sourceId: Maybe<AggregateGoogleCalendarEventsourceIdObj>
  /** Aggregate this property"start" */
  start: Maybe<AggregateGoogleCalendarEventstartObj>
  /** Aggregate this property"status" */
  status: Maybe<AggregateGoogleCalendarEventstatusObj>
  /** Aggregate this property"summary" */
  summary: Maybe<AggregateGoogleCalendarEventsummaryObj>
  /** Aggregate this property"title" */
  title: Maybe<AggregateGoogleCalendarEventtitleObj>
  /** Aggregate this property"updatedAt" */
  updatedAt: Maybe<AggregateGoogleCalendarEventupdatedAtObj>
}

/** An object containing the path and value of the grouped property */
export type AggregateGoogleCalendarEventGroupedByObj = {
  __typename?: 'AggregateGoogleCalendarEventGroupedByObj'
  /** The path of the grouped property */
  path: Maybe<Array<Maybe<Scalars['String']['output']>>>
  /** The value of the grouped property */
  value: Maybe<Scalars['String']['output']>
}

export type AggregateGoogleCalendarEventMetaObject = {
  __typename?: 'AggregateGoogleCalendarEventMetaObject'
  count: Maybe<Scalars['Int']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventattachmentsObj = {
  __typename?: 'AggregateGoogleCalendarEventattachmentsObj'
  /**
   * The classes that this object contains a reference to
   * @deprecated Experimental, the format will change
   */
  pointingTo: Maybe<Array<Maybe<Scalars['String']['output']>>>
  /** The datatype of this property */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventcreatedAtObj = {
  __typename?: 'AggregateGoogleCalendarEventcreatedAtObj'
  /** Aggregate on the total amount of found property values */
  count: Maybe<Scalars['Int']['output']>
  /** Aggregate on the maximum of numeric property values */
  maximum: Maybe<Scalars['String']['output']>
  /** Aggregate on the median of numeric property values */
  median: Maybe<Scalars['String']['output']>
  /** Aggregate on the minimum of numeric property values */
  minimum: Maybe<Scalars['String']['output']>
  /** Aggregate on the mode of numeric property values */
  mode: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventcreatorDisplayNameObj = {
  __typename?: 'AggregateGoogleCalendarEventcreatorDisplayNameObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<
      Maybe<AggregateGoogleCalendarEventcreatorDisplayNameTopOccurrencesObj>
    >
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventcreatorDisplayNameObjTopOccurrencesArgs =
  {
    limit?: InputMaybe<Scalars['Int']['input']>
  }

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleCalendarEventcreatorDisplayNameTopOccurrencesObj = {
  __typename?: 'AggregateGoogleCalendarEventcreatorDisplayNameTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventcreatorEmailObj = {
  __typename?: 'AggregateGoogleCalendarEventcreatorEmailObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateGoogleCalendarEventcreatorEmailTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventcreatorEmailObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleCalendarEventcreatorEmailTopOccurrencesObj = {
  __typename?: 'AggregateGoogleCalendarEventcreatorEmailTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventcreatorIdObj = {
  __typename?: 'AggregateGoogleCalendarEventcreatorIdObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateGoogleCalendarEventcreatorIdTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventcreatorIdObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleCalendarEventcreatorIdTopOccurrencesObj = {
  __typename?: 'AggregateGoogleCalendarEventcreatorIdTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventcreatorSelfObj = {
  __typename?: 'AggregateGoogleCalendarEventcreatorSelfObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** The percentage of false values for this boolean property in the dataset */
  percentageFalse: Maybe<Scalars['Float']['output']>
  /** The percentage of true values for this boolean property in the dataset */
  percentageTrue: Maybe<Scalars['Float']['output']>
  /** How often this boolean property's value is false in the dataset */
  totalFalse: Maybe<Scalars['Int']['output']>
  /** How often this boolean property's value is true in the dataset */
  totalTrue: Maybe<Scalars['Int']['output']>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventdescriptionHtmlObj = {
  __typename?: 'AggregateGoogleCalendarEventdescriptionHtmlObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateGoogleCalendarEventdescriptionHtmlTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventdescriptionHtmlObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleCalendarEventdescriptionHtmlTopOccurrencesObj = {
  __typename?: 'AggregateGoogleCalendarEventdescriptionHtmlTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventdescriptionTextObj = {
  __typename?: 'AggregateGoogleCalendarEventdescriptionTextObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateGoogleCalendarEventdescriptionTextTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventdescriptionTextObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleCalendarEventdescriptionTextTopOccurrencesObj = {
  __typename?: 'AggregateGoogleCalendarEventdescriptionTextTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventendObj = {
  __typename?: 'AggregateGoogleCalendarEventendObj'
  /** Aggregate on the total amount of found property values */
  count: Maybe<Scalars['Int']['output']>
  /** Aggregate on the maximum of numeric property values */
  maximum: Maybe<Scalars['String']['output']>
  /** Aggregate on the median of numeric property values */
  median: Maybe<Scalars['String']['output']>
  /** Aggregate on the minimum of numeric property values */
  minimum: Maybe<Scalars['String']['output']>
  /** Aggregate on the mode of numeric property values */
  mode: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventhtmlLinkObj = {
  __typename?: 'AggregateGoogleCalendarEventhtmlLinkObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateGoogleCalendarEventhtmlLinkTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventhtmlLinkObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleCalendarEventhtmlLinkTopOccurrencesObj = {
  __typename?: 'AggregateGoogleCalendarEventhtmlLinkTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventlocationObj = {
  __typename?: 'AggregateGoogleCalendarEventlocationObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateGoogleCalendarEventlocationTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventlocationObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleCalendarEventlocationTopOccurrencesObj = {
  __typename?: 'AggregateGoogleCalendarEventlocationTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventorganizerDisplayNameObj = {
  __typename?: 'AggregateGoogleCalendarEventorganizerDisplayNameObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<
      Maybe<AggregateGoogleCalendarEventorganizerDisplayNameTopOccurrencesObj>
    >
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventorganizerDisplayNameObjTopOccurrencesArgs =
  {
    limit?: InputMaybe<Scalars['Int']['input']>
  }

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleCalendarEventorganizerDisplayNameTopOccurrencesObj =
  {
    __typename?: 'AggregateGoogleCalendarEventorganizerDisplayNameTopOccurrencesObj'
    /** How often the most frequently occurring value for this property occurs */
    occurs: Maybe<Scalars['Int']['output']>
    /** The most frequently occurring value for this property */
    value: Maybe<Scalars['String']['output']>
  }

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventorganizerEmailObj = {
  __typename?: 'AggregateGoogleCalendarEventorganizerEmailObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateGoogleCalendarEventorganizerEmailTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventorganizerEmailObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleCalendarEventorganizerEmailTopOccurrencesObj = {
  __typename?: 'AggregateGoogleCalendarEventorganizerEmailTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventorganizerIdObj = {
  __typename?: 'AggregateGoogleCalendarEventorganizerIdObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateGoogleCalendarEventorganizerIdTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventorganizerIdObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleCalendarEventorganizerIdTopOccurrencesObj = {
  __typename?: 'AggregateGoogleCalendarEventorganizerIdTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventorganizerSelfObj = {
  __typename?: 'AggregateGoogleCalendarEventorganizerSelfObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** The percentage of false values for this boolean property in the dataset */
  percentageFalse: Maybe<Scalars['Float']['output']>
  /** The percentage of true values for this boolean property in the dataset */
  percentageTrue: Maybe<Scalars['Float']['output']>
  /** How often this boolean property's value is false in the dataset */
  totalFalse: Maybe<Scalars['Int']['output']>
  /** How often this boolean property's value is true in the dataset */
  totalTrue: Maybe<Scalars['Int']['output']>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventrecurrenceObj = {
  __typename?: 'AggregateGoogleCalendarEventrecurrenceObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateGoogleCalendarEventrecurrenceTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventrecurrenceObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleCalendarEventrecurrenceTopOccurrencesObj = {
  __typename?: 'AggregateGoogleCalendarEventrecurrenceTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventremoteIdObj = {
  __typename?: 'AggregateGoogleCalendarEventremoteIdObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateGoogleCalendarEventremoteIdTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventremoteIdObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleCalendarEventremoteIdTopOccurrencesObj = {
  __typename?: 'AggregateGoogleCalendarEventremoteIdTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventsequenceObj = {
  __typename?: 'AggregateGoogleCalendarEventsequenceObj'
  /** Aggregate on the total amount of found property values */
  count: Maybe<Scalars['Int']['output']>
  /** Aggregate on the maximum of numeric property values */
  maximum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the mean of numeric property values */
  mean: Maybe<Scalars['Float']['output']>
  /** Aggregate on the median of numeric property values */
  median: Maybe<Scalars['Float']['output']>
  /** Aggregate on the minimum of numeric property values */
  minimum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the mode of numeric property values */
  mode: Maybe<Scalars['Float']['output']>
  /** Aggregate on the sum of numeric property values */
  sum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventsourceIdObj = {
  __typename?: 'AggregateGoogleCalendarEventsourceIdObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateGoogleCalendarEventsourceIdTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventsourceIdObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleCalendarEventsourceIdTopOccurrencesObj = {
  __typename?: 'AggregateGoogleCalendarEventsourceIdTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventstartObj = {
  __typename?: 'AggregateGoogleCalendarEventstartObj'
  /** Aggregate on the total amount of found property values */
  count: Maybe<Scalars['Int']['output']>
  /** Aggregate on the maximum of numeric property values */
  maximum: Maybe<Scalars['String']['output']>
  /** Aggregate on the median of numeric property values */
  median: Maybe<Scalars['String']['output']>
  /** Aggregate on the minimum of numeric property values */
  minimum: Maybe<Scalars['String']['output']>
  /** Aggregate on the mode of numeric property values */
  mode: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventstatusObj = {
  __typename?: 'AggregateGoogleCalendarEventstatusObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateGoogleCalendarEventstatusTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventstatusObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleCalendarEventstatusTopOccurrencesObj = {
  __typename?: 'AggregateGoogleCalendarEventstatusTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventsummaryObj = {
  __typename?: 'AggregateGoogleCalendarEventsummaryObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateGoogleCalendarEventsummaryTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventsummaryObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleCalendarEventsummaryTopOccurrencesObj = {
  __typename?: 'AggregateGoogleCalendarEventsummaryTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventtitleObj = {
  __typename?: 'AggregateGoogleCalendarEventtitleObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateGoogleCalendarEventtitleTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventtitleObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleCalendarEventtitleTopOccurrencesObj = {
  __typename?: 'AggregateGoogleCalendarEventtitleTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleCalendarEventupdatedAtObj = {
  __typename?: 'AggregateGoogleCalendarEventupdatedAtObj'
  /** Aggregate on the total amount of found property values */
  count: Maybe<Scalars['Int']['output']>
  /** Aggregate on the maximum of numeric property values */
  maximum: Maybe<Scalars['String']['output']>
  /** Aggregate on the median of numeric property values */
  median: Maybe<Scalars['String']['output']>
  /** Aggregate on the minimum of numeric property values */
  minimum: Maybe<Scalars['String']['output']>
  /** Aggregate on the mode of numeric property values */
  mode: Maybe<Scalars['String']['output']>
}

export type AggregateGoogleDoc = {
  __typename?: 'AggregateGoogleDoc'
  /** Aggregate this property"blocks" */
  blocks: Maybe<AggregateGoogleDocblocksObj>
  /** Aggregate this property"createdAt" */
  createdAt: Maybe<AggregateGoogleDoccreatedAtObj>
  /** Indicates the group of returned data */
  groupedBy: Maybe<AggregateGoogleDocGroupedByObj>
  /** Aggregate this property"html" */
  html: Maybe<AggregateGoogleDochtmlObj>
  /** Aggregate this property"mentions" */
  mentions: Maybe<AggregateGoogleDocmentionsObj>
  /** An object used to Get Meta information about Objects on a local Weaviate */
  meta: Maybe<AggregateGoogleDocMetaObject>
  /** Aggregate this property"mimeType" */
  mimeType: Maybe<AggregateGoogleDocmimeTypeObj>
  /** Aggregate this property"modifiedAt" */
  modifiedAt: Maybe<AggregateGoogleDocmodifiedAtObj>
  /** Aggregate this property"originalName" */
  originalName: Maybe<AggregateGoogleDocoriginalNameObj>
  /** Aggregate this property"path" */
  path: Maybe<AggregateGoogleDocpathObj>
  /** Aggregate this property"pathString" */
  pathString: Maybe<AggregateGoogleDocpathStringObj>
  /** Aggregate this property"remoteId" */
  remoteId: Maybe<AggregateGoogleDocremoteIdObj>
  /** Aggregate this property"size" */
  size: Maybe<AggregateGoogleDocsizeObj>
  /** Aggregate this property"slug" */
  slug: Maybe<AggregateGoogleDocslugObj>
  /** Aggregate this property"sourceId" */
  sourceId: Maybe<AggregateGoogleDocsourceIdObj>
  /** Aggregate this property"subtitle" */
  subtitle: Maybe<AggregateGoogleDocsubtitleObj>
  /** Aggregate this property"summary" */
  summary: Maybe<AggregateGoogleDocsummaryObj>
  /** Aggregate this property"tags" */
  tags: Maybe<AggregateGoogleDoctagsObj>
  /** Aggregate this property"text" */
  text: Maybe<AggregateGoogleDoctextObj>
  /** Aggregate this property"title" */
  title: Maybe<AggregateGoogleDoctitleObj>
  /** Aggregate this property"toc" */
  toc: Maybe<AggregateGoogleDoctocObj>
}

/** An object containing the path and value of the grouped property */
export type AggregateGoogleDocGroupedByObj = {
  __typename?: 'AggregateGoogleDocGroupedByObj'
  /** The path of the grouped property */
  path: Maybe<Array<Maybe<Scalars['String']['output']>>>
  /** The value of the grouped property */
  value: Maybe<Scalars['String']['output']>
}

export type AggregateGoogleDocMetaObject = {
  __typename?: 'AggregateGoogleDocMetaObject'
  count: Maybe<Scalars['Int']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocblocksObj = {
  __typename?: 'AggregateGoogleDocblocksObj'
  /**
   * The classes that this object contains a reference to
   * @deprecated Experimental, the format will change
   */
  pointingTo: Maybe<Array<Maybe<Scalars['String']['output']>>>
  /** The datatype of this property */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDoccreatedAtObj = {
  __typename?: 'AggregateGoogleDoccreatedAtObj'
  /** Aggregate on the total amount of found property values */
  count: Maybe<Scalars['Int']['output']>
  /** Aggregate on the maximum of numeric property values */
  maximum: Maybe<Scalars['String']['output']>
  /** Aggregate on the median of numeric property values */
  median: Maybe<Scalars['String']['output']>
  /** Aggregate on the minimum of numeric property values */
  minimum: Maybe<Scalars['String']['output']>
  /** Aggregate on the mode of numeric property values */
  mode: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDochtmlObj = {
  __typename?: 'AggregateGoogleDochtmlObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<Array<Maybe<AggregateGoogleDochtmlTopOccurrencesObj>>>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDochtmlObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleDochtmlTopOccurrencesObj = {
  __typename?: 'AggregateGoogleDochtmlTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocmentionsObj = {
  __typename?: 'AggregateGoogleDocmentionsObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateGoogleDocmentionsTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocmentionsObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleDocmentionsTopOccurrencesObj = {
  __typename?: 'AggregateGoogleDocmentionsTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocmimeTypeObj = {
  __typename?: 'AggregateGoogleDocmimeTypeObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateGoogleDocmimeTypeTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocmimeTypeObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleDocmimeTypeTopOccurrencesObj = {
  __typename?: 'AggregateGoogleDocmimeTypeTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocmodifiedAtObj = {
  __typename?: 'AggregateGoogleDocmodifiedAtObj'
  /** Aggregate on the total amount of found property values */
  count: Maybe<Scalars['Int']['output']>
  /** Aggregate on the maximum of numeric property values */
  maximum: Maybe<Scalars['String']['output']>
  /** Aggregate on the median of numeric property values */
  median: Maybe<Scalars['String']['output']>
  /** Aggregate on the minimum of numeric property values */
  minimum: Maybe<Scalars['String']['output']>
  /** Aggregate on the mode of numeric property values */
  mode: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocoriginalNameObj = {
  __typename?: 'AggregateGoogleDocoriginalNameObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateGoogleDocoriginalNameTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocoriginalNameObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleDocoriginalNameTopOccurrencesObj = {
  __typename?: 'AggregateGoogleDocoriginalNameTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocpathObj = {
  __typename?: 'AggregateGoogleDocpathObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<Array<Maybe<AggregateGoogleDocpathTopOccurrencesObj>>>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocpathObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocpathStringObj = {
  __typename?: 'AggregateGoogleDocpathStringObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateGoogleDocpathStringTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocpathStringObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleDocpathStringTopOccurrencesObj = {
  __typename?: 'AggregateGoogleDocpathStringTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleDocpathTopOccurrencesObj = {
  __typename?: 'AggregateGoogleDocpathTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocremoteIdObj = {
  __typename?: 'AggregateGoogleDocremoteIdObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateGoogleDocremoteIdTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocremoteIdObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleDocremoteIdTopOccurrencesObj = {
  __typename?: 'AggregateGoogleDocremoteIdTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocsizeObj = {
  __typename?: 'AggregateGoogleDocsizeObj'
  /** Aggregate on the total amount of found property values */
  count: Maybe<Scalars['Int']['output']>
  /** Aggregate on the maximum of numeric property values */
  maximum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the mean of numeric property values */
  mean: Maybe<Scalars['Float']['output']>
  /** Aggregate on the median of numeric property values */
  median: Maybe<Scalars['Float']['output']>
  /** Aggregate on the minimum of numeric property values */
  minimum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the mode of numeric property values */
  mode: Maybe<Scalars['Float']['output']>
  /** Aggregate on the sum of numeric property values */
  sum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocslugObj = {
  __typename?: 'AggregateGoogleDocslugObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<Array<Maybe<AggregateGoogleDocslugTopOccurrencesObj>>>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocslugObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleDocslugTopOccurrencesObj = {
  __typename?: 'AggregateGoogleDocslugTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocsourceIdObj = {
  __typename?: 'AggregateGoogleDocsourceIdObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateGoogleDocsourceIdTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocsourceIdObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleDocsourceIdTopOccurrencesObj = {
  __typename?: 'AggregateGoogleDocsourceIdTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocsubtitleObj = {
  __typename?: 'AggregateGoogleDocsubtitleObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateGoogleDocsubtitleTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocsubtitleObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleDocsubtitleTopOccurrencesObj = {
  __typename?: 'AggregateGoogleDocsubtitleTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocsummaryObj = {
  __typename?: 'AggregateGoogleDocsummaryObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateGoogleDocsummaryTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDocsummaryObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleDocsummaryTopOccurrencesObj = {
  __typename?: 'AggregateGoogleDocsummaryTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDoctagsObj = {
  __typename?: 'AggregateGoogleDoctagsObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<Array<Maybe<AggregateGoogleDoctagsTopOccurrencesObj>>>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDoctagsObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleDoctagsTopOccurrencesObj = {
  __typename?: 'AggregateGoogleDoctagsTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDoctextObj = {
  __typename?: 'AggregateGoogleDoctextObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<Array<Maybe<AggregateGoogleDoctextTopOccurrencesObj>>>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDoctextObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleDoctextTopOccurrencesObj = {
  __typename?: 'AggregateGoogleDoctextTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDoctitleObj = {
  __typename?: 'AggregateGoogleDoctitleObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<Array<Maybe<AggregateGoogleDoctitleTopOccurrencesObj>>>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDoctitleObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleDoctitleTopOccurrencesObj = {
  __typename?: 'AggregateGoogleDoctitleTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDoctocObj = {
  __typename?: 'AggregateGoogleDoctocObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<Array<Maybe<AggregateGoogleDoctocTopOccurrencesObj>>>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateGoogleDoctocObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateGoogleDoctocTopOccurrencesObj = {
  __typename?: 'AggregateGoogleDoctocTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

export type AggregateImageBlock = {
  __typename?: 'AggregateImageBlock'
  /** Aggregate this property"alt" */
  alt: Maybe<AggregateImageBlockaltObj>
  /** Aggregate this property"createdAt" */
  createdAt: Maybe<AggregateImageBlockcreatedAtObj>
  /** Aggregate this property"document" */
  document: Maybe<AggregateImageBlockdocumentObj>
  /** Aggregate this property"ext" */
  ext: Maybe<AggregateImageBlockextObj>
  /** Indicates the group of returned data */
  groupedBy: Maybe<AggregateImageBlockGroupedByObj>
  /** Aggregate this property"height" */
  height: Maybe<AggregateImageBlockheightObj>
  /** An object used to Get Meta information about Objects on a local Weaviate */
  meta: Maybe<AggregateImageBlockMetaObject>
  /** Aggregate this property"mimeType" */
  mimeType: Maybe<AggregateImageBlockmimeTypeObj>
  /** Aggregate this property"modifiedAt" */
  modifiedAt: Maybe<AggregateImageBlockmodifiedAtObj>
  /** Aggregate this property"order" */
  order: Maybe<AggregateImageBlockorderObj>
  /** Aggregate this property"originalName" */
  originalName: Maybe<AggregateImageBlockoriginalNameObj>
  /** Aggregate this property"path" */
  path: Maybe<AggregateImageBlockpathObj>
  /** Aggregate this property"pathString" */
  pathString: Maybe<AggregateImageBlockpathStringObj>
  /** Aggregate this property"remoteId" */
  remoteId: Maybe<AggregateImageBlockremoteIdObj>
  /** Aggregate this property"size" */
  size: Maybe<AggregateImageBlocksizeObj>
  /** Aggregate this property"sourceId" */
  sourceId: Maybe<AggregateImageBlocksourceIdObj>
  /** Aggregate this property"title" */
  title: Maybe<AggregateImageBlocktitleObj>
  /** Aggregate this property"url" */
  url: Maybe<AggregateImageBlockurlObj>
  /** Aggregate this property"width" */
  width: Maybe<AggregateImageBlockwidthObj>
}

/** An object containing the path and value of the grouped property */
export type AggregateImageBlockGroupedByObj = {
  __typename?: 'AggregateImageBlockGroupedByObj'
  /** The path of the grouped property */
  path: Maybe<Array<Maybe<Scalars['String']['output']>>>
  /** The value of the grouped property */
  value: Maybe<Scalars['String']['output']>
}

export type AggregateImageBlockMetaObject = {
  __typename?: 'AggregateImageBlockMetaObject'
  count: Maybe<Scalars['Int']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlockaltObj = {
  __typename?: 'AggregateImageBlockaltObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<Array<Maybe<AggregateImageBlockaltTopOccurrencesObj>>>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlockaltObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateImageBlockaltTopOccurrencesObj = {
  __typename?: 'AggregateImageBlockaltTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlockcreatedAtObj = {
  __typename?: 'AggregateImageBlockcreatedAtObj'
  /** Aggregate on the total amount of found property values */
  count: Maybe<Scalars['Int']['output']>
  /** Aggregate on the maximum of numeric property values */
  maximum: Maybe<Scalars['String']['output']>
  /** Aggregate on the median of numeric property values */
  median: Maybe<Scalars['String']['output']>
  /** Aggregate on the minimum of numeric property values */
  minimum: Maybe<Scalars['String']['output']>
  /** Aggregate on the mode of numeric property values */
  mode: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlockdocumentObj = {
  __typename?: 'AggregateImageBlockdocumentObj'
  /**
   * The classes that this object contains a reference to
   * @deprecated Experimental, the format will change
   */
  pointingTo: Maybe<Array<Maybe<Scalars['String']['output']>>>
  /** The datatype of this property */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlockextObj = {
  __typename?: 'AggregateImageBlockextObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<Array<Maybe<AggregateImageBlockextTopOccurrencesObj>>>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlockextObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateImageBlockextTopOccurrencesObj = {
  __typename?: 'AggregateImageBlockextTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlockheightObj = {
  __typename?: 'AggregateImageBlockheightObj'
  /** Aggregate on the total amount of found property values */
  count: Maybe<Scalars['Int']['output']>
  /** Aggregate on the maximum of numeric property values */
  maximum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the mean of numeric property values */
  mean: Maybe<Scalars['Float']['output']>
  /** Aggregate on the median of numeric property values */
  median: Maybe<Scalars['Float']['output']>
  /** Aggregate on the minimum of numeric property values */
  minimum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the mode of numeric property values */
  mode: Maybe<Scalars['Float']['output']>
  /** Aggregate on the sum of numeric property values */
  sum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlockmimeTypeObj = {
  __typename?: 'AggregateImageBlockmimeTypeObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateImageBlockmimeTypeTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlockmimeTypeObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateImageBlockmimeTypeTopOccurrencesObj = {
  __typename?: 'AggregateImageBlockmimeTypeTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlockmodifiedAtObj = {
  __typename?: 'AggregateImageBlockmodifiedAtObj'
  /** Aggregate on the total amount of found property values */
  count: Maybe<Scalars['Int']['output']>
  /** Aggregate on the maximum of numeric property values */
  maximum: Maybe<Scalars['String']['output']>
  /** Aggregate on the median of numeric property values */
  median: Maybe<Scalars['String']['output']>
  /** Aggregate on the minimum of numeric property values */
  minimum: Maybe<Scalars['String']['output']>
  /** Aggregate on the mode of numeric property values */
  mode: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlockorderObj = {
  __typename?: 'AggregateImageBlockorderObj'
  /** Aggregate on the total amount of found property values */
  count: Maybe<Scalars['Int']['output']>
  /** Aggregate on the maximum of numeric property values */
  maximum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the mean of numeric property values */
  mean: Maybe<Scalars['Float']['output']>
  /** Aggregate on the median of numeric property values */
  median: Maybe<Scalars['Float']['output']>
  /** Aggregate on the minimum of numeric property values */
  minimum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the mode of numeric property values */
  mode: Maybe<Scalars['Float']['output']>
  /** Aggregate on the sum of numeric property values */
  sum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlockoriginalNameObj = {
  __typename?: 'AggregateImageBlockoriginalNameObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateImageBlockoriginalNameTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlockoriginalNameObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateImageBlockoriginalNameTopOccurrencesObj = {
  __typename?: 'AggregateImageBlockoriginalNameTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlockpathObj = {
  __typename?: 'AggregateImageBlockpathObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<Array<Maybe<AggregateImageBlockpathTopOccurrencesObj>>>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlockpathObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlockpathStringObj = {
  __typename?: 'AggregateImageBlockpathStringObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateImageBlockpathStringTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlockpathStringObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateImageBlockpathStringTopOccurrencesObj = {
  __typename?: 'AggregateImageBlockpathStringTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateImageBlockpathTopOccurrencesObj = {
  __typename?: 'AggregateImageBlockpathTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlockremoteIdObj = {
  __typename?: 'AggregateImageBlockremoteIdObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateImageBlockremoteIdTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlockremoteIdObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateImageBlockremoteIdTopOccurrencesObj = {
  __typename?: 'AggregateImageBlockremoteIdTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlocksizeObj = {
  __typename?: 'AggregateImageBlocksizeObj'
  /** Aggregate on the total amount of found property values */
  count: Maybe<Scalars['Int']['output']>
  /** Aggregate on the maximum of numeric property values */
  maximum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the mean of numeric property values */
  mean: Maybe<Scalars['Float']['output']>
  /** Aggregate on the median of numeric property values */
  median: Maybe<Scalars['Float']['output']>
  /** Aggregate on the minimum of numeric property values */
  minimum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the mode of numeric property values */
  mode: Maybe<Scalars['Float']['output']>
  /** Aggregate on the sum of numeric property values */
  sum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlocksourceIdObj = {
  __typename?: 'AggregateImageBlocksourceIdObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateImageBlocksourceIdTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlocksourceIdObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateImageBlocksourceIdTopOccurrencesObj = {
  __typename?: 'AggregateImageBlocksourceIdTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlocktitleObj = {
  __typename?: 'AggregateImageBlocktitleObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<Array<Maybe<AggregateImageBlocktitleTopOccurrencesObj>>>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlocktitleObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateImageBlocktitleTopOccurrencesObj = {
  __typename?: 'AggregateImageBlocktitleTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlockurlObj = {
  __typename?: 'AggregateImageBlockurlObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<Array<Maybe<AggregateImageBlockurlTopOccurrencesObj>>>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlockurlObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateImageBlockurlTopOccurrencesObj = {
  __typename?: 'AggregateImageBlockurlTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateImageBlockwidthObj = {
  __typename?: 'AggregateImageBlockwidthObj'
  /** Aggregate on the total amount of found property values */
  count: Maybe<Scalars['Int']['output']>
  /** Aggregate on the maximum of numeric property values */
  maximum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the mean of numeric property values */
  mean: Maybe<Scalars['Float']['output']>
  /** Aggregate on the median of numeric property values */
  median: Maybe<Scalars['Float']['output']>
  /** Aggregate on the minimum of numeric property values */
  minimum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the mode of numeric property values */
  mode: Maybe<Scalars['Float']['output']>
  /** Aggregate on the sum of numeric property values */
  sum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** Hybrid search */
export type AggregateObjectsAudioFileHybridInpObj = {
  /** Search weight */
  alpha?: InputMaybe<Scalars['Float']['input']>
  /** Query string */
  query?: InputMaybe<Scalars['String']['input']>
  /** Vector search */
  vector?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
}

export type AggregateObjectsAudioFileNearObjectInpObj = {
  /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
  beacon?: InputMaybe<Scalars['String']['input']>
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Concept identifier in the uuid format */
  id?: InputMaybe<Scalars['String']['input']>
}

export type AggregateObjectsAudioFileNearVectorInpObj = {
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Target vector to be used in kNN search */
  vector: Array<InputMaybe<Scalars['Float']['input']>>
}

export type AggregateObjectsAudioFileWhereGeoRangeDistanceInpObj = {
  /** The maximum distance from the point specified geoCoordinates. */
  max: Scalars['Float']['input']
}

export type AggregateObjectsAudioFileWhereGeoRangeGeoCoordinatesInpObj = {
  /** The latitude (in decimal format) of the geoCoordinates to search around. */
  latitude: Scalars['Float']['input']
  /** The longitude (in decimal format) of the geoCoordinates to search around. */
  longitude: Scalars['Float']['input']
}

export type AggregateObjectsAudioFileWhereGeoRangeInpObj = {
  /** The distance from the point specified via geoCoordinates. */
  distance: AggregateObjectsAudioFileWhereGeoRangeDistanceInpObj
  /** The geoCoordinates that form the center point of the search. */
  geoCoordinates: AggregateObjectsAudioFileWhereGeoRangeGeoCoordinatesInpObj
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type AggregateObjectsAudioFileWhereInpObj = {
  /** Contains the Operands that can be applied to a 'where' filter */
  operands?: InputMaybe<
    Array<InputMaybe<AggregateObjectsAudioFileWhereOperandsInpObj>>
  >
  /** Contains the Operators that can be applied to a 'where' filter */
  operator?: InputMaybe<AggregateObjectsAudioFileWhereOperatorEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Specify a Boolean value that the target property will be compared to */
  valueBoolean?: InputMaybe<
    Scalars['BooleanAggregateObjectsAudioFile']['input']
  >
  /** Specify a String value that the target property will be compared to */
  valueDate?: InputMaybe<Scalars['TextDateAggregateObjectsAudioFile']['input']>
  /** Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point. */
  valueGeoRange?: InputMaybe<AggregateObjectsAudioFileWhereGeoRangeInpObj>
  /** Specify an Integer value that the target property will be compared to */
  valueInt?: InputMaybe<Scalars['IntAggregateObjectsAudioFile']['input']>
  /** Specify a Float value that the target property will be compared to */
  valueNumber?: InputMaybe<Scalars['FloatAggregateObjectsAudioFile']['input']>
  /** Specify a String value that the target property will be compared to */
  valueString?: InputMaybe<
    Scalars['TextStringAggregateObjectsAudioFile']['input']
  >
  /** Specify a Text value that the target property will be compared to */
  valueText?: InputMaybe<Scalars['TextAggregateObjectsAudioFile']['input']>
}

/** An object containing the Operands that can be applied to a 'where' filter */
export type AggregateObjectsAudioFileWhereOperandsInpObj = {
  /** Contains the Operands that can be applied to a 'where' filter */
  operands?: InputMaybe<
    Array<InputMaybe<AggregateObjectsAudioFileWhereOperandsInpObj>>
  >
  /** Contains the Operators that can be applied to a 'where' filter */
  operator?: InputMaybe<AggregateObjectsAudioFileWhereOperatorEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Specify a Boolean value that the target property will be compared to */
  valueBoolean?: InputMaybe<
    Scalars['BooleanAggregateObjectsAudioFile']['input']
  >
  /** Specify a String value that the target property will be compared to */
  valueDate?: InputMaybe<Scalars['TextDateAggregateObjectsAudioFile']['input']>
  /** Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point. */
  valueGeoRange?: InputMaybe<AggregateObjectsAudioFileWhereGeoRangeInpObj>
  /** Specify an Integer value that the target property will be compared to */
  valueInt?: InputMaybe<Scalars['IntAggregateObjectsAudioFile']['input']>
  /** Specify a Float value that the target property will be compared to */
  valueNumber?: InputMaybe<Scalars['FloatAggregateObjectsAudioFile']['input']>
  /** Specify a String value that the target property will be compared to */
  valueString?: InputMaybe<
    Scalars['TextStringAggregateObjectsAudioFile']['input']
  >
  /** Specify a Text value that the target property will be compared to */
  valueText?: InputMaybe<Scalars['TextAggregateObjectsAudioFile']['input']>
}

/** An object containing the Operators that can be applied to a 'where' filter */
export type AggregateObjectsAudioFileWhereOperatorEnum =
  | 'And'
  | 'ContainsAll'
  | 'ContainsAny'
  | 'Equal'
  | 'GreaterThan'
  | 'GreaterThanEqual'
  | 'IsNull'
  | 'LessThan'
  | 'LessThanEqual'
  | 'Like'
  | 'Not'
  | 'NotEqual'
  | 'Or'
  | 'WithinGeoRange'

/** Hybrid search */
export type AggregateObjectsGoogleCalendarEventHybridInpObj = {
  /** Search weight */
  alpha?: InputMaybe<Scalars['Float']['input']>
  /** Query string */
  query?: InputMaybe<Scalars['String']['input']>
  /** Vector search */
  vector?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
}

export type AggregateObjectsGoogleCalendarEventNearObjectInpObj = {
  /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
  beacon?: InputMaybe<Scalars['String']['input']>
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Concept identifier in the uuid format */
  id?: InputMaybe<Scalars['String']['input']>
}

export type AggregateObjectsGoogleCalendarEventNearVectorInpObj = {
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Target vector to be used in kNN search */
  vector: Array<InputMaybe<Scalars['Float']['input']>>
}

export type AggregateObjectsGoogleCalendarEventWhereGeoRangeDistanceInpObj = {
  /** The maximum distance from the point specified geoCoordinates. */
  max: Scalars['Float']['input']
}

export type AggregateObjectsGoogleCalendarEventWhereGeoRangeGeoCoordinatesInpObj =
  {
    /** The latitude (in decimal format) of the geoCoordinates to search around. */
    latitude: Scalars['Float']['input']
    /** The longitude (in decimal format) of the geoCoordinates to search around. */
    longitude: Scalars['Float']['input']
  }

export type AggregateObjectsGoogleCalendarEventWhereGeoRangeInpObj = {
  /** The distance from the point specified via geoCoordinates. */
  distance: AggregateObjectsGoogleCalendarEventWhereGeoRangeDistanceInpObj
  /** The geoCoordinates that form the center point of the search. */
  geoCoordinates: AggregateObjectsGoogleCalendarEventWhereGeoRangeGeoCoordinatesInpObj
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type AggregateObjectsGoogleCalendarEventWhereInpObj = {
  /** Contains the Operands that can be applied to a 'where' filter */
  operands?: InputMaybe<
    Array<InputMaybe<AggregateObjectsGoogleCalendarEventWhereOperandsInpObj>>
  >
  /** Contains the Operators that can be applied to a 'where' filter */
  operator?: InputMaybe<AggregateObjectsGoogleCalendarEventWhereOperatorEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Specify a Boolean value that the target property will be compared to */
  valueBoolean?: InputMaybe<
    Scalars['BooleanAggregateObjectsGoogleCalendarEvent']['input']
  >
  /** Specify a String value that the target property will be compared to */
  valueDate?: InputMaybe<
    Scalars['TextDateAggregateObjectsGoogleCalendarEvent']['input']
  >
  /** Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point. */
  valueGeoRange?: InputMaybe<AggregateObjectsGoogleCalendarEventWhereGeoRangeInpObj>
  /** Specify an Integer value that the target property will be compared to */
  valueInt?: InputMaybe<
    Scalars['IntAggregateObjectsGoogleCalendarEvent']['input']
  >
  /** Specify a Float value that the target property will be compared to */
  valueNumber?: InputMaybe<
    Scalars['FloatAggregateObjectsGoogleCalendarEvent']['input']
  >
  /** Specify a String value that the target property will be compared to */
  valueString?: InputMaybe<
    Scalars['TextStringAggregateObjectsGoogleCalendarEvent']['input']
  >
  /** Specify a Text value that the target property will be compared to */
  valueText?: InputMaybe<
    Scalars['TextAggregateObjectsGoogleCalendarEvent']['input']
  >
}

/** An object containing the Operands that can be applied to a 'where' filter */
export type AggregateObjectsGoogleCalendarEventWhereOperandsInpObj = {
  /** Contains the Operands that can be applied to a 'where' filter */
  operands?: InputMaybe<
    Array<InputMaybe<AggregateObjectsGoogleCalendarEventWhereOperandsInpObj>>
  >
  /** Contains the Operators that can be applied to a 'where' filter */
  operator?: InputMaybe<AggregateObjectsGoogleCalendarEventWhereOperatorEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Specify a Boolean value that the target property will be compared to */
  valueBoolean?: InputMaybe<
    Scalars['BooleanAggregateObjectsGoogleCalendarEvent']['input']
  >
  /** Specify a String value that the target property will be compared to */
  valueDate?: InputMaybe<
    Scalars['TextDateAggregateObjectsGoogleCalendarEvent']['input']
  >
  /** Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point. */
  valueGeoRange?: InputMaybe<AggregateObjectsGoogleCalendarEventWhereGeoRangeInpObj>
  /** Specify an Integer value that the target property will be compared to */
  valueInt?: InputMaybe<
    Scalars['IntAggregateObjectsGoogleCalendarEvent']['input']
  >
  /** Specify a Float value that the target property will be compared to */
  valueNumber?: InputMaybe<
    Scalars['FloatAggregateObjectsGoogleCalendarEvent']['input']
  >
  /** Specify a String value that the target property will be compared to */
  valueString?: InputMaybe<
    Scalars['TextStringAggregateObjectsGoogleCalendarEvent']['input']
  >
  /** Specify a Text value that the target property will be compared to */
  valueText?: InputMaybe<
    Scalars['TextAggregateObjectsGoogleCalendarEvent']['input']
  >
}

/** An object containing the Operators that can be applied to a 'where' filter */
export type AggregateObjectsGoogleCalendarEventWhereOperatorEnum =
  | 'And'
  | 'ContainsAll'
  | 'ContainsAny'
  | 'Equal'
  | 'GreaterThan'
  | 'GreaterThanEqual'
  | 'IsNull'
  | 'LessThan'
  | 'LessThanEqual'
  | 'Like'
  | 'Not'
  | 'NotEqual'
  | 'Or'
  | 'WithinGeoRange'

/** Hybrid search */
export type AggregateObjectsGoogleDocHybridInpObj = {
  /** Search weight */
  alpha?: InputMaybe<Scalars['Float']['input']>
  /** Query string */
  query?: InputMaybe<Scalars['String']['input']>
  /** Vector search */
  vector?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
}

export type AggregateObjectsGoogleDocNearObjectInpObj = {
  /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
  beacon?: InputMaybe<Scalars['String']['input']>
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Concept identifier in the uuid format */
  id?: InputMaybe<Scalars['String']['input']>
}

export type AggregateObjectsGoogleDocNearVectorInpObj = {
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Target vector to be used in kNN search */
  vector: Array<InputMaybe<Scalars['Float']['input']>>
}

export type AggregateObjectsGoogleDocWhereGeoRangeDistanceInpObj = {
  /** The maximum distance from the point specified geoCoordinates. */
  max: Scalars['Float']['input']
}

export type AggregateObjectsGoogleDocWhereGeoRangeGeoCoordinatesInpObj = {
  /** The latitude (in decimal format) of the geoCoordinates to search around. */
  latitude: Scalars['Float']['input']
  /** The longitude (in decimal format) of the geoCoordinates to search around. */
  longitude: Scalars['Float']['input']
}

export type AggregateObjectsGoogleDocWhereGeoRangeInpObj = {
  /** The distance from the point specified via geoCoordinates. */
  distance: AggregateObjectsGoogleDocWhereGeoRangeDistanceInpObj
  /** The geoCoordinates that form the center point of the search. */
  geoCoordinates: AggregateObjectsGoogleDocWhereGeoRangeGeoCoordinatesInpObj
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type AggregateObjectsGoogleDocWhereInpObj = {
  /** Contains the Operands that can be applied to a 'where' filter */
  operands?: InputMaybe<
    Array<InputMaybe<AggregateObjectsGoogleDocWhereOperandsInpObj>>
  >
  /** Contains the Operators that can be applied to a 'where' filter */
  operator?: InputMaybe<AggregateObjectsGoogleDocWhereOperatorEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Specify a Boolean value that the target property will be compared to */
  valueBoolean?: InputMaybe<
    Scalars['BooleanAggregateObjectsGoogleDoc']['input']
  >
  /** Specify a String value that the target property will be compared to */
  valueDate?: InputMaybe<Scalars['TextDateAggregateObjectsGoogleDoc']['input']>
  /** Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point. */
  valueGeoRange?: InputMaybe<AggregateObjectsGoogleDocWhereGeoRangeInpObj>
  /** Specify an Integer value that the target property will be compared to */
  valueInt?: InputMaybe<Scalars['IntAggregateObjectsGoogleDoc']['input']>
  /** Specify a Float value that the target property will be compared to */
  valueNumber?: InputMaybe<Scalars['FloatAggregateObjectsGoogleDoc']['input']>
  /** Specify a String value that the target property will be compared to */
  valueString?: InputMaybe<
    Scalars['TextStringAggregateObjectsGoogleDoc']['input']
  >
  /** Specify a Text value that the target property will be compared to */
  valueText?: InputMaybe<Scalars['TextAggregateObjectsGoogleDoc']['input']>
}

/** An object containing the Operands that can be applied to a 'where' filter */
export type AggregateObjectsGoogleDocWhereOperandsInpObj = {
  /** Contains the Operands that can be applied to a 'where' filter */
  operands?: InputMaybe<
    Array<InputMaybe<AggregateObjectsGoogleDocWhereOperandsInpObj>>
  >
  /** Contains the Operators that can be applied to a 'where' filter */
  operator?: InputMaybe<AggregateObjectsGoogleDocWhereOperatorEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Specify a Boolean value that the target property will be compared to */
  valueBoolean?: InputMaybe<
    Scalars['BooleanAggregateObjectsGoogleDoc']['input']
  >
  /** Specify a String value that the target property will be compared to */
  valueDate?: InputMaybe<Scalars['TextDateAggregateObjectsGoogleDoc']['input']>
  /** Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point. */
  valueGeoRange?: InputMaybe<AggregateObjectsGoogleDocWhereGeoRangeInpObj>
  /** Specify an Integer value that the target property will be compared to */
  valueInt?: InputMaybe<Scalars['IntAggregateObjectsGoogleDoc']['input']>
  /** Specify a Float value that the target property will be compared to */
  valueNumber?: InputMaybe<Scalars['FloatAggregateObjectsGoogleDoc']['input']>
  /** Specify a String value that the target property will be compared to */
  valueString?: InputMaybe<
    Scalars['TextStringAggregateObjectsGoogleDoc']['input']
  >
  /** Specify a Text value that the target property will be compared to */
  valueText?: InputMaybe<Scalars['TextAggregateObjectsGoogleDoc']['input']>
}

/** An object containing the Operators that can be applied to a 'where' filter */
export type AggregateObjectsGoogleDocWhereOperatorEnum =
  | 'And'
  | 'ContainsAll'
  | 'ContainsAny'
  | 'Equal'
  | 'GreaterThan'
  | 'GreaterThanEqual'
  | 'IsNull'
  | 'LessThan'
  | 'LessThanEqual'
  | 'Like'
  | 'Not'
  | 'NotEqual'
  | 'Or'
  | 'WithinGeoRange'

/** Hybrid search */
export type AggregateObjectsImageBlockHybridInpObj = {
  /** Search weight */
  alpha?: InputMaybe<Scalars['Float']['input']>
  /** Query string */
  query?: InputMaybe<Scalars['String']['input']>
  /** Vector search */
  vector?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
}

export type AggregateObjectsImageBlockNearObjectInpObj = {
  /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
  beacon?: InputMaybe<Scalars['String']['input']>
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Concept identifier in the uuid format */
  id?: InputMaybe<Scalars['String']['input']>
}

export type AggregateObjectsImageBlockNearVectorInpObj = {
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Target vector to be used in kNN search */
  vector: Array<InputMaybe<Scalars['Float']['input']>>
}

export type AggregateObjectsImageBlockWhereGeoRangeDistanceInpObj = {
  /** The maximum distance from the point specified geoCoordinates. */
  max: Scalars['Float']['input']
}

export type AggregateObjectsImageBlockWhereGeoRangeGeoCoordinatesInpObj = {
  /** The latitude (in decimal format) of the geoCoordinates to search around. */
  latitude: Scalars['Float']['input']
  /** The longitude (in decimal format) of the geoCoordinates to search around. */
  longitude: Scalars['Float']['input']
}

export type AggregateObjectsImageBlockWhereGeoRangeInpObj = {
  /** The distance from the point specified via geoCoordinates. */
  distance: AggregateObjectsImageBlockWhereGeoRangeDistanceInpObj
  /** The geoCoordinates that form the center point of the search. */
  geoCoordinates: AggregateObjectsImageBlockWhereGeoRangeGeoCoordinatesInpObj
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type AggregateObjectsImageBlockWhereInpObj = {
  /** Contains the Operands that can be applied to a 'where' filter */
  operands?: InputMaybe<
    Array<InputMaybe<AggregateObjectsImageBlockWhereOperandsInpObj>>
  >
  /** Contains the Operators that can be applied to a 'where' filter */
  operator?: InputMaybe<AggregateObjectsImageBlockWhereOperatorEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Specify a Boolean value that the target property will be compared to */
  valueBoolean?: InputMaybe<
    Scalars['BooleanAggregateObjectsImageBlock']['input']
  >
  /** Specify a String value that the target property will be compared to */
  valueDate?: InputMaybe<Scalars['TextDateAggregateObjectsImageBlock']['input']>
  /** Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point. */
  valueGeoRange?: InputMaybe<AggregateObjectsImageBlockWhereGeoRangeInpObj>
  /** Specify an Integer value that the target property will be compared to */
  valueInt?: InputMaybe<Scalars['IntAggregateObjectsImageBlock']['input']>
  /** Specify a Float value that the target property will be compared to */
  valueNumber?: InputMaybe<Scalars['FloatAggregateObjectsImageBlock']['input']>
  /** Specify a String value that the target property will be compared to */
  valueString?: InputMaybe<
    Scalars['TextStringAggregateObjectsImageBlock']['input']
  >
  /** Specify a Text value that the target property will be compared to */
  valueText?: InputMaybe<Scalars['TextAggregateObjectsImageBlock']['input']>
}

/** An object containing the Operands that can be applied to a 'where' filter */
export type AggregateObjectsImageBlockWhereOperandsInpObj = {
  /** Contains the Operands that can be applied to a 'where' filter */
  operands?: InputMaybe<
    Array<InputMaybe<AggregateObjectsImageBlockWhereOperandsInpObj>>
  >
  /** Contains the Operators that can be applied to a 'where' filter */
  operator?: InputMaybe<AggregateObjectsImageBlockWhereOperatorEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Specify a Boolean value that the target property will be compared to */
  valueBoolean?: InputMaybe<
    Scalars['BooleanAggregateObjectsImageBlock']['input']
  >
  /** Specify a String value that the target property will be compared to */
  valueDate?: InputMaybe<Scalars['TextDateAggregateObjectsImageBlock']['input']>
  /** Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point. */
  valueGeoRange?: InputMaybe<AggregateObjectsImageBlockWhereGeoRangeInpObj>
  /** Specify an Integer value that the target property will be compared to */
  valueInt?: InputMaybe<Scalars['IntAggregateObjectsImageBlock']['input']>
  /** Specify a Float value that the target property will be compared to */
  valueNumber?: InputMaybe<Scalars['FloatAggregateObjectsImageBlock']['input']>
  /** Specify a String value that the target property will be compared to */
  valueString?: InputMaybe<
    Scalars['TextStringAggregateObjectsImageBlock']['input']
  >
  /** Specify a Text value that the target property will be compared to */
  valueText?: InputMaybe<Scalars['TextAggregateObjectsImageBlock']['input']>
}

/** An object containing the Operators that can be applied to a 'where' filter */
export type AggregateObjectsImageBlockWhereOperatorEnum =
  | 'And'
  | 'ContainsAll'
  | 'ContainsAny'
  | 'Equal'
  | 'GreaterThan'
  | 'GreaterThanEqual'
  | 'IsNull'
  | 'LessThan'
  | 'LessThanEqual'
  | 'Like'
  | 'Not'
  | 'NotEqual'
  | 'Or'
  | 'WithinGeoRange'

/** An object allowing Aggregation of %ss on a local Weaviate */
export type AggregateObjectsObj = {
  __typename?: 'AggregateObjectsObj'
  AudioFile: Maybe<Array<Maybe<AggregateAudioFile>>>
  GoogleCalendarEvent: Maybe<Array<Maybe<AggregateGoogleCalendarEvent>>>
  GoogleDoc: Maybe<Array<Maybe<AggregateGoogleDoc>>>
  ImageBlock: Maybe<Array<Maybe<AggregateImageBlock>>>
  TextBlock: Maybe<Array<Maybe<AggregateTextBlock>>>
}

/** An object allowing Aggregation of %ss on a local Weaviate */
export type AggregateObjectsObjAudioFileArgs = {
  ask?: InputMaybe<QnATransformersAggregateAudioFileAskInpObj>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  hybrid?: InputMaybe<AggregateObjectsAudioFileHybridInpObj>
  limit?: InputMaybe<Scalars['Int']['input']>
  nearObject?: InputMaybe<AggregateObjectsAudioFileNearObjectInpObj>
  nearText?: InputMaybe<Txt2VecOpenAiAggregateAudioFileNearTextInpObj>
  nearVector?: InputMaybe<AggregateObjectsAudioFileNearVectorInpObj>
  objectLimit?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<AggregateObjectsAudioFileWhereInpObj>
}

/** An object allowing Aggregation of %ss on a local Weaviate */
export type AggregateObjectsObjGoogleCalendarEventArgs = {
  ask?: InputMaybe<QnATransformersAggregateGoogleCalendarEventAskInpObj>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  hybrid?: InputMaybe<AggregateObjectsGoogleCalendarEventHybridInpObj>
  limit?: InputMaybe<Scalars['Int']['input']>
  nearObject?: InputMaybe<AggregateObjectsGoogleCalendarEventNearObjectInpObj>
  nearText?: InputMaybe<Txt2VecOpenAiAggregateGoogleCalendarEventNearTextInpObj>
  nearVector?: InputMaybe<AggregateObjectsGoogleCalendarEventNearVectorInpObj>
  objectLimit?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<AggregateObjectsGoogleCalendarEventWhereInpObj>
}

/** An object allowing Aggregation of %ss on a local Weaviate */
export type AggregateObjectsObjGoogleDocArgs = {
  ask?: InputMaybe<QnATransformersAggregateGoogleDocAskInpObj>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  hybrid?: InputMaybe<AggregateObjectsGoogleDocHybridInpObj>
  limit?: InputMaybe<Scalars['Int']['input']>
  nearObject?: InputMaybe<AggregateObjectsGoogleDocNearObjectInpObj>
  nearText?: InputMaybe<Txt2VecOpenAiAggregateGoogleDocNearTextInpObj>
  nearVector?: InputMaybe<AggregateObjectsGoogleDocNearVectorInpObj>
  objectLimit?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<AggregateObjectsGoogleDocWhereInpObj>
}

/** An object allowing Aggregation of %ss on a local Weaviate */
export type AggregateObjectsObjImageBlockArgs = {
  ask?: InputMaybe<QnATransformersAggregateImageBlockAskInpObj>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  hybrid?: InputMaybe<AggregateObjectsImageBlockHybridInpObj>
  limit?: InputMaybe<Scalars['Int']['input']>
  nearObject?: InputMaybe<AggregateObjectsImageBlockNearObjectInpObj>
  nearText?: InputMaybe<Txt2VecOpenAiAggregateImageBlockNearTextInpObj>
  nearVector?: InputMaybe<AggregateObjectsImageBlockNearVectorInpObj>
  objectLimit?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<AggregateObjectsImageBlockWhereInpObj>
}

/** An object allowing Aggregation of %ss on a local Weaviate */
export type AggregateObjectsObjTextBlockArgs = {
  ask?: InputMaybe<QnATransformersAggregateTextBlockAskInpObj>
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  hybrid?: InputMaybe<AggregateObjectsTextBlockHybridInpObj>
  limit?: InputMaybe<Scalars['Int']['input']>
  nearObject?: InputMaybe<AggregateObjectsTextBlockNearObjectInpObj>
  nearText?: InputMaybe<Txt2VecOpenAiAggregateTextBlockNearTextInpObj>
  nearVector?: InputMaybe<AggregateObjectsTextBlockNearVectorInpObj>
  objectLimit?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<AggregateObjectsTextBlockWhereInpObj>
}

/** Hybrid search */
export type AggregateObjectsTextBlockHybridInpObj = {
  /** Search weight */
  alpha?: InputMaybe<Scalars['Float']['input']>
  /** Query string */
  query?: InputMaybe<Scalars['String']['input']>
  /** Vector search */
  vector?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
}

export type AggregateObjectsTextBlockNearObjectInpObj = {
  /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
  beacon?: InputMaybe<Scalars['String']['input']>
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Concept identifier in the uuid format */
  id?: InputMaybe<Scalars['String']['input']>
}

export type AggregateObjectsTextBlockNearVectorInpObj = {
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Target vector to be used in kNN search */
  vector: Array<InputMaybe<Scalars['Float']['input']>>
}

export type AggregateObjectsTextBlockWhereGeoRangeDistanceInpObj = {
  /** The maximum distance from the point specified geoCoordinates. */
  max: Scalars['Float']['input']
}

export type AggregateObjectsTextBlockWhereGeoRangeGeoCoordinatesInpObj = {
  /** The latitude (in decimal format) of the geoCoordinates to search around. */
  latitude: Scalars['Float']['input']
  /** The longitude (in decimal format) of the geoCoordinates to search around. */
  longitude: Scalars['Float']['input']
}

export type AggregateObjectsTextBlockWhereGeoRangeInpObj = {
  /** The distance from the point specified via geoCoordinates. */
  distance: AggregateObjectsTextBlockWhereGeoRangeDistanceInpObj
  /** The geoCoordinates that form the center point of the search. */
  geoCoordinates: AggregateObjectsTextBlockWhereGeoRangeGeoCoordinatesInpObj
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type AggregateObjectsTextBlockWhereInpObj = {
  /** Contains the Operands that can be applied to a 'where' filter */
  operands?: InputMaybe<
    Array<InputMaybe<AggregateObjectsTextBlockWhereOperandsInpObj>>
  >
  /** Contains the Operators that can be applied to a 'where' filter */
  operator?: InputMaybe<AggregateObjectsTextBlockWhereOperatorEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Specify a Boolean value that the target property will be compared to */
  valueBoolean?: InputMaybe<
    Scalars['BooleanAggregateObjectsTextBlock']['input']
  >
  /** Specify a String value that the target property will be compared to */
  valueDate?: InputMaybe<Scalars['TextDateAggregateObjectsTextBlock']['input']>
  /** Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point. */
  valueGeoRange?: InputMaybe<AggregateObjectsTextBlockWhereGeoRangeInpObj>
  /** Specify an Integer value that the target property will be compared to */
  valueInt?: InputMaybe<Scalars['IntAggregateObjectsTextBlock']['input']>
  /** Specify a Float value that the target property will be compared to */
  valueNumber?: InputMaybe<Scalars['FloatAggregateObjectsTextBlock']['input']>
  /** Specify a String value that the target property will be compared to */
  valueString?: InputMaybe<
    Scalars['TextStringAggregateObjectsTextBlock']['input']
  >
  /** Specify a Text value that the target property will be compared to */
  valueText?: InputMaybe<Scalars['TextAggregateObjectsTextBlock']['input']>
}

/** An object containing the Operands that can be applied to a 'where' filter */
export type AggregateObjectsTextBlockWhereOperandsInpObj = {
  /** Contains the Operands that can be applied to a 'where' filter */
  operands?: InputMaybe<
    Array<InputMaybe<AggregateObjectsTextBlockWhereOperandsInpObj>>
  >
  /** Contains the Operators that can be applied to a 'where' filter */
  operator?: InputMaybe<AggregateObjectsTextBlockWhereOperatorEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Specify a Boolean value that the target property will be compared to */
  valueBoolean?: InputMaybe<
    Scalars['BooleanAggregateObjectsTextBlock']['input']
  >
  /** Specify a String value that the target property will be compared to */
  valueDate?: InputMaybe<Scalars['TextDateAggregateObjectsTextBlock']['input']>
  /** Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point. */
  valueGeoRange?: InputMaybe<AggregateObjectsTextBlockWhereGeoRangeInpObj>
  /** Specify an Integer value that the target property will be compared to */
  valueInt?: InputMaybe<Scalars['IntAggregateObjectsTextBlock']['input']>
  /** Specify a Float value that the target property will be compared to */
  valueNumber?: InputMaybe<Scalars['FloatAggregateObjectsTextBlock']['input']>
  /** Specify a String value that the target property will be compared to */
  valueString?: InputMaybe<
    Scalars['TextStringAggregateObjectsTextBlock']['input']
  >
  /** Specify a Text value that the target property will be compared to */
  valueText?: InputMaybe<Scalars['TextAggregateObjectsTextBlock']['input']>
}

/** An object containing the Operators that can be applied to a 'where' filter */
export type AggregateObjectsTextBlockWhereOperatorEnum =
  | 'And'
  | 'ContainsAll'
  | 'ContainsAny'
  | 'Equal'
  | 'GreaterThan'
  | 'GreaterThanEqual'
  | 'IsNull'
  | 'LessThan'
  | 'LessThanEqual'
  | 'Like'
  | 'Not'
  | 'NotEqual'
  | 'Or'
  | 'WithinGeoRange'

export type AggregateTextBlock = {
  __typename?: 'AggregateTextBlock'
  /** Aggregate this property"classNames" */
  classNames: Maybe<AggregateTextBlockclassNamesObj>
  /** Aggregate this property"document" */
  document: Maybe<AggregateTextBlockdocumentObj>
  /** Aggregate this property"footnotes" */
  footnotes: Maybe<AggregateTextBlockfootnotesObj>
  /** Indicates the group of returned data */
  groupedBy: Maybe<AggregateTextBlockGroupedByObj>
  /** Aggregate this property"html" */
  html: Maybe<AggregateTextBlockhtmlObj>
  /** An object used to Get Meta information about Objects on a local Weaviate */
  meta: Maybe<AggregateTextBlockMetaObject>
  /** Aggregate this property"order" */
  order: Maybe<AggregateTextBlockorderObj>
  /** Aggregate this property"remoteId" */
  remoteId: Maybe<AggregateTextBlockremoteIdObj>
  /** Aggregate this property"sourceId" */
  sourceId: Maybe<AggregateTextBlocksourceIdObj>
  /** Aggregate this property"tagName" */
  tagName: Maybe<AggregateTextBlocktagNameObj>
  /** Aggregate this property"text" */
  text: Maybe<AggregateTextBlocktextObj>
}

/** An object containing the path and value of the grouped property */
export type AggregateTextBlockGroupedByObj = {
  __typename?: 'AggregateTextBlockGroupedByObj'
  /** The path of the grouped property */
  path: Maybe<Array<Maybe<Scalars['String']['output']>>>
  /** The value of the grouped property */
  value: Maybe<Scalars['String']['output']>
}

export type AggregateTextBlockMetaObject = {
  __typename?: 'AggregateTextBlockMetaObject'
  count: Maybe<Scalars['Int']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateTextBlockclassNamesObj = {
  __typename?: 'AggregateTextBlockclassNamesObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateTextBlockclassNamesTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateTextBlockclassNamesObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateTextBlockclassNamesTopOccurrencesObj = {
  __typename?: 'AggregateTextBlockclassNamesTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateTextBlockdocumentObj = {
  __typename?: 'AggregateTextBlockdocumentObj'
  /**
   * The classes that this object contains a reference to
   * @deprecated Experimental, the format will change
   */
  pointingTo: Maybe<Array<Maybe<Scalars['String']['output']>>>
  /** The datatype of this property */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateTextBlockfootnotesObj = {
  __typename?: 'AggregateTextBlockfootnotesObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateTextBlockfootnotesTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateTextBlockfootnotesObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateTextBlockfootnotesTopOccurrencesObj = {
  __typename?: 'AggregateTextBlockfootnotesTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateTextBlockhtmlObj = {
  __typename?: 'AggregateTextBlockhtmlObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<Array<Maybe<AggregateTextBlockhtmlTopOccurrencesObj>>>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateTextBlockhtmlObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateTextBlockhtmlTopOccurrencesObj = {
  __typename?: 'AggregateTextBlockhtmlTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateTextBlockorderObj = {
  __typename?: 'AggregateTextBlockorderObj'
  /** Aggregate on the total amount of found property values */
  count: Maybe<Scalars['Int']['output']>
  /** Aggregate on the maximum of numeric property values */
  maximum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the mean of numeric property values */
  mean: Maybe<Scalars['Float']['output']>
  /** Aggregate on the median of numeric property values */
  median: Maybe<Scalars['Float']['output']>
  /** Aggregate on the minimum of numeric property values */
  minimum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the mode of numeric property values */
  mode: Maybe<Scalars['Float']['output']>
  /** Aggregate on the sum of numeric property values */
  sum: Maybe<Scalars['Float']['output']>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateTextBlockremoteIdObj = {
  __typename?: 'AggregateTextBlockremoteIdObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateTextBlockremoteIdTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateTextBlockremoteIdObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateTextBlockremoteIdTopOccurrencesObj = {
  __typename?: 'AggregateTextBlockremoteIdTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateTextBlocksourceIdObj = {
  __typename?: 'AggregateTextBlocksourceIdObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateTextBlocksourceIdTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateTextBlocksourceIdObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateTextBlocksourceIdTopOccurrencesObj = {
  __typename?: 'AggregateTextBlocksourceIdTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateTextBlocktagNameObj = {
  __typename?: 'AggregateTextBlocktagNameObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<
    Array<Maybe<AggregateTextBlocktagNameTopOccurrencesObj>>
  >
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateTextBlocktagNameObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateTextBlocktagNameTopOccurrencesObj = {
  __typename?: 'AggregateTextBlocktagNameTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateTextBlocktextObj = {
  __typename?: 'AggregateTextBlocktextObj'
  /** The total amount of found instances for this property */
  count: Maybe<Scalars['Int']['output']>
  /** An object containing data about the most frequently occurring values for this property */
  topOccurrences: Maybe<Array<Maybe<AggregateTextBlocktextTopOccurrencesObj>>>
  /** Aggregate on the total amount of found property values */
  type: Maybe<Scalars['String']['output']>
}

/** An object containing Aggregation information about this property */
export type AggregateTextBlocktextObjTopOccurrencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
}

/** An object containing data about the most frequently occurring values for this property */
export type AggregateTextBlocktextTopOccurrencesObj = {
  __typename?: 'AggregateTextBlocktextTopOccurrencesObj'
  /** How often the most frequently occurring value for this property occurs */
  occurs: Maybe<Scalars['Int']['output']>
  /** The most frequently occurring value for this property */
  value: Maybe<Scalars['String']['output']>
}

export type AudioFile = {
  __typename?: 'AudioFile'
  _additional: Maybe<AudioFileAdditional>
  document: Maybe<Array<Maybe<AudioFileDocumentObj>>>
  duration: Maybe<Scalars['Float']['output']>
  ext: Maybe<Scalars['String']['output']>
  mimeType: Maybe<Scalars['String']['output']>
  order: Maybe<Scalars['Int']['output']>
  originalName: Maybe<Scalars['String']['output']>
  remoteId: Maybe<Scalars['String']['output']>
  size: Maybe<Scalars['Int']['output']>
  sourceId: Maybe<Scalars['String']['output']>
  url: Maybe<Scalars['String']['output']>
}

export type AudioFileAdditional = {
  __typename?: 'AudioFileAdditional'
  answer: Maybe<AudioFileAdditionalAnswer>
  certainty: Maybe<Scalars['Float']['output']>
  classification: Maybe<AudioFileAdditionalClassification>
  creationTimeUnix: Maybe<Scalars['String']['output']>
  distance: Maybe<Scalars['Float']['output']>
  explainScore: Maybe<Scalars['String']['output']>
  featureProjection: Maybe<AudioFileAdditionalFeatureProjection>
  group: Maybe<AudioFileAdditionalGroup>
  /** The UUID of a Object, assigned by its local Weaviate */
  id: Maybe<Scalars['String']['output']>
  lastUpdateTimeUnix: Maybe<Scalars['String']['output']>
  score: Maybe<Scalars['String']['output']>
  vector: Maybe<Array<Maybe<Scalars['Float']['output']>>>
}

export type AudioFileAdditionalFeatureProjectionArgs = {
  algorithm?: InputMaybe<Scalars['String']['input']>
  dimensions?: InputMaybe<Scalars['Int']['input']>
  iterations?: InputMaybe<Scalars['Int']['input']>
  learningRate?: InputMaybe<Scalars['Int']['input']>
  perplexity?: InputMaybe<Scalars['Int']['input']>
}

export type AudioFileAdditionalAnswer = {
  __typename?: 'AudioFileAdditionalAnswer'
  endPosition: Maybe<Scalars['Int']['output']>
  hasAnswer: Maybe<Scalars['Boolean']['output']>
  property: Maybe<Scalars['String']['output']>
  result: Maybe<Scalars['String']['output']>
  startPosition: Maybe<Scalars['Int']['output']>
}

export type AudioFileAdditionalClassification = {
  __typename?: 'AudioFileAdditionalClassification'
  basedOn: Maybe<Array<Maybe<Scalars['String']['output']>>>
  classifiedFields: Maybe<Array<Maybe<Scalars['String']['output']>>>
  completed: Maybe<Scalars['String']['output']>
  id: Maybe<Scalars['String']['output']>
  scope: Maybe<Array<Maybe<Scalars['String']['output']>>>
}

export type AudioFileAdditionalFeatureProjection = {
  __typename?: 'AudioFileAdditionalFeatureProjection'
  vector: Maybe<Array<Maybe<Scalars['Float']['output']>>>
}

export type AudioFileAdditionalGroup = {
  __typename?: 'AudioFileAdditionalGroup'
  count: Maybe<Scalars['Int']['output']>
  groupedBy: Maybe<AudioFileAdditionalGroupGroupedBy>
  hits: Maybe<Array<Maybe<AudioFileAdditionalGroupHits>>>
  id: Maybe<Scalars['Int']['output']>
  maxDistance: Maybe<Scalars['Float']['output']>
  minDistance: Maybe<Scalars['Float']['output']>
}

export type AudioFileAdditionalGroupGroupedBy = {
  __typename?: 'AudioFileAdditionalGroupGroupedBy'
  path: Maybe<Array<Maybe<Scalars['String']['output']>>>
  value: Maybe<Scalars['String']['output']>
}

export type AudioFileAdditionalGroupHits = {
  __typename?: 'AudioFileAdditionalGroupHits'
  _additional: Maybe<AudioFileAdditionalGroupHitsAdditional>
  document: Maybe<Array<Maybe<AudioFileDocumentObj>>>
  duration: Maybe<Scalars['Float']['output']>
  ext: Maybe<Scalars['String']['output']>
  mimeType: Maybe<Scalars['String']['output']>
  order: Maybe<Scalars['Int']['output']>
  originalName: Maybe<Scalars['String']['output']>
  remoteId: Maybe<Scalars['String']['output']>
  size: Maybe<Scalars['Int']['output']>
  sourceId: Maybe<Scalars['String']['output']>
  url: Maybe<Scalars['String']['output']>
}

export type AudioFileAdditionalGroupHitsAdditional = {
  __typename?: 'AudioFileAdditionalGroupHitsAdditional'
  distance: Maybe<Scalars['Float']['output']>
  id: Maybe<Scalars['String']['output']>
  vector: Maybe<Array<Maybe<Scalars['Float']['output']>>>
}

export type AudioFileDocumentObj = Beacon | GoogleCalendarEvent | GoogleDoc

export type Beacon = {
  __typename?: 'Beacon'
  beacon: Maybe<Scalars['String']['output']>
}

export type Footnote = {
  __typename?: 'Footnote'
  id: Scalars['String']['output']
  index: Scalars['Int']['output']
  refId: Scalars['String']['output']
  refValue: Scalars['String']['output']
  valueHTML: Scalars['String']['output']
  valueText: Scalars['String']['output']
}

export type FusionEnum = 'rankedFusion' | 'relativeScoreFusion'

/** Specify the property of the class to group by */
export type GetObjectsAudioFileGroupByInpObj = {
  /** Specify the number of groups to be created */
  groups: Scalars['Int']['input']
  /** Specify the number of max objects in group */
  objectsPerGroup: Scalars['Int']['input']
  /** Specify the path from the objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path: Array<InputMaybe<Scalars['String']['input']>>
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type GetObjectsAudioFileGroupInpObj = {
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  type?: InputMaybe<GetObjectsAudioFileGroupInpObjTypeEnum>
}

export type GetObjectsAudioFileGroupInpObjTypeEnum = 'closest' | 'merge'

export type GetObjectsAudioFileHybridGetBm25InpObj = {
  /** The properties to search in */
  properties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The query to search for */
  query?: InputMaybe<Scalars['String']['input']>
}

/** Hybrid search */
export type GetObjectsAudioFileHybridInpObj = {
  /** Search weight */
  alpha?: InputMaybe<Scalars['Float']['input']>
  /** Algorithm used for fusing results from vector and keyword search */
  fusionType?: InputMaybe<FusionEnum>
  /** Which properties should be included in the sparse search */
  properties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Query string */
  query?: InputMaybe<Scalars['String']['input']>
  /** Vector search */
  vector?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
}

export type GetObjectsAudioFileNearObjectInpObj = {
  /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
  beacon?: InputMaybe<Scalars['String']['input']>
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Concept identifier in the uuid format */
  id?: InputMaybe<Scalars['String']['input']>
}

export type GetObjectsAudioFileNearVectorInpObj = {
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Target vector to be used in kNN search */
  vector: Array<InputMaybe<Scalars['Float']['input']>>
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type GetObjectsAudioFileSortInpObj = {
  /** Specify the sort order, either ascending (asc) which is default or descending (desc) */
  order?: InputMaybe<GetObjectsAudioFileSortInpObjTypeEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Get', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type GetObjectsAudioFileSortInpObjTypeEnum = 'asc' | 'desc'

export type GetObjectsAudioFileWhereGeoRangeDistanceInpObj = {
  /** The maximum distance from the point specified geoCoordinates. */
  max: Scalars['Float']['input']
}

export type GetObjectsAudioFileWhereGeoRangeGeoCoordinatesInpObj = {
  /** The latitude (in decimal format) of the geoCoordinates to search around. */
  latitude: Scalars['Float']['input']
  /** The longitude (in decimal format) of the geoCoordinates to search around. */
  longitude: Scalars['Float']['input']
}

export type GetObjectsAudioFileWhereGeoRangeInpObj = {
  /** The distance from the point specified via geoCoordinates. */
  distance: GetObjectsAudioFileWhereGeoRangeDistanceInpObj
  /** The geoCoordinates that form the center point of the search. */
  geoCoordinates: GetObjectsAudioFileWhereGeoRangeGeoCoordinatesInpObj
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type GetObjectsAudioFileWhereInpObj = {
  /** Contains the Operands that can be applied to a 'where' filter */
  operands?: InputMaybe<
    Array<InputMaybe<GetObjectsAudioFileWhereOperandsInpObj>>
  >
  /** Contains the Operators that can be applied to a 'where' filter */
  operator?: InputMaybe<GetObjectsAudioFileWhereOperatorEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Specify a Boolean value that the target property will be compared to */
  valueBoolean?: InputMaybe<Scalars['BooleanGetObjectsAudioFile']['input']>
  /** Specify a String value that the target property will be compared to */
  valueDate?: InputMaybe<Scalars['TextDateGetObjectsAudioFile']['input']>
  /** Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point. */
  valueGeoRange?: InputMaybe<GetObjectsAudioFileWhereGeoRangeInpObj>
  /** Specify an Integer value that the target property will be compared to */
  valueInt?: InputMaybe<Scalars['IntGetObjectsAudioFile']['input']>
  /** Specify a Float value that the target property will be compared to */
  valueNumber?: InputMaybe<Scalars['FloatGetObjectsAudioFile']['input']>
  /** Specify a String value that the target property will be compared to */
  valueString?: InputMaybe<Scalars['TextStringGetObjectsAudioFile']['input']>
  /** Specify a Text value that the target property will be compared to */
  valueText?: InputMaybe<Scalars['TextGetObjectsAudioFile']['input']>
}

/** An object containing the Operands that can be applied to a 'where' filter */
export type GetObjectsAudioFileWhereOperandsInpObj = {
  /** Contains the Operands that can be applied to a 'where' filter */
  operands?: InputMaybe<
    Array<InputMaybe<GetObjectsAudioFileWhereOperandsInpObj>>
  >
  /** Contains the Operators that can be applied to a 'where' filter */
  operator?: InputMaybe<GetObjectsAudioFileWhereOperatorEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Specify a Boolean value that the target property will be compared to */
  valueBoolean?: InputMaybe<Scalars['BooleanGetObjectsAudioFile']['input']>
  /** Specify a String value that the target property will be compared to */
  valueDate?: InputMaybe<Scalars['TextDateGetObjectsAudioFile']['input']>
  /** Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point. */
  valueGeoRange?: InputMaybe<GetObjectsAudioFileWhereGeoRangeInpObj>
  /** Specify an Integer value that the target property will be compared to */
  valueInt?: InputMaybe<Scalars['IntGetObjectsAudioFile']['input']>
  /** Specify a Float value that the target property will be compared to */
  valueNumber?: InputMaybe<Scalars['FloatGetObjectsAudioFile']['input']>
  /** Specify a String value that the target property will be compared to */
  valueString?: InputMaybe<Scalars['TextStringGetObjectsAudioFile']['input']>
  /** Specify a Text value that the target property will be compared to */
  valueText?: InputMaybe<Scalars['TextGetObjectsAudioFile']['input']>
}

/** An object containing the Operators that can be applied to a 'where' filter */
export type GetObjectsAudioFileWhereOperatorEnum =
  | 'And'
  | 'ContainsAll'
  | 'ContainsAny'
  | 'Equal'
  | 'GreaterThan'
  | 'GreaterThanEqual'
  | 'IsNull'
  | 'LessThan'
  | 'LessThanEqual'
  | 'Like'
  | 'Not'
  | 'NotEqual'
  | 'Or'
  | 'WithinGeoRange'

/** Specify the property of the class to group by */
export type GetObjectsGoogleCalendarEventGroupByInpObj = {
  /** Specify the number of groups to be created */
  groups: Scalars['Int']['input']
  /** Specify the number of max objects in group */
  objectsPerGroup: Scalars['Int']['input']
  /** Specify the path from the objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path: Array<InputMaybe<Scalars['String']['input']>>
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type GetObjectsGoogleCalendarEventGroupInpObj = {
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  type?: InputMaybe<GetObjectsGoogleCalendarEventGroupInpObjTypeEnum>
}

export type GetObjectsGoogleCalendarEventGroupInpObjTypeEnum =
  | 'closest'
  | 'merge'

export type GetObjectsGoogleCalendarEventHybridGetBm25InpObj = {
  /** The properties to search in */
  properties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The query to search for */
  query?: InputMaybe<Scalars['String']['input']>
}

/** Hybrid search */
export type GetObjectsGoogleCalendarEventHybridInpObj = {
  /** Search weight */
  alpha?: InputMaybe<Scalars['Float']['input']>
  /** Algorithm used for fusing results from vector and keyword search */
  fusionType?: InputMaybe<FusionEnum>
  /** Which properties should be included in the sparse search */
  properties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Query string */
  query?: InputMaybe<Scalars['String']['input']>
  /** Vector search */
  vector?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
}

export type GetObjectsGoogleCalendarEventNearObjectInpObj = {
  /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
  beacon?: InputMaybe<Scalars['String']['input']>
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Concept identifier in the uuid format */
  id?: InputMaybe<Scalars['String']['input']>
}

export type GetObjectsGoogleCalendarEventNearVectorInpObj = {
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Target vector to be used in kNN search */
  vector: Array<InputMaybe<Scalars['Float']['input']>>
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type GetObjectsGoogleCalendarEventSortInpObj = {
  /** Specify the sort order, either ascending (asc) which is default or descending (desc) */
  order?: InputMaybe<GetObjectsGoogleCalendarEventSortInpObjTypeEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Get', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type GetObjectsGoogleCalendarEventSortInpObjTypeEnum = 'asc' | 'desc'

export type GetObjectsGoogleCalendarEventWhereGeoRangeDistanceInpObj = {
  /** The maximum distance from the point specified geoCoordinates. */
  max: Scalars['Float']['input']
}

export type GetObjectsGoogleCalendarEventWhereGeoRangeGeoCoordinatesInpObj = {
  /** The latitude (in decimal format) of the geoCoordinates to search around. */
  latitude: Scalars['Float']['input']
  /** The longitude (in decimal format) of the geoCoordinates to search around. */
  longitude: Scalars['Float']['input']
}

export type GetObjectsGoogleCalendarEventWhereGeoRangeInpObj = {
  /** The distance from the point specified via geoCoordinates. */
  distance: GetObjectsGoogleCalendarEventWhereGeoRangeDistanceInpObj
  /** The geoCoordinates that form the center point of the search. */
  geoCoordinates: GetObjectsGoogleCalendarEventWhereGeoRangeGeoCoordinatesInpObj
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type GetObjectsGoogleCalendarEventWhereInpObj = {
  /** Contains the Operands that can be applied to a 'where' filter */
  operands?: InputMaybe<
    Array<InputMaybe<GetObjectsGoogleCalendarEventWhereOperandsInpObj>>
  >
  /** Contains the Operators that can be applied to a 'where' filter */
  operator?: InputMaybe<GetObjectsGoogleCalendarEventWhereOperatorEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Specify a Boolean value that the target property will be compared to */
  valueBoolean?: InputMaybe<
    Scalars['BooleanGetObjectsGoogleCalendarEvent']['input']
  >
  /** Specify a String value that the target property will be compared to */
  valueDate?: InputMaybe<
    Scalars['TextDateGetObjectsGoogleCalendarEvent']['input']
  >
  /** Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point. */
  valueGeoRange?: InputMaybe<GetObjectsGoogleCalendarEventWhereGeoRangeInpObj>
  /** Specify an Integer value that the target property will be compared to */
  valueInt?: InputMaybe<Scalars['IntGetObjectsGoogleCalendarEvent']['input']>
  /** Specify a Float value that the target property will be compared to */
  valueNumber?: InputMaybe<
    Scalars['FloatGetObjectsGoogleCalendarEvent']['input']
  >
  /** Specify a String value that the target property will be compared to */
  valueString?: InputMaybe<
    Scalars['TextStringGetObjectsGoogleCalendarEvent']['input']
  >
  /** Specify a Text value that the target property will be compared to */
  valueText?: InputMaybe<Scalars['TextGetObjectsGoogleCalendarEvent']['input']>
}

/** An object containing the Operands that can be applied to a 'where' filter */
export type GetObjectsGoogleCalendarEventWhereOperandsInpObj = {
  /** Contains the Operands that can be applied to a 'where' filter */
  operands?: InputMaybe<
    Array<InputMaybe<GetObjectsGoogleCalendarEventWhereOperandsInpObj>>
  >
  /** Contains the Operators that can be applied to a 'where' filter */
  operator?: InputMaybe<GetObjectsGoogleCalendarEventWhereOperatorEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Specify a Boolean value that the target property will be compared to */
  valueBoolean?: InputMaybe<
    Scalars['BooleanGetObjectsGoogleCalendarEvent']['input']
  >
  /** Specify a String value that the target property will be compared to */
  valueDate?: InputMaybe<
    Scalars['TextDateGetObjectsGoogleCalendarEvent']['input']
  >
  /** Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point. */
  valueGeoRange?: InputMaybe<GetObjectsGoogleCalendarEventWhereGeoRangeInpObj>
  /** Specify an Integer value that the target property will be compared to */
  valueInt?: InputMaybe<Scalars['IntGetObjectsGoogleCalendarEvent']['input']>
  /** Specify a Float value that the target property will be compared to */
  valueNumber?: InputMaybe<
    Scalars['FloatGetObjectsGoogleCalendarEvent']['input']
  >
  /** Specify a String value that the target property will be compared to */
  valueString?: InputMaybe<
    Scalars['TextStringGetObjectsGoogleCalendarEvent']['input']
  >
  /** Specify a Text value that the target property will be compared to */
  valueText?: InputMaybe<Scalars['TextGetObjectsGoogleCalendarEvent']['input']>
}

/** An object containing the Operators that can be applied to a 'where' filter */
export type GetObjectsGoogleCalendarEventWhereOperatorEnum =
  | 'And'
  | 'ContainsAll'
  | 'ContainsAny'
  | 'Equal'
  | 'GreaterThan'
  | 'GreaterThanEqual'
  | 'IsNull'
  | 'LessThan'
  | 'LessThanEqual'
  | 'Like'
  | 'Not'
  | 'NotEqual'
  | 'Or'
  | 'WithinGeoRange'

/** Specify the property of the class to group by */
export type GetObjectsGoogleDocGroupByInpObj = {
  /** Specify the number of groups to be created */
  groups: Scalars['Int']['input']
  /** Specify the number of max objects in group */
  objectsPerGroup: Scalars['Int']['input']
  /** Specify the path from the objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path: Array<InputMaybe<Scalars['String']['input']>>
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type GetObjectsGoogleDocGroupInpObj = {
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  type?: InputMaybe<GetObjectsGoogleDocGroupInpObjTypeEnum>
}

export type GetObjectsGoogleDocGroupInpObjTypeEnum = 'closest' | 'merge'

export type GetObjectsGoogleDocHybridGetBm25InpObj = {
  /** The properties to search in */
  properties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The query to search for */
  query?: InputMaybe<Scalars['String']['input']>
}

/** Hybrid search */
export type GetObjectsGoogleDocHybridInpObj = {
  /** Search weight */
  alpha?: InputMaybe<Scalars['Float']['input']>
  /** Algorithm used for fusing results from vector and keyword search */
  fusionType?: InputMaybe<FusionEnum>
  /** Which properties should be included in the sparse search */
  properties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Query string */
  query?: InputMaybe<Scalars['String']['input']>
  /** Vector search */
  vector?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
}

export type GetObjectsGoogleDocNearObjectInpObj = {
  /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
  beacon?: InputMaybe<Scalars['String']['input']>
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Concept identifier in the uuid format */
  id?: InputMaybe<Scalars['String']['input']>
}

export type GetObjectsGoogleDocNearVectorInpObj = {
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Target vector to be used in kNN search */
  vector: Array<InputMaybe<Scalars['Float']['input']>>
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type GetObjectsGoogleDocSortInpObj = {
  /** Specify the sort order, either ascending (asc) which is default or descending (desc) */
  order?: InputMaybe<GetObjectsGoogleDocSortInpObjTypeEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Get', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type GetObjectsGoogleDocSortInpObjTypeEnum = 'asc' | 'desc'

export type GetObjectsGoogleDocWhereGeoRangeDistanceInpObj = {
  /** The maximum distance from the point specified geoCoordinates. */
  max: Scalars['Float']['input']
}

export type GetObjectsGoogleDocWhereGeoRangeGeoCoordinatesInpObj = {
  /** The latitude (in decimal format) of the geoCoordinates to search around. */
  latitude: Scalars['Float']['input']
  /** The longitude (in decimal format) of the geoCoordinates to search around. */
  longitude: Scalars['Float']['input']
}

export type GetObjectsGoogleDocWhereGeoRangeInpObj = {
  /** The distance from the point specified via geoCoordinates. */
  distance: GetObjectsGoogleDocWhereGeoRangeDistanceInpObj
  /** The geoCoordinates that form the center point of the search. */
  geoCoordinates: GetObjectsGoogleDocWhereGeoRangeGeoCoordinatesInpObj
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type GetObjectsGoogleDocWhereInpObj = {
  /** Contains the Operands that can be applied to a 'where' filter */
  operands?: InputMaybe<
    Array<InputMaybe<GetObjectsGoogleDocWhereOperandsInpObj>>
  >
  /** Contains the Operators that can be applied to a 'where' filter */
  operator?: InputMaybe<GetObjectsGoogleDocWhereOperatorEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Specify a Boolean value that the target property will be compared to */
  valueBoolean?: InputMaybe<Scalars['BooleanGetObjectsGoogleDoc']['input']>
  /** Specify a String value that the target property will be compared to */
  valueDate?: InputMaybe<Scalars['TextDateGetObjectsGoogleDoc']['input']>
  /** Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point. */
  valueGeoRange?: InputMaybe<GetObjectsGoogleDocWhereGeoRangeInpObj>
  /** Specify an Integer value that the target property will be compared to */
  valueInt?: InputMaybe<Scalars['IntGetObjectsGoogleDoc']['input']>
  /** Specify a Float value that the target property will be compared to */
  valueNumber?: InputMaybe<Scalars['FloatGetObjectsGoogleDoc']['input']>
  /** Specify a String value that the target property will be compared to */
  valueString?: InputMaybe<Scalars['TextStringGetObjectsGoogleDoc']['input']>
  /** Specify a Text value that the target property will be compared to */
  valueText?: InputMaybe<Scalars['TextGetObjectsGoogleDoc']['input']>
}

/** An object containing the Operands that can be applied to a 'where' filter */
export type GetObjectsGoogleDocWhereOperandsInpObj = {
  /** Contains the Operands that can be applied to a 'where' filter */
  operands?: InputMaybe<
    Array<InputMaybe<GetObjectsGoogleDocWhereOperandsInpObj>>
  >
  /** Contains the Operators that can be applied to a 'where' filter */
  operator?: InputMaybe<GetObjectsGoogleDocWhereOperatorEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Specify a Boolean value that the target property will be compared to */
  valueBoolean?: InputMaybe<Scalars['BooleanGetObjectsGoogleDoc']['input']>
  /** Specify a String value that the target property will be compared to */
  valueDate?: InputMaybe<Scalars['TextDateGetObjectsGoogleDoc']['input']>
  /** Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point. */
  valueGeoRange?: InputMaybe<GetObjectsGoogleDocWhereGeoRangeInpObj>
  /** Specify an Integer value that the target property will be compared to */
  valueInt?: InputMaybe<Scalars['IntGetObjectsGoogleDoc']['input']>
  /** Specify a Float value that the target property will be compared to */
  valueNumber?: InputMaybe<Scalars['FloatGetObjectsGoogleDoc']['input']>
  /** Specify a String value that the target property will be compared to */
  valueString?: InputMaybe<Scalars['TextStringGetObjectsGoogleDoc']['input']>
  /** Specify a Text value that the target property will be compared to */
  valueText?: InputMaybe<Scalars['TextGetObjectsGoogleDoc']['input']>
}

/** An object containing the Operators that can be applied to a 'where' filter */
export type GetObjectsGoogleDocWhereOperatorEnum =
  | 'And'
  | 'ContainsAll'
  | 'ContainsAny'
  | 'Equal'
  | 'GreaterThan'
  | 'GreaterThanEqual'
  | 'IsNull'
  | 'LessThan'
  | 'LessThanEqual'
  | 'Like'
  | 'Not'
  | 'NotEqual'
  | 'Or'
  | 'WithinGeoRange'

/** Specify the property of the class to group by */
export type GetObjectsImageBlockGroupByInpObj = {
  /** Specify the number of groups to be created */
  groups: Scalars['Int']['input']
  /** Specify the number of max objects in group */
  objectsPerGroup: Scalars['Int']['input']
  /** Specify the path from the objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path: Array<InputMaybe<Scalars['String']['input']>>
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type GetObjectsImageBlockGroupInpObj = {
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  type?: InputMaybe<GetObjectsImageBlockGroupInpObjTypeEnum>
}

export type GetObjectsImageBlockGroupInpObjTypeEnum = 'closest' | 'merge'

export type GetObjectsImageBlockHybridGetBm25InpObj = {
  /** The properties to search in */
  properties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The query to search for */
  query?: InputMaybe<Scalars['String']['input']>
}

/** Hybrid search */
export type GetObjectsImageBlockHybridInpObj = {
  /** Search weight */
  alpha?: InputMaybe<Scalars['Float']['input']>
  /** Algorithm used for fusing results from vector and keyword search */
  fusionType?: InputMaybe<FusionEnum>
  /** Which properties should be included in the sparse search */
  properties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Query string */
  query?: InputMaybe<Scalars['String']['input']>
  /** Vector search */
  vector?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
}

export type GetObjectsImageBlockNearObjectInpObj = {
  /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
  beacon?: InputMaybe<Scalars['String']['input']>
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Concept identifier in the uuid format */
  id?: InputMaybe<Scalars['String']['input']>
}

export type GetObjectsImageBlockNearVectorInpObj = {
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Target vector to be used in kNN search */
  vector: Array<InputMaybe<Scalars['Float']['input']>>
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type GetObjectsImageBlockSortInpObj = {
  /** Specify the sort order, either ascending (asc) which is default or descending (desc) */
  order?: InputMaybe<GetObjectsImageBlockSortInpObjTypeEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Get', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type GetObjectsImageBlockSortInpObjTypeEnum = 'asc' | 'desc'

export type GetObjectsImageBlockWhereGeoRangeDistanceInpObj = {
  /** The maximum distance from the point specified geoCoordinates. */
  max: Scalars['Float']['input']
}

export type GetObjectsImageBlockWhereGeoRangeGeoCoordinatesInpObj = {
  /** The latitude (in decimal format) of the geoCoordinates to search around. */
  latitude: Scalars['Float']['input']
  /** The longitude (in decimal format) of the geoCoordinates to search around. */
  longitude: Scalars['Float']['input']
}

export type GetObjectsImageBlockWhereGeoRangeInpObj = {
  /** The distance from the point specified via geoCoordinates. */
  distance: GetObjectsImageBlockWhereGeoRangeDistanceInpObj
  /** The geoCoordinates that form the center point of the search. */
  geoCoordinates: GetObjectsImageBlockWhereGeoRangeGeoCoordinatesInpObj
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type GetObjectsImageBlockWhereInpObj = {
  /** Contains the Operands that can be applied to a 'where' filter */
  operands?: InputMaybe<
    Array<InputMaybe<GetObjectsImageBlockWhereOperandsInpObj>>
  >
  /** Contains the Operators that can be applied to a 'where' filter */
  operator?: InputMaybe<GetObjectsImageBlockWhereOperatorEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Specify a Boolean value that the target property will be compared to */
  valueBoolean?: InputMaybe<Scalars['BooleanGetObjectsImageBlock']['input']>
  /** Specify a String value that the target property will be compared to */
  valueDate?: InputMaybe<Scalars['TextDateGetObjectsImageBlock']['input']>
  /** Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point. */
  valueGeoRange?: InputMaybe<GetObjectsImageBlockWhereGeoRangeInpObj>
  /** Specify an Integer value that the target property will be compared to */
  valueInt?: InputMaybe<Scalars['IntGetObjectsImageBlock']['input']>
  /** Specify a Float value that the target property will be compared to */
  valueNumber?: InputMaybe<Scalars['FloatGetObjectsImageBlock']['input']>
  /** Specify a String value that the target property will be compared to */
  valueString?: InputMaybe<Scalars['TextStringGetObjectsImageBlock']['input']>
  /** Specify a Text value that the target property will be compared to */
  valueText?: InputMaybe<Scalars['TextGetObjectsImageBlock']['input']>
}

/** An object containing the Operands that can be applied to a 'where' filter */
export type GetObjectsImageBlockWhereOperandsInpObj = {
  /** Contains the Operands that can be applied to a 'where' filter */
  operands?: InputMaybe<
    Array<InputMaybe<GetObjectsImageBlockWhereOperandsInpObj>>
  >
  /** Contains the Operators that can be applied to a 'where' filter */
  operator?: InputMaybe<GetObjectsImageBlockWhereOperatorEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Specify a Boolean value that the target property will be compared to */
  valueBoolean?: InputMaybe<Scalars['BooleanGetObjectsImageBlock']['input']>
  /** Specify a String value that the target property will be compared to */
  valueDate?: InputMaybe<Scalars['TextDateGetObjectsImageBlock']['input']>
  /** Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point. */
  valueGeoRange?: InputMaybe<GetObjectsImageBlockWhereGeoRangeInpObj>
  /** Specify an Integer value that the target property will be compared to */
  valueInt?: InputMaybe<Scalars['IntGetObjectsImageBlock']['input']>
  /** Specify a Float value that the target property will be compared to */
  valueNumber?: InputMaybe<Scalars['FloatGetObjectsImageBlock']['input']>
  /** Specify a String value that the target property will be compared to */
  valueString?: InputMaybe<Scalars['TextStringGetObjectsImageBlock']['input']>
  /** Specify a Text value that the target property will be compared to */
  valueText?: InputMaybe<Scalars['TextGetObjectsImageBlock']['input']>
}

/** An object containing the Operators that can be applied to a 'where' filter */
export type GetObjectsImageBlockWhereOperatorEnum =
  | 'And'
  | 'ContainsAll'
  | 'ContainsAny'
  | 'Equal'
  | 'GreaterThan'
  | 'GreaterThanEqual'
  | 'IsNull'
  | 'LessThan'
  | 'LessThanEqual'
  | 'Like'
  | 'Not'
  | 'NotEqual'
  | 'Or'
  | 'WithinGeoRange'

/** An object used to get %ss on a local Weaviate */
export type GetObjectsObj = {
  __typename?: 'GetObjectsObj'
  AudioFile: Maybe<Array<Maybe<AudioFile>>>
  GoogleCalendarEvent: Maybe<Array<Maybe<GoogleCalendarEvent>>>
  GoogleDoc: Maybe<Array<Maybe<GoogleDoc>>>
  ImageBlock: Maybe<Array<Maybe<ImageBlock>>>
  TextBlock: Maybe<Array<Maybe<TextBlock>>>
}

/** An object used to get %ss on a local Weaviate */
export type GetObjectsObjAudioFileArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  ask?: InputMaybe<QnATransformersGetObjectsAudioFileAskInpObj>
  autocut?: InputMaybe<Scalars['Int']['input']>
  bm25?: InputMaybe<GetObjectsAudioFileHybridGetBm25InpObj>
  group?: InputMaybe<GetObjectsAudioFileGroupInpObj>
  groupBy?: InputMaybe<GetObjectsAudioFileGroupByInpObj>
  hybrid?: InputMaybe<GetObjectsAudioFileHybridInpObj>
  limit?: InputMaybe<Scalars['Int']['input']>
  nearObject?: InputMaybe<GetObjectsAudioFileNearObjectInpObj>
  nearText?: InputMaybe<Txt2VecOpenAiGetObjectsAudioFileNearTextInpObj>
  nearVector?: InputMaybe<GetObjectsAudioFileNearVectorInpObj>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<InputMaybe<GetObjectsAudioFileSortInpObj>>>
  where?: InputMaybe<GetObjectsAudioFileWhereInpObj>
}

/** An object used to get %ss on a local Weaviate */
export type GetObjectsObjGoogleCalendarEventArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  ask?: InputMaybe<QnATransformersGetObjectsGoogleCalendarEventAskInpObj>
  autocut?: InputMaybe<Scalars['Int']['input']>
  bm25?: InputMaybe<GetObjectsGoogleCalendarEventHybridGetBm25InpObj>
  group?: InputMaybe<GetObjectsGoogleCalendarEventGroupInpObj>
  groupBy?: InputMaybe<GetObjectsGoogleCalendarEventGroupByInpObj>
  hybrid?: InputMaybe<GetObjectsGoogleCalendarEventHybridInpObj>
  limit?: InputMaybe<Scalars['Int']['input']>
  nearObject?: InputMaybe<GetObjectsGoogleCalendarEventNearObjectInpObj>
  nearText?: InputMaybe<Txt2VecOpenAiGetObjectsGoogleCalendarEventNearTextInpObj>
  nearVector?: InputMaybe<GetObjectsGoogleCalendarEventNearVectorInpObj>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<InputMaybe<GetObjectsGoogleCalendarEventSortInpObj>>>
  where?: InputMaybe<GetObjectsGoogleCalendarEventWhereInpObj>
}

/** An object used to get %ss on a local Weaviate */
export type GetObjectsObjGoogleDocArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  ask?: InputMaybe<QnATransformersGetObjectsGoogleDocAskInpObj>
  autocut?: InputMaybe<Scalars['Int']['input']>
  bm25?: InputMaybe<GetObjectsGoogleDocHybridGetBm25InpObj>
  group?: InputMaybe<GetObjectsGoogleDocGroupInpObj>
  groupBy?: InputMaybe<GetObjectsGoogleDocGroupByInpObj>
  hybrid?: InputMaybe<GetObjectsGoogleDocHybridInpObj>
  limit?: InputMaybe<Scalars['Int']['input']>
  nearObject?: InputMaybe<GetObjectsGoogleDocNearObjectInpObj>
  nearText?: InputMaybe<Txt2VecOpenAiGetObjectsGoogleDocNearTextInpObj>
  nearVector?: InputMaybe<GetObjectsGoogleDocNearVectorInpObj>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<InputMaybe<GetObjectsGoogleDocSortInpObj>>>
  where?: InputMaybe<GetObjectsGoogleDocWhereInpObj>
}

/** An object used to get %ss on a local Weaviate */
export type GetObjectsObjImageBlockArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  ask?: InputMaybe<QnATransformersGetObjectsImageBlockAskInpObj>
  autocut?: InputMaybe<Scalars['Int']['input']>
  bm25?: InputMaybe<GetObjectsImageBlockHybridGetBm25InpObj>
  group?: InputMaybe<GetObjectsImageBlockGroupInpObj>
  groupBy?: InputMaybe<GetObjectsImageBlockGroupByInpObj>
  hybrid?: InputMaybe<GetObjectsImageBlockHybridInpObj>
  limit?: InputMaybe<Scalars['Int']['input']>
  nearObject?: InputMaybe<GetObjectsImageBlockNearObjectInpObj>
  nearText?: InputMaybe<Txt2VecOpenAiGetObjectsImageBlockNearTextInpObj>
  nearVector?: InputMaybe<GetObjectsImageBlockNearVectorInpObj>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<InputMaybe<GetObjectsImageBlockSortInpObj>>>
  where?: InputMaybe<GetObjectsImageBlockWhereInpObj>
}

/** An object used to get %ss on a local Weaviate */
export type GetObjectsObjTextBlockArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  ask?: InputMaybe<QnATransformersGetObjectsTextBlockAskInpObj>
  autocut?: InputMaybe<Scalars['Int']['input']>
  bm25?: InputMaybe<GetObjectsTextBlockHybridGetBm25InpObj>
  group?: InputMaybe<GetObjectsTextBlockGroupInpObj>
  groupBy?: InputMaybe<GetObjectsTextBlockGroupByInpObj>
  hybrid?: InputMaybe<GetObjectsTextBlockHybridInpObj>
  limit?: InputMaybe<Scalars['Int']['input']>
  nearObject?: InputMaybe<GetObjectsTextBlockNearObjectInpObj>
  nearText?: InputMaybe<Txt2VecOpenAiGetObjectsTextBlockNearTextInpObj>
  nearVector?: InputMaybe<GetObjectsTextBlockNearVectorInpObj>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<InputMaybe<GetObjectsTextBlockSortInpObj>>>
  where?: InputMaybe<GetObjectsTextBlockWhereInpObj>
}

/** Specify the property of the class to group by */
export type GetObjectsTextBlockGroupByInpObj = {
  /** Specify the number of groups to be created */
  groups: Scalars['Int']['input']
  /** Specify the number of max objects in group */
  objectsPerGroup: Scalars['Int']['input']
  /** Specify the path from the objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path: Array<InputMaybe<Scalars['String']['input']>>
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type GetObjectsTextBlockGroupInpObj = {
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  type?: InputMaybe<GetObjectsTextBlockGroupInpObjTypeEnum>
}

export type GetObjectsTextBlockGroupInpObjTypeEnum = 'closest' | 'merge'

export type GetObjectsTextBlockHybridGetBm25InpObj = {
  /** The properties to search in */
  properties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The query to search for */
  query?: InputMaybe<Scalars['String']['input']>
}

/** Hybrid search */
export type GetObjectsTextBlockHybridInpObj = {
  /** Search weight */
  alpha?: InputMaybe<Scalars['Float']['input']>
  /** Algorithm used for fusing results from vector and keyword search */
  fusionType?: InputMaybe<FusionEnum>
  /** Which properties should be included in the sparse search */
  properties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Query string */
  query?: InputMaybe<Scalars['String']['input']>
  /** Vector search */
  vector?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
}

export type GetObjectsTextBlockNearObjectInpObj = {
  /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
  beacon?: InputMaybe<Scalars['String']['input']>
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Concept identifier in the uuid format */
  id?: InputMaybe<Scalars['String']['input']>
}

export type GetObjectsTextBlockNearVectorInpObj = {
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Target vector to be used in kNN search */
  vector: Array<InputMaybe<Scalars['Float']['input']>>
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type GetObjectsTextBlockSortInpObj = {
  /** Specify the sort order, either ascending (asc) which is default or descending (desc) */
  order?: InputMaybe<GetObjectsTextBlockSortInpObjTypeEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Get', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type GetObjectsTextBlockSortInpObjTypeEnum = 'asc' | 'desc'

export type GetObjectsTextBlockWhereGeoRangeDistanceInpObj = {
  /** The maximum distance from the point specified geoCoordinates. */
  max: Scalars['Float']['input']
}

export type GetObjectsTextBlockWhereGeoRangeGeoCoordinatesInpObj = {
  /** The latitude (in decimal format) of the geoCoordinates to search around. */
  latitude: Scalars['Float']['input']
  /** The longitude (in decimal format) of the geoCoordinates to search around. */
  longitude: Scalars['Float']['input']
}

export type GetObjectsTextBlockWhereGeoRangeInpObj = {
  /** The distance from the point specified via geoCoordinates. */
  distance: GetObjectsTextBlockWhereGeoRangeDistanceInpObj
  /** The geoCoordinates that form the center point of the search. */
  geoCoordinates: GetObjectsTextBlockWhereGeoRangeGeoCoordinatesInpObj
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type GetObjectsTextBlockWhereInpObj = {
  /** Contains the Operands that can be applied to a 'where' filter */
  operands?: InputMaybe<
    Array<InputMaybe<GetObjectsTextBlockWhereOperandsInpObj>>
  >
  /** Contains the Operators that can be applied to a 'where' filter */
  operator?: InputMaybe<GetObjectsTextBlockWhereOperatorEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Specify a Boolean value that the target property will be compared to */
  valueBoolean?: InputMaybe<Scalars['BooleanGetObjectsTextBlock']['input']>
  /** Specify a String value that the target property will be compared to */
  valueDate?: InputMaybe<Scalars['TextDateGetObjectsTextBlock']['input']>
  /** Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point. */
  valueGeoRange?: InputMaybe<GetObjectsTextBlockWhereGeoRangeInpObj>
  /** Specify an Integer value that the target property will be compared to */
  valueInt?: InputMaybe<Scalars['IntGetObjectsTextBlock']['input']>
  /** Specify a Float value that the target property will be compared to */
  valueNumber?: InputMaybe<Scalars['FloatGetObjectsTextBlock']['input']>
  /** Specify a String value that the target property will be compared to */
  valueString?: InputMaybe<Scalars['TextStringGetObjectsTextBlock']['input']>
  /** Specify a Text value that the target property will be compared to */
  valueText?: InputMaybe<Scalars['TextGetObjectsTextBlock']['input']>
}

/** An object containing the Operands that can be applied to a 'where' filter */
export type GetObjectsTextBlockWhereOperandsInpObj = {
  /** Contains the Operands that can be applied to a 'where' filter */
  operands?: InputMaybe<
    Array<InputMaybe<GetObjectsTextBlockWhereOperandsInpObj>>
  >
  /** Contains the Operators that can be applied to a 'where' filter */
  operator?: InputMaybe<GetObjectsTextBlockWhereOperatorEnum>
  /** Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object) */
  path?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Specify a Boolean value that the target property will be compared to */
  valueBoolean?: InputMaybe<Scalars['BooleanGetObjectsTextBlock']['input']>
  /** Specify a String value that the target property will be compared to */
  valueDate?: InputMaybe<Scalars['TextDateGetObjectsTextBlock']['input']>
  /** Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point. */
  valueGeoRange?: InputMaybe<GetObjectsTextBlockWhereGeoRangeInpObj>
  /** Specify an Integer value that the target property will be compared to */
  valueInt?: InputMaybe<Scalars['IntGetObjectsTextBlock']['input']>
  /** Specify a Float value that the target property will be compared to */
  valueNumber?: InputMaybe<Scalars['FloatGetObjectsTextBlock']['input']>
  /** Specify a String value that the target property will be compared to */
  valueString?: InputMaybe<Scalars['TextStringGetObjectsTextBlock']['input']>
  /** Specify a Text value that the target property will be compared to */
  valueText?: InputMaybe<Scalars['TextGetObjectsTextBlock']['input']>
}

/** An object containing the Operators that can be applied to a 'where' filter */
export type GetObjectsTextBlockWhereOperatorEnum =
  | 'And'
  | 'ContainsAll'
  | 'ContainsAny'
  | 'Equal'
  | 'GreaterThan'
  | 'GreaterThanEqual'
  | 'IsNull'
  | 'LessThan'
  | 'LessThanEqual'
  | 'Like'
  | 'Not'
  | 'NotEqual'
  | 'Or'
  | 'WithinGeoRange'

export type GoogleCalendarEvent = {
  __typename?: 'GoogleCalendarEvent'
  _additional: Maybe<GoogleCalendarEventAdditional>
  attachments: Maybe<Array<Maybe<GoogleCalendarEventAttachmentsObj>>>
  createdAt: Maybe<Scalars['String']['output']>
  creatorDisplayName: Maybe<Scalars['String']['output']>
  creatorEmail: Maybe<Scalars['String']['output']>
  creatorId: Maybe<Scalars['String']['output']>
  creatorSelf: Maybe<Scalars['Boolean']['output']>
  descriptionHtml: Maybe<Scalars['String']['output']>
  descriptionText: Maybe<Scalars['String']['output']>
  end: Maybe<Scalars['String']['output']>
  htmlLink: Maybe<Scalars['String']['output']>
  location: Maybe<Scalars['String']['output']>
  organizerDisplayName: Maybe<Scalars['String']['output']>
  organizerEmail: Maybe<Scalars['String']['output']>
  organizerId: Maybe<Scalars['String']['output']>
  organizerSelf: Maybe<Scalars['Boolean']['output']>
  recurrence: Maybe<Array<Maybe<Scalars['String']['output']>>>
  remoteId: Maybe<Scalars['String']['output']>
  sequence: Maybe<Scalars['Int']['output']>
  sourceId: Maybe<Scalars['String']['output']>
  start: Maybe<Scalars['String']['output']>
  status: Maybe<Scalars['String']['output']>
  summary: Maybe<Scalars['String']['output']>
  title: Maybe<Scalars['String']['output']>
  updatedAt: Maybe<Scalars['String']['output']>
}

export type GoogleCalendarEventAdditional = {
  __typename?: 'GoogleCalendarEventAdditional'
  answer: Maybe<GoogleCalendarEventAdditionalAnswer>
  certainty: Maybe<Scalars['Float']['output']>
  classification: Maybe<GoogleCalendarEventAdditionalClassification>
  creationTimeUnix: Maybe<Scalars['String']['output']>
  distance: Maybe<Scalars['Float']['output']>
  explainScore: Maybe<Scalars['String']['output']>
  featureProjection: Maybe<GoogleCalendarEventAdditionalFeatureProjection>
  group: Maybe<GoogleCalendarEventAdditionalGroup>
  /** The UUID of a Object, assigned by its local Weaviate */
  id: Maybe<Scalars['String']['output']>
  lastUpdateTimeUnix: Maybe<Scalars['String']['output']>
  score: Maybe<Scalars['String']['output']>
  vector: Maybe<Array<Maybe<Scalars['Float']['output']>>>
}

export type GoogleCalendarEventAdditionalFeatureProjectionArgs = {
  algorithm?: InputMaybe<Scalars['String']['input']>
  dimensions?: InputMaybe<Scalars['Int']['input']>
  iterations?: InputMaybe<Scalars['Int']['input']>
  learningRate?: InputMaybe<Scalars['Int']['input']>
  perplexity?: InputMaybe<Scalars['Int']['input']>
}

export type GoogleCalendarEventAdditionalAnswer = {
  __typename?: 'GoogleCalendarEventAdditionalAnswer'
  endPosition: Maybe<Scalars['Int']['output']>
  hasAnswer: Maybe<Scalars['Boolean']['output']>
  property: Maybe<Scalars['String']['output']>
  result: Maybe<Scalars['String']['output']>
  startPosition: Maybe<Scalars['Int']['output']>
}

export type GoogleCalendarEventAdditionalClassification = {
  __typename?: 'GoogleCalendarEventAdditionalClassification'
  basedOn: Maybe<Array<Maybe<Scalars['String']['output']>>>
  classifiedFields: Maybe<Array<Maybe<Scalars['String']['output']>>>
  completed: Maybe<Scalars['String']['output']>
  id: Maybe<Scalars['String']['output']>
  scope: Maybe<Array<Maybe<Scalars['String']['output']>>>
}

export type GoogleCalendarEventAdditionalFeatureProjection = {
  __typename?: 'GoogleCalendarEventAdditionalFeatureProjection'
  vector: Maybe<Array<Maybe<Scalars['Float']['output']>>>
}

export type GoogleCalendarEventAdditionalGroup = {
  __typename?: 'GoogleCalendarEventAdditionalGroup'
  count: Maybe<Scalars['Int']['output']>
  groupedBy: Maybe<GoogleCalendarEventAdditionalGroupGroupedBy>
  hits: Maybe<Array<Maybe<GoogleCalendarEventAdditionalGroupHits>>>
  id: Maybe<Scalars['Int']['output']>
  maxDistance: Maybe<Scalars['Float']['output']>
  minDistance: Maybe<Scalars['Float']['output']>
}

export type GoogleCalendarEventAdditionalGroupGroupedBy = {
  __typename?: 'GoogleCalendarEventAdditionalGroupGroupedBy'
  path: Maybe<Array<Maybe<Scalars['String']['output']>>>
  value: Maybe<Scalars['String']['output']>
}

export type GoogleCalendarEventAdditionalGroupHits = {
  __typename?: 'GoogleCalendarEventAdditionalGroupHits'
  _additional: Maybe<GoogleCalendarEventAdditionalGroupHitsAdditional>
  attachments: Maybe<Array<Maybe<GoogleCalendarEventAttachmentsObj>>>
  createdAt: Maybe<Scalars['String']['output']>
  creatorDisplayName: Maybe<Scalars['String']['output']>
  creatorEmail: Maybe<Scalars['String']['output']>
  creatorId: Maybe<Scalars['String']['output']>
  creatorSelf: Maybe<Scalars['Boolean']['output']>
  descriptionHtml: Maybe<Scalars['String']['output']>
  descriptionText: Maybe<Scalars['String']['output']>
  end: Maybe<Scalars['String']['output']>
  htmlLink: Maybe<Scalars['String']['output']>
  location: Maybe<Scalars['String']['output']>
  organizerDisplayName: Maybe<Scalars['String']['output']>
  organizerEmail: Maybe<Scalars['String']['output']>
  organizerId: Maybe<Scalars['String']['output']>
  organizerSelf: Maybe<Scalars['Boolean']['output']>
  recurrence: Maybe<Array<Maybe<Scalars['String']['output']>>>
  remoteId: Maybe<Scalars['String']['output']>
  sequence: Maybe<Scalars['Int']['output']>
  sourceId: Maybe<Scalars['String']['output']>
  start: Maybe<Scalars['String']['output']>
  status: Maybe<Scalars['String']['output']>
  summary: Maybe<Scalars['String']['output']>
  title: Maybe<Scalars['String']['output']>
  updatedAt: Maybe<Scalars['String']['output']>
}

export type GoogleCalendarEventAdditionalGroupHitsAdditional = {
  __typename?: 'GoogleCalendarEventAdditionalGroupHitsAdditional'
  distance: Maybe<Scalars['Float']['output']>
  id: Maybe<Scalars['String']['output']>
  vector: Maybe<Array<Maybe<Scalars['Float']['output']>>>
}

export type GoogleCalendarEventAttachmentsObj = AudioFile | Beacon | ImageBlock

export type GoogleDoc = {
  __typename?: 'GoogleDoc'
  _additional: Maybe<GoogleDocAdditional>
  blocks: Maybe<Array<Maybe<GoogleDocBlocksObj>>>
  createdAt: Maybe<Scalars['String']['output']>
  html: Maybe<Scalars['String']['output']>
  mentions: Maybe<Scalars['String']['output']>
  mentionsObj: Array<Maybe<Mention>>
  mimeType: Maybe<Scalars['String']['output']>
  modifiedAt: Maybe<Scalars['String']['output']>
  originalName: Maybe<Scalars['String']['output']>
  path: Maybe<Array<Maybe<Scalars['String']['output']>>>
  pathString: Maybe<Scalars['String']['output']>
  remoteId: Maybe<Scalars['String']['output']>
  size: Maybe<Scalars['Int']['output']>
  slug: Maybe<Scalars['String']['output']>
  sourceId: Maybe<Scalars['String']['output']>
  subtitle: Maybe<Scalars['String']['output']>
  summary: Maybe<Scalars['String']['output']>
  tags: Maybe<Array<Maybe<Scalars['String']['output']>>>
  text: Maybe<Scalars['String']['output']>
  title: Maybe<Scalars['String']['output']>
  toc: Maybe<Scalars['String']['output']>
  tocObj: Array<Maybe<TocItem>>
}

export type GoogleDocAdditional = {
  __typename?: 'GoogleDocAdditional'
  answer: Maybe<GoogleDocAdditionalAnswer>
  certainty: Maybe<Scalars['Float']['output']>
  classification: Maybe<GoogleDocAdditionalClassification>
  creationTimeUnix: Maybe<Scalars['String']['output']>
  distance: Maybe<Scalars['Float']['output']>
  explainScore: Maybe<Scalars['String']['output']>
  featureProjection: Maybe<GoogleDocAdditionalFeatureProjection>
  group: Maybe<GoogleDocAdditionalGroup>
  /** The UUID of a Object, assigned by its local Weaviate */
  id: Maybe<Scalars['String']['output']>
  lastUpdateTimeUnix: Maybe<Scalars['String']['output']>
  score: Maybe<Scalars['String']['output']>
  vector: Maybe<Array<Maybe<Scalars['Float']['output']>>>
}

export type GoogleDocAdditionalFeatureProjectionArgs = {
  algorithm?: InputMaybe<Scalars['String']['input']>
  dimensions?: InputMaybe<Scalars['Int']['input']>
  iterations?: InputMaybe<Scalars['Int']['input']>
  learningRate?: InputMaybe<Scalars['Int']['input']>
  perplexity?: InputMaybe<Scalars['Int']['input']>
}

export type GoogleDocAdditionalAnswer = {
  __typename?: 'GoogleDocAdditionalAnswer'
  endPosition: Maybe<Scalars['Int']['output']>
  hasAnswer: Maybe<Scalars['Boolean']['output']>
  property: Maybe<Scalars['String']['output']>
  result: Maybe<Scalars['String']['output']>
  startPosition: Maybe<Scalars['Int']['output']>
}

export type GoogleDocAdditionalClassification = {
  __typename?: 'GoogleDocAdditionalClassification'
  basedOn: Maybe<Array<Maybe<Scalars['String']['output']>>>
  classifiedFields: Maybe<Array<Maybe<Scalars['String']['output']>>>
  completed: Maybe<Scalars['String']['output']>
  id: Maybe<Scalars['String']['output']>
  scope: Maybe<Array<Maybe<Scalars['String']['output']>>>
}

export type GoogleDocAdditionalFeatureProjection = {
  __typename?: 'GoogleDocAdditionalFeatureProjection'
  vector: Maybe<Array<Maybe<Scalars['Float']['output']>>>
}

export type GoogleDocAdditionalGroup = {
  __typename?: 'GoogleDocAdditionalGroup'
  count: Maybe<Scalars['Int']['output']>
  groupedBy: Maybe<GoogleDocAdditionalGroupGroupedBy>
  hits: Maybe<Array<Maybe<GoogleDocAdditionalGroupHits>>>
  id: Maybe<Scalars['Int']['output']>
  maxDistance: Maybe<Scalars['Float']['output']>
  minDistance: Maybe<Scalars['Float']['output']>
}

export type GoogleDocAdditionalGroupGroupedBy = {
  __typename?: 'GoogleDocAdditionalGroupGroupedBy'
  path: Maybe<Array<Maybe<Scalars['String']['output']>>>
  value: Maybe<Scalars['String']['output']>
}

export type GoogleDocAdditionalGroupHits = {
  __typename?: 'GoogleDocAdditionalGroupHits'
  _additional: Maybe<GoogleDocAdditionalGroupHitsAdditional>
  blocks: Maybe<Array<Maybe<GoogleDocBlocksObj>>>
  createdAt: Maybe<Scalars['String']['output']>
  html: Maybe<Scalars['String']['output']>
  mentions: Maybe<Scalars['String']['output']>
  mimeType: Maybe<Scalars['String']['output']>
  modifiedAt: Maybe<Scalars['String']['output']>
  originalName: Maybe<Scalars['String']['output']>
  path: Maybe<Array<Maybe<Scalars['String']['output']>>>
  pathString: Maybe<Scalars['String']['output']>
  remoteId: Maybe<Scalars['String']['output']>
  size: Maybe<Scalars['Int']['output']>
  slug: Maybe<Scalars['String']['output']>
  sourceId: Maybe<Scalars['String']['output']>
  subtitle: Maybe<Scalars['String']['output']>
  summary: Maybe<Scalars['String']['output']>
  tags: Maybe<Array<Maybe<Scalars['String']['output']>>>
  text: Maybe<Scalars['String']['output']>
  title: Maybe<Scalars['String']['output']>
  toc: Maybe<Scalars['String']['output']>
}

export type GoogleDocAdditionalGroupHitsAdditional = {
  __typename?: 'GoogleDocAdditionalGroupHitsAdditional'
  distance: Maybe<Scalars['Float']['output']>
  id: Maybe<Scalars['String']['output']>
  vector: Maybe<Array<Maybe<Scalars['Float']['output']>>>
}

export type GoogleDocBlocksObj = Beacon | ImageBlock | TextBlock

export type ImageBlock = {
  __typename?: 'ImageBlock'
  _additional: Maybe<ImageBlockAdditional>
  alt: Maybe<Scalars['String']['output']>
  createdAt: Maybe<Scalars['String']['output']>
  document: Maybe<Array<Maybe<ImageBlockDocumentObj>>>
  ext: Maybe<Scalars['String']['output']>
  height: Maybe<Scalars['Int']['output']>
  mimeType: Maybe<Scalars['String']['output']>
  modifiedAt: Maybe<Scalars['String']['output']>
  order: Maybe<Scalars['Int']['output']>
  originalName: Maybe<Scalars['String']['output']>
  path: Maybe<Array<Maybe<Scalars['String']['output']>>>
  pathString: Maybe<Scalars['String']['output']>
  remoteId: Maybe<Scalars['String']['output']>
  size: Maybe<Scalars['Int']['output']>
  sourceId: Maybe<Scalars['String']['output']>
  title: Maybe<Scalars['String']['output']>
  url: Maybe<Scalars['String']['output']>
  width: Maybe<Scalars['Int']['output']>
}

export type ImageBlockAdditional = {
  __typename?: 'ImageBlockAdditional'
  answer: Maybe<ImageBlockAdditionalAnswer>
  certainty: Maybe<Scalars['Float']['output']>
  classification: Maybe<ImageBlockAdditionalClassification>
  creationTimeUnix: Maybe<Scalars['String']['output']>
  distance: Maybe<Scalars['Float']['output']>
  explainScore: Maybe<Scalars['String']['output']>
  featureProjection: Maybe<ImageBlockAdditionalFeatureProjection>
  group: Maybe<ImageBlockAdditionalGroup>
  /** The UUID of a Object, assigned by its local Weaviate */
  id: Maybe<Scalars['String']['output']>
  lastUpdateTimeUnix: Maybe<Scalars['String']['output']>
  score: Maybe<Scalars['String']['output']>
  vector: Maybe<Array<Maybe<Scalars['Float']['output']>>>
}

export type ImageBlockAdditionalFeatureProjectionArgs = {
  algorithm?: InputMaybe<Scalars['String']['input']>
  dimensions?: InputMaybe<Scalars['Int']['input']>
  iterations?: InputMaybe<Scalars['Int']['input']>
  learningRate?: InputMaybe<Scalars['Int']['input']>
  perplexity?: InputMaybe<Scalars['Int']['input']>
}

export type ImageBlockAdditionalAnswer = {
  __typename?: 'ImageBlockAdditionalAnswer'
  endPosition: Maybe<Scalars['Int']['output']>
  hasAnswer: Maybe<Scalars['Boolean']['output']>
  property: Maybe<Scalars['String']['output']>
  result: Maybe<Scalars['String']['output']>
  startPosition: Maybe<Scalars['Int']['output']>
}

export type ImageBlockAdditionalClassification = {
  __typename?: 'ImageBlockAdditionalClassification'
  basedOn: Maybe<Array<Maybe<Scalars['String']['output']>>>
  classifiedFields: Maybe<Array<Maybe<Scalars['String']['output']>>>
  completed: Maybe<Scalars['String']['output']>
  id: Maybe<Scalars['String']['output']>
  scope: Maybe<Array<Maybe<Scalars['String']['output']>>>
}

export type ImageBlockAdditionalFeatureProjection = {
  __typename?: 'ImageBlockAdditionalFeatureProjection'
  vector: Maybe<Array<Maybe<Scalars['Float']['output']>>>
}

export type ImageBlockAdditionalGroup = {
  __typename?: 'ImageBlockAdditionalGroup'
  count: Maybe<Scalars['Int']['output']>
  groupedBy: Maybe<ImageBlockAdditionalGroupGroupedBy>
  hits: Maybe<Array<Maybe<ImageBlockAdditionalGroupHits>>>
  id: Maybe<Scalars['Int']['output']>
  maxDistance: Maybe<Scalars['Float']['output']>
  minDistance: Maybe<Scalars['Float']['output']>
}

export type ImageBlockAdditionalGroupGroupedBy = {
  __typename?: 'ImageBlockAdditionalGroupGroupedBy'
  path: Maybe<Array<Maybe<Scalars['String']['output']>>>
  value: Maybe<Scalars['String']['output']>
}

export type ImageBlockAdditionalGroupHits = {
  __typename?: 'ImageBlockAdditionalGroupHits'
  _additional: Maybe<ImageBlockAdditionalGroupHitsAdditional>
  alt: Maybe<Scalars['String']['output']>
  createdAt: Maybe<Scalars['String']['output']>
  document: Maybe<Array<Maybe<ImageBlockDocumentObj>>>
  ext: Maybe<Scalars['String']['output']>
  height: Maybe<Scalars['Int']['output']>
  mimeType: Maybe<Scalars['String']['output']>
  modifiedAt: Maybe<Scalars['String']['output']>
  order: Maybe<Scalars['Int']['output']>
  originalName: Maybe<Scalars['String']['output']>
  path: Maybe<Array<Maybe<Scalars['String']['output']>>>
  pathString: Maybe<Scalars['String']['output']>
  remoteId: Maybe<Scalars['String']['output']>
  size: Maybe<Scalars['Int']['output']>
  sourceId: Maybe<Scalars['String']['output']>
  title: Maybe<Scalars['String']['output']>
  url: Maybe<Scalars['String']['output']>
  width: Maybe<Scalars['Int']['output']>
}

export type ImageBlockAdditionalGroupHitsAdditional = {
  __typename?: 'ImageBlockAdditionalGroupHitsAdditional'
  distance: Maybe<Scalars['Float']['output']>
  id: Maybe<Scalars['String']['output']>
  vector: Maybe<Array<Maybe<Scalars['Float']['output']>>>
}

export type ImageBlockDocumentObj = Beacon | GoogleCalendarEvent | GoogleDoc

export type Mention = {
  __typename?: 'Mention'
  emailAddress: Scalars['String']['output']
  name: Scalars['String']['output']
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type QnATransformersAggregateAudioFileAskInpObj = {
  /** Properties which contains text */
  properties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Question to be answered */
  question: Scalars['String']['input']
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type QnATransformersAggregateGoogleCalendarEventAskInpObj = {
  /** Properties which contains text */
  properties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Question to be answered */
  question: Scalars['String']['input']
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type QnATransformersAggregateGoogleDocAskInpObj = {
  /** Properties which contains text */
  properties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Question to be answered */
  question: Scalars['String']['input']
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type QnATransformersAggregateImageBlockAskInpObj = {
  /** Properties which contains text */
  properties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Question to be answered */
  question: Scalars['String']['input']
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type QnATransformersAggregateTextBlockAskInpObj = {
  /** Properties which contains text */
  properties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Question to be answered */
  question: Scalars['String']['input']
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type QnATransformersGetObjectsAudioFileAskInpObj = {
  /** Properties which contains text */
  properties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Question to be answered */
  question: Scalars['String']['input']
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type QnATransformersGetObjectsGoogleCalendarEventAskInpObj = {
  /** Properties which contains text */
  properties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Question to be answered */
  question: Scalars['String']['input']
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type QnATransformersGetObjectsGoogleDocAskInpObj = {
  /** Properties which contains text */
  properties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Question to be answered */
  question: Scalars['String']['input']
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type QnATransformersGetObjectsImageBlockAskInpObj = {
  /** Properties which contains text */
  properties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Question to be answered */
  question: Scalars['String']['input']
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type QnATransformersGetObjectsTextBlockAskInpObj = {
  /** Properties which contains text */
  properties?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** Question to be answered */
  question: Scalars['String']['input']
}

export type TextBlock = {
  __typename?: 'TextBlock'
  _additional: Maybe<TextBlockAdditional>
  classNames: Maybe<Array<Maybe<Scalars['String']['output']>>>
  document: Maybe<Array<Maybe<TextBlockDocumentObj>>>
  footnotes: Maybe<Scalars['String']['output']>
  footnotesObj: Maybe<Array<Maybe<Footnote>>>
  html: Maybe<Scalars['String']['output']>
  order: Maybe<Scalars['Int']['output']>
  remoteId: Maybe<Scalars['String']['output']>
  sourceId: Maybe<Scalars['String']['output']>
  tagName: Maybe<Scalars['String']['output']>
  text: Maybe<Scalars['String']['output']>
}

export type TextBlockAdditional = {
  __typename?: 'TextBlockAdditional'
  answer: Maybe<TextBlockAdditionalAnswer>
  certainty: Maybe<Scalars['Float']['output']>
  classification: Maybe<TextBlockAdditionalClassification>
  creationTimeUnix: Maybe<Scalars['String']['output']>
  distance: Maybe<Scalars['Float']['output']>
  explainScore: Maybe<Scalars['String']['output']>
  featureProjection: Maybe<TextBlockAdditionalFeatureProjection>
  group: Maybe<TextBlockAdditionalGroup>
  /** The UUID of a Object, assigned by its local Weaviate */
  id: Maybe<Scalars['String']['output']>
  lastUpdateTimeUnix: Maybe<Scalars['String']['output']>
  score: Maybe<Scalars['String']['output']>
  vector: Maybe<Array<Maybe<Scalars['Float']['output']>>>
}

export type TextBlockAdditionalFeatureProjectionArgs = {
  algorithm?: InputMaybe<Scalars['String']['input']>
  dimensions?: InputMaybe<Scalars['Int']['input']>
  iterations?: InputMaybe<Scalars['Int']['input']>
  learningRate?: InputMaybe<Scalars['Int']['input']>
  perplexity?: InputMaybe<Scalars['Int']['input']>
}

export type TextBlockAdditionalAnswer = {
  __typename?: 'TextBlockAdditionalAnswer'
  endPosition: Maybe<Scalars['Int']['output']>
  hasAnswer: Maybe<Scalars['Boolean']['output']>
  property: Maybe<Scalars['String']['output']>
  result: Maybe<Scalars['String']['output']>
  startPosition: Maybe<Scalars['Int']['output']>
}

export type TextBlockAdditionalClassification = {
  __typename?: 'TextBlockAdditionalClassification'
  basedOn: Maybe<Array<Maybe<Scalars['String']['output']>>>
  classifiedFields: Maybe<Array<Maybe<Scalars['String']['output']>>>
  completed: Maybe<Scalars['String']['output']>
  id: Maybe<Scalars['String']['output']>
  scope: Maybe<Array<Maybe<Scalars['String']['output']>>>
}

export type TextBlockAdditionalFeatureProjection = {
  __typename?: 'TextBlockAdditionalFeatureProjection'
  vector: Maybe<Array<Maybe<Scalars['Float']['output']>>>
}

export type TextBlockAdditionalGroup = {
  __typename?: 'TextBlockAdditionalGroup'
  count: Maybe<Scalars['Int']['output']>
  groupedBy: Maybe<TextBlockAdditionalGroupGroupedBy>
  hits: Maybe<Array<Maybe<TextBlockAdditionalGroupHits>>>
  id: Maybe<Scalars['Int']['output']>
  maxDistance: Maybe<Scalars['Float']['output']>
  minDistance: Maybe<Scalars['Float']['output']>
}

export type TextBlockAdditionalGroupGroupedBy = {
  __typename?: 'TextBlockAdditionalGroupGroupedBy'
  path: Maybe<Array<Maybe<Scalars['String']['output']>>>
  value: Maybe<Scalars['String']['output']>
}

export type TextBlockAdditionalGroupHits = {
  __typename?: 'TextBlockAdditionalGroupHits'
  _additional: Maybe<TextBlockAdditionalGroupHitsAdditional>
  classNames: Maybe<Array<Maybe<Scalars['String']['output']>>>
  document: Maybe<Array<Maybe<TextBlockDocumentObj>>>
  footnotes: Maybe<Scalars['String']['output']>
  html: Maybe<Scalars['String']['output']>
  order: Maybe<Scalars['Int']['output']>
  remoteId: Maybe<Scalars['String']['output']>
  sourceId: Maybe<Scalars['String']['output']>
  tagName: Maybe<Scalars['String']['output']>
  text: Maybe<Scalars['String']['output']>
}

export type TextBlockAdditionalGroupHitsAdditional = {
  __typename?: 'TextBlockAdditionalGroupHitsAdditional'
  distance: Maybe<Scalars['Float']['output']>
  id: Maybe<Scalars['String']['output']>
  vector: Maybe<Array<Maybe<Scalars['Float']['output']>>>
}

export type TextBlockDocumentObj = Beacon | GoogleDoc

export type TocItem = {
  __typename?: 'TocItem'
  blockIndex: Scalars['Int']['output']
  href: Scalars['String']['output']
  level: Scalars['Int']['output']
  tag: Scalars['String']['output']
  title: Scalars['String']['output']
}

export type Txt2VecOpenAiAggregateAudioFileMoveAwayFrom = {
  /** Keywords are a list of search terms. Array type, e.g. ["keyword 1", "keyword 2"] */
  concepts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  /** objects */
  objects?: InputMaybe<
    Array<
      InputMaybe<Txt2VecOpenAiAggregateAudioFileMoveAwayFromMovementObjectsInpObj>
    >
  >
}

/** Movement Object */
export type Txt2VecOpenAiAggregateAudioFileMoveAwayFromMovementObjectsInpObj = {
  /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
  beacon?: InputMaybe<Scalars['String']['input']>
  /** id of an object */
  id?: InputMaybe<Scalars['String']['input']>
}

export type Txt2VecOpenAiAggregateAudioFileMoveTo = {
  /** Keywords are a list of search terms. Array type, e.g. ["keyword 1", "keyword 2"] */
  concepts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  /** objects */
  objects?: InputMaybe<
    Array<
      InputMaybe<Txt2VecOpenAiAggregateAudioFileMoveToMovementObjectsInpObj>
    >
  >
}

/** Movement Object */
export type Txt2VecOpenAiAggregateAudioFileMoveToMovementObjectsInpObj = {
  /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
  beacon?: InputMaybe<Scalars['String']['input']>
  /** id of an object */
  id?: InputMaybe<Scalars['String']['input']>
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type Txt2VecOpenAiAggregateAudioFileNearTextInpObj = {
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  concepts: Array<InputMaybe<Scalars['String']['input']>>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Move your search term closer to or further away from another vector described by keywords */
  moveAwayFrom?: InputMaybe<Txt2VecOpenAiAggregateAudioFileMoveAwayFrom>
  /** Move your search term closer to or further away from another vector described by keywords */
  moveTo?: InputMaybe<Txt2VecOpenAiAggregateAudioFileMoveTo>
}

export type Txt2VecOpenAiAggregateGoogleCalendarEventMoveAwayFrom = {
  /** Keywords are a list of search terms. Array type, e.g. ["keyword 1", "keyword 2"] */
  concepts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  /** objects */
  objects?: InputMaybe<
    Array<
      InputMaybe<Txt2VecOpenAiAggregateGoogleCalendarEventMoveAwayFromMovementObjectsInpObj>
    >
  >
}

/** Movement Object */
export type Txt2VecOpenAiAggregateGoogleCalendarEventMoveAwayFromMovementObjectsInpObj =
  {
    /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
    beacon?: InputMaybe<Scalars['String']['input']>
    /** id of an object */
    id?: InputMaybe<Scalars['String']['input']>
  }

export type Txt2VecOpenAiAggregateGoogleCalendarEventMoveTo = {
  /** Keywords are a list of search terms. Array type, e.g. ["keyword 1", "keyword 2"] */
  concepts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  /** objects */
  objects?: InputMaybe<
    Array<
      InputMaybe<Txt2VecOpenAiAggregateGoogleCalendarEventMoveToMovementObjectsInpObj>
    >
  >
}

/** Movement Object */
export type Txt2VecOpenAiAggregateGoogleCalendarEventMoveToMovementObjectsInpObj =
  {
    /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
    beacon?: InputMaybe<Scalars['String']['input']>
    /** id of an object */
    id?: InputMaybe<Scalars['String']['input']>
  }

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type Txt2VecOpenAiAggregateGoogleCalendarEventNearTextInpObj = {
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  concepts: Array<InputMaybe<Scalars['String']['input']>>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Move your search term closer to or further away from another vector described by keywords */
  moveAwayFrom?: InputMaybe<Txt2VecOpenAiAggregateGoogleCalendarEventMoveAwayFrom>
  /** Move your search term closer to or further away from another vector described by keywords */
  moveTo?: InputMaybe<Txt2VecOpenAiAggregateGoogleCalendarEventMoveTo>
}

export type Txt2VecOpenAiAggregateGoogleDocMoveAwayFrom = {
  /** Keywords are a list of search terms. Array type, e.g. ["keyword 1", "keyword 2"] */
  concepts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  /** objects */
  objects?: InputMaybe<
    Array<
      InputMaybe<Txt2VecOpenAiAggregateGoogleDocMoveAwayFromMovementObjectsInpObj>
    >
  >
}

/** Movement Object */
export type Txt2VecOpenAiAggregateGoogleDocMoveAwayFromMovementObjectsInpObj = {
  /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
  beacon?: InputMaybe<Scalars['String']['input']>
  /** id of an object */
  id?: InputMaybe<Scalars['String']['input']>
}

export type Txt2VecOpenAiAggregateGoogleDocMoveTo = {
  /** Keywords are a list of search terms. Array type, e.g. ["keyword 1", "keyword 2"] */
  concepts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  /** objects */
  objects?: InputMaybe<
    Array<
      InputMaybe<Txt2VecOpenAiAggregateGoogleDocMoveToMovementObjectsInpObj>
    >
  >
}

/** Movement Object */
export type Txt2VecOpenAiAggregateGoogleDocMoveToMovementObjectsInpObj = {
  /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
  beacon?: InputMaybe<Scalars['String']['input']>
  /** id of an object */
  id?: InputMaybe<Scalars['String']['input']>
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type Txt2VecOpenAiAggregateGoogleDocNearTextInpObj = {
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  concepts: Array<InputMaybe<Scalars['String']['input']>>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Move your search term closer to or further away from another vector described by keywords */
  moveAwayFrom?: InputMaybe<Txt2VecOpenAiAggregateGoogleDocMoveAwayFrom>
  /** Move your search term closer to or further away from another vector described by keywords */
  moveTo?: InputMaybe<Txt2VecOpenAiAggregateGoogleDocMoveTo>
}

export type Txt2VecOpenAiAggregateImageBlockMoveAwayFrom = {
  /** Keywords are a list of search terms. Array type, e.g. ["keyword 1", "keyword 2"] */
  concepts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  /** objects */
  objects?: InputMaybe<
    Array<
      InputMaybe<Txt2VecOpenAiAggregateImageBlockMoveAwayFromMovementObjectsInpObj>
    >
  >
}

/** Movement Object */
export type Txt2VecOpenAiAggregateImageBlockMoveAwayFromMovementObjectsInpObj =
  {
    /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
    beacon?: InputMaybe<Scalars['String']['input']>
    /** id of an object */
    id?: InputMaybe<Scalars['String']['input']>
  }

export type Txt2VecOpenAiAggregateImageBlockMoveTo = {
  /** Keywords are a list of search terms. Array type, e.g. ["keyword 1", "keyword 2"] */
  concepts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  /** objects */
  objects?: InputMaybe<
    Array<
      InputMaybe<Txt2VecOpenAiAggregateImageBlockMoveToMovementObjectsInpObj>
    >
  >
}

/** Movement Object */
export type Txt2VecOpenAiAggregateImageBlockMoveToMovementObjectsInpObj = {
  /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
  beacon?: InputMaybe<Scalars['String']['input']>
  /** id of an object */
  id?: InputMaybe<Scalars['String']['input']>
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type Txt2VecOpenAiAggregateImageBlockNearTextInpObj = {
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  concepts: Array<InputMaybe<Scalars['String']['input']>>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Move your search term closer to or further away from another vector described by keywords */
  moveAwayFrom?: InputMaybe<Txt2VecOpenAiAggregateImageBlockMoveAwayFrom>
  /** Move your search term closer to or further away from another vector described by keywords */
  moveTo?: InputMaybe<Txt2VecOpenAiAggregateImageBlockMoveTo>
}

export type Txt2VecOpenAiAggregateTextBlockMoveAwayFrom = {
  /** Keywords are a list of search terms. Array type, e.g. ["keyword 1", "keyword 2"] */
  concepts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  /** objects */
  objects?: InputMaybe<
    Array<
      InputMaybe<Txt2VecOpenAiAggregateTextBlockMoveAwayFromMovementObjectsInpObj>
    >
  >
}

/** Movement Object */
export type Txt2VecOpenAiAggregateTextBlockMoveAwayFromMovementObjectsInpObj = {
  /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
  beacon?: InputMaybe<Scalars['String']['input']>
  /** id of an object */
  id?: InputMaybe<Scalars['String']['input']>
}

export type Txt2VecOpenAiAggregateTextBlockMoveTo = {
  /** Keywords are a list of search terms. Array type, e.g. ["keyword 1", "keyword 2"] */
  concepts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  /** objects */
  objects?: InputMaybe<
    Array<
      InputMaybe<Txt2VecOpenAiAggregateTextBlockMoveToMovementObjectsInpObj>
    >
  >
}

/** Movement Object */
export type Txt2VecOpenAiAggregateTextBlockMoveToMovementObjectsInpObj = {
  /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
  beacon?: InputMaybe<Scalars['String']['input']>
  /** id of an object */
  id?: InputMaybe<Scalars['String']['input']>
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type Txt2VecOpenAiAggregateTextBlockNearTextInpObj = {
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  concepts: Array<InputMaybe<Scalars['String']['input']>>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Move your search term closer to or further away from another vector described by keywords */
  moveAwayFrom?: InputMaybe<Txt2VecOpenAiAggregateTextBlockMoveAwayFrom>
  /** Move your search term closer to or further away from another vector described by keywords */
  moveTo?: InputMaybe<Txt2VecOpenAiAggregateTextBlockMoveTo>
}

export type Txt2VecOpenAiGetObjectsAudioFileMoveAwayFrom = {
  /** Keywords are a list of search terms. Array type, e.g. ["keyword 1", "keyword 2"] */
  concepts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  /** objects */
  objects?: InputMaybe<
    Array<
      InputMaybe<Txt2VecOpenAiGetObjectsAudioFileMoveAwayFromMovementObjectsInpObj>
    >
  >
}

/** Movement Object */
export type Txt2VecOpenAiGetObjectsAudioFileMoveAwayFromMovementObjectsInpObj =
  {
    /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
    beacon?: InputMaybe<Scalars['String']['input']>
    /** id of an object */
    id?: InputMaybe<Scalars['String']['input']>
  }

export type Txt2VecOpenAiGetObjectsAudioFileMoveTo = {
  /** Keywords are a list of search terms. Array type, e.g. ["keyword 1", "keyword 2"] */
  concepts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  /** objects */
  objects?: InputMaybe<
    Array<
      InputMaybe<Txt2VecOpenAiGetObjectsAudioFileMoveToMovementObjectsInpObj>
    >
  >
}

/** Movement Object */
export type Txt2VecOpenAiGetObjectsAudioFileMoveToMovementObjectsInpObj = {
  /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
  beacon?: InputMaybe<Scalars['String']['input']>
  /** id of an object */
  id?: InputMaybe<Scalars['String']['input']>
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type Txt2VecOpenAiGetObjectsAudioFileNearTextInpObj = {
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  concepts: Array<InputMaybe<Scalars['String']['input']>>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Move your search term closer to or further away from another vector described by keywords */
  moveAwayFrom?: InputMaybe<Txt2VecOpenAiGetObjectsAudioFileMoveAwayFrom>
  /** Move your search term closer to or further away from another vector described by keywords */
  moveTo?: InputMaybe<Txt2VecOpenAiGetObjectsAudioFileMoveTo>
}

export type Txt2VecOpenAiGetObjectsGoogleCalendarEventMoveAwayFrom = {
  /** Keywords are a list of search terms. Array type, e.g. ["keyword 1", "keyword 2"] */
  concepts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  /** objects */
  objects?: InputMaybe<
    Array<
      InputMaybe<Txt2VecOpenAiGetObjectsGoogleCalendarEventMoveAwayFromMovementObjectsInpObj>
    >
  >
}

/** Movement Object */
export type Txt2VecOpenAiGetObjectsGoogleCalendarEventMoveAwayFromMovementObjectsInpObj =
  {
    /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
    beacon?: InputMaybe<Scalars['String']['input']>
    /** id of an object */
    id?: InputMaybe<Scalars['String']['input']>
  }

export type Txt2VecOpenAiGetObjectsGoogleCalendarEventMoveTo = {
  /** Keywords are a list of search terms. Array type, e.g. ["keyword 1", "keyword 2"] */
  concepts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  /** objects */
  objects?: InputMaybe<
    Array<
      InputMaybe<Txt2VecOpenAiGetObjectsGoogleCalendarEventMoveToMovementObjectsInpObj>
    >
  >
}

/** Movement Object */
export type Txt2VecOpenAiGetObjectsGoogleCalendarEventMoveToMovementObjectsInpObj =
  {
    /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
    beacon?: InputMaybe<Scalars['String']['input']>
    /** id of an object */
    id?: InputMaybe<Scalars['String']['input']>
  }

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type Txt2VecOpenAiGetObjectsGoogleCalendarEventNearTextInpObj = {
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  concepts: Array<InputMaybe<Scalars['String']['input']>>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Move your search term closer to or further away from another vector described by keywords */
  moveAwayFrom?: InputMaybe<Txt2VecOpenAiGetObjectsGoogleCalendarEventMoveAwayFrom>
  /** Move your search term closer to or further away from another vector described by keywords */
  moveTo?: InputMaybe<Txt2VecOpenAiGetObjectsGoogleCalendarEventMoveTo>
}

export type Txt2VecOpenAiGetObjectsGoogleDocMoveAwayFrom = {
  /** Keywords are a list of search terms. Array type, e.g. ["keyword 1", "keyword 2"] */
  concepts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  /** objects */
  objects?: InputMaybe<
    Array<
      InputMaybe<Txt2VecOpenAiGetObjectsGoogleDocMoveAwayFromMovementObjectsInpObj>
    >
  >
}

/** Movement Object */
export type Txt2VecOpenAiGetObjectsGoogleDocMoveAwayFromMovementObjectsInpObj =
  {
    /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
    beacon?: InputMaybe<Scalars['String']['input']>
    /** id of an object */
    id?: InputMaybe<Scalars['String']['input']>
  }

export type Txt2VecOpenAiGetObjectsGoogleDocMoveTo = {
  /** Keywords are a list of search terms. Array type, e.g. ["keyword 1", "keyword 2"] */
  concepts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  /** objects */
  objects?: InputMaybe<
    Array<
      InputMaybe<Txt2VecOpenAiGetObjectsGoogleDocMoveToMovementObjectsInpObj>
    >
  >
}

/** Movement Object */
export type Txt2VecOpenAiGetObjectsGoogleDocMoveToMovementObjectsInpObj = {
  /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
  beacon?: InputMaybe<Scalars['String']['input']>
  /** id of an object */
  id?: InputMaybe<Scalars['String']['input']>
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type Txt2VecOpenAiGetObjectsGoogleDocNearTextInpObj = {
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  concepts: Array<InputMaybe<Scalars['String']['input']>>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Move your search term closer to or further away from another vector described by keywords */
  moveAwayFrom?: InputMaybe<Txt2VecOpenAiGetObjectsGoogleDocMoveAwayFrom>
  /** Move your search term closer to or further away from another vector described by keywords */
  moveTo?: InputMaybe<Txt2VecOpenAiGetObjectsGoogleDocMoveTo>
}

export type Txt2VecOpenAiGetObjectsImageBlockMoveAwayFrom = {
  /** Keywords are a list of search terms. Array type, e.g. ["keyword 1", "keyword 2"] */
  concepts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  /** objects */
  objects?: InputMaybe<
    Array<
      InputMaybe<Txt2VecOpenAiGetObjectsImageBlockMoveAwayFromMovementObjectsInpObj>
    >
  >
}

/** Movement Object */
export type Txt2VecOpenAiGetObjectsImageBlockMoveAwayFromMovementObjectsInpObj =
  {
    /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
    beacon?: InputMaybe<Scalars['String']['input']>
    /** id of an object */
    id?: InputMaybe<Scalars['String']['input']>
  }

export type Txt2VecOpenAiGetObjectsImageBlockMoveTo = {
  /** Keywords are a list of search terms. Array type, e.g. ["keyword 1", "keyword 2"] */
  concepts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  /** objects */
  objects?: InputMaybe<
    Array<
      InputMaybe<Txt2VecOpenAiGetObjectsImageBlockMoveToMovementObjectsInpObj>
    >
  >
}

/** Movement Object */
export type Txt2VecOpenAiGetObjectsImageBlockMoveToMovementObjectsInpObj = {
  /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
  beacon?: InputMaybe<Scalars['String']['input']>
  /** id of an object */
  id?: InputMaybe<Scalars['String']['input']>
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type Txt2VecOpenAiGetObjectsImageBlockNearTextInpObj = {
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  concepts: Array<InputMaybe<Scalars['String']['input']>>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Move your search term closer to or further away from another vector described by keywords */
  moveAwayFrom?: InputMaybe<Txt2VecOpenAiGetObjectsImageBlockMoveAwayFrom>
  /** Move your search term closer to or further away from another vector described by keywords */
  moveTo?: InputMaybe<Txt2VecOpenAiGetObjectsImageBlockMoveTo>
}

export type Txt2VecOpenAiGetObjectsTextBlockMoveAwayFrom = {
  /** Keywords are a list of search terms. Array type, e.g. ["keyword 1", "keyword 2"] */
  concepts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  /** objects */
  objects?: InputMaybe<
    Array<
      InputMaybe<Txt2VecOpenAiGetObjectsTextBlockMoveAwayFromMovementObjectsInpObj>
    >
  >
}

/** Movement Object */
export type Txt2VecOpenAiGetObjectsTextBlockMoveAwayFromMovementObjectsInpObj =
  {
    /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
    beacon?: InputMaybe<Scalars['String']['input']>
    /** id of an object */
    id?: InputMaybe<Scalars['String']['input']>
  }

export type Txt2VecOpenAiGetObjectsTextBlockMoveTo = {
  /** Keywords are a list of search terms. Array type, e.g. ["keyword 1", "keyword 2"] */
  concepts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  /** The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible */
  force: Scalars['Float']['input']
  /** objects */
  objects?: InputMaybe<
    Array<
      InputMaybe<Txt2VecOpenAiGetObjectsTextBlockMoveToMovementObjectsInpObj>
    >
  >
}

/** Movement Object */
export type Txt2VecOpenAiGetObjectsTextBlockMoveToMovementObjectsInpObj = {
  /** Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id */
  beacon?: InputMaybe<Scalars['String']['input']>
  /** id of an object */
  id?: InputMaybe<Scalars['String']['input']>
}

/** An object containing filter options for a local Get query, used to convert the result to the specified filters */
export type Txt2VecOpenAiGetObjectsTextBlockNearTextInpObj = {
  /** Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). */
  certainty?: InputMaybe<Scalars['Float']['input']>
  concepts: Array<InputMaybe<Scalars['String']['input']>>
  /** The required degree of similarity between an object's characteristics and the provided filter values */
  distance?: InputMaybe<Scalars['Float']['input']>
  /** Move your search term closer to or further away from another vector described by keywords */
  moveAwayFrom?: InputMaybe<Txt2VecOpenAiGetObjectsTextBlockMoveAwayFrom>
  /** Move your search term closer to or further away from another vector described by keywords */
  moveTo?: InputMaybe<Txt2VecOpenAiGetObjectsTextBlockMoveTo>
}

/** Location of the root query */
export type WeaviateObj = {
  __typename?: 'WeaviateObj'
  /** Filter options for a local Aggregate query, used to convert the result to the specified filters */
  Aggregate: Maybe<AggregateObjectsObj>
  /** Get Objects on a local Weaviate */
  Get: Maybe<GetObjectsObj>
}

export type TextBlockCommonFragment = {
  __typename: 'TextBlock'
  footnotes: string
  html: string
  order: number
  text: string
  tagName: string
  classNames: Array<string>
  footnotesObj: Array<{
    __typename?: 'Footnote'
    index: number
    id: string
    refId: string
    refValue: string
    valueHTML: string
    valueText: string
  }>
  _additional: { __typename?: 'TextBlockAdditional'; id: string }
}

export type ImageBlockCommonFragment = {
  __typename: 'ImageBlock'
  url: string
  alt: string
  order: number
  width: number
  height: number
  _additional: { __typename?: 'ImageBlockAdditional'; id: string }
}

export type GoogleDocCommonFragment = {
  __typename?: 'GoogleDoc'
  sourceId: string
  title: string
  subtitle: string
  summary: string
  tags: Array<string>
  createdAt: string
  modifiedAt: string
  slug: string
  path: Array<string>
  pathString: string
  _additional: { __typename?: 'GoogleDocAdditional'; id: string }
}

export type GoogleDocMentionsFragment = {
  __typename?: 'GoogleDoc'
  mentions: string
  mentionsObj: Array<{
    __typename?: 'Mention'
    name: string
    emailAddress: string
  }>
}

export type GoogleDocTocFragment = {
  __typename?: 'GoogleDoc'
  toc: string
  tocObj: Array<{
    __typename?: 'TocItem'
    level: number
    tag: string
    href: string
    title: string
    blockIndex: number
  }>
}

export type SearchImageBlockFragment = {
  __typename: 'ImageBlock'
  url: string
  alt: string
  order: number
  width: number
  height: number
  _additional: {
    __typename?: 'ImageBlockAdditional'
    id: string
    score: string
    certainty: number
  }
  document: Array<
    | { __typename?: 'Beacon' }
    | { __typename?: 'GoogleCalendarEvent' }
    | {
        __typename?: 'GoogleDoc'
        sourceId: string
        title: string
        subtitle: string
        summary: string
        tags: Array<string>
        createdAt: string
        modifiedAt: string
        slug: string
        path: Array<string>
        pathString: string
        mentions: string
        _additional: { __typename?: 'GoogleDocAdditional'; id: string }
        mentionsObj: Array<{
          __typename?: 'Mention'
          name: string
          emailAddress: string
        }>
      }
  >
}

export type SearchTextBlockFragment = {
  __typename: 'TextBlock'
  footnotes: string
  html: string
  order: number
  text: string
  tagName: string
  classNames: Array<string>
  _additional: {
    __typename?: 'TextBlockAdditional'
    id: string
    score: string
    certainty: number
  }
  document: Array<
    | { __typename?: 'Beacon' }
    | {
        __typename?: 'GoogleDoc'
        sourceId: string
        title: string
        subtitle: string
        summary: string
        tags: Array<string>
        createdAt: string
        modifiedAt: string
        slug: string
        path: Array<string>
        pathString: string
        mentions: string
        _additional: { __typename?: 'GoogleDocAdditional'; id: string }
        mentionsObj: Array<{
          __typename?: 'Mention'
          name: string
          emailAddress: string
        }>
      }
  >
  footnotesObj: Array<{
    __typename?: 'Footnote'
    index: number
    id: string
    refId: string
    refValue: string
    valueHTML: string
    valueText: string
  }>
}

export type SearchGoogleDocFragment = {
  __typename?: 'GoogleDoc'
  sourceId: string
  title: string
  subtitle: string
  summary: string
  tags: Array<string>
  createdAt: string
  modifiedAt: string
  slug: string
  path: Array<string>
  pathString: string
  mentions: string
  blocks: Array<
    | { __typename?: 'Beacon' }
    | {
        __typename: 'ImageBlock'
        url: string
        alt: string
        order: number
        width: number
        height: number
        _additional: { __typename?: 'ImageBlockAdditional'; id: string }
      }
    | { __typename?: 'TextBlock' }
  >
  _additional: {
    __typename?: 'GoogleDocAdditional'
    id: string
    score: string
    certainty: number
  }
  mentionsObj: Array<{
    __typename?: 'Mention'
    name: string
    emailAddress: string
  }>
}

export type CountDocumentsQueryVariables = Exact<{
  filter?: InputMaybe<AggregateObjectsGoogleDocWhereInpObj>
}>

export type CountDocumentsQuery = {
  __typename?: 'WeaviateObj'
  Aggregate: {
    __typename?: 'AggregateObjectsObj'
    GoogleDoc: Array<{
      __typename?: 'AggregateGoogleDoc'
      meta: { __typename?: 'AggregateGoogleDocMetaObject'; count: number }
    }>
  }
}

export type GetPostsQueryVariables = Exact<{
  filter?: InputMaybe<GetObjectsGoogleDocWhereInpObj>
  sort?: InputMaybe<
    | Array<InputMaybe<GetObjectsGoogleDocSortInpObj>>
    | InputMaybe<GetObjectsGoogleDocSortInpObj>
  >
  searchResult?: InputMaybe<Scalars['Boolean']['input']>
  nearText?: InputMaybe<Txt2VecOpenAiGetObjectsGoogleDocNearTextInpObj>
  hybrid?: InputMaybe<GetObjectsGoogleDocHybridInpObj>
  nearObject?: InputMaybe<GetObjectsGoogleDocNearObjectInpObj>
  skip?: InputMaybe<Scalars['Int']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  toc?: InputMaybe<Scalars['Boolean']['input']>
  mentions?: InputMaybe<Scalars['Boolean']['input']>
  textBlocks?: InputMaybe<Scalars['Boolean']['input']>
  imageBlocks?: InputMaybe<Scalars['Boolean']['input']>
  remoteId?: InputMaybe<Scalars['Boolean']['input']>
}>

export type GetPostsQuery = {
  __typename?: 'WeaviateObj'
  Get: {
    __typename?: 'GetObjectsObj'
    GoogleDoc: Array<{
      __typename?: 'GoogleDoc'
      title: string
      subtitle: string
      summary: string
      slug: string
      tags: Array<string>
      path: Array<string>
      createdAt: string
      modifiedAt: string
      pathString: string
      remoteId?: string
      mentions?: string
      toc?: string
      _additional: {
        __typename?: 'GoogleDocAdditional'
        id: string
        score?: string
        distance?: number
        certainty?: number
      }
      mentionsObj?: Array<{
        __typename?: 'Mention'
        name: string
        emailAddress: string
      }>
      tocObj?: Array<{
        __typename?: 'TocItem'
        level: number
        tag: string
        href: string
        title: string
        blockIndex: number
      }>
      blocks: Array<
        | { __typename?: 'Beacon' }
        | {
            __typename: 'ImageBlock'
            url: string
            alt: string
            order: number
            width: number
            height: number
            _additional: { __typename?: 'ImageBlockAdditional'; id: string }
          }
        | {
            __typename: 'TextBlock'
            footnotes: string
            html: string
            order: number
            text: string
            tagName: string
            classNames: Array<string>
            footnotesObj: Array<{
              __typename?: 'Footnote'
              index: number
              id: string
              refId: string
              refValue: string
              valueHTML: string
              valueText: string
            }>
            _additional: { __typename?: 'TextBlockAdditional'; id: string }
          }
      >
    }>
  }
}

export type GetAllTopicsQueryVariables = Exact<{
  filter?: InputMaybe<AggregateObjectsGoogleDocWhereInpObj>
}>

export type GetAllTopicsQuery = {
  __typename?: 'WeaviateObj'
  Aggregate: {
    __typename?: 'AggregateObjectsObj'
    GoogleDoc: Array<{
      __typename?: 'AggregateGoogleDoc'
      groupedBy: {
        __typename?: 'AggregateGoogleDocGroupedByObj'
        value: string
      }
    }>
  }
}

export type SearchBlocksQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  textNearText?: InputMaybe<Txt2VecOpenAiGetObjectsTextBlockNearTextInpObj>
  imageNearText?: InputMaybe<Txt2VecOpenAiGetObjectsImageBlockNearTextInpObj>
  textFilter?: InputMaybe<GetObjectsTextBlockWhereInpObj>
  imageFilter?: InputMaybe<GetObjectsImageBlockWhereInpObj>
  textHybrid?: InputMaybe<GetObjectsTextBlockHybridInpObj>
  imageHybrid?: InputMaybe<GetObjectsImageBlockHybridInpObj>
  text?: InputMaybe<Scalars['Boolean']['input']>
  image?: InputMaybe<Scalars['Boolean']['input']>
}>

export type SearchBlocksQuery = {
  __typename?: 'WeaviateObj'
  Get: {
    __typename?: 'GetObjectsObj'
    TextBlock?: Array<{
      __typename: 'TextBlock'
      footnotes: string
      html: string
      order: number
      text: string
      tagName: string
      classNames: Array<string>
      footnotesObj: Array<{
        __typename?: 'Footnote'
        index: number
        id: string
        refId: string
        refValue: string
        valueHTML: string
        valueText: string
      }>
      document: Array<
        | { __typename?: 'Beacon' }
        | {
            __typename?: 'GoogleDoc'
            sourceId: string
            title: string
            subtitle: string
            summary: string
            tags: Array<string>
            createdAt: string
            modifiedAt: string
            slug: string
            path: Array<string>
            pathString: string
            mentions: string
            _additional: { __typename?: 'GoogleDocAdditional'; id: string }
            mentionsObj: Array<{
              __typename?: 'Mention'
              name: string
              emailAddress: string
            }>
          }
      >
      _additional: {
        __typename?: 'TextBlockAdditional'
        certainty: number
        score: string
        id: string
      }
    }>
    ImageBlock?: Array<{
      __typename: 'ImageBlock'
      url: string
      alt: string
      order: number
      width: number
      height: number
      document: Array<
        | { __typename?: 'Beacon' }
        | { __typename?: 'GoogleCalendarEvent' }
        | {
            __typename?: 'GoogleDoc'
            sourceId: string
            title: string
            subtitle: string
            summary: string
            tags: Array<string>
            createdAt: string
            modifiedAt: string
            slug: string
            path: Array<string>
            pathString: string
            mentions: string
            _additional: { __typename?: 'GoogleDocAdditional'; id: string }
            mentionsObj: Array<{
              __typename?: 'Mention'
              name: string
              emailAddress: string
            }>
          }
      >
      _additional: {
        __typename?: 'ImageBlockAdditional'
        certainty: number
        score: string
        id: string
      }
    }>
  }
}

export const GoogleDocTocFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'GoogleDocTOC' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'GoogleDoc' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'toc' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tocObj' },
            directives: [
              {
                kind: 'Directive',
                name: { kind: 'Name', value: 'client' },
                arguments: [
                  {
                    kind: 'Argument',
                    name: { kind: 'Name', value: 'always' },
                    value: { kind: 'BooleanValue', value: true },
                  },
                ],
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'level' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tag' } },
                { kind: 'Field', name: { kind: 'Name', value: 'href' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'blockIndex' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GoogleDocTocFragment, unknown>
export const ImageBlockCommonFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ImageBlockCommon' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ImageBlock' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
          { kind: 'Field', name: { kind: 'Name', value: 'alt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'order' } },
          { kind: 'Field', name: { kind: 'Name', value: 'width' } },
          { kind: 'Field', name: { kind: 'Name', value: 'height' } },
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: '_additional' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ImageBlockCommonFragment, unknown>
export const GoogleDocCommonFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'GoogleDocCommon' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'GoogleDoc' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'sourceId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'subtitle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'modifiedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'path' } },
          { kind: 'Field', name: { kind: 'Name', value: 'pathString' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: '_additional' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GoogleDocCommonFragment, unknown>
export const GoogleDocMentionsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'GoogleDocMentions' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'GoogleDoc' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'mentions' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mentionsObj' },
            directives: [
              {
                kind: 'Directive',
                name: { kind: 'Name', value: 'client' },
                arguments: [
                  {
                    kind: 'Argument',
                    name: { kind: 'Name', value: 'always' },
                    value: { kind: 'BooleanValue', value: true },
                  },
                ],
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'emailAddress' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GoogleDocMentionsFragment, unknown>
export const SearchImageBlockFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SearchImageBlock' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ImageBlock' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'ImageBlockCommon' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: '_additional' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'score' } },
                { kind: 'Field', name: { kind: 'Name', value: 'certainty' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'document' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'GoogleDoc' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'GoogleDocCommon' },
                      },
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'GoogleDocMentions' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ImageBlockCommon' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ImageBlock' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
          { kind: 'Field', name: { kind: 'Name', value: 'alt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'order' } },
          { kind: 'Field', name: { kind: 'Name', value: 'width' } },
          { kind: 'Field', name: { kind: 'Name', value: 'height' } },
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: '_additional' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'GoogleDocCommon' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'GoogleDoc' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'sourceId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'subtitle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'modifiedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'path' } },
          { kind: 'Field', name: { kind: 'Name', value: 'pathString' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: '_additional' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'GoogleDocMentions' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'GoogleDoc' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'mentions' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mentionsObj' },
            directives: [
              {
                kind: 'Directive',
                name: { kind: 'Name', value: 'client' },
                arguments: [
                  {
                    kind: 'Argument',
                    name: { kind: 'Name', value: 'always' },
                    value: { kind: 'BooleanValue', value: true },
                  },
                ],
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'emailAddress' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SearchImageBlockFragment, unknown>
export const TextBlockCommonFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TextBlockCommon' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TextBlock' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'footnotes' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'footnotesObj' },
            directives: [
              {
                kind: 'Directive',
                name: { kind: 'Name', value: 'client' },
                arguments: [
                  {
                    kind: 'Argument',
                    name: { kind: 'Name', value: 'always' },
                    value: { kind: 'BooleanValue', value: true },
                  },
                ],
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'index' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'refId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'refValue' } },
                { kind: 'Field', name: { kind: 'Name', value: 'valueHTML' } },
                { kind: 'Field', name: { kind: 'Name', value: 'valueText' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'html' } },
          { kind: 'Field', name: { kind: 'Name', value: 'order' } },
          { kind: 'Field', name: { kind: 'Name', value: 'text' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tagName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'classNames' } },
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: '_additional' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TextBlockCommonFragment, unknown>
export const SearchTextBlockFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SearchTextBlock' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TextBlock' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'TextBlockCommon' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: '_additional' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'score' } },
                { kind: 'Field', name: { kind: 'Name', value: 'certainty' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'document' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'GoogleDoc' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'GoogleDocCommon' },
                      },
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'GoogleDocMentions' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TextBlockCommon' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TextBlock' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'footnotes' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'footnotesObj' },
            directives: [
              {
                kind: 'Directive',
                name: { kind: 'Name', value: 'client' },
                arguments: [
                  {
                    kind: 'Argument',
                    name: { kind: 'Name', value: 'always' },
                    value: { kind: 'BooleanValue', value: true },
                  },
                ],
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'index' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'refId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'refValue' } },
                { kind: 'Field', name: { kind: 'Name', value: 'valueHTML' } },
                { kind: 'Field', name: { kind: 'Name', value: 'valueText' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'html' } },
          { kind: 'Field', name: { kind: 'Name', value: 'order' } },
          { kind: 'Field', name: { kind: 'Name', value: 'text' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tagName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'classNames' } },
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: '_additional' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'GoogleDocCommon' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'GoogleDoc' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'sourceId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'subtitle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'modifiedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'path' } },
          { kind: 'Field', name: { kind: 'Name', value: 'pathString' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: '_additional' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'GoogleDocMentions' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'GoogleDoc' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'mentions' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mentionsObj' },
            directives: [
              {
                kind: 'Directive',
                name: { kind: 'Name', value: 'client' },
                arguments: [
                  {
                    kind: 'Argument',
                    name: { kind: 'Name', value: 'always' },
                    value: { kind: 'BooleanValue', value: true },
                  },
                ],
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'emailAddress' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SearchTextBlockFragment, unknown>
export const SearchGoogleDocFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SearchGoogleDoc' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'GoogleDoc' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'GoogleDocCommon' },
          },
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'GoogleDocMentions' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'blocks' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'InlineFragment',
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'ImageBlock' },
                  },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ImageBlockCommon' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: '_additional' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'score' } },
                { kind: 'Field', name: { kind: 'Name', value: 'certainty' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'GoogleDocCommon' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'GoogleDoc' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'sourceId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'subtitle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'summary' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'modifiedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
          { kind: 'Field', name: { kind: 'Name', value: 'path' } },
          { kind: 'Field', name: { kind: 'Name', value: 'pathString' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: '_additional' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'GoogleDocMentions' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'GoogleDoc' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'mentions' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'mentionsObj' },
            directives: [
              {
                kind: 'Directive',
                name: { kind: 'Name', value: 'client' },
                arguments: [
                  {
                    kind: 'Argument',
                    name: { kind: 'Name', value: 'always' },
                    value: { kind: 'BooleanValue', value: true },
                  },
                ],
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'emailAddress' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ImageBlockCommon' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ImageBlock' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
          { kind: 'Field', name: { kind: 'Name', value: 'alt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'order' } },
          { kind: 'Field', name: { kind: 'Name', value: 'width' } },
          { kind: 'Field', name: { kind: 'Name', value: 'height' } },
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: '_additional' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SearchGoogleDocFragment, unknown>
export const CountDocumentsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'CountDocuments' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'filter' },
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'AggregateObjectsGoogleDocWhereInpObj',
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Aggregate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'GoogleDoc' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'filter' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'meta' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'count' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CountDocumentsQuery, CountDocumentsQueryVariables>
export const GetPostsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPosts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'filter' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'GetObjectsGoogleDocWhereInpObj' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'GetObjectsGoogleDocSortInpObj' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'searchResult' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          defaultValue: { kind: 'BooleanValue', value: false },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'nearText' },
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Txt2VecOpenAIGetObjectsGoogleDocNearTextInpObj',
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'hybrid' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'GetObjectsGoogleDocHybridInpObj' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'nearObject' },
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'GetObjectsGoogleDocNearObjectInpObj',
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '0' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          defaultValue: { kind: 'IntValue', value: '10' },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'toc' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          defaultValue: { kind: 'BooleanValue', value: false },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'mentions' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          defaultValue: { kind: 'BooleanValue', value: false },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'textBlocks' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          defaultValue: { kind: 'BooleanValue', value: false },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'imageBlocks' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          defaultValue: { kind: 'BooleanValue', value: false },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'remoteId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          defaultValue: { kind: 'BooleanValue', value: false },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Get' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'GoogleDoc' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'filter' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'hybrid' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'hybrid' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'nearText' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'nearText' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'nearObject' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'nearObject' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'sort' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'sort' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'offset' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'skip' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'limit' },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: '_additional' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'score' },
                              directives: [
                                {
                                  kind: 'Directive',
                                  name: { kind: 'Name', value: 'include' },
                                  arguments: [
                                    {
                                      kind: 'Argument',
                                      name: { kind: 'Name', value: 'if' },
                                      value: {
                                        kind: 'Variable',
                                        name: {
                                          kind: 'Name',
                                          value: 'searchResult',
                                        },
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'distance' },
                              directives: [
                                {
                                  kind: 'Directive',
                                  name: { kind: 'Name', value: 'include' },
                                  arguments: [
                                    {
                                      kind: 'Argument',
                                      name: { kind: 'Name', value: 'if' },
                                      value: {
                                        kind: 'Variable',
                                        name: {
                                          kind: 'Name',
                                          value: 'searchResult',
                                        },
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'certainty' },
                              directives: [
                                {
                                  kind: 'Directive',
                                  name: { kind: 'Name', value: 'include' },
                                  arguments: [
                                    {
                                      kind: 'Argument',
                                      name: { kind: 'Name', value: 'if' },
                                      value: {
                                        kind: 'Variable',
                                        name: {
                                          kind: 'Name',
                                          value: 'searchResult',
                                        },
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'subtitle' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'summary' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'modifiedAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pathString' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'remoteId' },
                        directives: [
                          {
                            kind: 'Directive',
                            name: { kind: 'Name', value: 'include' },
                            arguments: [
                              {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'if' },
                                value: {
                                  kind: 'Variable',
                                  name: { kind: 'Name', value: 'remoteId' },
                                },
                              },
                            ],
                          },
                        ],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'mentions' },
                        directives: [
                          {
                            kind: 'Directive',
                            name: { kind: 'Name', value: 'include' },
                            arguments: [
                              {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'if' },
                                value: {
                                  kind: 'Variable',
                                  name: { kind: 'Name', value: 'mentions' },
                                },
                              },
                            ],
                          },
                        ],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'mentionsObj' },
                        directives: [
                          {
                            kind: 'Directive',
                            name: { kind: 'Name', value: 'client' },
                            arguments: [
                              {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'always' },
                                value: { kind: 'BooleanValue', value: true },
                              },
                            ],
                          },
                          {
                            kind: 'Directive',
                            name: { kind: 'Name', value: 'include' },
                            arguments: [
                              {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'if' },
                                value: {
                                  kind: 'Variable',
                                  name: { kind: 'Name', value: 'mentions' },
                                },
                              },
                            ],
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'emailAddress' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'toc' },
                        directives: [
                          {
                            kind: 'Directive',
                            name: { kind: 'Name', value: 'include' },
                            arguments: [
                              {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'if' },
                                value: {
                                  kind: 'Variable',
                                  name: { kind: 'Name', value: 'toc' },
                                },
                              },
                            ],
                          },
                        ],
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'tocObj' },
                        directives: [
                          {
                            kind: 'Directive',
                            name: { kind: 'Name', value: 'client' },
                            arguments: [
                              {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'always' },
                                value: { kind: 'BooleanValue', value: true },
                              },
                            ],
                          },
                          {
                            kind: 'Directive',
                            name: { kind: 'Name', value: 'include' },
                            arguments: [
                              {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'if' },
                                value: {
                                  kind: 'Variable',
                                  name: { kind: 'Name', value: 'toc' },
                                },
                              },
                            ],
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'level' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'tag' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'href' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'blockIndex' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'blocks' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'InlineFragment',
                              typeCondition: {
                                kind: 'NamedType',
                                name: { kind: 'Name', value: 'ImageBlock' },
                              },
                              directives: [
                                {
                                  kind: 'Directive',
                                  name: { kind: 'Name', value: 'include' },
                                  arguments: [
                                    {
                                      kind: 'Argument',
                                      name: { kind: 'Name', value: 'if' },
                                      value: {
                                        kind: 'Variable',
                                        name: {
                                          kind: 'Name',
                                          value: 'imageBlocks',
                                        },
                                      },
                                    },
                                  ],
                                },
                              ],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'url' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'alt' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'order' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'width' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'height' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: '__typename' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: '_additional',
                                    },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'InlineFragment',
                              typeCondition: {
                                kind: 'NamedType',
                                name: { kind: 'Name', value: 'TextBlock' },
                              },
                              directives: [
                                {
                                  kind: 'Directive',
                                  name: { kind: 'Name', value: 'include' },
                                  arguments: [
                                    {
                                      kind: 'Argument',
                                      name: { kind: 'Name', value: 'if' },
                                      value: {
                                        kind: 'Variable',
                                        name: {
                                          kind: 'Name',
                                          value: 'textBlocks',
                                        },
                                      },
                                    },
                                  ],
                                },
                              ],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'footnotes' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'footnotesObj',
                                    },
                                    directives: [
                                      {
                                        kind: 'Directive',
                                        name: { kind: 'Name', value: 'client' },
                                        arguments: [
                                          {
                                            kind: 'Argument',
                                            name: {
                                              kind: 'Name',
                                              value: 'always',
                                            },
                                            value: {
                                              kind: 'BooleanValue',
                                              value: true,
                                            },
                                          },
                                        ],
                                      },
                                    ],
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'index',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'refId',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'refValue',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'valueHTML',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'valueText',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'html' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'order' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'text' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'tagName' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'classNames' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: '__typename' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: '_additional',
                                    },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPostsQuery, GetPostsQueryVariables>
export const GetAllTopicsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllTopics' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'filter' },
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'AggregateObjectsGoogleDocWhereInpObj',
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Aggregate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'GoogleDoc' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'filter' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'groupBy' },
                      value: {
                        kind: 'StringValue',
                        value: 'tags',
                        block: false,
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'groupedBy' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllTopicsQuery, GetAllTopicsQueryVariables>
export const SearchBlocksDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SearchBlocks' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'textNearText' },
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Txt2VecOpenAIGetObjectsTextBlockNearTextInpObj',
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'imageNearText' },
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Txt2VecOpenAIGetObjectsImageBlockNearTextInpObj',
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'textFilter' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'GetObjectsTextBlockWhereInpObj' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'imageFilter' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'GetObjectsImageBlockWhereInpObj' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'textHybrid' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'GetObjectsTextBlockHybridInpObj' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'imageHybrid' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'GetObjectsImageBlockHybridInpObj' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'text' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          defaultValue: { kind: 'BooleanValue', value: true },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'image' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          defaultValue: { kind: 'BooleanValue', value: true },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'Get' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'TextBlock' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'textFilter' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'nearText' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'textNearText' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'hybrid' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'textHybrid' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'limit' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'offset' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'skip' },
                      },
                    },
                  ],
                  directives: [
                    {
                      kind: 'Directive',
                      name: { kind: 'Name', value: 'include' },
                      arguments: [
                        {
                          kind: 'Argument',
                          name: { kind: 'Name', value: 'if' },
                          value: {
                            kind: 'Variable',
                            name: { kind: 'Name', value: 'text' },
                          },
                        },
                      ],
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'footnotes' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'footnotesObj' },
                        directives: [
                          {
                            kind: 'Directive',
                            name: { kind: 'Name', value: 'client' },
                            arguments: [
                              {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'always' },
                                value: { kind: 'BooleanValue', value: true },
                              },
                            ],
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'index' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'refId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'refValue' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'valueHTML' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'valueText' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'html' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'order' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'tagName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'classNames' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: '__typename' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'document' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'InlineFragment',
                              typeCondition: {
                                kind: 'NamedType',
                                name: { kind: 'Name', value: 'GoogleDoc' },
                              },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'sourceId' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'title' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'subtitle' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'summary' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'tags' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'createdAt' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'modifiedAt' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'slug' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'path' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'pathString' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: '_additional',
                                    },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'mentions' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'mentionsObj',
                                    },
                                    directives: [
                                      {
                                        kind: 'Directive',
                                        name: { kind: 'Name', value: 'client' },
                                        arguments: [
                                          {
                                            kind: 'Argument',
                                            name: {
                                              kind: 'Name',
                                              value: 'always',
                                            },
                                            value: {
                                              kind: 'BooleanValue',
                                              value: true,
                                            },
                                          },
                                        ],
                                      },
                                    ],
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'emailAddress',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: '_additional' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'certainty' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'score' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ImageBlock' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'imageFilter' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'nearText' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'imageNearText' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'hybrid' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'imageHybrid' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'limit' },
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'offset' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'skip' },
                      },
                    },
                  ],
                  directives: [
                    {
                      kind: 'Directive',
                      name: { kind: 'Name', value: 'include' },
                      arguments: [
                        {
                          kind: 'Argument',
                          name: { kind: 'Name', value: 'if' },
                          value: {
                            kind: 'Variable',
                            name: { kind: 'Name', value: 'image' },
                          },
                        },
                      ],
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'alt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'order' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'height' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: '__typename' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'document' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'InlineFragment',
                              typeCondition: {
                                kind: 'NamedType',
                                name: { kind: 'Name', value: 'GoogleDoc' },
                              },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'sourceId' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'title' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'subtitle' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'summary' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'tags' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'createdAt' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'modifiedAt' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'slug' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'path' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'pathString' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: '_additional',
                                    },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'mentions' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'mentionsObj',
                                    },
                                    directives: [
                                      {
                                        kind: 'Directive',
                                        name: { kind: 'Name', value: 'client' },
                                        arguments: [
                                          {
                                            kind: 'Argument',
                                            name: {
                                              kind: 'Name',
                                              value: 'always',
                                            },
                                            value: {
                                              kind: 'BooleanValue',
                                              value: true,
                                            },
                                          },
                                        ],
                                      },
                                    ],
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'emailAddress',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: '_additional' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'certainty' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'score' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SearchBlocksQuery, SearchBlocksQueryVariables>
