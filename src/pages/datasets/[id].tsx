import { useRouter } from 'next/router';
import { Main } from '../../templates/Main';
import { Meta } from '../../layout/Meta';
import Link from 'next/link';
import UserDatasetDetailsView from './detailsPage';
import React, { useEffect, useState } from 'react';
import { UserDataset } from '../../models/UserDatasetModels';
import { useJpex } from 'react-jpex';
import { IUserDatasetService } from '../../interfaces/Interfaces';
import { useRecoilState } from 'recoil';
import { forceUpdateUserDsState } from '../../services/state';
import { canStartTimer } from '../../pageUtil/helper';
import { DatasetState } from '../../utils/AppConfig';

export default function UserDatasetDetailsPage() {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const [loading, setLoading] = useState(true);
  const [selectDs, setSelectedDs] = useState(
    undefined as unknown as UserDataset
  );
  const [forceUpdate] = useRecoilState(forceUpdateUserDsState);
  const jpex = useJpex();
  const userDatasetService =
    jpex.resolve<IUserDatasetService>('userDatasetService');

  function getUserDataset() {
    userDatasetService
      .GetUserDataset(id as string)
      .then((userDs) => {
        setSelectedDs(userDs);
        setLoading(false);
        if (canStartTimer(userDs?.state as unknown as DatasetState)) {
          setTimeout(() => {
            getUserDataset();
          }, 5000);
        }
      })
      .catch((error) => {
        console.log('error', error);
      })
      .finally(() => {});
  }

  useEffect(() => {
    if (id === undefined) {
      return;
    }
    setLoading(true);
    getUserDataset();

    if (selectDs === undefined) {
      return;
    }

    if (canStartTimer(selectDs?.state as unknown as DatasetState)) {
      setTimeout(() => {
        getUserDataset();
      }, 5000);
    }
  }, [id, forceUpdate]);

  if (id === undefined) {
    return <div>Loading...</div>;
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
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="lg:relative lg:h-full lg:w-full lg:px-12">
          <div className="lg:h-full lg:w-full lg:overflow-hidden">
            <UserDatasetDetailsView data={selectDs} />
          </div>
        </div>
      )}
    </Main>
  );
}
