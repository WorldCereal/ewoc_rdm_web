import React from 'react';

export default function UploadInstructions(props: {
  handleChange: (index: number) => void;
}) {
  return (
    <div className="text-lg sm:grid sm:place-content-center sm:pr-10">
      <h1 className="sm:grid sm:place-content-center ">
        <span className="block text-2xl text-center font-bold tracking-tight text-gray-900 sm:text-3xl">
          Dataset Preparation
        </span>
      </h1>
      <p className="mt-4 max-w-4xl text-medium sm:text-xl text-gray-500 text-center">
        Prepare the dataset according to below mentioned steps to upload
        successfully.
      </p>
      <div className="mt-6 px-6 max-w-full break-words sm:pl-12 sm:max-w-4xl ">
        <span className="block pb-3 text-xl text-gray-600 sm:text-medium">
          1. Prepare Data in Desired Format.
        </span>
        <ul className="list-disc  px-12  text-gray-600 sm:text-medium">
          <li>Store your data into a shape file (or raster*).</li>
          <li>Use co-ordinate system EPSG 4326 (WGS_84 lat/lon).</li>
          <li>Use English language.</li>
          <li>
            Use the prescribed filename. See{' '}
            <a
              href="/WorldCereal_FileFormat_V1.xlsx"
              download="WorldCereal_FileFormat_V1.xlsx"
            >
              {' '}
              this
            </a>{' '}
            document for guidelines.
          </li>
        </ul>

        <span className="block pt-6 pb-3 text-xl text-gray-600 sm:text-medium">
          2. Minimum Required Information.
        </span>
        <ul className="list-disc  px-12  text-gray-600 sm:text-medium">
          <li>
            Add the required attributes to the shapefile using the correct names
            and data types (text, integer, double).
          </li>
          <li>
            See{' '}
            <a
              href="/WorldCereal_FileFormat_V1.xlsx"
              download="WorldCereal_FileFormat_V1.xlsx"
            >
              {' '}
              this
            </a>{' '}
            document for detailed description.
          </li>
        </ul>
        <span className="block pt-6 pb-3 text-xl text-gray-600 sm:text-medium">
          3. Validity Time.
        </span>
        <ul className="list-disc  px-12  text-gray-600 sm:text-medium">
          <li>
            See
            <a
              href="/DerivingValidityTime.pdf"
              download="DerivingValidityTime.pdf"
            >
              {' '}
              this
            </a>{' '}
            document to check how to derive a proper observation date.
          </li>
        </ul>
        <span className="block pt-6 pb-3 text-xl text-gray-600 sm:text-medium">
          4. Map to Standard Legends.
        </span>
        <ul className="list-disc break-words px-12  text-gray-600 sm:text-medium">
          <li>
            Populate the attributes LC, CT and IRR after mapping to the
            WorldCereal legends. See
            <a
              href="/WorldCereal_LC_CT_IRR_legends_V1.xlsx"
              download="WorldCereal_LC_CT_IRR_legends_V1.xlsx"
            >
              {' '}
              this{' '}
            </a>
            document for guidelines on mapping.
          </li>
        </ul>
        <span className="block pt-6 pb-3 text-gray-600 sm:text-medium">
          Note: raster* files needs additional steps as metioned in{' '}
          <a
            href="/RasterHarmonizationInstructions.pdf"
            download="RasterHarmonizationInstructions.pdf"
          >
            {' '}
            this{' '}
          </a>{' '}
          document.
        </span>
        <span className="block pt-1 text-gray-600 sm:text-medium">         
        Download template dataset{' '}
          <a
              href="https://ewocstorage.blob.core.windows.net/collections/Template_training_data.zip"
              download="Template_Dataset.zip"
          >
            here
          </a>.      
        </span>
      </div>
      <div className="pb-6 px-6 border-t-2 mt-4 border-gray-300">
        <div className="mt-4 flex md:ml-4  justify-end ">
          <button
            onClick={() => props.handleChange(1)}
            type="button"
            className="inline-flex mr-4 items-center px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-md shadow-sm text-medium font-medium  hover:border-gray-500 "
          >
            Back
          </button>
          <button
            onClick={() => props.handleChange(3)}
            type="button"
            className="inline-flex mr-4 items-center px-4 py-2 border border-blue-300 bg-blue-600 text-white 
                rounded-md shadow-sm text-medium font-medium  hover:border-blue-500 "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
