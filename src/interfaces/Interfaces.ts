import {
  Collection,
  CollectionList,
  ColMetaData,
  ColStats, ItemsStats,
} from "../models/collectionsModels";
import { DatasetEvent, UserDataset } from "../models/UserDatasetModels";
import { EventType } from "../utils/AppConfig";

export interface ICollectionService {
  GetColMetaData(colId: string): Promise<ColMetaData[]>;

  IsAdminUser(): Promise<boolean>;

  SubmitEvent(
    colId: string,
    message: string[],
    eventType: EventType
  ): Promise<any>;

  GetCollections(skip: number, count: number): Promise<CollectionList>;

  GetCollection(collectionId: string): Promise<Collection>;

  IsColNameAvailable(collectionId: string): Promise<boolean>;

  DownloadMetadataExcel(collectionId: string): Promise<Blob>;

  DownloadDataset(
    collectionId: string,
    skip: number,
    count: number
  ): Promise<Blob>;

  UploadMetadata(file: File, colId: string): Promise<any>;

  GetCollectionsMap(storeType: number, year: number): Promise<any>;

  GetCollectionStats(storeType: number, year: number): Promise<ColStats>;

  GetItemsStats(collectionId: string): Promise<ItemsStats>;
}

export interface IUserDatasetService {
  GetDatasets(
    skip: number,
    count: number,
    forceUpdate: boolean
  ): Promise<UserDataset[]>;

  GetUserDataset(id: string): Promise<UserDataset>;

  DeleteUserDataset(id: string): Promise<string>;

  GetDatasetEvents(colId: string): Promise<DatasetEvent[]>;

  DatasetSubmitPublicEvent(colId: string): Promise<any>;

  DatasetMakePublic(id: string): Promise<any>;

  DatasetSubmitEvent(
    colId: string,
    eventType: EventType,
    comments: string[]
  ): Promise<any>;

  UploadNewDataset(
    file: File,
    title: string,
    colId: string,
    obsM: number,
    lc: number,
    ct: number,
    irr: number
  ): Promise<UserDataset>;
}

export type FormInputs = {
  title: string;
  collectionId: string;
  obsMethod: number;
  lcConf: number;
  ctConf: number;
  irrConf: number;
  file: File;
};
export type EventInputs = {
  message: string;
  eventType: number;
};

export type DownloadInputs = {
  skip: number;
  count: number;
};
