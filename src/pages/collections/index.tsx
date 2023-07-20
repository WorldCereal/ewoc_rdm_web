import React, { useEffect, useState } from "react";
import { useJpex } from "react-jpex";
import {
  Collection,
  ColMetaData,
  ColStats,
  ItemsStats,
} from "../../models/collectionsModels";
import { ICollectionService } from "../../interfaces/Interfaces";
import { Main } from "../../templates/Main";
import { Meta } from "../../layout/Meta";
import CollectionDetails from "./collectionDetails";
import CollectionListView from "./collectionListView";
import { Counter } from "../../pageUtil/counter";
import { LogoutUrl } from "../../config";
import { useRecoilState } from "recoil";
import { showProgressState } from "../../services/state";

export default function Collections() {
  const [selectCol, setSelectedCol] = useState(
    undefined as Collection | undefined
  );
  const [colStats, setStats] = useState(
    undefined as unknown as ColStats | undefined
  );
  const [loading, setLoading] = useState(true);
  const inputs: Array<ColMetaData> = [];
  const [metaData, setMetaData] = useState(inputs);
  const [itemStats, setItemStats] = useState(
    undefined as unknown as ItemsStats
  );
  const jpex = useJpex();
  const collectionService =
    jpex.resolve<ICollectionService>("collectionService");
  const [, setShowProgress] = useRecoilState(showProgressState);

  useEffect(() => {
    collectionService
      .GetCollectionStats(0, 0)
      .then((data) => {
        setStats(data);
      })
      .catch((error) => {
        console.log("collectionService.GetCollectionStats", error);
        window.location.href = LogoutUrl;
      });
  }, []);

  function setSelectedCollection(col: Collection): void {
    if (col === undefined) {
      return;
    }
    setSelectedCol(col);
    setLoading(true);
    setShowProgress(true);
    collectionService
      .GetColMetaData(col.collectionId)
      .then((data) => {
        setMetaData(data);
        collectionService.GetItemsStats(col.collectionId).then((stats) => {
          setItemStats(stats);
        });
      })
      .catch((error) => {
        console.log("collectionService.GetColMetaData", error);
      })
      .finally(() => {
        setLoading(false);
        setShowProgress(false);
      });
  }

  function downloadMetadata() {
    if (selectCol !== undefined) {
      setShowProgress(true);
      collectionService
        .DownloadMetadataExcel(selectCol.collectionId)
        .then((blob) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.setAttribute(
            "download",
            selectCol?.collectionId + "_MetaData.xlsx"
          );
          document.body.appendChild(link);
          link.click();
          link.remove();
        })
        .finally(() => {
          setShowProgress(false);
        });
    }
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
              Reference Data Collections
            </h2>
            <div className="grid grid-cols-7 gap-1">
              <p className="col-span-5 mt-5 text-xl text-gray-400 ">
                Public Collections available as input for processing
              </p>
              <div
                key="k3"
                className="px-2 sm:col-span-1 bg-white shadow rounded-md "
              >
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Collections
                </dt>
                <dd className="mt-1 text-xl font-medium  text-gray-900">
                  {colStats !== undefined ? (
                    <Counter value={colStats.totalCollections} />
                  ) : null}
                </dd>
              </div>
              <div
                key="k4"
                className="px-2 sm:col-span-1 bg-white shadow rounded-md "
              >
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Features
                </dt>
                <dd className="mt-1 font-medium  text-gray-900">
                  {colStats !== undefined ? (
                    <Counter value={colStats.featuresTotalCount} />
                  ) : null}
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:relative lg:h-full lg:w-full">
        <div className="lg:float-left lg:h-full lg:w-1/3 lg:overflow-hidden">
          <CollectionListView
            selectHandler={setSelectedCollection}
            selectedCol={selectCol}
          />
        </div>
        <div className="lg:h-full lg:w-2/3 lg:overflow-hidden">
          <CollectionDetails
            selectedCol={selectCol}
            metaData={metaData}
            loading={loading}
            downloadMetadata={downloadMetadata}
            itemsStats={itemStats}
          />
        </div>
      </div>
    </Main>
  );
}
