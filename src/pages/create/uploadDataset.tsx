/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useJpex } from "react-jpex";
import {
  FormInputs,
  ICollectionService,
  IUserDatasetService,
} from "../../interfaces/Interfaces";
import { UserDataset } from "../../models/UserDatasetModels";
import { DatasetState, TypeOfObservationMethods } from "../../utils/AppConfig";
import { useRouter } from "next/router";
import { canStartTimer } from "../../pageUtil/helper";
import { FileUpload } from "../../pageUtil/fileUpload";
import NavProgress from "../../pageUtil/navProgress";
import InfoIcon from "../../pageUtil/PopOver";
import { useRecoilState } from "recoil";
import { forceUpdateUserDsState } from "../../services/state";
import { AxiosError } from "axios";
import { ExclamationIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function UploadDataset(props: {
  handleChange: (index: number) => void;
}) {
  const [file, setFile] = useState(undefined as File | undefined);
  const [formInputs, setFormInputs] = useState(
    undefined as FormInputs | undefined
  );
  const [currentDs, setCurrentDs] = useState(
    undefined as UserDataset | undefined
  );
  const [uploadError, setUploadError] = useState("");
  const [forceUpdate, setForceUpdate] = useRecoilState(forceUpdateUserDsState);
  const router = useRouter();

  const jpex = useJpex();
  const collectionService =
    jpex.resolve<ICollectionService>("collectionService");
  const userDatasetService =
    jpex.resolve<IUserDatasetService>("userDatasetService");

  const {
    register,
    formState: { errors },
    setValue,
    setError,
    handleSubmit,
    clearErrors,
  } = useForm<FormInputs>({
    mode: "onChange",
  });

  function DatasetFileSelected(newFile: File | undefined) {
    setFile(newFile);
    clearErrors("file");
  }

  function getUserDataset(id: string) {
    userDatasetService
      .GetUserDataset(id)
      .then((data) => {
        setCurrentDs(data);
        if (canStartTimer(data.state as unknown as DatasetState)) {
          setTimeout(() => {
            getUserDataset(data.id);
          }, 5000);
        } else {
          if (!forceUpdate) {
            setForceUpdate(true);
          }
          router.push(router.basePath + "datasets/" + data.id).then((r) => {
            console.log(r);
          });
        }
      })
      .catch((reason) => {
        console.log("reason", reason);
      });
  }

  const onSubmit = (data: FormInputs) => {
    if (file === undefined) {
      setError("file", { type: "focus" }, { shouldFocus: true });
      return;
    } else {
      clearErrors("file");
    }

    setUploadError("");
    setFormInputs(data);
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
      .then((res) => {
        setCurrentDs(res);
        if (canStartTimer(res.state as unknown as DatasetState)) {
          setTimeout(() => {
            getUserDataset(res.id);
          }, 5000);
        }
      })
      .catch((reason: AxiosError<{ additionalInfo: string }>) => {
        setUploadError(
          "Upload Failed with error " +
            reason.response?.status +
            ".  " +
            reason.response?.data
        );
      });
  };

  function validateColId(value: string) {
    if (value === "") {
      return;
    }
    const res = value
      .toLowerCase()
      .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>/\s{}\[\]\\]/gi, "");
    if (res === "") {
      return;
    }
    collectionService.IsColNameAvailable(res).then((status) => {
      if (!status) {
        setError("collectionId", { type: "focus" }, { shouldFocus: true });
        setValue("collectionId", res + "2");
      } else {
        setValue("collectionId", res);
        clearErrors("collectionId");
      }
    });
  }

  if (uploadError !== "") {
    return (
      <div className="text-lg sm:grid sm:place-content-center sm:pr-10">
        <div className="flex justify-center">
          <ExclamationIcon
            className="h-20 w-20 text-red-600 flex justify-center"
            aria-hidden="true"
          />
        </div>
        <h1 className="sm:grid sm:place-content-center ">
          <span className="block text-xl text-center font-medium tracking-tight text-gray-700 sm:text-xl">
            {uploadError}
          </span>
        </h1>
        <div className="rounded-md mr-4 py-8 ">
          <Link href="/collections">
            <a
              className="w-full flex items-center justify-center px-8 py-3 text-base 
                  font-medium  text-blue-600  md:py-2 md:text-lg md:px-2"
            >
              Explore Collections
            </a>
          </Link>
        </div>
      </div>
    );
  }

  if (formInputs !== undefined && currentDs === undefined) {
    return (
      <div className="text-lg sm:grid sm:place-content-center sm:pr-10">
        <div className="flex justify-center">
          <svg
            className="animate-spin h-15 w-15 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
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
        </div>
        <h1 className="sm:grid sm:place-content-center ">
          <span className="block text-2xl text-center font-bold tracking-tight text-gray-700 sm:text-3xl">
            Uploading...
          </span>
        </h1>
      </div>
    );
  }

  if (formInputs !== undefined && currentDs !== undefined) {
    return (
      <div className="text-lg sm:grid sm:place-content-center sm:pr-10">
        <div className="flex justify-center">
          <NavProgress state={currentDs.state as unknown as DatasetState} />
        </div>
        <div className="flex py-2 mt-5 justify-center">
          <svg
            className="animate-spin h-8 w-8 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        <h1 className="sm:grid sm:place-content-center ">
          <span className="block text-2xl text-center font-bold tracking-tight text-gray-900 sm:text-3xl">
            Processing...
          </span>
        </h1>
        <p className="mt-2 max-w-4xl text-medium sm:text-xl text-gray-500 text-center">
          WorldCereal supports the general movement towards data sharing and
          open science. Please check this link to learn more about WorldCereal’s
          view on opening reference data to society{" "}
          <a href="https://esa-worldcereal.org/en/situ-data-global-crop-mapping">
            (https://esa-worldcereal.org/en/situ-data-global-crop-mapping)
          </a>
          .
        </p>
        <p className="mt-2 max-w-4xl text-medium sm:text-xl text-gray-500 text-center">
          In case you consider making your dataset public in the WorldCereal you
          can indicate this once your data set has been uploaded and
          successfully validated..
        </p>
      </div>
    );
  }

  return (
    <div className="text-lg sm:grid sm:place-content-center sm:pr-10">
      <h1 className="sm:grid sm:place-content-center ">
        <span className="block text-2xl text-center font-bold tracking-tight text-gray-800 sm:text-3xl">
          Dataset Upload
        </span>
      </h1>
      <p className="mt-2 max-w-4xl text-medium sm:text-xl text-gray-500 text-center">
        Make sure you have followed all the{" "}
        <a
          onKeyDown={() => props.handleChange(2)}
          onClick={() => props.handleChange(2)}
        >
          instructions
        </a>{" "}
        to prepare the dataset.
      </p>
      <p className="max-w-4xl text-medium sm:text-xl text-gray-500 text-center">
        Next please give the following minimum meta data.
      </p>
      <form
        className="space-y-8 divide-y divide-gray-200 px-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-4">
          <div className="sm:col-span-4">
            <label
              htmlFor="title"
              className="block text-sm font-xl font-bold text-gray-700"
            >
              Title
            </label>
            {errors.title ? (
              <p className="mt-2 text-sm text-red-500">
                Title to easily identify the data set. - required.
              </p>
            ) : (
              <p className="mt-2 text-sm text-gray-500">
                Title to easily identify the data set.
              </p>
            )}

            <div className="mt-1">
              <input
                {...register("title", {
                  required: true,
                  shouldUnregister: true,
                })}
                type="text"
                name="title"
                id="title"
                autoComplete="title"
                className="block max-w-lg w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <div className="inline-flex">
              <label
                htmlFor="collectionId"
                className="block text-sm font-xl font-bold text-gray-700"
              >
                Collection Id
              </label>
              <InfoIcon
                name="Collection Id is used to uniquely identify the dataset across the system"
                description="This can be copied from the curated file name without the file extensions. After pasting here unsupported characters will be removed."
              />
            </div>
            {errors.collectionId ? (
              <p id="collectionIdE" className="mt-2 text-sm text-red-500">
                Only alphanumeric lower case name, unique across all datasets
                allowed. Min 3 Max 20.
              </p>
            ) : (
              <p id="collectionId" className="mt-2 text-sm text-gray-500">
                Min 3 Max 20 alphanumeric lower case name, unique across all
                datasets.
              </p>
            )}
            <div className="mt-1">
              <input
                type="text"
                {...register("collectionId", {
                  required: true,
                  shouldUnregister: true,
                  minLength: 3,
                  maxLength: 20,
                  pattern: /^[a-zA-Z0-9]+$/i,
                })}
                onBlur={(e) => {
                  validateColId(e.target.value);
                }}
                name="collectionId"
                id="collectionId"
                autoComplete="collectionId"
                className="block max-w-lg w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <div className="inline-flex">
              <label
                htmlFor="obsMethod"
                className="block text-sm font-bold text-center py-1 text-gray-700"
              >
                Type Of Observation Method
              </label>
              <InfoIcon
                name="In WorldCereal we distinguish the following observation methods"
                description="1.FieldObservationSurvey (observation within the field).
2.FieldObservationSurveyWindshield (observation from the road).
3.AutomatedClassification (existing classified map).
4.ClassificationValidatedCrowd (crowd source campaigns on classified data).
5.ClassificationValidatedExpert (expert campaigns on classified data).
6.FormalDeclaration (parcel registrations).
7.Unknown."
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Select observation method used to collect the data.
            </p>
            <div className="mt-1">
              <select
                id="obsMethod"
                autoComplete="obsMethod"
                className="block max-w-lg w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                {...register("obsMethod", {
                  required: true,
                  shouldUnregister: true,
                })}
              >
                {TypeOfObservationMethods.map((value, index) => (
                  <option
                    key={`uOption${value.name}`}
                    id={`option${index}`}
                    value={value.value}
                  >
                    {value.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-4">
            <div className="inline-flex">
              <label
                htmlFor="lcConf"
                className="block text-sm font-xl font-bold text-gray-700"
              >
                Land Cover Type Confidence
              </label>
              <InfoIcon
                name="Land Cover Type Data Quality"
                description="User must enter a value between 50-100 based on his/her opinion on the quality of the data for landcover mapping."
              />
            </div>
            {errors.lcConf ? (
              <p id="lcConfE" className="mt-2 text-sm text-red-500">
                Confidence score for land cover types between 50-100, 0 if not
                applicable
              </p>
            ) : (
              <p id="lcConf" className="mt-2 text-sm text-gray-500">
                Confidence score for land cover types between 50-100, 0 if not
                applicable
              </p>
            )}
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="number"
                defaultValue="0"
                id="lcConfId"
                {...register("lcConf", {
                  required: true,
                  shouldUnregister: true,
                  min: 0,
                  max: 100,
                })}
                autoComplete="lcConf"
                className="block max-w-lg w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <div className="inline-flex">
              <label
                htmlFor="ctConfId"
                className="block text-sm font-xl font-bold text-gray-700"
              >
                Crop Type Confidence
              </label>
              <InfoIcon
                name="Crop Type Data Quality"
                description="User must enter a value between 50-100 based on his/her opinion on the quality of the data for crop type mapping."
              />
            </div>
            {errors.ctConf ? (
              <p id="ctConfE" className="mt-2 text-sm text-red-500">
                Confidence score for crop types between 50-100, 0 if not
                applicable
              </p>
            ) : (
              <p id="ctConf" className="mt-2 text-sm text-gray-500">
                Confidence score for crop types between 50-100, 0 if not
                applicable
              </p>
            )}
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                id="ctConfId"
                defaultValue="0"
                type="number"
                {...register("ctConf", {
                  required: true,
                  shouldUnregister: true,
                  min: 0,
                  max: 100,
                })}
                autoComplete="ctConf"
                className="block max-w-lg w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <div className="inline-flex">
              <label
                htmlFor="irrConfId"
                className="block text-sm font-xl font-bold text-gray-700"
              >
                Irrigation Type Confidence
              </label>
              <InfoIcon
                name="Irrigation Type Data Quality"
                description="User must enter a value between 50-100 based on his/her opinion on the quality of the data for irrigation and rainfed mapping."
              />
            </div>
            {errors.irrConf ? (
              <p id="irrConfE" className="mt-2 text-sm text-red-500">
                Confidence score for irrigation types between 50-100, 0 if not
                applicable
              </p>
            ) : (
              <p id="irrConf" className="mt-2 text-sm text-gray-500">
                Confidence score for irrigation types between 50-100, 0 if not
                applicable
              </p>
            )}
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                id="irrConfId"
                defaultValue="0"
                type="number"
                {...register("irrConf", {
                  required: true,
                  shouldUnregister: true,
                  min: 0,
                  max: 100,
                })}
                autoComplete="irrConf"
                className="block max-w-lg w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="sm:col-span-4">
            <label
              htmlFor="uploadFile"
              className="block text-sm font-xl font-bold text-gray-700"
            >
              Upload File
            </label>
            {errors.file ? (
              <p id="fileConfE" className="mt-2 text-sm text-red-500">
                Zip Shape Files and upload.
              </p>
            ) : (
              <p id="fileConf" className="mt-2 text-sm text-gray-500">
                Zip Shape Files and upload.
              </p>
            )}
            <FileUpload
              selectedFile={file}
              disabled={false}
              onFileSelect={DatasetFileSelected}
              acceptedFile=".zip"
            />
          </div>
        </div>
        <div className="pb-6 border-t-2 mt-4 border-gray-300">
          <p id="submitPara" className="mt-2 text-sm text-gray-500">
            Submitted dataset will be saved as a private dataset under the user
            account and not shared with
          </p>
          <p id="submitPara" className="text-sm text-gray-500">
            anyone. The user can choose to make it public after successful
            upload.
          </p>
          <div className="mt-4 flex md:ml-4  justify-end ">
            <button
              onClick={() => props.handleChange(2)}
              type="button"
              className="inline-flex mr-4 items-center px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-md shadow-sm text-medium font-medium  hover:border-gray-500 "
            >
              Back to Instructions
            </button>
            <button
              type="submit"
              className="inline-flex mr-4 items-center px-4 py-2 border border-blue-300 bg-blue-600 text-white 
                rounded-md shadow-sm text-medium font-medium hover:border-blue-500 "
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
