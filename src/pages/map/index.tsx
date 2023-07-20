import React, { useEffect, useState } from "react";
import { Meta } from "../../layout/Meta";
import { Main } from "../../templates/Main";
import dynamic from "next/dynamic";
import { Counter } from "../../pageUtil/counter";
import { useJpex } from "react-jpex";
import { ICollectionService } from "../../interfaces/Interfaces";
import { ColStats } from "../../models/collectionsModels";
import { GeoJsonObject } from "geojson";
import { useRecoilState } from "recoil";
import { showProgressState } from "../../services/state";
import { classNames } from "../../utils/Helper";
import { Switch } from "@headlessui/react";

const Index = () => {
  const Map = dynamic(() => import("../../pageUtil/mapElement"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  });
  const [colStats, setStats] = useState(
    undefined as unknown as ColStats | undefined
  );
  const [geojsonData, setDataGeojsonData] = useState(
    null as unknown as GeoJsonObject | undefined
  );
  const jpex = useJpex();
  const collectionService =
    jpex.resolve<ICollectionService>("collectionService");
  const [, setShowProgress] = useRecoilState(showProgressState);
  const [enabled, setEnabled] = useState(true);
  const [year, setYear] = useState(0);

  function GetMapData(storeType: number, year: number) {
    collectionService
      .GetCollectionsMap(storeType, year)
      .then((data) => {
        setDataGeojsonData(data);
      })
      .catch((error) => {
        console.log("collectionService.GetColMetaData", error);
        //window.location.href = LogoutUrl;
      });
  }

  useEffect(() => {
    setShowProgress(true);
    GetMapData(0, 0);
    collectionService
      .GetCollectionStats(enabled ? 0 : 1, year)
      .then((data) => {
        setStats(data);
      })
      .finally(() => {
        setShowProgress(false);
      });
  }, []);

  function onSelectionChanged(checked: boolean, year: number) {
    const store = checked ? 0 : 1;
    setShowProgress(true);
    collectionService
      .GetCollectionsMap(store, year)
      .then((data) => {
        setDataGeojsonData(data);
        setStats(undefined);
        collectionService.GetCollectionStats(store, year).then((data) => {
          setStats(data);
        });
      })
      .finally(() => {
        setShowProgress(false);
      });
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
            <div className="grid grid-cols-8 gap-1">
              <p className="col-span-4 mt-5 text-xl text-gray-400 ">
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
                    <Counter value={colStats?.totalCollections} />
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
                    <Counter value={colStats?.featuresTotalCount} />
                  ) : null}
                </dd>
              </div>

              <div
                key="redDbSelectk5"
                className="px-2 sm:col-span-1 bg-white shadow rounded-md "
              >
                <dt className="text-xs w-48 text-left text-gray-500 truncate">
                  {enabled ? "Reference Datasets" : "Community Datasets"}
                </dt>
                <dd className="mt-1 font-medium text-center pt-3 text-gray-900">
                  <Switch
                    checked={enabled}
                    onChange={(data) => {
                      setEnabled(data);
                      onSelectionChanged(data, year);
                    }}
                    className={classNames(
                      enabled ? "bg-blue-600" : "bg-blue-400",
                      "relative inline-flex flex-shrink-0 h-6 w-11  border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200"
                    )}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        enabled ? "translate-x-5" : "translate-x-0",
                        "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                      )}
                    />
                  </Switch>
                </dd>
              </div>

              <div
                key="k5"
                className="px-2 sm:col-span-1 bg-white shadow rounded-md "
              >
                <dt className="text-xs w-48 text-left text-gray-500 truncate">
                  Year
                </dt>
                <dd className="mt-1 font-medium text-center text-gray-900">
                  <select
                    onChange={(data) => {
                      const inputYear = parseInt(data.target.value);
                      setYear(inputYear);
                      onSelectionChanged(enabled, inputYear);
                    }}
                    className="block w-full h-10 sm:text-sm border-gray-50 rounded-md"
                  >
                    <option value={0}>All</option>
					<option value={2016}>2016</option>
                    <option value={2017}>2017</option>
                    <option value={2018}>2018</option>
                    <option value={2019}>2019</option>
                    <option value={2020}>2020</option>
                    <option value={2021}>2021</option>
                  </select>
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Map geojsonData={geojsonData} />
    </Main>
  );
};

export default Index;
