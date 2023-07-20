export interface Spatial {
  bbox: number[][];
  crs: string;
}

export interface Temporal {
  interval: Date[][];
  trs: string;
}

export interface Extent {
  spatial: Spatial;
  temporal: Temporal;
}

export interface Collection {
  collectionId: string;
  landCovers: number[];
  cropTypes: number[];
  irrTypes: number[];
  type: string;
  title: string;
  typeOfObservationMethod: string;
  featureCount: number;
  extent: Extent;
  storeType: string;
  accessType: string;
  additionalData?: any;
  crs: string[];
  lastModificationTime?: any;
  lastModifierId?: any;
  creationTime: Date;
  creatorId?: any;
  id: string;
}

export interface CollectionList {
  totalCount: number;
  items: Collection[];
}

export interface ColMetaData {
  id: number;
  name: string;
  value: string;
  type: string;
}

export interface ColStats {
  totalCollections: number;
  featuresTotalCount: number;
}

export interface StatsItem {
  code: number;
  count: number;
}

export interface ItemsStats {
  lcStats: StatsItem[];
  ctStats: StatsItem[];
  irrStats: StatsItem[];
}