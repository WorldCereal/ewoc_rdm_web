import { ChevronRightIcon, SearchIcon } from '@heroicons/react/solid';
import { Collection, CollectionList } from '../../models/collectionsModels';
import { useEffect, useState } from 'react';
import { useJpex } from 'react-jpex';
import { ICollectionService } from '../../interfaces/Interfaces';
import PageNavigation from '../../pageUtil/pageNavigation';
import { useRecoilState } from 'recoil';
import { showProgressState } from '../../services/state';

interface CollectionListProps {
  selectHandler: (col: Collection) => void;
  selectedCol: Collection | undefined;
}

export default function CollectionListView(props: CollectionListProps) {
  const [data, setData] = useState(undefined as CollectionList | undefined);
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState(
    undefined as Collection[] | undefined
  );
  const [pageCount, setPageCount] = useState(1);
  const jpex = useJpex();
  const collectionService =
    jpex.resolve<ICollectionService>('collectionService');
  const itemsPerPage = 10;
  const [, setShowProgress] = useRecoilState(showProgressState);

  function initData(list: CollectionList) {
    setData(list);
    setFilteredItems(list.items.slice(0, itemsPerPage));
    setPageCount(Math.ceil(list.totalCount / itemsPerPage));
    props.selectHandler(list.items.slice(0, 1)[0] as Collection);
  }

  useEffect(() => {
    setShowProgress(true);
    collectionService
      .GetCollections(0, 200)
      .then((resData) => {
        const items = resData.items.sort((a, b) =>
          a.creationTime > b.creationTime ? 1 : -1
        );
        initData({
          totalCount: resData.totalCount,
          items,
        } as CollectionList);
      })
      .finally(() => {
        setShowProgress(false);
      });
  }, []);

  function filterItems(): Collection[] | undefined {
    if (data === undefined) {
      return undefined as unknown as Collection[];
    }
    const searchString = search.toLowerCase();
    return data.items.filter(
      (x) =>
        x.title.toLowerCase().startsWith(searchString) ||
        x.collectionId.toLowerCase().startsWith(searchString)
    );
  }

  function handlePageClick(selectedItem: { selected: number }) {
    const selected = selectedItem.selected;
    const offset = Math.ceil(selected * itemsPerPage);

    if (data === undefined) {
      return;
    }
    const items = search === '' ? data.items : filterItems();
    if (items === undefined) {
      return;
    }

    const endIndex = offset + itemsPerPage;
    if (endIndex > data?.totalCount) {
      setFilteredItems(items.slice(offset, data?.totalCount));
    } else {
      setFilteredItems(items.slice(offset, endIndex));
    }
    props.selectHandler(items.slice(offset, offset + 1)[0] as Collection);
  }

  function handleFilter() {
    const col = filterItems();
    // @ts-ignore
    setPageCount(Math.ceil(col?.length / itemsPerPage));
    setFilteredItems(col?.slice(0, itemsPerPage));
    props.selectHandler(col?.slice(0, 1)[0] as Collection);
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
      {data !== undefined ? (
        <PageNavigation
          pageCount={pageCount}
          handlePageClick={handlePageClick}
        />
      ) : (
        <div>loading...</div>
      )}
      <div className="bg-white mt-1 shadow  sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredItems !== undefined ? (
            filteredItems.map((col) => (
              <li
                key={col.collectionId}
                onKeyPress={() => props.selectHandler(col)}
                onClick={() => props.selectHandler(col)}
              >
                <a
                  className={
                    col.collectionId === props.selectedCol?.collectionId
                      ? 'block hover:bg-gray-50 border-blue-500'
                      : 'block bg-gray-200 hover:bg-gray-50'
                  }
                >
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-1">
                        <div className="md:col-span-2">
                          <p className="text-sm font-medium text-blue-600 truncate tracking-tight break-words">
                            {col.title}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            <span className="truncate">{col.collectionId}</span>
                          </p>
                        </div>
                        <div className="hidden md:block">
                          <div>
                            <p className="text-sm text-gray-900">
                              Geometry Type
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              {col.type}
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
