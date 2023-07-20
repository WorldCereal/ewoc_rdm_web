import { DatasetEvent, UserDataset } from "../../models/UserDatasetModels";
import React, { useState } from "react";
import { classNames } from "../../utils/Helper";
import { EventType, EventTypeMethods } from "../../utils/AppConfig";
import { ShowEvents } from "../../pageUtil/ShowEvents";
import { useJpex } from "react-jpex";
import {
  EventInputs,
  ICollectionService,
  IUserDatasetService,
} from "../../interfaces/Interfaces";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";

export default function AdminPage(props: {
  userDataset: UserDataset | undefined;
}) {
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(undefined as unknown as DatasetEvent[]);
  const [error, setError] = useState("");
  const [skip, setSkip] = useState("" as unknown as number);
  const [count, setCount] = useState("" as unknown as number);

  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm<EventInputs>({
    mode: "onChange",
  });

  const jpex = useJpex();
  const userDatasetService =
    jpex.resolve<IUserDatasetService>("userDatasetService");
  const collectionService =
    jpex.resolve<ICollectionService>("collectionService");

  function ReadEvents() {
    userDatasetService
      .GetDatasetEvents(props.userDataset?.collectionId as string)
      .then((eventsData) => {
        setEvents(eventsData);
        setLoading(false);
      });
  }

  function handleDownload() {
    let skipCount = 0;
    let maxCount = 0;
    if (skip !== undefined) {
      skipCount = skip;
    }
    if (count !== undefined) {
      maxCount = count;
    }
    collectionService
      .DownloadDataset(
        props.userDataset?.collectionId as string,
        skipCount,
        maxCount
      )
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", props.userDataset?.collectionId + ".zip");
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  }

  function onSubmitClick(data: EventInputs) {
    const colId = props.userDataset?.collectionId as string;
    setLoading(true);
    setError("");
    collectionService
      .SubmitEvent(colId, [data.message], data.eventType)
      .then(() => {
        clearErrors();
        if (
          EventType[data.eventType] ===
          EventType[EventType.Public as unknown as number]
        ) {
          userDatasetService
            .DatasetMakePublic(props.userDataset?.id as string)
            .then((response) => {
              console.log(response);
            })
            .catch((reason: AxiosError<{ additionalInfo: string }>) => {
              setError(
                "Status " +
                  reason.response?.status +
                  ".  " +
                  reason.response?.data
              );
            })
            .finally(() => {
              ReadEvents();
            });
        } else {
          ReadEvents();
        }
      });
  }

  return (
    <div className="px-4 py-5 sm:px-6 divide-gray-200">
      <h3 className="text-lg leading-6 font-medium text-gray-700">
        Admin Page for Dataset: {props.userDataset?.collectionId}
      </h3>
      <div className="mt-6 grid grid-cols-1  sm:grid-cols-8 md:gap-x-4 ">
        <label className="block text-sm font-medium text-gray-700 md:mt-px md:pt-2 col-span-2">
          Download Dataset for review
        </label>
        <input
          type="number"
          value={skip}
          onChange={(e) => {
            setSkip(parseInt(e.target.value));
          }}
          placeholder="Skip"
          id="skipCount"
          autoComplete="skipCount"
          className="block max-w-lg w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
        />
        <input
          type="number"
          placeholder="Max Items"
          value={count}
          onChange={(e) => {
            setCount(parseInt(e.target.value));
          }}
          id="maxCount"
          autoComplete="maxCount"
          className="block max-w-lg w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
        />
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex mr-4 items-center px-4 py-2 border border-blue-300 bg-blue-600 text-white 
                rounded-md shadow-sm text-medium font-medium hover:border-blue-500 "
        >
          Download
        </button>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1">
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <div className="inline-flex">
            <label
              htmlFor="eventType"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Event Type
            </label>
          </div>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <select
              id="eventType"
              autoComplete="eventType"
              {...register("eventType", {
                required: true,
                shouldUnregister: true,
              })}
              className={classNames(
                "",
                " max-w-lg block focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:max-w-2xs sm:text-sm border-gray-300 rounded-md",
                "focus:ring-blue-500 focus:border-blue-500"
              )}
            >
              {EventTypeMethods.map((value, index) => (
                <option
                  key={"option" + value.name}
                  id={"option" + index}
                  value={value.value}
                >
                  {value.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Message
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <input
              {...register("message", {
                required: true,
                shouldUnregister: true,
              })}
              type="text"
              id="message"
              autoComplete="message"
              className={classNames(
                "",
                " max-w-lg block focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:max-w-2xs sm:text-sm border-gray-300 rounded-md",
                errors.eventType
                  ? "focus:ring-red-500 focus:border-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
              )}
            />
          </div>
        </div>
        <div className="pt-4 relative flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agree"
              name="agree"
              type="checkbox"
              className=" h-4 w-4 text-blue-600 border-gray-300 rounded"
              checked={agree}
              onChange={() => {
                setAgree(!agree);
              }}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agree" className="font-medium text-gray-700">
              I hereby confirm that I am the admin who is reviewing the dataset.
            </label>
          </div>
        </div>
      </div>
      <div className="mt-4 flex md:ml-4  justify-end ">
        <button
          type="submit"
          onClick={handleSubmit(onSubmitClick)}
          className="inline-flex mr-4 items-center px-4 py-2 border border-blue-300 bg-blue-600 text-white 
                rounded-md shadow-sm text-medium font-medium hover:border-blue-500 "
        >
          Submit
        </button>
      </div>
      {error !== "" ? (
        <div>
          <span className="text-red-500">Error Response: {error}</span>
        </div>
      ) : null}
      {!loading ? ShowEvents(events) : <div>Loading...</div>}
    </div>
  );
}
