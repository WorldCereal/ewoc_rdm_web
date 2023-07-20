import { atom } from 'recoil';
import { Collection } from '../models/collectionsModels';
import { UserDataset } from '../models/UserDatasetModels';

export const collectionListState = atom({
  key: 'collectionListState',
  default: [],
});
export const selectedCollectionState = atom({
  key: 'selectedCollectionState',
  default: undefined as Collection | undefined,
});

export const selectedUserDatasetState = atom({
  key: 'selectedUserDatasetState',
  default: undefined as UserDataset | undefined,
});

export const forceUpdateUserDsState = atom({
  key: 'forceUpdateUserDsState',
  default: false,
});

export const showProgressState = atom({
  key: 'showProgressState',
  default: false,
});
