import React, { useState } from 'react';

import { CheckIcon, ExclamationIcon } from '@heroicons/react/outline';
import Link from 'next/link';

import { classNames } from '../../utils/Helper';
import YesNoRadio from '../../pageUtil/yesnoRadio';
import MessageBox from '../../pageUtil/modalMessage';

interface IDataChecks {
  question: string;
  description: string;
  errorMsg: string;
  index: number;
}

interface ICheckStatus {
  index: number;
  status: string;
}

export default function DataCheckFlow(props: {
  handleChange: (index: number) => void;
}) {
  const [msg, setMsg] = useState({
    Title: '',
    Message: '',
    OpenState: false,
    Success: false,
  });
  const no = 'no';
  const yes = 'yes';
  const [status, setStatus] = useState([] as ICheckStatus[]);
  const steps: IDataChecks[] = [
    {
      question: 'Does your dataset have spatial geometry?',
      description: '',
      errorMsg:
        'Spatial geometry is mandatory for dataset to be uploaded successfully.',
      index: 1,
    },
    {
      question: 'Does your dataset cover years 2017 onwards?',
      description: '',
      errorMsg: 'Only datasets above 2017 are considered in this project.',
      index: 2,
    },
    {
      question: 'Does your dataset have information on observation time?',
      description: '(date or season/year or year)',
      errorMsg:
        'Only datasets with observation time are considered in this project.',
      index: 3,
    },
  ];

  function handleUserSelection(yesStatus: boolean, index: number) {
    const items = status.filter((x) => x.index !== index).slice();
    items.push({ status: yesStatus ? yes : no, index });
    setStatus(items);

    if (yesStatus) {
      return;
    }

    // @ts-ignore
    const step = steps.find((x) => x.index === index);
    if (step === undefined) {
      return;
    }
    setMsg({
      Title: 'Dataset Qualification Check Failed',
      Message: step.errorMsg,
      OpenState: true,
      Success: false,
    });
  }

  return (
    <div>
      <div className="text-lg sm:grid sm:place-content-center sm:pr-10">
        <h1 className="sm:grid sm:place-content-center">
          <div className="sm:flex sm:items-start">
            <span className="block text-2xl text-center font-bold tracking-tight text-gray-900 sm:text-3xl">
              Dataset Qualification Check
            </span>
            {status.filter((x) => x.status === yes).length === steps.length ? (
              <CheckIcon
                className="h-10 w-20 pl-6 text-green-600"
                aria-hidden="true"
              />
            ) : null}
            {status.find((x) => x.status === no) !== undefined ? (
              <ExclamationIcon
                className="h-10 w-20 pl-6 text-red-600"
                aria-hidden="true"
              />
            ) : (
              <div className="h-10 w-20 pl-6 " />
            )}
          </div>
        </h1>
        <p className="mt-4 max-w-4xl text-medium sm:text-xl text-gray-500 text-center">
          In order to make the dataset usable further in the processing chain,
          the datasets must adhere to certain formats and contain minimum
          attributes. Please answer the following questions to ease the dataset
          upload process
        </p>
      </div>

      <div className="sm:grid sm:place-content-center">
        <div className="mx-auto sm:pt-5  px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-0 ">
          {steps.map((value) => (
            <div
              key={`div${value.question}`}
              className="grid grid-cols-1 gap-0 sm:grid-cols-2"
            >
              <h1
                key={`h1${value.question}`}
                className="col-span-1 sm:flex py-3 sm:justify-end "
              >
                <div key={`div2${value.question}`}>
                  <span
                    key={`span${value.question}`}
                    className="mt-2 block text-xl text-center leading-8 font-medium tracking-tight text-gray-900 sm:text-xl"
                  >
                    {value.question}
                  </span>
                  <span
                    key={`span2${value.question}`}
                    className="block text-medium text-center font-medium tracking-tight text-gray-900 sm:text-medium"
                  >
                    {value.description}
                  </span>
                </div>
              </h1>
              <div
                key={`div3${value.question}`}
                className="col-span-1 sm:flex py-3 sm:justify-start sm:pl-12"
              >
                <YesNoRadio
                  key={`yesNoRadio${value.question}`}
                  handleSelection={(selection) =>
                    handleUserSelection(selection, value.index)
                  }
                  index={value.index}
                />
              </div>
            </div>
          ))}
        </div>
        <div
          className={classNames(
            ' flex flex-col border my-4 px-6 border-gray-300 overflow-auto ',
            status.find((x) => x.status === no) !== undefined
              ? 'max-h-auto bg-red-100 transition-max-height duration-700 ease-in-out'
              : 'h-0'
          )}
        >
          <div className="py-2">
            <ol>
              {status
                .filter((x) => x.status === no)
                .map((errorStatus) => (
                  <li key={`listItems${errorStatus.index}`}>
                    {steps.find((x) => x.index === errorStatus.index)?.errorMsg}
                  </li>
                ))}
            </ol>
          </div>
        </div>
        <div className="pb-6 px-6 border-gray-300">
          <div className="mt-4 flex md:ml-4  justify-end ">
            {status.find((x) => x.status === no) !== undefined ? (
              <div className="rounded-md mr-4 shadow ">
                <Link href="/collections">
                  <a
                    className="w-full flex items-center justify-center px-8 py-3 border-2 border-blue-300 text-base 
                  font-medium rounded-md text-white bg-blue-600 hover:border-blue-500 md:py-2 md:text-lg md:px-2"
                  >
                    Explore Collections
                  </a>
                </Link>
              </div>
            ) : (
              <div />
            )}
            {status.filter((x) => x.status === yes).length === steps.length ? (
              <button
                onClick={() => props.handleChange(2)}
                type="button"
                className="inline-flex mr-4 items-center px-4 py-2 border border-blue-300 bg-blue-600 text-white 
                rounded-md shadow-sm text-medium font-medium   hover:border-blue-500 "
              >
                Next
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={() => props.handleChange(3)}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-md shadow-sm text-medium font-medium  hover:border-gray-500 "
            >
              Skip to Upload
            </button>
          </div>
        </div>
      </div>
      {msg.OpenState ? (
        <div>
          <MessageBox
            Message={msg.Message}
            Title={msg.Title}
            OpenState={msg.OpenState}
            Success={msg.Success}
            OnClose={() => {
              setMsg({
                Title: '',
                Message: '',
                OpenState: false,
                Success: false,
              });
              if (msg.Success) {
                props.handleChange(2);
              }
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
