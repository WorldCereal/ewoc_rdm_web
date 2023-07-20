interface DsErrorProps {
  errorList: string[];
  showDetailsTab: () => void;
}

export default function DsErrors(props: DsErrorProps) {
  return (
    <div className="px-4 py-5 sm:relative sm:px-6 divide-gray-200">
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-700">
          Dataset Validation Errors
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          To fix the errors follow the instructions in documents.
        </p>

        <ol className="px-4 py-3 list-disc text-sm text-blue-500">
          <li key="liWorldCereal_FileFormat_V1">
            <a
              className="mt-1 text-sm text-blue-500"
              href="/WorldCereal_FileFormat_V1.xlsx"
              download="WorldCereal_FileFormat_V1.xlsx"
            >
              WorldCereal File Format
            </a>
          </li>
          <li key="liWorldCereal_LC_CT_IRR_legends_V1">
            <a
              className="mt-1 text-sm text-blue-500"
              href="/WorldCereal_LC_CT_IRR_legends_V1.xlsx"
              download="WorldCereal_LC_CT_IRR_legends_V1.xlsx"
            >
              WorldCereal Legends
            </a>
          </li>
        </ol>
      </div>

      <div className="px-4 py-5 bg-gray-200 text-red-700">
        <ol className="px-4 list-decimal">
          {props.errorList?.map((error, index) => (
            <li
              key={'liError' + index + error.toLowerCase()}
              className="py-1 break-words flex-wrap"
            >
              {error}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex px-4 py-4 mt-4 sm:px-6 justify-center">
        <button
          onClick={() => {
            props.showDetailsTab();
          }}
          type="button"
          className=" px-4 hover:bg-blue-700 focus:outline-none bg-blue-600 ml-3 inline-flex justify-center border border-transparent shadow-sm text-sm font-medium rounded-md text-white"
        >
          Upload Fixed Dataset
        </button>
      </div>
    </div>
  );
}
