import React, { useState } from 'react';
import { Meta } from '../../layout/Meta';
import { UserDataset } from '../../models/UserDatasetModels';
import { Main } from '../../templates/Main';
import EmptyListCreateNewPage from './emptyList';
import UserDatasetListView from './listView';
import UserDatasetDetailsView from './detailsPage';
import Link from 'next/link';

export default function Datasets() {
  const [selectDs, setSelectedDs] = useState(
    undefined as unknown as UserDataset
  );

  const [emptyList, setEmptyList] = useState(false);

  function setSelectedDataset(userDataset: UserDataset): void {
    if (userDataset === undefined) {
      return;
    }
    setSelectedDs(userDataset);
  }

  function setEmptyListHandler(status: boolean) {
    setEmptyList(status);
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
          <div className="w-full lg:justify-left">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              User Collections
            </h2>
            <div className="grid grid-cols-2">
              <p className="mt-5 w-full text-xl text-gray-400">
                Collection of user uploaded datasets
              </p>
              <div className="mt-3 w-auto justify-self-end h-5 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link href="/create">
                  <a className=" w-auto py-2  items-center justify-center  border-2 border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:border-gray-600 hover:bg-gray-50  md:text-lg md:px-10">
                    Upload New
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {emptyList ? (
        <div>
          <EmptyListCreateNewPage />
        </div>
      ) : (
        <div className="lg:relative lg:h-full lg:w-full">
          <div className="lg:float-left lg:h-full lg:w-1/3 lg:overflow-hidden">
            <UserDatasetListView
              selectHandler={setSelectedDataset}
              selectedCol={selectDs}
              setListEmpty={setEmptyListHandler}
            />
          </div>
          <div className="lg:h-full lg:w-2/3 lg:overflow-hidden">
            <UserDatasetDetailsView data={selectDs} />
          </div>
        </div>
      )}
    </Main>
  );
}
