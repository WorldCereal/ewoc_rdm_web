import React, { useState } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';
import { ArchiveIcon } from '@heroicons/react/outline';

interface IFileUploadProps {
  disabled: boolean;
  onFileSelect: (file: File | undefined) => void;
  selectedFile: File | undefined;
  acceptedFile: string;
}

export function FileUpload(props: IFileUploadProps) {
  const [rejections, setRejections] = useState(
    undefined as FileRejection[] | undefined
  );

  return (
    <div className="mt-1 sm:mt-0 sm:col-span-2 max-w-lg w-full flex justify-center border-2 border-gray-300 border-dashed rounded-md">
      {props.selectedFile !== undefined ? (
        <div className=" w-full h-full py-10 grid grid-cols-2">
          <span className="col-span-1 py-1">{props.selectedFile.name}</span>
          <div className="col-span-1 flex justify-end mt-2">
            <ArchiveIcon
              href="#"
              onClick={() => {
                setRejections(undefined);
                props.onFileSelect(undefined);
              }}
              className="h-6 w-6 text-red-400 hover:text-red-600"
              aria-hidden="true"
            />
          </div>
        </div>
      ) : (
        <Dropzone
          disabled={props.disabled}
          accept={props.acceptedFile}
          maxFiles={1}
          maxSize={10000000} // 10Mb max. need to change after discussion.
          onDropRejected={(rejection) => {
            setRejections(rejection);
          }}
          onDrop={(acceptedFiles) => {
            props.onFileSelect(acceptedFiles[0] as File);
            setRejections(undefined);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="space-y-1 sm:grid sm:place-content-center text-center"
              {...getRootProps()}
            >
              {rejections !== undefined ? (
                <div className=" py-3 bg-gray-300 break-word">
                  <ol className="text-red-600 decimal">
                    {rejections.map((value) => (
                      <li className="text-sm" key={value.file.name + 'e'}>
                        {value.file.name}:{' '}
                        {value.errors.map((e) => e.code + ',')}
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <svg
                  className="mx-auto h-12 w-12 text-gray-900"
                  stroke="currentColor"
                  fill="none"
                  viewBox={
                    props.acceptedFile.toLowerCase() === '.zip'
                      ? '0 0 150 150'
                      : "0 0 48 48"
                  }
                  aria-hidden="true"
                >
                  {props.acceptedFile.toLowerCase() === '.zip' ? (
                    <path
                      d="M25.38,57h64.88V37.34H69.59c-2.17,0-5.19-1.17-6.62-2.6c-1.43-1.43-2.3-4.01-2.3-6.17V7.64l0,0H8.15 c-0.18,0-0.32,0.09-0.41,0.18C7.59,7.92,7.55,8.05,7.55,8.24v106.45c0,0.14,0.09,0.32,0.18,0.41c0.09,0.14,0.28,0.18,0.41,0.18 c22.78,0,58.09,0,81.51,0c0.18,0,0.17-0.09,0.27-0.18c0.14-0.09,0.33-0.28,0.33-0.41v-11.16H25.38c-4.14,0-7.56-3.4-7.56-7.56 V64.55C17.82,60.4,21.22,57,25.38,57L25.38,57z M35.34,67.55H57.6v5.1L43.31,87.57h14.83v5.48H33.96v-5.29L48.1,73H35.34V67.55 L35.34,67.55z M63.24,67.55h7.91v25.5h-7.91V67.55L63.24,67.55z M78,67.55H91.1c2.86,0,4.99,0.68,6.42,2.04 c1.42,1.36,2.13,3.29,2.13,5.8c0,2.58-0.78,4.59-2.33,6.04c-1.55,1.45-3.92,2.18-7.1,2.18H85.9v9.44H78V67.55L78,67.55z M85.9,78.45h1.94c1.53,0,2.61-0.27,3.22-0.8c0.62-0.53,0.93-1.2,0.93-2.03c0-0.8-0.27-1.48-0.81-2.04 c-0.53-0.56-1.54-0.84-3.03-0.84H85.9V78.45L85.9,78.45z M97.79,57h9.93c4.16,0,7.56,3.41,7.56,7.56v31.42 c0,4.15-3.41,7.56-7.56,7.56h-9.93v13.55c0,1.61-0.65,3.04-1.7,4.1c-1.06,1.06-2.49,1.7-4.1,1.7c-29.44,0-56.59,0-86.18,0 c-1.61,0-3.04-0.64-4.1-1.7c-1.06-1.06-1.7-2.49-1.7-4.1V5.85c0-1.61,0.65-3.04,1.7-4.1c1.06-1.06,2.53-1.7,4.1-1.7h58.72 C64.66,0,64.8,0,64.94,0c0.64,0,1.29,0.28,1.75,0.69h0.09c0.09,0.05,0.14,0.09,0.23,0.18l29.99,30.36c0.51,0.51,0.88,1.2,0.88,1.98 c0,0.23-0.05,0.41-0.09,0.65V57L97.79,57z M67.52,27.97V8.94l21.43,21.7H70.19c-0.74,0-1.38-0.32-1.89-0.78 C67.84,29.4,67.52,28.71,67.52,27.97L67.52,27.97z"
                      strokeWidth={1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
              )}
              <div className="text-sm text-gray-600 text-center">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload a file</span>
                  <input {...getInputProps()} />
                </label>
                <p className="pl-1">or drag and drop {props.acceptedFile}</p>
              </div>
              <p className="text-xs text-gray-500">file up to 10Mb</p>
            </div>
          )}
        </Dropzone>
      )}
    </div>
  );
}
