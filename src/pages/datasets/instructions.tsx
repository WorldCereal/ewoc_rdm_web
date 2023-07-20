import { PaperClipIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { classNames } from '../../utils/Helper';
import { FileUpload } from '../../pageUtil/fileUpload';
import { useJpex } from 'react-jpex';
import {
  ICollectionService,
  IUserDatasetService,
} from '../../interfaces/Interfaces';
import { DatasetEvent, UserDataset } from '../../models/UserDatasetModels';
import { ShowEvents } from '../../pageUtil/ShowEvents';
import { useRecoilState } from 'recoil';
import { showProgressState } from '../../services/state';

export default function PublicInstructions(props: {
  userDataset: UserDataset | undefined;
  downloadMetadata: () => void;
}) {
  const [agree, setAgree] = useState(false);
  const [file, setFile] = useState(undefined as File | undefined);
  const [events, setEvents] = useState(undefined as unknown as DatasetEvent[]);
  const [, setShowProgress] = useRecoilState(showProgressState);

  const jpex = useJpex();
  const userDatasetService =
    jpex.resolve<IUserDatasetService>('userDatasetService');
  const collectionService =
    jpex.resolve<ICollectionService>('collectionService');

  function ReadEvents() {
    userDatasetService
      .GetDatasetEvents(props.userDataset?.collectionId as string)
      .then((eventsData) => {
        setEvents(eventsData);
      });
  }

  useEffect(() => {
    ReadEvents();
  });
  function onMetadataExcelUpload(newFile: File | undefined) {
    setFile(newFile);
  }

  function onSubmitClick() {
    setShowProgress(true);
    const colId = props.userDataset?.collectionId as string;
    collectionService
      .UploadMetadata(file as File, colId)
      .then(() => {
        userDatasetService.DatasetSubmitPublicEvent(colId).then(() => {
          ReadEvents();
        });
      })
      .finally(() => {
        setShowProgress(false);
      });
  }

  return (
    <div className="px-4 py-5 sm:px-6 divide-gray-200">
      <div className="px-6">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-700">
            Instructions to make Dataset Public
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Making Datasets public will make the dataset available to other
            users following the rules of the license selected under step 3 (meta
            data collection).
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label htmlFor="about" className="block  font-medium text-gray-700">
              1. Geometry Validation
            </label>
            <p className="mt-2 text-sm text-gray-500">
              Check your data set on geometry issue. We have a dedicated
              protocol
              <a
                href="/Assess_spatial_accuracy.pdf"
                download="Protocol to assess spatial accuracy.pdf"
              >
                {' '}
                document{' '}
              </a>
              to detect suspicious errors and assess the spatial accuracy which
              will be used to update the confidence score. You can get assistance from{' '}
              <a href="mailto:moderator-worldcereal@iiasa.ac.at">
                moderator-worldcereal@iiasa.ac.at
              </a>{' '}
              in case required.
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label htmlFor="about" className="block  font-medium text-gray-700">
              2. Calculate Confidence Scores
            </label>
            <p className="mt-2 text-sm text-gray-500">
              Update the confidence scores according to WorldCereal rules for
              public dataset. Use{' '}
              <a
                href="/DataQuality_Calculator.xlsx"
                download="DataQuality_Calculator.xlsx"
              >
                {' '}
                this{' '}
              </a>{' '}
              calculator to determine the scores. The rules are explained in{' '}
              <a
                href="/ReferenceDatasetsConfidenceScoreCalculations.pdf"
                download="ReferenceDatasetsConfidenceScoreCalculations.pdf"
              >
                {' '}
                this{' '}
              </a>{' '}
              document. You can get assistance from{' '}
              <a href="mailto:moderator-worldcereal@iiasa.ac.at">
                moderator-worldcereal@iiasa.ac.at
              </a>{' '}
              in case required.
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label htmlFor="about" className="block  font-medium text-gray-700">
              3. Metadata collection
            </label>
            <p className="mt-2 text-sm text-gray-500">
              To complete the metadata more information is required on the
              provider/owner of the data, the desired license, details on the
              data, and the confidence. Download the metadata excel document and
              fill all the required data as per the instructions mentioned in
              the document. You can get assistance from{' '}
              <a href="mailto:moderator-worldcereal@iiasa.ac.at">
                moderator-worldcereal@iiasa.ac.at
              </a>{' '}
              in case required.
            </p>
          </div>
          <div className="sm:col-span-3">
            <dt className="text-sm font-medium text-gray-500">Attachments</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <PaperClipIcon
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-2 flex-1 w-0 truncate">
                      Metadata.xlsx
                    </span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      onClick={() => {
                        props.downloadMetadata();
                      }}
                      className="font-medium text-gray-600 hover:text-blue-500"
                      href="#"
                    >
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </div>
        {events === undefined ||
        events.length === 0 ||
        events[events.length - 1]?.canSubmit ? (
          <div>
            <div className="pt-4">
              <p className="pt-4 text-sm text-gray-500">
                Fill and upload the Metadata excel file to submit.
              </p>
              <FileUpload
                selectedFile={file}
                disabled={false}
                onFileSelect={onMetadataExcelUpload}
                acceptedFile=".xlsx"
              />
            </div>
            <p className="pt-4 text-sm text-gray-500">
              Submission will trigger an e-mail to the moderator who will review
              the meta data then get in touch to further clarify and complete
              the meta data if required and finally make the dataset public.
            </p>
            <div className="pt-4 relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  className=" h-4 w-4 text-blue-600 border-gray-300 rounded"
                  checked={agree}
                  onChange={() => {
                    if (file !== undefined) {
                      setAgree(!agree);
                    }
                  }}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agree" className="font-medium text-gray-700">
                  I hereby agree to make the dataset public according the
                  conditions of the selected license and that I have read and
                  followed all the instructions.
                </label>
              </div>
            </div>
            <div className="pt-5">
              <div className="flex justify-center">
                <button
                  type="submit"
                  onClick={onSubmitClick}
                  disabled={!agree}
                  className={classNames(
                    'focus:outline-none ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white',
                    agree
                      ? 'hover:bg-blue-700 bg-blue-600 '
                      : 'hover:bg-gray-400 bg-gray-300 '
                  )}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
      {ShowEvents(events)}
    </div>
  );
}
