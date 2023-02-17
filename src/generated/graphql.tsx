import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  Hex: any;
  Json: any;
  Long: any;
  RGBAHue: any;
  RGBATransparency: any;
  RichTextAST: any;
};

export type Aggregate = {
  __typename?: 'Aggregate';
  count: Scalars['Int'];
};

/** Partners artists */
export type Artist = Node & {
  __typename?: 'Artist';
  artist_name: Scalars['String'];
  artist_number: Scalars['Int'];
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  description: Scalars['String'];
  /** Get the document in other stages */
  documentInStages: Array<Artist>;
  facebook_link?: Maybe<Scalars['String']>;
  flag: Asset;
  /** List of Artist versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  iframe_sc?: Maybe<Scalars['String']>;
  instgram_link?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['Int']>;
  picture?: Maybe<Asset>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  sc_link?: Maybe<Scalars['String']>;
  scheduledIn: Array<ScheduledOperation>;
  slug: Scalars['String'];
  sptfy_link: Scalars['String'];
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
  yt_link?: Maybe<Scalars['String']>;
};

/** Partners artists */
export type ArtistCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Partners artists */
export type ArtistDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};

/** Partners artists */
export type ArtistFlagArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Partners artists */
export type ArtistHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};

/** Partners artists */
export type ArtistPictureArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Partners artists */
export type ArtistPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Partners artists */
export type ArtistScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};

/** Partners artists */
export type ArtistUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ArtistConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ArtistWhereUniqueInput;
};

/** A connection to a list of items. */
export type ArtistConnection = {
  __typename?: 'ArtistConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ArtistEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ArtistCreateInput = {
  artist_name: Scalars['String'];
  artist_number: Scalars['Int'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description: Scalars['String'];
  facebook_link?: InputMaybe<Scalars['String']>;
  flag: AssetCreateOneInlineInput;
  iframe_sc?: InputMaybe<Scalars['String']>;
  instgram_link?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['Int']>;
  picture?: InputMaybe<AssetCreateOneInlineInput>;
  sc_link?: InputMaybe<Scalars['String']>;
  slug: Scalars['String'];
  sptfy_link: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  yt_link?: InputMaybe<Scalars['String']>;
};

export type ArtistCreateManyInlineInput = {
  /** Connect multiple existing Artist documents */
  connect?: InputMaybe<Array<ArtistWhereUniqueInput>>;
  /** Create and connect multiple existing Artist documents */
  create?: InputMaybe<Array<ArtistCreateInput>>;
};

export type ArtistCreateOneInlineInput = {
  /** Connect one existing Artist document */
  connect?: InputMaybe<ArtistWhereUniqueInput>;
  /** Create and connect one Artist document */
  create?: InputMaybe<ArtistCreateInput>;
};

/** An edge in a connection. */
export type ArtistEdge = {
  __typename?: 'ArtistEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Artist;
};

/** Identifies documents */
export type ArtistManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ArtistWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ArtistWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ArtistWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  artist_name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  artist_name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  artist_name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  artist_name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  artist_name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  artist_name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  artist_name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  artist_name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  artist_name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  artist_name_starts_with?: InputMaybe<Scalars['String']>;
  artist_number?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  artist_number_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  artist_number_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  artist_number_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  artist_number_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  artist_number_lte?: InputMaybe<Scalars['Int']>;
  /** All values that are not equal to given value. */
  artist_number_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  artist_number_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  documentInStages_every?: InputMaybe<ArtistWhereStageInput>;
  documentInStages_none?: InputMaybe<ArtistWhereStageInput>;
  documentInStages_some?: InputMaybe<ArtistWhereStageInput>;
  facebook_link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  facebook_link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  facebook_link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  facebook_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  facebook_link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  facebook_link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  facebook_link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  facebook_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  facebook_link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  facebook_link_starts_with?: InputMaybe<Scalars['String']>;
  flag?: InputMaybe<AssetWhereInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  iframe_sc?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  iframe_sc_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  iframe_sc_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  iframe_sc_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  iframe_sc_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  iframe_sc_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  iframe_sc_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  iframe_sc_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  iframe_sc_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  iframe_sc_starts_with?: InputMaybe<Scalars['String']>;
  instgram_link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  instgram_link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  instgram_link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  instgram_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  instgram_link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  instgram_link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  instgram_link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  instgram_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  instgram_link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  instgram_link_starts_with?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  key_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  key_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  key_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  key_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  key_lte?: InputMaybe<Scalars['Int']>;
  /** All values that are not equal to given value. */
  key_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  key_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  picture?: InputMaybe<AssetWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  sc_link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  sc_link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  sc_link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  sc_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  sc_link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  sc_link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  sc_link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  sc_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  sc_link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  sc_link_starts_with?: InputMaybe<Scalars['String']>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  slug_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']>;
  sptfy_link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  sptfy_link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  sptfy_link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  sptfy_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  sptfy_link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  sptfy_link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  sptfy_link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  sptfy_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  sptfy_link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  sptfy_link_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  yt_link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  yt_link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  yt_link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  yt_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  yt_link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  yt_link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  yt_link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  yt_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  yt_link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  yt_link_starts_with?: InputMaybe<Scalars['String']>;
};

export enum ArtistOrderByInput {
  ArtistNameAsc = `artist_name_ASC`,
  ArtistNameDesc = `artist_name_DESC`,
  ArtistNumberAsc = `artist_number_ASC`,
  ArtistNumberDesc = `artist_number_DESC`,
  CreatedAtAsc = `createdAt_ASC`,
  CreatedAtDesc = `createdAt_DESC`,
  DescriptionAsc = `description_ASC`,
  DescriptionDesc = `description_DESC`,
  FacebookLinkAsc = `facebook_link_ASC`,
  FacebookLinkDesc = `facebook_link_DESC`,
  IdAsc = `id_ASC`,
  IdDesc = `id_DESC`,
  IframeScAsc = `iframe_sc_ASC`,
  IframeScDesc = `iframe_sc_DESC`,
  InstgramLinkAsc = `instgram_link_ASC`,
  InstgramLinkDesc = `instgram_link_DESC`,
  KeyAsc = `key_ASC`,
  KeyDesc = `key_DESC`,
  PublishedAtAsc = `publishedAt_ASC`,
  PublishedAtDesc = `publishedAt_DESC`,
  ScLinkAsc = `sc_link_ASC`,
  ScLinkDesc = `sc_link_DESC`,
  SlugAsc = `slug_ASC`,
  SlugDesc = `slug_DESC`,
  SptfyLinkAsc = `sptfy_link_ASC`,
  SptfyLinkDesc = `sptfy_link_DESC`,
  UpdatedAtAsc = `updatedAt_ASC`,
  UpdatedAtDesc = `updatedAt_DESC`,
  YtLinkAsc = `yt_link_ASC`,
  YtLinkDesc = `yt_link_DESC`,
}

export type ArtistUpdateInput = {
  artist_name?: InputMaybe<Scalars['String']>;
  artist_number?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  facebook_link?: InputMaybe<Scalars['String']>;
  flag?: InputMaybe<AssetUpdateOneInlineInput>;
  iframe_sc?: InputMaybe<Scalars['String']>;
  instgram_link?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['Int']>;
  picture?: InputMaybe<AssetUpdateOneInlineInput>;
  sc_link?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  sptfy_link?: InputMaybe<Scalars['String']>;
  yt_link?: InputMaybe<Scalars['String']>;
};

export type ArtistUpdateManyInlineInput = {
  /** Connect multiple existing Artist documents */
  connect?: InputMaybe<Array<ArtistConnectInput>>;
  /** Create and connect multiple Artist documents */
  create?: InputMaybe<Array<ArtistCreateInput>>;
  /** Delete multiple Artist documents */
  delete?: InputMaybe<Array<ArtistWhereUniqueInput>>;
  /** Disconnect multiple Artist documents */
  disconnect?: InputMaybe<Array<ArtistWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Artist documents */
  set?: InputMaybe<Array<ArtistWhereUniqueInput>>;
  /** Update multiple Artist documents */
  update?: InputMaybe<Array<ArtistUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Artist documents */
  upsert?: InputMaybe<Array<ArtistUpsertWithNestedWhereUniqueInput>>;
};

export type ArtistUpdateManyInput = {
  artist_name?: InputMaybe<Scalars['String']>;
  artist_number?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  facebook_link?: InputMaybe<Scalars['String']>;
  iframe_sc?: InputMaybe<Scalars['String']>;
  instgram_link?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['Int']>;
  sc_link?: InputMaybe<Scalars['String']>;
  sptfy_link?: InputMaybe<Scalars['String']>;
  yt_link?: InputMaybe<Scalars['String']>;
};

export type ArtistUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: ArtistUpdateManyInput;
  /** Document search */
  where: ArtistWhereInput;
};

export type ArtistUpdateOneInlineInput = {
  /** Connect existing Artist document */
  connect?: InputMaybe<ArtistWhereUniqueInput>;
  /** Create and connect one Artist document */
  create?: InputMaybe<ArtistCreateInput>;
  /** Delete currently connected Artist document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Artist document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Artist document */
  update?: InputMaybe<ArtistUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Artist document */
  upsert?: InputMaybe<ArtistUpsertWithNestedWhereUniqueInput>;
};

export type ArtistUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: ArtistUpdateInput;
  /** Unique document search */
  where: ArtistWhereUniqueInput;
};

export type ArtistUpsertInput = {
  /** Create document if it didn't exist */
  create: ArtistCreateInput;
  /** Update document if it exists */
  update: ArtistUpdateInput;
};

export type ArtistUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: ArtistUpsertInput;
  /** Unique document search */
  where: ArtistWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type ArtistWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type ArtistWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ArtistWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ArtistWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ArtistWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  artist_name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  artist_name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  artist_name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  artist_name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  artist_name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  artist_name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  artist_name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  artist_name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  artist_name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  artist_name_starts_with?: InputMaybe<Scalars['String']>;
  artist_number?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  artist_number_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  artist_number_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  artist_number_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  artist_number_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  artist_number_lte?: InputMaybe<Scalars['Int']>;
  /** All values that are not equal to given value. */
  artist_number_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  artist_number_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  documentInStages_every?: InputMaybe<ArtistWhereStageInput>;
  documentInStages_none?: InputMaybe<ArtistWhereStageInput>;
  documentInStages_some?: InputMaybe<ArtistWhereStageInput>;
  facebook_link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  facebook_link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  facebook_link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  facebook_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  facebook_link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  facebook_link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  facebook_link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  facebook_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  facebook_link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  facebook_link_starts_with?: InputMaybe<Scalars['String']>;
  flag?: InputMaybe<AssetWhereInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  iframe_sc?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  iframe_sc_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  iframe_sc_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  iframe_sc_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  iframe_sc_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  iframe_sc_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  iframe_sc_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  iframe_sc_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  iframe_sc_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  iframe_sc_starts_with?: InputMaybe<Scalars['String']>;
  instgram_link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  instgram_link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  instgram_link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  instgram_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  instgram_link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  instgram_link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  instgram_link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  instgram_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  instgram_link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  instgram_link_starts_with?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  key_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  key_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  key_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  key_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  key_lte?: InputMaybe<Scalars['Int']>;
  /** All values that are not equal to given value. */
  key_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  key_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  picture?: InputMaybe<AssetWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  sc_link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  sc_link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  sc_link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  sc_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  sc_link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  sc_link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  sc_link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  sc_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  sc_link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  sc_link_starts_with?: InputMaybe<Scalars['String']>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  slug_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']>;
  sptfy_link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  sptfy_link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  sptfy_link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  sptfy_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  sptfy_link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  sptfy_link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  sptfy_link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  sptfy_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  sptfy_link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  sptfy_link_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  yt_link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  yt_link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  yt_link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  yt_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  yt_link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  yt_link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  yt_link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  yt_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  yt_link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  yt_link_starts_with?: InputMaybe<Scalars['String']>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type ArtistWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ArtistWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ArtistWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ArtistWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<ArtistWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Artist record uniquely */
export type ArtistWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};

/** Asset system model */
export type Asset = Node & {
  __typename?: 'Asset';
  cover_artRelease: Array<Release>;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Asset>;
  /** The file name */
  fileName: Scalars['String'];
  flagArtist: Array<Artist>;
  /** The file handle */
  handle: Scalars['String'];
  /** The height of the file */
  height?: Maybe<Scalars['Float']>;
  /** List of Asset versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** System Locale field */
  locale: Locale;
  /** Get the other localizations for this document */
  localizations: Array<Asset>;
  /** The mime type of the file */
  mimeType?: Maybe<Scalars['String']>;
  pictureArtist: Array<Artist>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** The file size */
  size?: Maybe<Scalars['Float']>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
  /** Get the url for the asset with provided transformations applied. */
  url: Scalars['String'];
  /** The file width */
  width?: Maybe<Scalars['Float']>;
};

/** Asset system model */
export type AssetCover_ArtReleaseArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<ReleaseOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ReleaseWhereInput>;
};

/** Asset system model */
export type AssetCreatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};

/** Asset system model */
export type AssetCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Asset system model */
export type AssetDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};

/** Asset system model */
export type AssetFlagArtistArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<ArtistOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArtistWhereInput>;
};

/** Asset system model */
export type AssetHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};

/** Asset system model */
export type AssetLocalizationsArgs = {
  includeCurrent?: Scalars['Boolean'];
  locales?: Array<Locale>;
};

/** Asset system model */
export type AssetPictureArtistArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<ArtistOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArtistWhereInput>;
};

/** Asset system model */
export type AssetPublishedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};

/** Asset system model */
export type AssetPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Asset system model */
export type AssetScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};

/** Asset system model */
export type AssetUpdatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};

/** Asset system model */
export type AssetUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Asset system model */
export type AssetUrlArgs = {
  transformation?: InputMaybe<AssetTransformationInput>;
};

export type AssetConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: AssetWhereUniqueInput;
};

/** A connection to a list of items. */
export type AssetConnection = {
  __typename?: 'AssetConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<AssetEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type AssetCreateInput = {
  cover_artRelease?: InputMaybe<ReleaseCreateManyInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fileName: Scalars['String'];
  flagArtist?: InputMaybe<ArtistCreateManyInlineInput>;
  handle: Scalars['String'];
  height?: InputMaybe<Scalars['Float']>;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: InputMaybe<AssetCreateLocalizationsInput>;
  mimeType?: InputMaybe<Scalars['String']>;
  pictureArtist?: InputMaybe<ArtistCreateManyInlineInput>;
  size?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type AssetCreateLocalizationDataInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fileName: Scalars['String'];
  handle: Scalars['String'];
  height?: InputMaybe<Scalars['Float']>;
  mimeType?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type AssetCreateLocalizationInput = {
  /** Localization input */
  data: AssetCreateLocalizationDataInput;
  locale: Locale;
};

export type AssetCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: InputMaybe<Array<AssetCreateLocalizationInput>>;
};

export type AssetCreateManyInlineInput = {
  /** Connect multiple existing Asset documents */
  connect?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Create and connect multiple existing Asset documents */
  create?: InputMaybe<Array<AssetCreateInput>>;
};

export type AssetCreateOneInlineInput = {
  /** Connect one existing Asset document */
  connect?: InputMaybe<AssetWhereUniqueInput>;
  /** Create and connect one Asset document */
  create?: InputMaybe<AssetCreateInput>;
};

/** An edge in a connection. */
export type AssetEdge = {
  __typename?: 'AssetEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Asset;
};

/** Identifies documents */
export type AssetManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  cover_artRelease_every?: InputMaybe<ReleaseWhereInput>;
  cover_artRelease_none?: InputMaybe<ReleaseWhereInput>;
  cover_artRelease_some?: InputMaybe<ReleaseWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<AssetWhereStageInput>;
  documentInStages_none?: InputMaybe<AssetWhereStageInput>;
  documentInStages_some?: InputMaybe<AssetWhereStageInput>;
  flagArtist_every?: InputMaybe<ArtistWhereInput>;
  flagArtist_none?: InputMaybe<ArtistWhereInput>;
  flagArtist_some?: InputMaybe<ArtistWhereInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  pictureArtist_every?: InputMaybe<ArtistWhereInput>;
  pictureArtist_none?: InputMaybe<ArtistWhereInput>;
  pictureArtist_some?: InputMaybe<ArtistWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum AssetOrderByInput {
  CreatedAtAsc = `createdAt_ASC`,
  CreatedAtDesc = `createdAt_DESC`,
  FileNameAsc = `fileName_ASC`,
  FileNameDesc = `fileName_DESC`,
  HandleAsc = `handle_ASC`,
  HandleDesc = `handle_DESC`,
  HeightAsc = `height_ASC`,
  HeightDesc = `height_DESC`,
  IdAsc = `id_ASC`,
  IdDesc = `id_DESC`,
  MimeTypeAsc = `mimeType_ASC`,
  MimeTypeDesc = `mimeType_DESC`,
  PublishedAtAsc = `publishedAt_ASC`,
  PublishedAtDesc = `publishedAt_DESC`,
  SizeAsc = `size_ASC`,
  SizeDesc = `size_DESC`,
  UpdatedAtAsc = `updatedAt_ASC`,
  UpdatedAtDesc = `updatedAt_DESC`,
  WidthAsc = `width_ASC`,
  WidthDesc = `width_DESC`,
}

/** Transformations for Assets */
export type AssetTransformationInput = {
  document?: InputMaybe<DocumentTransformationInput>;
  image?: InputMaybe<ImageTransformationInput>;
  /** Pass true if you want to validate the passed transformation parameters */
  validateOptions?: InputMaybe<Scalars['Boolean']>;
};

export type AssetUpdateInput = {
  cover_artRelease?: InputMaybe<ReleaseUpdateManyInlineInput>;
  fileName?: InputMaybe<Scalars['String']>;
  flagArtist?: InputMaybe<ArtistUpdateManyInlineInput>;
  handle?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  /** Manage document localizations */
  localizations?: InputMaybe<AssetUpdateLocalizationsInput>;
  mimeType?: InputMaybe<Scalars['String']>;
  pictureArtist?: InputMaybe<ArtistUpdateManyInlineInput>;
  size?: InputMaybe<Scalars['Float']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type AssetUpdateLocalizationDataInput = {
  fileName?: InputMaybe<Scalars['String']>;
  handle?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  mimeType?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type AssetUpdateLocalizationInput = {
  data: AssetUpdateLocalizationDataInput;
  locale: Locale;
};

export type AssetUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: InputMaybe<Array<AssetCreateLocalizationInput>>;
  /** Localizations to delete */
  delete?: InputMaybe<Array<Locale>>;
  /** Localizations to update */
  update?: InputMaybe<Array<AssetUpdateLocalizationInput>>;
  upsert?: InputMaybe<Array<AssetUpsertLocalizationInput>>;
};

export type AssetUpdateManyInlineInput = {
  /** Connect multiple existing Asset documents */
  connect?: InputMaybe<Array<AssetConnectInput>>;
  /** Create and connect multiple Asset documents */
  create?: InputMaybe<Array<AssetCreateInput>>;
  /** Delete multiple Asset documents */
  delete?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Disconnect multiple Asset documents */
  disconnect?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Asset documents */
  set?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Update multiple Asset documents */
  update?: InputMaybe<Array<AssetUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Asset documents */
  upsert?: InputMaybe<Array<AssetUpsertWithNestedWhereUniqueInput>>;
};

export type AssetUpdateManyInput = {
  fileName?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  /** Optional updates to localizations */
  localizations?: InputMaybe<AssetUpdateManyLocalizationsInput>;
  mimeType?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type AssetUpdateManyLocalizationDataInput = {
  fileName?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  mimeType?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type AssetUpdateManyLocalizationInput = {
  data: AssetUpdateManyLocalizationDataInput;
  locale: Locale;
};

export type AssetUpdateManyLocalizationsInput = {
  /** Localizations to update */
  update?: InputMaybe<Array<AssetUpdateManyLocalizationInput>>;
};

export type AssetUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: AssetUpdateManyInput;
  /** Document search */
  where: AssetWhereInput;
};

export type AssetUpdateOneInlineInput = {
  /** Connect existing Asset document */
  connect?: InputMaybe<AssetWhereUniqueInput>;
  /** Create and connect one Asset document */
  create?: InputMaybe<AssetCreateInput>;
  /** Delete currently connected Asset document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Asset document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Asset document */
  update?: InputMaybe<AssetUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Asset document */
  upsert?: InputMaybe<AssetUpsertWithNestedWhereUniqueInput>;
};

export type AssetUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: AssetUpdateInput;
  /** Unique document search */
  where: AssetWhereUniqueInput;
};

export type AssetUpsertInput = {
  /** Create document if it didn't exist */
  create: AssetCreateInput;
  /** Update document if it exists */
  update: AssetUpdateInput;
};

export type AssetUpsertLocalizationInput = {
  create: AssetCreateLocalizationDataInput;
  locale: Locale;
  update: AssetUpdateLocalizationDataInput;
};

export type AssetUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: AssetUpsertInput;
  /** Unique document search */
  where: AssetWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type AssetWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type AssetWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  cover_artRelease_every?: InputMaybe<ReleaseWhereInput>;
  cover_artRelease_none?: InputMaybe<ReleaseWhereInput>;
  cover_artRelease_some?: InputMaybe<ReleaseWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<AssetWhereStageInput>;
  documentInStages_none?: InputMaybe<AssetWhereStageInput>;
  documentInStages_some?: InputMaybe<AssetWhereStageInput>;
  fileName?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  fileName_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  fileName_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  fileName_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  fileName_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  fileName_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  fileName_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  fileName_starts_with?: InputMaybe<Scalars['String']>;
  flagArtist_every?: InputMaybe<ArtistWhereInput>;
  flagArtist_none?: InputMaybe<ArtistWhereInput>;
  flagArtist_some?: InputMaybe<ArtistWhereInput>;
  handle?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  handle_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  handle_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  handle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  handle_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  handle_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  handle_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  handle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  handle_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  handle_starts_with?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  height_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  height_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  height_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  height_lte?: InputMaybe<Scalars['Float']>;
  /** All values that are not equal to given value. */
  height_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  mimeType?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  mimeType_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  mimeType_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  mimeType_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  mimeType_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  mimeType_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  mimeType_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  mimeType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  mimeType_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  mimeType_starts_with?: InputMaybe<Scalars['String']>;
  pictureArtist_every?: InputMaybe<ArtistWhereInput>;
  pictureArtist_none?: InputMaybe<ArtistWhereInput>;
  pictureArtist_some?: InputMaybe<ArtistWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  size?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  size_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  size_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  size_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  size_lte?: InputMaybe<Scalars['Float']>;
  /** All values that are not equal to given value. */
  size_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  width?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  width_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  width_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  width_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  width_lte?: InputMaybe<Scalars['Float']>;
  /** All values that are not equal to given value. */
  width_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type AssetWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<AssetWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Asset record uniquely */
export type AssetWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  /** The number of nodes that have been affected by the Batch operation. */
  count: Scalars['Long'];
};

/** Representing a color value comprising of HEX, RGBA and css color values */
export type Color = {
  __typename?: 'Color';
  css: Scalars['String'];
  hex: Scalars['Hex'];
  rgba: Rgba;
};

/** Accepts either HEX or RGBA color value. At least one of hex or rgba value should be passed. If both are passed RGBA is used. */
export type ColorInput = {
  hex?: InputMaybe<Scalars['Hex']>;
  rgba?: InputMaybe<RgbaInput>;
};

export type ConnectPositionInput = {
  /** Connect document after specified document */
  after?: InputMaybe<Scalars['ID']>;
  /** Connect document before specified document */
  before?: InputMaybe<Scalars['ID']>;
  /** Connect document at last position */
  end?: InputMaybe<Scalars['Boolean']>;
  /** Connect document at first position */
  start?: InputMaybe<Scalars['Boolean']>;
};

export enum DocumentFileTypes {
  Doc = `doc`,
  Docx = `docx`,
  Html = `html`,
  Jpg = `jpg`,
  Odp = `odp`,
  Ods = `ods`,
  Odt = `odt`,
  Pdf = `pdf`,
  Png = `png`,
  Ppt = `ppt`,
  Pptx = `pptx`,
  Svg = `svg`,
  Txt = `txt`,
  Webp = `webp`,
  Xls = `xls`,
  Xlsx = `xlsx`,
}

export type DocumentOutputInput = {
  /**
   * Transforms a document into a desired file type.
   * See this matrix for format support:
   *
   * PDF:	jpg, odp, ods, odt, png, svg, txt, and webp
   * DOC:	docx, html, jpg, odt, pdf, png, svg, txt, and webp
   * DOCX:	doc, html, jpg, odt, pdf, png, svg, txt, and webp
   * ODT:	doc, docx, html, jpg, pdf, png, svg, txt, and webp
   * XLS:	jpg, pdf, ods, png, svg, xlsx, and webp
   * XLSX:	jpg, pdf, ods, png, svg, xls, and webp
   * ODS:	jpg, pdf, png, xls, svg, xlsx, and webp
   * PPT:	jpg, odp, pdf, png, svg, pptx, and webp
   * PPTX:	jpg, odp, pdf, png, svg, ppt, and webp
   * ODP:	jpg, pdf, png, ppt, svg, pptx, and webp
   * BMP:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * GIF:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * JPG:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * PNG:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * WEBP:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * TIFF:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * AI:	    jpg, odp, ods, odt, pdf, png, svg, and webp
   * PSD:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * SVG:	jpg, odp, ods, odt, pdf, png, and webp
   * HTML:	jpg, odt, pdf, svg, txt, and webp
   * TXT:	jpg, html, odt, pdf, svg, and webp
   */
  format?: InputMaybe<DocumentFileTypes>;
};

/** Transformations for Documents */
export type DocumentTransformationInput = {
  /** Changes the output for the file. */
  output?: InputMaybe<DocumentOutputInput>;
};

export type DocumentVersion = {
  __typename?: 'DocumentVersion';
  createdAt: Scalars['DateTime'];
  data?: Maybe<Scalars['Json']>;
  id: Scalars['ID'];
  revision: Scalars['Int'];
  stage: Stage;
};

export enum ImageFit {
  /** Resizes the image to fit within the specified parameters without distorting, cropping, or changing the aspect ratio. */
  Clip = `clip`,
  /** Resizes the image to fit the specified parameters exactly by removing any parts of the image that don't fit within the boundaries. */
  Crop = `crop`,
  /** Resizes the image to fit within the parameters, but as opposed to 'fit:clip' will not scale the image if the image is smaller than the output size. */
  Max = `max`,
  /** Resizes the image to fit the specified parameters exactly by scaling the image to the desired size. The aspect ratio of the image is not respected and the image can be distorted using this method. */
  Scale = `scale`,
}

export type ImageResizeInput = {
  /** The default value for the fit parameter is fit:clip. */
  fit?: InputMaybe<ImageFit>;
  /** The height in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  height?: InputMaybe<Scalars['Int']>;
  /** The width in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  width?: InputMaybe<Scalars['Int']>;
};

/** Transformations for Images */
export type ImageTransformationInput = {
  /** Resizes the image */
  resize?: InputMaybe<ImageResizeInput>;
};

/** Locale system enumeration */
export enum Locale {
  /** System locale */
  En = `en`,
}

/** Representing a geolocation point with latitude and longitude */
export type Location = {
  __typename?: 'Location';
  distance: Scalars['Float'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

/** Representing a geolocation point with latitude and longitude */
export type LocationDistanceArgs = {
  from: LocationInput;
};

/** Input for a geolocation point with latitude and longitude */
export type LocationInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create one artist */
  createArtist?: Maybe<Artist>;
  /**
   * Create one asset
   * @deprecated Asset mutations will be overhauled soon
   */
  createAsset?: Maybe<Asset>;
  /** Create one release */
  createRelease?: Maybe<Release>;
  /** Create one scheduledRelease */
  createScheduledRelease?: Maybe<ScheduledRelease>;
  /** Delete one artist from _all_ existing stages. Returns deleted document. */
  deleteArtist?: Maybe<Artist>;
  /** Delete one asset from _all_ existing stages. Returns deleted document. */
  deleteAsset?: Maybe<Asset>;
  /**
   * Delete many Artist documents
   * @deprecated Please use the new paginated many mutation (deleteManyArtistsConnection)
   */
  deleteManyArtists: BatchPayload;
  /** Delete many Artist documents, return deleted documents */
  deleteManyArtistsConnection: ArtistConnection;
  /**
   * Delete many Asset documents
   * @deprecated Please use the new paginated many mutation (deleteManyAssetsConnection)
   */
  deleteManyAssets: BatchPayload;
  /** Delete many Asset documents, return deleted documents */
  deleteManyAssetsConnection: AssetConnection;
  /**
   * Delete many Release documents
   * @deprecated Please use the new paginated many mutation (deleteManyReleasesConnection)
   */
  deleteManyReleases: BatchPayload;
  /** Delete many Release documents, return deleted documents */
  deleteManyReleasesConnection: ReleaseConnection;
  /** Delete one release from _all_ existing stages. Returns deleted document. */
  deleteRelease?: Maybe<Release>;
  /** Delete and return scheduled operation */
  deleteScheduledOperation?: Maybe<ScheduledOperation>;
  /** Delete one scheduledRelease from _all_ existing stages. Returns deleted document. */
  deleteScheduledRelease?: Maybe<ScheduledRelease>;
  /** Publish one artist */
  publishArtist?: Maybe<Artist>;
  /** Publish one asset */
  publishAsset?: Maybe<Asset>;
  /**
   * Publish many Artist documents
   * @deprecated Please use the new paginated many mutation (publishManyArtistsConnection)
   */
  publishManyArtists: BatchPayload;
  /** Publish many Artist documents */
  publishManyArtistsConnection: ArtistConnection;
  /**
   * Publish many Asset documents
   * @deprecated Please use the new paginated many mutation (publishManyAssetsConnection)
   */
  publishManyAssets: BatchPayload;
  /** Publish many Asset documents */
  publishManyAssetsConnection: AssetConnection;
  /**
   * Publish many Release documents
   * @deprecated Please use the new paginated many mutation (publishManyReleasesConnection)
   */
  publishManyReleases: BatchPayload;
  /** Publish many Release documents */
  publishManyReleasesConnection: ReleaseConnection;
  /** Publish one release */
  publishRelease?: Maybe<Release>;
  /** Schedule to publish one artist */
  schedulePublishArtist?: Maybe<Artist>;
  /** Schedule to publish one asset */
  schedulePublishAsset?: Maybe<Asset>;
  /** Schedule to publish one release */
  schedulePublishRelease?: Maybe<Release>;
  /** Unpublish one artist from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishArtist?: Maybe<Artist>;
  /** Unpublish one asset from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishAsset?: Maybe<Asset>;
  /** Unpublish one release from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishRelease?: Maybe<Release>;
  /** Unpublish one artist from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishArtist?: Maybe<Artist>;
  /** Unpublish one asset from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishAsset?: Maybe<Asset>;
  /**
   * Unpublish many Artist documents
   * @deprecated Please use the new paginated many mutation (unpublishManyArtistsConnection)
   */
  unpublishManyArtists: BatchPayload;
  /** Find many Artist documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyArtistsConnection: ArtistConnection;
  /**
   * Unpublish many Asset documents
   * @deprecated Please use the new paginated many mutation (unpublishManyAssetsConnection)
   */
  unpublishManyAssets: BatchPayload;
  /** Find many Asset documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyAssetsConnection: AssetConnection;
  /**
   * Unpublish many Release documents
   * @deprecated Please use the new paginated many mutation (unpublishManyReleasesConnection)
   */
  unpublishManyReleases: BatchPayload;
  /** Find many Release documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyReleasesConnection: ReleaseConnection;
  /** Unpublish one release from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishRelease?: Maybe<Release>;
  /** Update one artist */
  updateArtist?: Maybe<Artist>;
  /** Update one asset */
  updateAsset?: Maybe<Asset>;
  /**
   * Update many artists
   * @deprecated Please use the new paginated many mutation (updateManyArtistsConnection)
   */
  updateManyArtists: BatchPayload;
  /** Update many Artist documents */
  updateManyArtistsConnection: ArtistConnection;
  /**
   * Update many assets
   * @deprecated Please use the new paginated many mutation (updateManyAssetsConnection)
   */
  updateManyAssets: BatchPayload;
  /** Update many Asset documents */
  updateManyAssetsConnection: AssetConnection;
  /**
   * Update many releases
   * @deprecated Please use the new paginated many mutation (updateManyReleasesConnection)
   */
  updateManyReleases: BatchPayload;
  /** Update many Release documents */
  updateManyReleasesConnection: ReleaseConnection;
  /** Update one release */
  updateRelease?: Maybe<Release>;
  /** Update one scheduledRelease */
  updateScheduledRelease?: Maybe<ScheduledRelease>;
  /** Upsert one artist */
  upsertArtist?: Maybe<Artist>;
  /** Upsert one asset */
  upsertAsset?: Maybe<Asset>;
  /** Upsert one release */
  upsertRelease?: Maybe<Release>;
};

export type MutationCreateArtistArgs = {
  data: ArtistCreateInput;
};

export type MutationCreateAssetArgs = {
  data: AssetCreateInput;
};

export type MutationCreateReleaseArgs = {
  data: ReleaseCreateInput;
};

export type MutationCreateScheduledReleaseArgs = {
  data: ScheduledReleaseCreateInput;
};

export type MutationDeleteArtistArgs = {
  where: ArtistWhereUniqueInput;
};

export type MutationDeleteAssetArgs = {
  where: AssetWhereUniqueInput;
};

export type MutationDeleteManyArtistsArgs = {
  where?: InputMaybe<ArtistManyWhereInput>;
};

export type MutationDeleteManyArtistsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArtistManyWhereInput>;
};

export type MutationDeleteManyAssetsArgs = {
  where?: InputMaybe<AssetManyWhereInput>;
};

export type MutationDeleteManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetManyWhereInput>;
};

export type MutationDeleteManyReleasesArgs = {
  where?: InputMaybe<ReleaseManyWhereInput>;
};

export type MutationDeleteManyReleasesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ReleaseManyWhereInput>;
};

export type MutationDeleteReleaseArgs = {
  where: ReleaseWhereUniqueInput;
};

export type MutationDeleteScheduledOperationArgs = {
  where: ScheduledOperationWhereUniqueInput;
};

export type MutationDeleteScheduledReleaseArgs = {
  where: ScheduledReleaseWhereUniqueInput;
};

export type MutationPublishArtistArgs = {
  to?: Array<Stage>;
  where: ArtistWhereUniqueInput;
};

export type MutationPublishAssetArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  to?: Array<Stage>;
  where: AssetWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};

export type MutationPublishManyArtistsArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<ArtistManyWhereInput>;
};

export type MutationPublishManyArtistsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<ArtistManyWhereInput>;
};

export type MutationPublishManyAssetsArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  to?: Array<Stage>;
  where?: InputMaybe<AssetManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};

export type MutationPublishManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<AssetManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};

export type MutationPublishManyReleasesArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<ReleaseManyWhereInput>;
};

export type MutationPublishManyReleasesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<ReleaseManyWhereInput>;
};

export type MutationPublishReleaseArgs = {
  to?: Array<Stage>;
  where: ReleaseWhereUniqueInput;
};

export type MutationSchedulePublishArtistArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: ArtistWhereUniqueInput;
};

export type MutationSchedulePublishAssetArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: AssetWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};

export type MutationSchedulePublishReleaseArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: ReleaseWhereUniqueInput;
};

export type MutationScheduleUnpublishArtistArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: ArtistWhereUniqueInput;
};

export type MutationScheduleUnpublishAssetArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where: AssetWhereUniqueInput;
};

export type MutationScheduleUnpublishReleaseArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: ReleaseWhereUniqueInput;
};

export type MutationUnpublishArtistArgs = {
  from?: Array<Stage>;
  where: ArtistWhereUniqueInput;
};

export type MutationUnpublishAssetArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where: AssetWhereUniqueInput;
};

export type MutationUnpublishManyArtistsArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<ArtistManyWhereInput>;
};

export type MutationUnpublishManyArtistsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<ArtistManyWhereInput>;
};

export type MutationUnpublishManyAssetsArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<AssetManyWhereInput>;
};

export type MutationUnpublishManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<AssetManyWhereInput>;
};

export type MutationUnpublishManyReleasesArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<ReleaseManyWhereInput>;
};

export type MutationUnpublishManyReleasesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<ReleaseManyWhereInput>;
};

export type MutationUnpublishReleaseArgs = {
  from?: Array<Stage>;
  where: ReleaseWhereUniqueInput;
};

export type MutationUpdateArtistArgs = {
  data: ArtistUpdateInput;
  where: ArtistWhereUniqueInput;
};

export type MutationUpdateAssetArgs = {
  data: AssetUpdateInput;
  where: AssetWhereUniqueInput;
};

export type MutationUpdateManyArtistsArgs = {
  data: ArtistUpdateManyInput;
  where?: InputMaybe<ArtistManyWhereInput>;
};

export type MutationUpdateManyArtistsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: ArtistUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArtistManyWhereInput>;
};

export type MutationUpdateManyAssetsArgs = {
  data: AssetUpdateManyInput;
  where?: InputMaybe<AssetManyWhereInput>;
};

export type MutationUpdateManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: AssetUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetManyWhereInput>;
};

export type MutationUpdateManyReleasesArgs = {
  data: ReleaseUpdateManyInput;
  where?: InputMaybe<ReleaseManyWhereInput>;
};

export type MutationUpdateManyReleasesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: ReleaseUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ReleaseManyWhereInput>;
};

export type MutationUpdateReleaseArgs = {
  data: ReleaseUpdateInput;
  where: ReleaseWhereUniqueInput;
};

export type MutationUpdateScheduledReleaseArgs = {
  data: ScheduledReleaseUpdateInput;
  where: ScheduledReleaseWhereUniqueInput;
};

export type MutationUpsertArtistArgs = {
  upsert: ArtistUpsertInput;
  where: ArtistWhereUniqueInput;
};

export type MutationUpsertAssetArgs = {
  upsert: AssetUpsertInput;
  where: AssetWhereUniqueInput;
};

export type MutationUpsertReleaseArgs = {
  upsert: ReleaseUpsertInput;
  where: ReleaseWhereUniqueInput;
};

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars['ID'];
  /** The Stage of an object */
  stage: Stage;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** Number of items in the current page. */
  pageSize?: Maybe<Scalars['Int']>;
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type PublishLocaleInput = {
  /** Locales to publish */
  locale: Locale;
  /** Stages to publish selected locales to */
  stages: Array<Stage>;
};

export type Query = {
  __typename?: 'Query';
  /** Retrieve a single artist */
  artist?: Maybe<Artist>;
  /** Retrieve document version */
  artistVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple artists */
  artists: Array<Artist>;
  /** Retrieve multiple artists using the Relay connection interface */
  artistsConnection: ArtistConnection;
  /** Retrieve a single asset */
  asset?: Maybe<Asset>;
  /** Retrieve document version */
  assetVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple assets */
  assets: Array<Asset>;
  /** Retrieve multiple assets using the Relay connection interface */
  assetsConnection: AssetConnection;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Retrieve a single release */
  release?: Maybe<Release>;
  /** Retrieve document version */
  releaseVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple releases */
  releases: Array<Release>;
  /** Retrieve multiple releases using the Relay connection interface */
  releasesConnection: ReleaseConnection;
  /** Retrieve a single scheduledOperation */
  scheduledOperation?: Maybe<ScheduledOperation>;
  /** Retrieve multiple scheduledOperations */
  scheduledOperations: Array<ScheduledOperation>;
  /** Retrieve multiple scheduledOperations using the Relay connection interface */
  scheduledOperationsConnection: ScheduledOperationConnection;
  /** Retrieve a single scheduledRelease */
  scheduledRelease?: Maybe<ScheduledRelease>;
  /** Retrieve multiple scheduledReleases */
  scheduledReleases: Array<ScheduledRelease>;
  /** Retrieve multiple scheduledReleases using the Relay connection interface */
  scheduledReleasesConnection: ScheduledReleaseConnection;
  /** Retrieve a single user */
  user?: Maybe<User>;
  /** Retrieve multiple users */
  users: Array<User>;
  /** Retrieve multiple users using the Relay connection interface */
  usersConnection: UserConnection;
};

export type QueryArtistArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ArtistWhereUniqueInput;
};

export type QueryArtistVersionArgs = {
  where: VersionWhereInput;
};

export type QueryArtistsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ArtistOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ArtistWhereInput>;
};

export type QueryArtistsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ArtistOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ArtistWhereInput>;
};

export type QueryAssetArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: AssetWhereUniqueInput;
};

export type QueryAssetVersionArgs = {
  where: VersionWhereInput;
};

export type QueryAssetsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<AssetWhereInput>;
};

export type QueryAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<AssetWhereInput>;
};

export type QueryNodeArgs = {
  id: Scalars['ID'];
  locales?: Array<Locale>;
  stage?: Stage;
};

export type QueryReleaseArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ReleaseWhereUniqueInput;
};

export type QueryReleaseVersionArgs = {
  where: VersionWhereInput;
};

export type QueryReleasesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ReleaseOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ReleaseWhereInput>;
};

export type QueryReleasesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ReleaseOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ReleaseWhereInput>;
};

export type QueryScheduledOperationArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ScheduledOperationWhereUniqueInput;
};

export type QueryScheduledOperationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};

export type QueryScheduledOperationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};

export type QueryScheduledReleaseArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ScheduledReleaseWhereUniqueInput;
};

export type QueryScheduledReleasesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledReleaseOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledReleaseWhereInput>;
};

export type QueryScheduledReleasesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledReleaseOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledReleaseWhereInput>;
};

export type QueryUserArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: UserWhereUniqueInput;
};

export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<UserOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<UserWhereInput>;
};

export type QueryUsersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<UserOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<UserWhereInput>;
};

/** Representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type Rgba = {
  __typename?: 'RGBA';
  a: Scalars['RGBATransparency'];
  b: Scalars['RGBAHue'];
  g: Scalars['RGBAHue'];
  r: Scalars['RGBAHue'];
};

/** Input type representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type RgbaInput = {
  a: Scalars['RGBATransparency'];
  b: Scalars['RGBAHue'];
  g: Scalars['RGBAHue'];
  r: Scalars['RGBAHue'];
};

/** Musics released by label */
export type Release = Node & {
  __typename?: 'Release';
  apple_link?: Maybe<Scalars['String']>;
  artist: Scalars['String'];
  buy_link: Scalars['String'];
  cover_art: Asset;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  deezer_link?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  /** Get the document in other stages */
  documentInStages: Array<Release>;
  /** List of Release versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  iframe_sc: Scalars['String'];
  music_name: Scalars['String'];
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  release_date: Scalars['Date'];
  release_number: Scalars['Int'];
  sc_link: Scalars['String'];
  scheduledIn: Array<ScheduledOperation>;
  slug: Scalars['String'];
  sptfy_link: Scalars['String'];
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
  yt_link: Scalars['String'];
};

/** Musics released by label */
export type ReleaseCover_ArtArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Musics released by label */
export type ReleaseCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Musics released by label */
export type ReleaseDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};

/** Musics released by label */
export type ReleaseHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};

/** Musics released by label */
export type ReleasePublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Musics released by label */
export type ReleaseScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};

/** Musics released by label */
export type ReleaseUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ReleaseConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ReleaseWhereUniqueInput;
};

/** A connection to a list of items. */
export type ReleaseConnection = {
  __typename?: 'ReleaseConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ReleaseEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ReleaseCreateInput = {
  apple_link?: InputMaybe<Scalars['String']>;
  artist: Scalars['String'];
  buy_link: Scalars['String'];
  cover_art: AssetCreateOneInlineInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deezer_link?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  iframe_sc: Scalars['String'];
  music_name: Scalars['String'];
  release_date: Scalars['Date'];
  release_number: Scalars['Int'];
  sc_link: Scalars['String'];
  slug: Scalars['String'];
  sptfy_link: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  yt_link: Scalars['String'];
};

export type ReleaseCreateManyInlineInput = {
  /** Connect multiple existing Release documents */
  connect?: InputMaybe<Array<ReleaseWhereUniqueInput>>;
  /** Create and connect multiple existing Release documents */
  create?: InputMaybe<Array<ReleaseCreateInput>>;
};

export type ReleaseCreateOneInlineInput = {
  /** Connect one existing Release document */
  connect?: InputMaybe<ReleaseWhereUniqueInput>;
  /** Create and connect one Release document */
  create?: InputMaybe<ReleaseCreateInput>;
};

/** An edge in a connection. */
export type ReleaseEdge = {
  __typename?: 'ReleaseEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Release;
};

/** Identifies documents */
export type ReleaseManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ReleaseWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ReleaseWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ReleaseWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  apple_link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  apple_link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  apple_link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  apple_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  apple_link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  apple_link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  apple_link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  apple_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  apple_link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  apple_link_starts_with?: InputMaybe<Scalars['String']>;
  artist?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  artist_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  artist_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  artist_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  artist_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  artist_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  artist_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  artist_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  artist_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  artist_starts_with?: InputMaybe<Scalars['String']>;
  buy_link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  buy_link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  buy_link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  buy_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  buy_link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  buy_link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  buy_link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  buy_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  buy_link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  buy_link_starts_with?: InputMaybe<Scalars['String']>;
  cover_art?: InputMaybe<AssetWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  deezer_link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  deezer_link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  deezer_link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  deezer_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  deezer_link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  deezer_link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  deezer_link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  deezer_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  deezer_link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  deezer_link_starts_with?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  documentInStages_every?: InputMaybe<ReleaseWhereStageInput>;
  documentInStages_none?: InputMaybe<ReleaseWhereStageInput>;
  documentInStages_some?: InputMaybe<ReleaseWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  iframe_sc?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  iframe_sc_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  iframe_sc_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  iframe_sc_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  iframe_sc_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  iframe_sc_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  iframe_sc_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  iframe_sc_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  iframe_sc_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  iframe_sc_starts_with?: InputMaybe<Scalars['String']>;
  music_name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  music_name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  music_name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  music_name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  music_name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  music_name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  music_name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  music_name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  music_name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  music_name_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  release_date?: InputMaybe<Scalars['Date']>;
  /** All values greater than the given value. */
  release_date_gt?: InputMaybe<Scalars['Date']>;
  /** All values greater than or equal the given value. */
  release_date_gte?: InputMaybe<Scalars['Date']>;
  /** All values that are contained in given list. */
  release_date_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  /** All values less than the given value. */
  release_date_lt?: InputMaybe<Scalars['Date']>;
  /** All values less than or equal the given value. */
  release_date_lte?: InputMaybe<Scalars['Date']>;
  /** All values that are not equal to given value. */
  release_date_not?: InputMaybe<Scalars['Date']>;
  /** All values that are not contained in given list. */
  release_date_not_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  release_number?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  release_number_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  release_number_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  release_number_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  release_number_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  release_number_lte?: InputMaybe<Scalars['Int']>;
  /** All values that are not equal to given value. */
  release_number_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  release_number_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  sc_link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  sc_link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  sc_link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  sc_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  sc_link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  sc_link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  sc_link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  sc_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  sc_link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  sc_link_starts_with?: InputMaybe<Scalars['String']>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  slug_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']>;
  sptfy_link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  sptfy_link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  sptfy_link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  sptfy_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  sptfy_link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  sptfy_link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  sptfy_link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  sptfy_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  sptfy_link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  sptfy_link_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  yt_link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  yt_link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  yt_link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  yt_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  yt_link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  yt_link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  yt_link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  yt_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  yt_link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  yt_link_starts_with?: InputMaybe<Scalars['String']>;
};

export enum ReleaseOrderByInput {
  AppleLinkAsc = `apple_link_ASC`,
  AppleLinkDesc = `apple_link_DESC`,
  ArtistAsc = `artist_ASC`,
  ArtistDesc = `artist_DESC`,
  BuyLinkAsc = `buy_link_ASC`,
  BuyLinkDesc = `buy_link_DESC`,
  CreatedAtAsc = `createdAt_ASC`,
  CreatedAtDesc = `createdAt_DESC`,
  DeezerLinkAsc = `deezer_link_ASC`,
  DeezerLinkDesc = `deezer_link_DESC`,
  DescriptionAsc = `description_ASC`,
  DescriptionDesc = `description_DESC`,
  IdAsc = `id_ASC`,
  IdDesc = `id_DESC`,
  IframeScAsc = `iframe_sc_ASC`,
  IframeScDesc = `iframe_sc_DESC`,
  MusicNameAsc = `music_name_ASC`,
  MusicNameDesc = `music_name_DESC`,
  PublishedAtAsc = `publishedAt_ASC`,
  PublishedAtDesc = `publishedAt_DESC`,
  ReleaseDateAsc = `release_date_ASC`,
  ReleaseDateDesc = `release_date_DESC`,
  ReleaseNumberAsc = `release_number_ASC`,
  ReleaseNumberDesc = `release_number_DESC`,
  ScLinkAsc = `sc_link_ASC`,
  ScLinkDesc = `sc_link_DESC`,
  SlugAsc = `slug_ASC`,
  SlugDesc = `slug_DESC`,
  SptfyLinkAsc = `sptfy_link_ASC`,
  SptfyLinkDesc = `sptfy_link_DESC`,
  UpdatedAtAsc = `updatedAt_ASC`,
  UpdatedAtDesc = `updatedAt_DESC`,
  YtLinkAsc = `yt_link_ASC`,
  YtLinkDesc = `yt_link_DESC`,
}

export type ReleaseUpdateInput = {
  apple_link?: InputMaybe<Scalars['String']>;
  artist?: InputMaybe<Scalars['String']>;
  buy_link?: InputMaybe<Scalars['String']>;
  cover_art?: InputMaybe<AssetUpdateOneInlineInput>;
  deezer_link?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  iframe_sc?: InputMaybe<Scalars['String']>;
  music_name?: InputMaybe<Scalars['String']>;
  release_date?: InputMaybe<Scalars['Date']>;
  release_number?: InputMaybe<Scalars['Int']>;
  sc_link?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  sptfy_link?: InputMaybe<Scalars['String']>;
  yt_link?: InputMaybe<Scalars['String']>;
};

export type ReleaseUpdateManyInlineInput = {
  /** Connect multiple existing Release documents */
  connect?: InputMaybe<Array<ReleaseConnectInput>>;
  /** Create and connect multiple Release documents */
  create?: InputMaybe<Array<ReleaseCreateInput>>;
  /** Delete multiple Release documents */
  delete?: InputMaybe<Array<ReleaseWhereUniqueInput>>;
  /** Disconnect multiple Release documents */
  disconnect?: InputMaybe<Array<ReleaseWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Release documents */
  set?: InputMaybe<Array<ReleaseWhereUniqueInput>>;
  /** Update multiple Release documents */
  update?: InputMaybe<Array<ReleaseUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Release documents */
  upsert?: InputMaybe<Array<ReleaseUpsertWithNestedWhereUniqueInput>>;
};

export type ReleaseUpdateManyInput = {
  apple_link?: InputMaybe<Scalars['String']>;
  artist?: InputMaybe<Scalars['String']>;
  buy_link?: InputMaybe<Scalars['String']>;
  deezer_link?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  iframe_sc?: InputMaybe<Scalars['String']>;
  music_name?: InputMaybe<Scalars['String']>;
  release_date?: InputMaybe<Scalars['Date']>;
  sc_link?: InputMaybe<Scalars['String']>;
  sptfy_link?: InputMaybe<Scalars['String']>;
  yt_link?: InputMaybe<Scalars['String']>;
};

export type ReleaseUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: ReleaseUpdateManyInput;
  /** Document search */
  where: ReleaseWhereInput;
};

export type ReleaseUpdateOneInlineInput = {
  /** Connect existing Release document */
  connect?: InputMaybe<ReleaseWhereUniqueInput>;
  /** Create and connect one Release document */
  create?: InputMaybe<ReleaseCreateInput>;
  /** Delete currently connected Release document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Release document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Release document */
  update?: InputMaybe<ReleaseUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Release document */
  upsert?: InputMaybe<ReleaseUpsertWithNestedWhereUniqueInput>;
};

export type ReleaseUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: ReleaseUpdateInput;
  /** Unique document search */
  where: ReleaseWhereUniqueInput;
};

export type ReleaseUpsertInput = {
  /** Create document if it didn't exist */
  create: ReleaseCreateInput;
  /** Update document if it exists */
  update: ReleaseUpdateInput;
};

export type ReleaseUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: ReleaseUpsertInput;
  /** Unique document search */
  where: ReleaseWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type ReleaseWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type ReleaseWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ReleaseWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ReleaseWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ReleaseWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  apple_link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  apple_link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  apple_link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  apple_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  apple_link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  apple_link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  apple_link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  apple_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  apple_link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  apple_link_starts_with?: InputMaybe<Scalars['String']>;
  artist?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  artist_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  artist_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  artist_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  artist_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  artist_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  artist_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  artist_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  artist_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  artist_starts_with?: InputMaybe<Scalars['String']>;
  buy_link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  buy_link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  buy_link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  buy_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  buy_link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  buy_link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  buy_link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  buy_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  buy_link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  buy_link_starts_with?: InputMaybe<Scalars['String']>;
  cover_art?: InputMaybe<AssetWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  deezer_link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  deezer_link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  deezer_link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  deezer_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  deezer_link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  deezer_link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  deezer_link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  deezer_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  deezer_link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  deezer_link_starts_with?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  documentInStages_every?: InputMaybe<ReleaseWhereStageInput>;
  documentInStages_none?: InputMaybe<ReleaseWhereStageInput>;
  documentInStages_some?: InputMaybe<ReleaseWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  iframe_sc?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  iframe_sc_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  iframe_sc_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  iframe_sc_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  iframe_sc_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  iframe_sc_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  iframe_sc_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  iframe_sc_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  iframe_sc_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  iframe_sc_starts_with?: InputMaybe<Scalars['String']>;
  music_name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  music_name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  music_name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  music_name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  music_name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  music_name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  music_name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  music_name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  music_name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  music_name_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  release_date?: InputMaybe<Scalars['Date']>;
  /** All values greater than the given value. */
  release_date_gt?: InputMaybe<Scalars['Date']>;
  /** All values greater than or equal the given value. */
  release_date_gte?: InputMaybe<Scalars['Date']>;
  /** All values that are contained in given list. */
  release_date_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  /** All values less than the given value. */
  release_date_lt?: InputMaybe<Scalars['Date']>;
  /** All values less than or equal the given value. */
  release_date_lte?: InputMaybe<Scalars['Date']>;
  /** All values that are not equal to given value. */
  release_date_not?: InputMaybe<Scalars['Date']>;
  /** All values that are not contained in given list. */
  release_date_not_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  release_number?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  release_number_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  release_number_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  release_number_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  release_number_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  release_number_lte?: InputMaybe<Scalars['Int']>;
  /** All values that are not equal to given value. */
  release_number_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  release_number_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  sc_link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  sc_link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  sc_link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  sc_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  sc_link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  sc_link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  sc_link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  sc_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  sc_link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  sc_link_starts_with?: InputMaybe<Scalars['String']>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  slug_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']>;
  sptfy_link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  sptfy_link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  sptfy_link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  sptfy_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  sptfy_link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  sptfy_link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  sptfy_link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  sptfy_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  sptfy_link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  sptfy_link_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  yt_link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  yt_link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  yt_link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  yt_link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  yt_link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  yt_link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  yt_link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  yt_link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  yt_link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  yt_link_starts_with?: InputMaybe<Scalars['String']>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type ReleaseWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ReleaseWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ReleaseWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ReleaseWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<ReleaseWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Release record uniquely */
export type ReleaseWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
  release_number?: InputMaybe<Scalars['Int']>;
  slug?: InputMaybe<Scalars['String']>;
};

/** Custom type representing a rich text value comprising of raw rich text ast, html, markdown and text values */
export type RichText = {
  __typename?: 'RichText';
  /** Returns HTMl representation */
  html: Scalars['String'];
  /** Returns Markdown representation */
  markdown: Scalars['String'];
  /** Returns AST representation */
  raw: Scalars['RichTextAST'];
  /** Returns plain-text contents of RichText */
  text: Scalars['String'];
};

/** Scheduled Operation system model */
export type ScheduledOperation = Node & {
  __typename?: 'ScheduledOperation';
  affectedDocuments: Array<ScheduledOperationAffectedDocument>;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Operation description */
  description?: Maybe<Scalars['String']>;
  /** Get the document in other stages */
  documentInStages: Array<ScheduledOperation>;
  /** Operation error message */
  errorMessage?: Maybe<Scalars['String']>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  /** Raw operation payload including all details, this field is subject to change */
  rawPayload: Scalars['Json'];
  /** The release this operation is scheduled for */
  release?: Maybe<ScheduledRelease>;
  /** System stage field */
  stage: Stage;
  /** operation Status */
  status: ScheduledOperationStatus;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};

/** Scheduled Operation system model */
export type ScheduledOperationAffectedDocumentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
};

/** Scheduled Operation system model */
export type ScheduledOperationCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Scheduled Operation system model */
export type ScheduledOperationDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};

/** Scheduled Operation system model */
export type ScheduledOperationPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Scheduled Operation system model */
export type ScheduledOperationReleaseArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Scheduled Operation system model */
export type ScheduledOperationUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ScheduledOperationAffectedDocument = Artist | Asset | Release;

export type ScheduledOperationConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ScheduledOperationWhereUniqueInput;
};

/** A connection to a list of items. */
export type ScheduledOperationConnection = {
  __typename?: 'ScheduledOperationConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ScheduledOperationEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ScheduledOperationCreateManyInlineInput = {
  /** Connect multiple existing ScheduledOperation documents */
  connect?: InputMaybe<Array<ScheduledOperationWhereUniqueInput>>;
};

export type ScheduledOperationCreateOneInlineInput = {
  /** Connect one existing ScheduledOperation document */
  connect?: InputMaybe<ScheduledOperationWhereUniqueInput>;
};

/** An edge in a connection. */
export type ScheduledOperationEdge = {
  __typename?: 'ScheduledOperationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ScheduledOperation;
};

/** Identifies documents */
export type ScheduledOperationManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  /** All values containing the given json path. */
  rawPayload_json_path_exists?: InputMaybe<Scalars['String']>;
  release?: InputMaybe<ScheduledReleaseWhereInput>;
  status?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  /** All values that are not equal to given value. */
  status_not?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ScheduledOperationOrderByInput {
  CreatedAtAsc = `createdAt_ASC`,
  CreatedAtDesc = `createdAt_DESC`,
  DescriptionAsc = `description_ASC`,
  DescriptionDesc = `description_DESC`,
  ErrorMessageAsc = `errorMessage_ASC`,
  ErrorMessageDesc = `errorMessage_DESC`,
  IdAsc = `id_ASC`,
  IdDesc = `id_DESC`,
  PublishedAtAsc = `publishedAt_ASC`,
  PublishedAtDesc = `publishedAt_DESC`,
  StatusAsc = `status_ASC`,
  StatusDesc = `status_DESC`,
  UpdatedAtAsc = `updatedAt_ASC`,
  UpdatedAtDesc = `updatedAt_DESC`,
}

/** System Scheduled Operation Status */
export enum ScheduledOperationStatus {
  Canceled = `CANCELED`,
  Completed = `COMPLETED`,
  Failed = `FAILED`,
  InProgress = `IN_PROGRESS`,
  Pending = `PENDING`,
}

export type ScheduledOperationUpdateManyInlineInput = {
  /** Connect multiple existing ScheduledOperation documents */
  connect?: InputMaybe<Array<ScheduledOperationConnectInput>>;
  /** Disconnect multiple ScheduledOperation documents */
  disconnect?: InputMaybe<Array<ScheduledOperationWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing ScheduledOperation documents */
  set?: InputMaybe<Array<ScheduledOperationWhereUniqueInput>>;
};

export type ScheduledOperationUpdateOneInlineInput = {
  /** Connect existing ScheduledOperation document */
  connect?: InputMaybe<ScheduledOperationWhereUniqueInput>;
  /** Disconnect currently connected ScheduledOperation document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type ScheduledOperationWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  /** All values containing the given json path. */
  rawPayload_json_path_exists?: InputMaybe<Scalars['String']>;
  release?: InputMaybe<ScheduledReleaseWhereInput>;
  status?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  /** All values that are not equal to given value. */
  status_not?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** References ScheduledOperation record uniquely */
export type ScheduledOperationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

/** Scheduled Release system model */
export type ScheduledRelease = Node & {
  __typename?: 'ScheduledRelease';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Release description */
  description?: Maybe<Scalars['String']>;
  /** Get the document in other stages */
  documentInStages: Array<ScheduledRelease>;
  /** Release error message */
  errorMessage?: Maybe<Scalars['String']>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** Whether scheduled release should be run */
  isActive: Scalars['Boolean'];
  /** Whether scheduled release is implicit */
  isImplicit: Scalars['Boolean'];
  /** Operations to run with this release */
  operations: Array<ScheduledOperation>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  /** Release date and time */
  releaseAt?: Maybe<Scalars['DateTime']>;
  /** System stage field */
  stage: Stage;
  /** Release Status */
  status: ScheduledReleaseStatus;
  /** Release Title */
  title?: Maybe<Scalars['String']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};

/** Scheduled Release system model */
export type ScheduledReleaseCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Scheduled Release system model */
export type ScheduledReleaseDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};

/** Scheduled Release system model */
export type ScheduledReleaseOperationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};

/** Scheduled Release system model */
export type ScheduledReleasePublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Scheduled Release system model */
export type ScheduledReleaseUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ScheduledReleaseConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ScheduledReleaseWhereUniqueInput;
};

/** A connection to a list of items. */
export type ScheduledReleaseConnection = {
  __typename?: 'ScheduledReleaseConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ScheduledReleaseEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ScheduledReleaseCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ScheduledReleaseCreateManyInlineInput = {
  /** Connect multiple existing ScheduledRelease documents */
  connect?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Create and connect multiple existing ScheduledRelease documents */
  create?: InputMaybe<Array<ScheduledReleaseCreateInput>>;
};

export type ScheduledReleaseCreateOneInlineInput = {
  /** Connect one existing ScheduledRelease document */
  connect?: InputMaybe<ScheduledReleaseWhereUniqueInput>;
  /** Create and connect one ScheduledRelease document */
  create?: InputMaybe<ScheduledReleaseCreateInput>;
};

/** An edge in a connection. */
export type ScheduledReleaseEdge = {
  __typename?: 'ScheduledReleaseEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ScheduledRelease;
};

/** Identifies documents */
export type ScheduledReleaseManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isImplicit?: InputMaybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  isImplicit_not?: InputMaybe<Scalars['Boolean']>;
  operations_every?: InputMaybe<ScheduledOperationWhereInput>;
  operations_none?: InputMaybe<ScheduledOperationWhereInput>;
  operations_some?: InputMaybe<ScheduledOperationWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  releaseAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  releaseAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  releaseAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  releaseAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  releaseAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  releaseAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  releaseAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  status?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  /** All values that are not equal to given value. */
  status_not?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  title?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  title_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ScheduledReleaseOrderByInput {
  CreatedAtAsc = `createdAt_ASC`,
  CreatedAtDesc = `createdAt_DESC`,
  DescriptionAsc = `description_ASC`,
  DescriptionDesc = `description_DESC`,
  ErrorMessageAsc = `errorMessage_ASC`,
  ErrorMessageDesc = `errorMessage_DESC`,
  IdAsc = `id_ASC`,
  IdDesc = `id_DESC`,
  IsActiveAsc = `isActive_ASC`,
  IsActiveDesc = `isActive_DESC`,
  IsImplicitAsc = `isImplicit_ASC`,
  IsImplicitDesc = `isImplicit_DESC`,
  PublishedAtAsc = `publishedAt_ASC`,
  PublishedAtDesc = `publishedAt_DESC`,
  ReleaseAtAsc = `releaseAt_ASC`,
  ReleaseAtDesc = `releaseAt_DESC`,
  StatusAsc = `status_ASC`,
  StatusDesc = `status_DESC`,
  TitleAsc = `title_ASC`,
  TitleDesc = `title_DESC`,
  UpdatedAtAsc = `updatedAt_ASC`,
  UpdatedAtDesc = `updatedAt_DESC`,
}

/** System Scheduled Release Status */
export enum ScheduledReleaseStatus {
  Completed = `COMPLETED`,
  Failed = `FAILED`,
  InProgress = `IN_PROGRESS`,
  Pending = `PENDING`,
}

export type ScheduledReleaseUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ScheduledReleaseUpdateManyInlineInput = {
  /** Connect multiple existing ScheduledRelease documents */
  connect?: InputMaybe<Array<ScheduledReleaseConnectInput>>;
  /** Create and connect multiple ScheduledRelease documents */
  create?: InputMaybe<Array<ScheduledReleaseCreateInput>>;
  /** Delete multiple ScheduledRelease documents */
  delete?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Disconnect multiple ScheduledRelease documents */
  disconnect?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing ScheduledRelease documents */
  set?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Update multiple ScheduledRelease documents */
  update?: InputMaybe<Array<ScheduledReleaseUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple ScheduledRelease documents */
  upsert?: InputMaybe<Array<ScheduledReleaseUpsertWithNestedWhereUniqueInput>>;
};

export type ScheduledReleaseUpdateManyInput = {
  description?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ScheduledReleaseUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: ScheduledReleaseUpdateManyInput;
  /** Document search */
  where: ScheduledReleaseWhereInput;
};

export type ScheduledReleaseUpdateOneInlineInput = {
  /** Connect existing ScheduledRelease document */
  connect?: InputMaybe<ScheduledReleaseWhereUniqueInput>;
  /** Create and connect one ScheduledRelease document */
  create?: InputMaybe<ScheduledReleaseCreateInput>;
  /** Delete currently connected ScheduledRelease document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected ScheduledRelease document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single ScheduledRelease document */
  update?: InputMaybe<ScheduledReleaseUpdateWithNestedWhereUniqueInput>;
  /** Upsert single ScheduledRelease document */
  upsert?: InputMaybe<ScheduledReleaseUpsertWithNestedWhereUniqueInput>;
};

export type ScheduledReleaseUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: ScheduledReleaseUpdateInput;
  /** Unique document search */
  where: ScheduledReleaseWhereUniqueInput;
};

export type ScheduledReleaseUpsertInput = {
  /** Create document if it didn't exist */
  create: ScheduledReleaseCreateInput;
  /** Update document if it exists */
  update: ScheduledReleaseUpdateInput;
};

export type ScheduledReleaseUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: ScheduledReleaseUpsertInput;
  /** Unique document search */
  where: ScheduledReleaseWhereUniqueInput;
};

/** Identifies documents */
export type ScheduledReleaseWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isImplicit?: InputMaybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  isImplicit_not?: InputMaybe<Scalars['Boolean']>;
  operations_every?: InputMaybe<ScheduledOperationWhereInput>;
  operations_none?: InputMaybe<ScheduledOperationWhereInput>;
  operations_some?: InputMaybe<ScheduledOperationWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  releaseAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  releaseAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  releaseAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  releaseAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  releaseAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  releaseAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  releaseAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  status?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  /** All values that are not equal to given value. */
  status_not?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  title?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  title_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** References ScheduledRelease record uniquely */
export type ScheduledReleaseWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

/** Stage system enumeration */
export enum Stage {
  /** The Draft is the default stage for all your content. */
  Draft = `DRAFT`,
  /** The Published stage is where you can publish your content to. */
  Published = `PUBLISHED`,
}

export enum SystemDateTimeFieldVariation {
  Base = `BASE`,
  Combined = `COMBINED`,
  Localization = `LOCALIZATION`,
}

export type UnpublishLocaleInput = {
  /** Locales to unpublish */
  locale: Locale;
  /** Stages to unpublish selected locales from */
  stages: Array<Stage>;
};

/** User system model */
export type User = Node & {
  __typename?: 'User';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** Get the document in other stages */
  documentInStages: Array<User>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** Flag to determine if user is active or not */
  isActive: Scalars['Boolean'];
  /** User Kind. Can be either MEMBER, PAT or PUBLIC */
  kind: UserKind;
  /** The username */
  name: Scalars['String'];
  /** Profile Picture url */
  picture?: Maybe<Scalars['String']>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
};

/** User system model */
export type UserDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};

export type UserConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: UserWhereUniqueInput;
};

/** A connection to a list of items. */
export type UserConnection = {
  __typename?: 'UserConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<UserEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type UserCreateManyInlineInput = {
  /** Connect multiple existing User documents */
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserCreateOneInlineInput = {
  /** Connect one existing User document */
  connect?: InputMaybe<UserWhereUniqueInput>;
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: User;
};

/** System User Kind */
export enum UserKind {
  Member = `MEMBER`,
  Pat = `PAT`,
  Public = `PUBLIC`,
  Webhook = `WEBHOOK`,
}

/** Identifies documents */
export type UserManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  documentInStages_every?: InputMaybe<UserWhereStageInput>;
  documentInStages_none?: InputMaybe<UserWhereStageInput>;
  documentInStages_some?: InputMaybe<UserWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  kind?: InputMaybe<UserKind>;
  /** All values that are contained in given list. */
  kind_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  /** All values that are not equal to given value. */
  kind_not?: InputMaybe<UserKind>;
  /** All values that are not contained in given list. */
  kind_not_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  picture_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  picture_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  picture_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  picture_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  picture_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  picture_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  picture_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  picture_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  picture_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
};

export enum UserOrderByInput {
  CreatedAtAsc = `createdAt_ASC`,
  CreatedAtDesc = `createdAt_DESC`,
  IdAsc = `id_ASC`,
  IdDesc = `id_DESC`,
  IsActiveAsc = `isActive_ASC`,
  IsActiveDesc = `isActive_DESC`,
  KindAsc = `kind_ASC`,
  KindDesc = `kind_DESC`,
  NameAsc = `name_ASC`,
  NameDesc = `name_DESC`,
  PictureAsc = `picture_ASC`,
  PictureDesc = `picture_DESC`,
  PublishedAtAsc = `publishedAt_ASC`,
  PublishedAtDesc = `publishedAt_DESC`,
  UpdatedAtAsc = `updatedAt_ASC`,
  UpdatedAtDesc = `updatedAt_DESC`,
}

export type UserUpdateManyInlineInput = {
  /** Connect multiple existing User documents */
  connect?: InputMaybe<Array<UserConnectInput>>;
  /** Disconnect multiple User documents */
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing User documents */
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserUpdateOneInlineInput = {
  /** Connect existing User document */
  connect?: InputMaybe<UserWhereUniqueInput>;
  /** Disconnect currently connected User document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

/** This contains a set of filters that can be used to compare values internally */
export type UserWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type UserWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  documentInStages_every?: InputMaybe<UserWhereStageInput>;
  documentInStages_none?: InputMaybe<UserWhereStageInput>;
  documentInStages_some?: InputMaybe<UserWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  kind?: InputMaybe<UserKind>;
  /** All values that are contained in given list. */
  kind_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  /** All values that are not equal to given value. */
  kind_not?: InputMaybe<UserKind>;
  /** All values that are not contained in given list. */
  kind_not_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  picture_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  picture_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  picture_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  picture_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  picture_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  picture_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  picture_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  picture_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  picture_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type UserWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<UserWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References User record uniquely */
export type UserWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Version = {
  __typename?: 'Version';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  revision: Scalars['Int'];
  stage: Stage;
};

export type VersionWhereInput = {
  id: Scalars['ID'];
  revision: Scalars['Int'];
  stage: Stage;
};

export enum _FilterKind {
  And = `AND`,
  Not = `NOT`,
  Or = `OR`,
  Contains = `contains`,
  ContainsAll = `contains_all`,
  ContainsNone = `contains_none`,
  ContainsSome = `contains_some`,
  EndsWith = `ends_with`,
  Eq = `eq`,
  EqNot = `eq_not`,
  Gt = `gt`,
  Gte = `gte`,
  In = `in`,
  JsonPathExists = `json_path_exists`,
  Lt = `lt`,
  Lte = `lte`,
  NotContains = `not_contains`,
  NotEndsWith = `not_ends_with`,
  NotIn = `not_in`,
  NotStartsWith = `not_starts_with`,
  RelationalEvery = `relational_every`,
  RelationalNone = `relational_none`,
  RelationalSingle = `relational_single`,
  RelationalSome = `relational_some`,
  Search = `search`,
  StartsWith = `starts_with`,
}

export enum _MutationInputFieldKind {
  Enum = `enum`,
  Relation = `relation`,
  RichText = `richText`,
  RichTextWithEmbeds = `richTextWithEmbeds`,
  Scalar = `scalar`,
  Union = `union`,
  Virtual = `virtual`,
}

export enum _MutationKind {
  Create = `create`,
  Delete = `delete`,
  DeleteMany = `deleteMany`,
  Publish = `publish`,
  PublishMany = `publishMany`,
  SchedulePublish = `schedulePublish`,
  ScheduleUnpublish = `scheduleUnpublish`,
  Unpublish = `unpublish`,
  UnpublishMany = `unpublishMany`,
  Update = `update`,
  UpdateMany = `updateMany`,
  Upsert = `upsert`,
}

export enum _OrderDirection {
  Asc = `asc`,
  Desc = `desc`,
}

export enum _RelationInputCardinality {
  Many = `many`,
  One = `one`,
}

export enum _RelationInputKind {
  Create = `create`,
  Update = `update`,
}

export enum _RelationKind {
  Regular = `regular`,
  Union = `union`,
}

export enum _SystemDateTimeFieldVariation {
  Base = `base`,
  Combined = `combined`,
  Localization = `localization`,
}

export type ArtistsQueryVariables = Exact<{ [key: string]: never }>;

export type ArtistsQuery = {
  __typename?: 'Query';
  artists: Array<{
    __typename?: 'Artist';
    id: string;
    key?: number | null;
    artist_number: number;
    artist_name: string;
    facebook_link?: string | null;
    iframe_sc?: string | null;
    instgram_link?: string | null;
    slug: string;
    sptfy_link: string;
    sc_link?: string | null;
    yt_link?: string | null;
    description: string;
    flag: { __typename?: 'Asset'; url: string };
    picture?: { __typename?: 'Asset'; url: string } | null;
  }>;
};

export type ReleaseQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
}>;

export type ReleaseQuery = {
  __typename?: 'Query';
  release?: {
    __typename?: 'Release';
    id: string;
    music_name: string;
    release_date: any;
    sc_link: string;
    slug: string;
    description: string;
    sptfy_link: string;
    iframe_sc: string;
    yt_link: string;
    buy_link: string;
    artist: string;
    deezer_link?: string | null;
    apple_link?: string | null;
    cover_art: { __typename?: 'Asset'; url: string };
  } | null;
};

export type ReleasesQueryVariables = Exact<{ [key: string]: never }>;

export type ReleasesQuery = {
  __typename?: 'Query';
  releases: Array<{
    __typename?: 'Release';
    id: string;
    music_name: string;
    release_date: any;
    sc_link: string;
    slug: string;
    sptfy_link: string;
    yt_link: string;
    buy_link: string;
    artist: string;
    cover_art: { __typename?: 'Asset'; url: string };
  }>;
};

export const ArtistsDocument = gql`
  query Artists {
    artists(last: 9999) {
      id
      key
      artist_number
      artist_name
      facebook_link
      iframe_sc
      instgram_link
      slug
      sptfy_link
      sc_link
      yt_link
      description
      flag {
        url
      }
      picture {
        url
      }
    }
  }
`;

export function useArtistsQuery(
  options?: Omit<Urql.UseQueryArgs<ArtistsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ArtistsQuery, ArtistsQueryVariables>({
    query: ArtistsDocument,
    ...options,
  });
}
export const ReleaseDocument = gql`
  query Release($slug: String) {
    release(where: { slug: $slug }) {
      id
      music_name
      release_date
      sc_link
      slug
      description
      sptfy_link
      iframe_sc
      yt_link
      buy_link
      artist
      deezer_link
      apple_link
      cover_art {
        url(transformation: { image: { resize: { width: 1000 } } })
      }
    }
  }
`;

export function useReleaseQuery(
  options?: Omit<Urql.UseQueryArgs<ReleaseQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ReleaseQuery, ReleaseQueryVariables>({
    query: ReleaseDocument,
    ...options,
  });
}
export const ReleasesDocument = gql`
  query Releases {
    releases(orderBy: release_date_DESC, last: 999) {
      id
      music_name
      release_date
      sc_link
      slug
      sptfy_link
      yt_link
      buy_link
      artist
      cover_art {
        url(transformation: { image: { resize: { width: 500 } } })
      }
    }
  }
`;

export function useReleasesQuery(
  options?: Omit<Urql.UseQueryArgs<ReleasesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<ReleasesQuery, ReleasesQueryVariables>({
    query: ReleasesDocument,
    ...options,
  });
}
