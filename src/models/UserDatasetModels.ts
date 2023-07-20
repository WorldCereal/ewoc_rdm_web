import {
  DatasetState,
  EventType,
  TypeOfObservationMethodEnum,
} from '../utils/AppConfig';

export interface UserDataset {
  id: string;
  title: string;
  typeOfObservationMethod: TypeOfObservationMethodEnum;
  confidenceLandCover: number;
  confidenceCropType: number;
  confidenceIrrigationType: number;
  collectionId: string;
  state: DatasetState;
  errors: string[];
  creationTime: Date;
}

export interface DatasetEvent {
  type: EventType;
  comments: string[];
  creationTime: string;
  id: number;
  canSubmit: string;
}
