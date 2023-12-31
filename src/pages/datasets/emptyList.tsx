﻿import { PlusIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

export default function EmptyListCreateNewPage() {
  const router = useRouter();
  return (
    <div className="text-center justify-center py-20">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        No User datasets found
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by uploading dataset.
      </p>
      <div className="mt-6">
        <button
          onClick={() => router.push(router.basePath + 'create')}
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:bg-blue-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Upload New Dataset
        </button>
      </div>
    </div>
  );
}
