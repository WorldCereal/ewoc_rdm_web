export const ApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const LogoutUrl =
  process.env.NEXT_PUBLIC_ENABLE_AUTH === '1'
    ? (ApiBaseUrl?.replace('data', 'logout') as unknown as string)
    : '';

//----------------------------------------------------------------------------------------------------------------------
//----------metadata constants-----------------
export const ConfidenceLandCover = 'CuratedDataSet:ConfidenceLandCover::';
export const ConfidenceCropType = 'CuratedDataSet:ConfidenceCropType::';
export const ConfidenceIrrigationRainfed =
  'CuratedDataSet:ConfidenceIrrigationRainfed::';
export const TitleCuratedDataSet = 'CuratedDataSet::TitleCuratedDataSet:';
export const NoOfObservations =
  'CuratedDataSet:ObservationCuratedDataset::NoOfObservations';
export const ObservationTime =
  'CuratedDataSet:ObservationCuratedDataset:ObservationTime:';
export const FirstDateObservation =
  'CuratedDataSet:ObservationCuratedDataset:Summary:FirstDateObservation';
export const LastDateObservation =
  'CuratedDataSet:ObservationCuratedDataset::LastDateObservation';
export const DescriptionCuratedDataSet =
  'CuratedDataSet::DescriptionCuratedDataSet:';
export const GeometryAccuracy =
  'CuratedDataSet:ObservationCuratedDataset:Geometry:Accuracy';
export const PointOrPolygonOrRaster =
  'CuratedDataSet:ObservationCuratedDataset:Geometry:PointOrPolygonOrRaster';
export const GeometryCountry =
  'CuratedDataSet:ObservationCuratedDataset:Geometry:Country';
export const GeometryContinent =
  'CuratedDataSet:ObservationCuratedDataset:Geometry:Continent';
export const ListOfLandCovers =
  'CuratedDataSet:ObservationCuratedDataset::ListOfLandCovers';
export const ListOfCropTypes =
  'CuratedDataSet:ObservationCuratedDataset::ListOfCropTypes';
export const ListOfIrrigationCodes =
  'CuratedDataSet:ObservationCuratedDataset::ListOfIrrigationCodes';
export const CurationByWordCereal = 'CuratedDataSet:CurationByWordCereal::';
export const ProviderCode = 'OriginalDataSet:Provider:Code:';
export const ProviderDescriptionCuratedDataSet =
  'OriginalDataSet:Provider:DescriptionCuratedDataSet:';
export const ProviderUrl = 'OriginalDataSet:Provider:URL:';
export const ProviderContact = 'OriginalDataSet:Provider:Contact:';
export const NameDataSet = 'OriginalDataSet:NameDataSet::';
export const OriginalDataSetDoi = 'OriginalDataSet:DOI::';
export const TypeOfLicense = 'OriginalDataSet:License:TypeOfLicense:';
export const ReferenceToLicense = 'OriginalDataSet:License:ReferenceToLicense:';
export const OriginalDataSetObjective = 'OriginalDataSet:Objective::';
export const TypeOfObservationMethod =
  'OriginalDataSet:Observation:ObservationMethod:TypeOfObservationMethod';
export const ObservationMethodSamplingDesign =
  'OriginalDataSet:Observation:ObservationMethod:SamplingDesign';
export const ObservationMethodInfoOnSamplingDesign =
  'OriginalDataSet:Observation:ObservationMethod:InfoOnSamplingDesign';
export const ObservationMethodValidation =
  'OriginalDataSet:Observation:ObservationMethod:Validation';
export const ObservationMethodInfoOnValidation =
  'OriginalDataSet:Observation:ObservationMethod:InfoOnValidation';
export const ObservationClassificationAccuracy =
  'OriginalDataSet:Observation::ClassificationAccuracy';
export const ObservationSupportingMaterial =
  'OriginalDataSet:Observation::SupportingMaterial';
export const TypeOfGeometry =
  'OriginalDataSet:Observation:Geometry:TypeOfGeometry';
export const ObservationGPSFieldMethod =
  'OriginalDataSet:Observation::GPSFieldMethod';
export const ObservationCoordinateSystem =
  'OriginalDataSet:Observation::CoordinateSystem';
export const OriginalDataSetDataFormat = 'OriginalDataSet:DataFormat::';
export const OriginalDataSetLanguage = 'OriginalDataSet:Language::';
export const RequiredCitation = 'OriginalDataSet:License:RequiredCitation:';
export const DatasetZipUrl = 'CollectionDownloadUrl';
