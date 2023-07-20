import { useJpex } from 'react-jpex';
import { AxiosInstance } from 'axios';
import http from './apiClient';
import { CollectionService } from './collectionService';
import {
  ICollectionService,
  IUserDatasetService,
} from '../interfaces/Interfaces';
import { UserDatasetService } from './userDatasetService';

export default function getDiContainer(): any {
  const jpex = useJpex();

  jpex.constant<AxiosInstance>('http', http);
  jpex.constant<ICollectionService>(
    'collectionService',
    new CollectionService(http)
  );
  jpex.constant<IUserDatasetService>(
    'userDatasetService',
    new UserDatasetService(http)
  );
  return jpex.extend();
}
