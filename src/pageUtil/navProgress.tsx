/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon, ExclamationIcon } from '@heroicons/react/solid';
import { classNames } from '../utils/Helper';
import { DatasetState } from '../utils/AppConfig';
import React from 'react';

interface NavProgressProps {
  state: DatasetState;
}

function getStatus(status: DatasetState, stepState: DatasetState) {
  const stepStateValue = stepState as unknown as number;
  const statusValue = DatasetState[status] as unknown as number; 
  return statusValue >= stepStateValue
    ? 'complete' :'current';
}

function isEqual(status: DatasetState, stepState: DatasetState) {
  const stepStateValue = stepState as unknown as number;
  const statusValue = DatasetState[status] as unknown as number;
  return statusValue == stepStateValue;
}

function getProgressSteps(status: DatasetState) {
  return [
    {
      name: 'Upload',
      href: '#',
      status: getStatus(status, DatasetState.UploadedValidationInProgressWait),
      value: DatasetState.UploadedValidationInProgressWait,
      error: false,
      InProgress: false,
      errorName: 'Upload Failed',
    },
    {
      name: 'Validation',
      href: '#',
      status: getStatus(status, DatasetState.UploadedValidationInProgressWait),
      value: DatasetState.ValidationSuccessfulProvisionInProgressWait,
      InProgress:
        status ===
        (DatasetState[
          DatasetState.UploadedValidationInProgressWait
        ] as unknown as DatasetState),
      error:
        status ===
        (DatasetState[
          DatasetState.ValidationFailedUploadRequired
        ] as unknown as DatasetState),
      errorName: 'Validation Failed',
    },
    {
      name: 'Provision',
      href: '#',
      status: getStatus(
        status,
        DatasetState.StoreProvisioned
      ),
      value: DatasetState.StoreProvisioned,
      InProgress: isEqual(
        status,
        DatasetState.ValidationSuccessfulProvisionInProgressWait
      ),
      error:
        status ===
        (DatasetState[
          DatasetState.StoreProvisionFailed
        ] as unknown as DatasetState),
      errorName: 'Provision Failed',
    },
    {
      name: 'Private Use',
      href: '#',
      status: getStatus(status, DatasetState.AvailableInModule),
      value: DatasetState.AvailableInModule,
      InProgress: isEqual(status, DatasetState.StoreProvisioned),
      error: false,
      errorName: 'Private Dataset Server Error',
    },
    {
      name: 'Public',
      href: '#',
      status: getStatus(status, DatasetState.PublicDataset),
      value: DatasetState.PublicDataset,
      InProgress: false,
      error:
        status ===
        (DatasetState[
          DatasetState.PublicDatasetFailed
        ] as unknown as DatasetState),
      errorName: 'Public Dataset Error',
    },
  ];
}

function GetInactive(step: {
  errorName: string;
  name: string;
  href: string;
  InProgress: boolean;
  error: boolean;
  value: DatasetState;
  status: string;
}) {
  return step.status === 'current' ? (
    <div className="sm:grid-cols-1">
      <div className=" inset-0 flex items-center sm:col-span-1">
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className=" h-0.5 w-full mb-5 bg-gray-300" />
        </div>
        {step.InProgress ? (
          <a
            href="#"
            className="relative w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full hover:bg-blue-900"
          >
            <svg
              className="animate-spin h-5 w-5 text-white "
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth={4}
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </a>
        ) : null}
        {step.error ? (
          <a
            href="#"
            className="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-red-600 rounded-full"
            aria-current="step"
          >
            <span
              className="h-2.5 w-2.5 bg-red-600 rounded-full"
              aria-hidden="true"
            />
            <span className="sr-only">{step.name}</span>
          </a>
        ) : null}
        {!step.error && !step.InProgress ? (
          <a
            href="#"
            className="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-blue-600 rounded-full"
            aria-current="step"
          >
            <span
              className="h-2.5 w-2.5 bg-blue-600 rounded-full"
              aria-hidden="true"
            />
            <span className="sr-only">{step.name}</span>
          </a>
        ) : null}
      </div>
      <span
        className={classNames(
          'sm:col-span-1',
          step.error ? 'text-red-700' : 'text-gray-700'
        )}
      >
        {step.error ? step.errorName : step.name}
      </span>
    </div>
  ) : (
    <div className="sm:grid-cols-1">
      <div className=" inset-0 flex items-center sm:col-span-1">
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          {step.value !== DatasetState.PublicDataset ? (
            <div className=" h-0.5 w-full mb-5 bg-gray-300" />
          ) : (
            <div />
          )}
        </div>
        <a
          href="#"
          className="group relative w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full hover:border-gray-400"
        >
          <span
            className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
            aria-hidden="true"
          />
          <span className="sr-only">{step.name}</span>
        </a>
      </div>
      <span className="sm:col-span-1 text-gray-700">{step.name}</span>
    </div>
  );
}

export default function NavProgress(props: NavProgressProps) {
  const steps = getProgressSteps(props.state);

  return (
    <nav aria-label="Progress">
      <ol className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={classNames(
              stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '',
              'relative'
            )}
          >
            {step.status === 'complete' ? (
              <div className="sm:grid-cols-1">
                <div className=" inset-0 flex items-center  sm:col-span-1">
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {stepIdx !== steps.length - 1 ? (
                      <div className=" h-0.5 w-full mb-5 bg-blue-600" />
                    ) : null}
                  </div>
                  {step.InProgress ? (
                    <a
                      href="#"
                      className="relative w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full hover:bg-blue-900"
                    >
                      <svg
                        className="animate-spin h-5 w-5 text-white "
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth={4}
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </a>
                  ) : null}
                  {step.error ? (
                    <a
                      href="#"
                      className="relative w-8 h-8 flex items-center justify-center bg-red-600 rounded-full hover:bg-red-900"
                    >
                      <ExclamationIcon
                        className="w-5 h-5 text-white"
                        aria-hidden="true"
                      />
                    </a>
                  ) : null}
                  {!step.error && !step.InProgress ? (
                    <a
                      href="#"
                      className="relative w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full hover:bg-blue-900"
                    >
                      <CheckIcon
                        className="w-5 h-5 text-white"
                        aria-hidden="true"
                      />
                    </a>
                  ) : null}
                </div>
                <span
                  className={classNames(
                    'sm:col-span-1',
                    step.error ? 'text-red-700' : 'text-gray-700'
                  )}
                >
                  {step.error ? step.errorName : step.name}
                </span>
              </div>
            ) : (
              GetInactive(step)
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
