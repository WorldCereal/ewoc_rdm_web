import { AxiosInstance } from 'axios';
import { DatasetEvent, UserDataset } from '../models/UserDatasetModels';
import { IUserDatasetService } from '../interfaces/Interfaces';
import FormData from 'form-data';
import { EventType } from '../utils/AppConfig';

export class UserDatasetService implements IUserDatasetService {
  private _http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this._http = http;
  }

  async GetDatasets(
    skip: number,
    count: number,
    forceUpdate: boolean
  ): Promise<UserDataset[]> {
    if (forceUpdate) {
      const data = (
        await this._http.get(
          '/userdatasets?SkipCount=' + skip + '&MaxResultCount=' + count,
          {
            forceUpdate: true,
          }
        )
      ).data;
      console.log('force from network and server', data);
      return data as unknown as UserDataset[];
    }

    return (
      await this._http.get(
        '/userdatasets?SkipCount=' + skip + '&MaxResultCount=' + count
      )
    ).data as unknown as UserDataset[];
  }

  async GetUserDataset(id: string): Promise<UserDataset> {
    //let time = new Date().getTime().toString();
    let res = await this._http.get('/userdatasets/' + id, {
      cache: false,
      forceUpdate: true,
    });
    return res.data as unknown as UserDataset;
  }

  async GetDatasetEvents(colId: string): Promise<DatasetEvent[]> {
    let res = await this._http.get('/collections/' + colId + '/events', {
      cache: false,
      forceUpdate: true,
    });
    return res.data as unknown as DatasetEvent[];
  }

  async DatasetSubmitPublicEvent(colId: string): Promise<any> {
    let res = await this._http.get('/collections/' + colId + '/public/submit', {
      cache: false,
      forceUpdate: true,
    });
    return res.data;
  }

  async DatasetMakePublic(id: string): Promise<any> {
    let res = await this._http.put('userdatasets/' + id + '/public');
    return res.data;
  }

  async DatasetSubmitEvent(
    colId: string,
    eventType: EventType,
    comments: string[]
  ): Promise<any> {
    let res = await this._http.put(
      '/collections/' + colId + '/add/' + eventType,
      comments,
      {
        cache: false,
        forceUpdate: true,
      }
    );
    return res.data;
  }

  async DeleteUserDataset(id: string): Promise<string> {
    let res = await this._http.delete('/userdatasets/' + id, {
      cache: false,
      forceUpdate: true,
    });
    return res.data as string;
  }

  async UploadNewDataset(
    file: File,
    title: string,
    colId: string,
    obsM: number,
    lc: number,
    ct: number,
    irr: number
  ): Promise<UserDataset> {
    let req =
      '/userdatasets?Title=' +
      title +
      '&TypeOfObservationMethod=' +
      obsM +
      '&CollectionId=' +
      colId +
      '&ConfidenceLandCover=' +
      lc +
      '&ConfidenceCropType=' +
      ct +
      '&ConfidenceIrrigationType=' +
      irr;

    let formData = new FormData();
    formData.append('uploadedFile', file);
    let res = await this._http.post(req, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data as unknown as UserDataset;
  }
}
