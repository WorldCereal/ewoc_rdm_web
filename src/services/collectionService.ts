import { AxiosInstance } from "axios";
import {
  Collection,
  CollectionList,
  ColMetaData,
  ColStats,
  ItemsStats,
} from "../models/collectionsModels";
import { ICollectionService } from "../interfaces/Interfaces";
import FormData from "form-data";
import { EventType } from "../utils/AppConfig";

export class CollectionService implements ICollectionService {
  private _http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this._http = http;
  }

  async GetColMetaData(colId: string): Promise<ColMetaData[]> {
    let metadata = await this._http.get(
      "/collections/" + colId + "/metadata/items"
    );
    return metadata.data as unknown as ColMetaData[];
  }

  async IsColNameAvailable(colId: string): Promise<boolean> {
    let metadata = await this._http.get("/collections/" + colId + "/available");
    return metadata.data as unknown as boolean;
  }

  async DownloadDataset(
    collectionId: string,
    skip: number,
    count: number
  ): Promise<Blob> {
    let res = await this._http.get(
      "/collection/" +
        collectionId +
        "/items/download?SkipCount=" +
        skip +
        "&MaxResultCount=" +
        count,
      { responseType: "blob" }
    );  
    return new Blob([res.data]);
  }

  async IsAdminUser(): Promise<boolean> {
    const res = await this._http.get("/user/isadmin");
    return res.data;
  }

  async SubmitEvent(
    colId: string,
    message: string[],
    eventType: EventType
  ): Promise<any> {
    let req = "/collections/" + colId + "/add/" + eventType;
    let res = await this._http.put(req, message, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }

  async GetCollections(skip: number, count: number): Promise<CollectionList> {
    let res = await this._http.get(
      "/collections?SkipCount=" + skip + "&MaxResultCount=" + count
    ); // Dynamic skip and load later.
    // console.log('res.data ', res.data);
    return res.data as unknown as CollectionList;
  }

  async GetCollection(collectionId: string): Promise<Collection> {
    let res = await this._http.get("/collections/" + collectionId); // Dynamic skip and load later.
    // console.log('res.data ', res.data);
    return res.data as unknown as Collection;
  }

  async GetCollectionsMap(storeType: number, year: number): Promise<any> {
    let res = await this._http.get(
      "/collections/map?storeType=" + storeType + "&year=" + year
    ); // Dynamic skip and load later.
    // console.log('res.data ', res.data);
    return res.data;
  }

  async GetCollectionStats(storeType: number, year: number): Promise<ColStats> {
    let res = await this._http.get(
      "/collections/stats?storeType=" + storeType + "&year=" + year
    ); // Dynamic skip and load later.
    return res.data as unknown as ColStats;
  }

  async DownloadMetadataExcel(collectionId: string): Promise<Blob> {
    let res = await this._http.get(
      "/collections/" + collectionId + "/metadata/download",
      { responseType: "blob" }
    );
    console.log("res", res);
    return new Blob([res.data]);
  }

  async UploadMetadata(file: File, colId: string): Promise<any> {
    let req = "/collections/" + colId + "/metadata/upload";
    let formData = new FormData();
    formData.append("excelBook", file);
    let res = await this._http.post(req, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }

  async GetItemsStats(collectionId: string): Promise<ItemsStats> {
    let res = await this._http.get(
      "/collections/" + collectionId + "/items/codestats"
    );
    return res.data as unknown as ItemsStats;
  }
}
