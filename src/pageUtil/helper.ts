import { DatasetState } from '../utils/AppConfig';

export function canStartTimer(state: DatasetState) {
  const statusValue = DatasetState[state] as unknown as number;

  return (
    statusValue === DatasetState.UploadedValidationInProgressWait ||
    statusValue === DatasetState.ValidationSuccessfulProvisionInProgressWait ||
    statusValue === DatasetState.StoreProvisioned
  );
}
