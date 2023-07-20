import React, { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import { UserDataset } from '../../models/UserDatasetModels';
import {
  DatasetState,
  TypeOfObservationMethodEnum,
  TypeOfObservationMethods,
} from '../../utils/AppConfig';
import { classNames } from '../../utils/Helper';
import { FormInputs, IUserDatasetService } from '../../interfaces/Interfaces';
import { useForm } from 'react-hook-form';
import { useJpex } from 'react-jpex';
import { FileUpload } from '../../pageUtil/fileUpload';
import NavProgress from '../../pageUtil/navProgress';
import InfoIcon from '../../pageUtil/PopOver';
import { useRecoilState } from 'recoil';
import { forceUpdateUserDsState } from '../../services/state';
import Link from 'next/link';

interface DatasetDetailsViewProps {
  dataset: UserDataset;
  makeDatasetPublic: () => void;
  showValErrors: () => void;
}

export default function DatasetDetailsView(props: DatasetDetailsViewProps) {
  const [file, setFile] = useState(undefined as File | undefined);
  const [forceUpdate, setForceUpdate] = useRecoilState(forceUpdateUserDsState);
  const {
    register,
    formState: { errors },
    setValue,
    setError,
    handleSubmit,
    clearErrors,
  } = useForm<FormInputs>({
    mode: 'onChange',
  });

  const [editEnable, setEditEnable] = useState(false);
  const jpex = useJpex();
  const userDatasetService =
    jpex.resolve<IUserDatasetService>('userDatasetService');

  function setDataFromProps() {
    setValue('title', props.dataset.title);
    setValue('collectionId', props.dataset.collectionId);
    setValue('ctConf', props.dataset.confidenceCropType);
    setValue('lcConf', props.dataset.confidenceLandCover);
    setValue('irrConf', props.dataset.confidenceIrrigationType);
    setValue(
      'obsMethod',
      TypeOfObservationMethodEnum[
        props.dataset.typeOfObservationMethod
      ] as unknown as TypeOfObservationMethodEnum
    );
  }

  useEffect(() => {
    clearErrors();
    if (props.dataset === undefined) {
      return;
    }
    setDataFromProps();
    if (
      props.dataset !== undefined &&
      props.dataset.state ===
        (DatasetState[
          DatasetState.ValidationFailedUploadRequired
        ] as unknown as DatasetState)
    ) {
      setEditEnable(true);
    } else {
      setEditEnable(false);
    }
  }, [props.dataset]);

  if (props.dataset === undefined) {
    return <div>loading...</div>;
  }

  const onSubmit = (data: FormInputs) => {
    if (file === undefined) {
      setError('file', { type: 'focus' }, { shouldFocus: true });
      return;
    } else {
      clearErrors('file');
    }
    setEditEnable(false);
    userDatasetService
      .UploadNewDataset(
        file,
        data.title,
        data.collectionId,
        data.obsMethod,
        data.lcConf,
        data.ctConf,
        data.irrConf
      )
      .then(() => {
        setFile(undefined);
      })
      .catch((error) => {
        console.log('error', error);
      })
      .finally(() => {
        if (!forceUpdate) {
          setForceUpdate(!forceUpdate);
        }
      });
  };

  function editStatusChanged(status: boolean) {
    // console.log('props.dataset', props.dataset);
    if (!status) {
      setDataFromProps();
    }
    setEditEnable(status);
  }

  function handleFileSelected(newFile: File | undefined) {
    setFile(newFile);
    clearErrors('file');
  }

  return (
    <div>
      <form
        className="space-y-8 divide-y px-4 py-5 sm:px-6 divide-gray-200"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="flex justify-start">
            <NavProgress state={props.dataset.state} />
          </div>
          <div className="flex justify-end">
            {props.dataset.state ===
            (DatasetState[
              DatasetState.ValidationFailedUploadRequired
            ] as unknown as DatasetState) ? (
              <button
                onClick={() => {
                  props.showValErrors();
                }}
                type="button"
                className=" px-4 hover:bg-red-700 focus:outline-none bg-red-600 ml-3 inline-flex justify-center border border-transparent shadow-sm text-sm font-medium rounded-md text-white"
              >
                Show Errors
              </button>
            ) : null}

            {props.dataset.state !==
            (DatasetState[
              DatasetState.PublicDataset
            ] as unknown as DatasetState) ? (
              <button
                onClick={() => {
                  userDatasetService
                    .DeleteUserDataset(props.dataset.id)
                    .then(() => {
                      setForceUpdate(!forceUpdate);
                    });
                }}
                type="button"
                className=" px-4 hover:bg-red-700 focus:outline-none bg-red-600 ml-3 inline-flex justify-center border border-transparent shadow-sm text-sm font-medium rounded-md text-white"
              >
                Delete
              </button>
            ) : null}

            {props.dataset.state ===
            (DatasetState[
              DatasetState.AvailableInModule
            ] as unknown as DatasetState) ? (
              <button
                onClick={() => {
                  props.makeDatasetPublic();
                }}
                type="button"
                className=" px-4 hover:bg-blue-700 focus:outline-none bg-blue-600 ml-3 inline-flex justify-center border border-transparent shadow-sm text-sm font-medium rounded-md text-white"
              >
                Make public
              </button>
            ) : null}
            <span className="text-sm font-medium text-gray-700 px-4 ">
              Edit
            </span>
            <Switch
              checked={editEnable}
              onChange={(status) => {
                if (
                  props.dataset !== undefined &&
                  props.dataset.state !==
                    (DatasetState[
                      DatasetState.PublicDataset
                    ] as unknown as DatasetState)
                ) {
                  editStatusChanged(status);
                }
              }}
              className={classNames(
                editEnable ? 'bg-blue-600' : 'bg-gray-200',
                ' relative inline-flex flex-shrink-1 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-400 '
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  editEnable ? 'translate-x-5' : 'translate-x-0',
                  ' pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200'
                )}
              />
            </Switch>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              <Link href={'/datasets/' + props.dataset.id}>Title</Link>
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                readOnly={!editEnable}
                id="title"
                {...register('title', {
                  required: true,
                  shouldUnregister: true,
                })}
                autoComplete="title"
                className={classNames(
                  editEnable ? '' : 'bg-gray-200',
                  ' block max-w-lg w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                  errors.title
                    ? 'focus:ring-red-500 focus:border-red-500'
                    : 'focus:ring-blue-500 focus:border-blue-500'
                )}
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="collectionId"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Collection ID
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                readOnly
                id="collectionId"
                {...register('collectionId', {
                  required: true,
                  shouldUnregister: true,
                  minLength: 3,
                  maxLength: 20,
                  pattern: /^[a-zA-Z0-9]+$/i,
                })}
                autoComplete="collectionId"
                className="bg-gray-200 block max-w-lg w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <div className="inline-flex">
              <label
                htmlFor="typeObsMethod"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Type of Observation Method
              </label>
              <InfoIcon
                name="Based on classification and validation work we have following Observation methods"
                description="1.FieldObservationSurvey (observation within the field).
2.FieldObservationSurveyWindshield (observation from the road).
3.AutomatedClassification (existing classified map).
4.ClassificationValidatedCrowd (crowd source campaigns on classified data).
5.ClassificationValidatedExpert (expert campaigns on classified data).
6.FormalDeclaration (parcel registrations).
7.Unknown."
              />
            </div>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <select
                disabled={!editEnable}
                id="typeObsMethod"
                autoComplete="typeObsMethod"
                {...register('obsMethod', {
                  required: true,
                  shouldUnregister: true,
                })}
                className={classNames(
                  editEnable ? '' : 'bg-gray-200',
                  ' max-w-lg block focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:max-w-2xs sm:text-sm border-gray-300 rounded-md',
                  errors.obsMethod
                    ? 'focus:ring-red-500 focus:border-red-500'
                    : 'focus:ring-blue-500 focus:border-blue-500'
                )}
              >
                {TypeOfObservationMethods.map((value, index) => (
                  <option
                    key={'option' + value.name}
                    id={'option' + index}
                    value={value.value}
                  >
                    {value.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <div className="inline-flex">
              <label
                htmlFor="lcConf"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Land Cover Type Confidence
              </label>
              <InfoIcon
                name="Land Cover Data Quality"
                description="User must enter a value between 50-100 based on his/her opinion on the quality of the data for landcover mapping."
              />
            </div>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                readOnly={!editEnable}
                id="lcConf"
                {...register('lcConf', {
                  min: 0,
                  max: 100,
                  required: true,
                  shouldUnregister: true,
                })}
                autoComplete="lcConf"
                className={classNames(
                  editEnable ? '' : 'bg-gray-200',
                  ' block max-w-lg w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                  errors.lcConf
                    ? 'focus:ring-red-500 focus:border-red-500'
                    : 'focus:ring-blue-500 focus:border-blue-500'
                )}
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <div className="inline-flex">
              <label
                htmlFor="ctConfId"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Crop Type Confidence
              </label>
              <InfoIcon
                name="Crop type Data Quality"
                description="User must enter a value between 50-100 based on his/her opinion on the quality of the data for crop type mapping."
              />
            </div>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                readOnly={!editEnable}
                id="ctConf"
                {...register('ctConf', {
                  required: true,
                  shouldUnregister: true,
                  min: 0,
                  max: 100,
                })}
                autoComplete="ctConf"
                className={classNames(
                  editEnable ? '' : 'bg-gray-200',
                  ' block max-w-lg w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                  errors.ctConf
                    ? 'focus:ring-red-500 focus:border-red-500'
                    : 'focus:ring-blue-500 focus:border-blue-500'
                )}
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <div className="inline-flex">
              <label
                htmlFor="irrConfId"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Irrigation Type Confidence
              </label>
              <InfoIcon
                name="Irrigation type Data Quality"
                description="User must enter a value between 50-100 based on his/her opinion on the quality of the data for irrigation and rainfed mapping."
              />
            </div>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                aria-describedby="percent"
                readOnly={!editEnable}
                id="irrConf"
                {...register('irrConf', {
                  required: true,
                  shouldUnregister: true,
                  min: 0,
                  max: 100,
                })}
                autoComplete="irrConf"
                className={classNames(
                  editEnable ? '' : 'bg-gray-200',
                  ' block max-w-lg w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
                  errors.irrConf
                    ? 'focus:ring-red-500 focus:border-red-500'
                    : 'focus:ring-blue-500 focus:border-blue-500'
                )}
              />
            </div>
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="fileUpload"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Upload Shape File
          </label>
          <div
            className={classNames(
              !editEnable
                ? 'bg-gray-200 '
                : '' + (errors.file ? 'bg-red-200' : ''),
              'block max-w-lg w-screen'
            )}
          >
            <FileUpload
              selectedFile={file}
              disabled={!editEnable}
              onFileSelect={handleFileSelected}
              acceptedFile=".zip"
            />
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              disabled={!editEnable}
              type="button"
              className={classNames(
                editEnable
                  ? 'hover:bg-gray-50 text-gray-700'
                  : 'bg-gray-200 text-white',
                ' bg-white py-2 px-4 border  border-gray-300 rounded-md shadow-sm text-sm font-medium '
              )}
            >
              Cancel
            </button>
            <button
              disabled={!editEnable}
              type="submit"
              className={classNames(
                editEnable ? 'hover:bg-blue-700 bg-blue-600' : 'bg-gray-200',
                'ml-3 inline-flex justify-center py-2 px-4 sm:mr-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white'
              )}
            >
              Submit
            </button>
          </div>
        </div>
        <div>
          {props.dataset.state ===
          (DatasetState[
            DatasetState.AvailableInModule
          ] as unknown as DatasetState) ? (
            <p className="text-medium sm:text-medium text-gray-500 text-center">
              WorldCereal supports the general movement towards data sharing and
              open science. Please check this link to learn more about
              WorldCereal’s view on opening reference data to society{' '}
              <a href="https://esa-worldcereal.org/en/situ-data-global-crop-mapping">
                (https://esa-worldcereal.org/en/situ-data-global-crop-mapping)
              </a>
              . In case you consider making your dataset public in the
              WorldCereal you can indicate this by pressing the &apos;Make
              public&lsquo; button.
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
