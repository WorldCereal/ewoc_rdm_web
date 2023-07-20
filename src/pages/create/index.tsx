import { Main } from '../../templates/Main';
import { Meta } from '../../layout/Meta';
import { useState } from 'react';
import DataCheckFlow from './datacheck';
import UploadInstructions from './uploadInstructions';
import UploadDataset from './uploadDataset';

interface IWorkflow {
  name: string;
  index: number;
}

export default function CreateDataset() {
  const [selectedIndex, setIndex] = useState(1);

  const steps: IWorkflow[] = [
    { name: 'dataCheck', index: 1 },
    { name: 'prepare', index: 2 },
    { name: 'upload', index: 3 },
  ];

  function getStep() {
    return steps[1] !== undefined && selectedIndex === steps[1].index ? (
      <UploadInstructions
        handleChange={(index) => {
          setIndex(index);
        }}
      />
    ) : (
      <UploadDataset
        handleChange={(index) => {
          setIndex(index);
        }}
      />
    );
  }

  return (
    <Main
      meta={
        <Meta
          title="WorldCereal Reference Data Module"
          description="WorldCereal Reference Data Module"
        />
      }
    >
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-16 px-1 sm:py-4 sm:px-6 lg:px-8 lg:flex lg:justify-between">
          <div className=" w-auto  lg:justify-left">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Upload Dataset
            </h2>
            <p className="mt-5 text-xl text-gray-400">
              Users can upload their dataset for training and validation.
            </p>
          </div>
        </div>
      </div>
      <div className=" pt-8 bg-white">
        {steps[0] !== undefined && selectedIndex === steps[0].index ? (
          <DataCheckFlow
            handleChange={(index) => {
              setIndex(index);
            }}
          />
        ) : (
          getStep()
        )}
      </div>
    </Main>
  );
}
