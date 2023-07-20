import { ChevronRightIcon, SearchIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { useJpex } from 'react-jpex';
import { IUserDatasetService } from '../../interfaces/Interfaces';
import { UserDataset } from '../../models/UserDatasetModels';
import {
  DatasetState,
  TypeOfObservationMethodEnum,
  TypeOfObservationMethods,
} from '../../utils/AppConfig';
import { useRecoilState } from 'recoil';
import {
  forceUpdateUserDsState,
  selectedUserDatasetState,
  showProgressState,
} from '../../services/state';
import { canStartTimer } from '../../pageUtil/helper';
import PageNavigation from '../../pageUtil/pageNavigation';
import { LogoutUrl } from '../../config';

interface UserDatasetListProps {
  selectHandler: (col: UserDataset) => void;
  selectedCol: UserDataset | undefined;
  setListEmpty: (status: boolean) => void;
}

export default function UserDatasetListView(props: UserDatasetListProps) {
  const [data, setData] = useState(undefined as UserDataset[] | undefined);
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState(
    undefined as UserDataset[] | undefined
  );
  const [currentDs, setCurrentDs] = useRecoilState(selectedUserDatasetState);
  const [forceUpdate, setForceUpdate] = useRecoilState(forceUpdateUserDsState);
  const [pageCount, setPageCount] = useState(1);
  const jpex = useJpex();
  const userDatasetService =
    jpex.resolve<IUserDatasetService>('userDatasetService');
  const itemsPerPage = 10;
  const [, setShowProgress] = useRecoilState(showProgressState);

  function getUserDataset(id: string): UserDataset | undefined {
    userDatasetService
      .GetUserDataset(id)
      .then((newUserDs) => {
        setCurrentDs(newUserDs);
        props.selectHandler(newUserDs);
        if (canStartTimer(newUserDs?.state as unknown as DatasetState)) {
          setTimeout(() => {
            getUserDataset(newUserDs?.id);
          }, 5000);
        }
        return newUserDs;
      })
      .catch((error) => {
        console.log('userDatasetService.GetUserDataset', error);
        window.location.href = LogoutUrl;
      });
    return undefined;
  }

  function RunTimer() {
    if (currentDs === undefined) return;
    if (canStartTimer(currentDs?.state as unknown as DatasetState)) {
      getUserDataset(currentDs?.id);
    }
  }

  function filterItemsLogic(searchString: string) {
    return (x: UserDataset) =>
      x.title.toLowerCase().startsWith(searchString) ||
      x.collectionId.toLowerCase().startsWith(searchString);
  }

  function filterItems(): UserDataset[] {
    if (data === undefined) {
      return undefined as unknown as UserDataset[];
    }
    const searchString = search.toLowerCase();
    return data.filter(filterItemsLogic(searchString));
  }

  function handlePageClick(selectedItem: { selected: number }) {
    const selected = selectedItem.selected;
    const offset = Math.ceil(selected * itemsPerPage);

    if (data === undefined) {
      return;
    }
    const items = search === '' ? data : filterItems();
    if (items === undefined) {
      return;
    }

    const endIndex = offset + itemsPerPage;
    if (endIndex > data?.length) {
      setFilteredItems(items.slice(offset, data?.length));
    } else {
      setFilteredItems(items.slice(offset, endIndex));
    }
    props.selectHandler(items.slice(offset, offset + 1)[0] as UserDataset);
  }

  useEffect(() => {
    setShowProgress(true);
    userDatasetService
      .GetDatasets(0, 200, forceUpdate)
      .then((resData1) => {
        props.setListEmpty(resData1.length === 0);
        if (resData1.length !== 0) {
          const resData = resData1.sort((a, b) =>
            a.creationTime < b.creationTime ? 1 : -1
          );
          setData(resData);
          setPageCount(Math.ceil(resData.length / itemsPerPage));
          setFilteredItems(resData.slice(0, itemsPerPage));
          const sliceElement = resData.slice(0, 1)[0] as UserDataset;
          setCurrentDs(sliceElement);
          props.selectHandler(sliceElement);
        }

        if (forceUpdate) {
          setForceUpdate(false);
          handlePageClick({ selected: 1 });
        }
      })
      .finally(() => {
        setShowProgress(false);
      });

    setTimeout(() => {
      RunTimer();
    }, 5000);
  }, [forceUpdate]);

  function handleFilter() {
    const col = filterItems();
    // @ts-ignore
    setPageCount(Math.ceil(col?.length / itemsPerPage));
    setFilteredItems(col?.slice(0, itemsPerPage));
    props.selectHandler(col?.slice(0, 1)[0] as UserDataset);
  }

  return (
    <div>
      <div className="flex-1 min-w-0">
        <div className="flex-1 min-w-0 px-3 py-3">
          <div className="relative lg:h-10 rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              aria-label="Search"
              type="search"
              onChange={(event) => {
                const value = event.target.value;
                setSearch(value);
                if (value === '') {
                  handleFilter();
                }
              }}
              value={search}
              name="search"
              id="search"
              className="focus:ring-gray-800 focus:border-gray-500 block w-full h-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search"
              onKeyUp={handleFilter}
            />
          </div>
        </div>
      </div>
      {data !== undefined && !forceUpdate ? (
        <PageNavigation
          pageCount={pageCount}
          handlePageClick={handlePageClick}
        />
      ) : (
        <div>Loading...</div>
      )}
      <div className="bg-white mt-1 shadow  sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredItems !== undefined ? (
            filteredItems.map((dataset) => (
              <li
                key={dataset.collectionId}
                onKeyPress={() => getUserDataset(dataset.id)}
                onClick={() => getUserDataset(dataset.id)}
              >
                <a
                  className={
                    dataset.collectionId === props.selectedCol?.collectionId
                      ? 'block hover:bg-gray-50 border-blue-500'
                      : 'block bg-gray-200 hover:bg-gray-50'
                  }
                >
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4">
                        <div className="md:col-span-2">
                          <p className="text-sm font-medium text-blue-600 truncate">
                            {dataset.title}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            <span className="truncate">
                              {dataset.collectionId}
                            </span>
                          </p>
                        </div>
                        <div className="hidden md:block">
                          <div>
                            <p className="text-sm text-gray-900">
                              {dataset.state}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              {
                                TypeOfObservationMethods.find(
                                  (x) =>
                                    x.value ===
                                    (TypeOfObservationMethodEnum[
                                      dataset.typeOfObservationMethod
                                    ] as unknown as TypeOfObservationMethodEnum)
                                )?.name
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </a>
              </li>
            ))
          ) : (
            <div>No Items!</div>
          )}
        </ul>
      </div>
    </div>
  );
}
