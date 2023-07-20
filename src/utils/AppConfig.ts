export const AppConfig = {
  site_name: 'Starter',
  title: 'WorldCereal Reference Data Module',
  description: 'WorldCereal Reference Data Module',
  locale: 'en',
};

export enum TypeOfObservationMethodEnum {
  Unknown,
  FieldObservationSurvey,
  FieldObservationSurveyWindshield,
  AutomatedClassification,
  ClassificationValidatedCrowd,
  ClassificationValidatedExpert,
  FormalDeclaration,
}

export enum EventType {
  SubmittedForReview,
  ReviewInProgress,
  NeedsFix,
  Accepted,
  Public,
}

export const EventTypeMethods = [
  {
    name: EventType[EventType.SubmittedForReview],
    value: EventType.SubmittedForReview,
    strName: EventType[EventType.SubmittedForReview],
  },
  {
    name: EventType[EventType.ReviewInProgress],
    value: EventType.ReviewInProgress,
    strName: EventType[EventType.ReviewInProgress],
  },
  {
    name: EventType[EventType.NeedsFix],
    value: EventType.NeedsFix,
    strName: EventType[EventType.NeedsFix],
  },
  {
    name: EventType[EventType.Accepted],
    value: EventType.Accepted,
    strName: EventType[EventType.Accepted],
  },
  {
    name: EventType[EventType.Public],
    value: EventType.Public,
    strName: EventType[EventType.Public],
  },
];

export enum DatasetState {
  UploadedValidationInProgressWait,
  ValidationSuccessfulProvisionInProgressWait,
  ValidationFailedUploadRequired,
  StoreProvisioned,
  StoreProvisionFailed,
  AvailableInModule,
  ItemsUpdateInprogress,
  ItemsUpdateFailed,
  PublicDataset,
  PublicDatasetFailed,
}

export const TypeOfObservationMethods = [
  {
    name: TypeOfObservationMethodEnum[TypeOfObservationMethodEnum.Unknown],
    value: TypeOfObservationMethodEnum.Unknown,
    strName: TypeOfObservationMethodEnum[TypeOfObservationMethodEnum.Unknown],
  },
  {
    name: 'Field Observation Survey',
    value: TypeOfObservationMethodEnum.FieldObservationSurvey,
    strName:
      TypeOfObservationMethodEnum[
        TypeOfObservationMethodEnum.FieldObservationSurvey
      ],
  },
  {
    name: 'Field Observation Survey-Windshield',
    value: TypeOfObservationMethodEnum.FieldObservationSurveyWindshield,
    strName:
      TypeOfObservationMethodEnum[
        TypeOfObservationMethodEnum.FieldObservationSurveyWindshield
      ],
  },
  {
    name: 'Automated Classification',
    value: TypeOfObservationMethodEnum.AutomatedClassification,
    strName:
      TypeOfObservationMethodEnum[
        TypeOfObservationMethodEnum.AutomatedClassification
      ],
  },
  {
    name: 'Classification Validated by Crowd',
    value: TypeOfObservationMethodEnum.ClassificationValidatedCrowd,
    strName:
      TypeOfObservationMethodEnum[
        TypeOfObservationMethodEnum.ClassificationValidatedCrowd
      ],
  },
  {
    name: 'Classification Validated by Expert',
    value: TypeOfObservationMethodEnum.ClassificationValidatedExpert,
    strName:
      TypeOfObservationMethodEnum[
        TypeOfObservationMethodEnum.ClassificationValidatedExpert
      ],
  },
  {
    name: 'Formal Declaration',
    value: TypeOfObservationMethodEnum.FormalDeclaration,
    strName:
      TypeOfObservationMethodEnum[
        TypeOfObservationMethodEnum.FormalDeclaration
      ],
  },
];
