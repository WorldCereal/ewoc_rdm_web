import React, {useEffect, useState} from "react";

import dynamic from "next/dynamic";

import {
    ChartPieIcon,
    ChartSquareBarIcon,
    MinusSmIcon,
    PaperClipIcon,
    PlusSmIcon,
} from "@heroicons/react/solid";

import {
    ConfidenceCropType,
    ConfidenceIrrigationRainfed,
    ConfidenceLandCover,
    CurationByWordCereal,
    DatasetZipUrl,
    DescriptionCuratedDataSet,
    FirstDateObservation,
    GeometryAccuracy,
    GeometryContinent,
    GeometryCountry,
    LastDateObservation,
    ListOfLandCovers,
    NameDataSet,
    NoOfObservations,
    ObservationClassificationAccuracy,
    ObservationCoordinateSystem,
    ObservationGPSFieldMethod,
    ObservationMethodInfoOnSamplingDesign,
    ObservationMethodInfoOnValidation,
    ObservationMethodSamplingDesign,
    ObservationMethodValidation,
    ObservationSupportingMaterial,
    ObservationTime,
    OriginalDataSetDataFormat,
    OriginalDataSetDoi,
    OriginalDataSetLanguage,
    OriginalDataSetObjective,
    PointOrPolygonOrRaster,
    ProviderCode,
    ProviderContact,
    ProviderDescriptionCuratedDataSet,
    ProviderUrl,
    ReferenceToLicense,
    RequiredCitation,
    TitleCuratedDataSet,
    TypeOfGeometry,
    TypeOfLicense,
    TypeOfObservationMethod,
} from "../../config";

import {
    Collection,
    ColMetaData,
    Extent,
    ItemsStats,
} from "../../models/collectionsModels";

import {Disclosure, Transition} from "@headlessui/react";
import {TypeOfObservationMethods} from "../../utils/AppConfig";
import {classNames, hasLicenseLink, wordToSentence} from "../../utils/Helper";
import Linkify from "react-linkify";
import Link from "next/link";
import {GetCt, GetIrr, GetLc} from "../../utils/Legends";

const ExtentMap = dynamic(() => import("../../pageUtil/extentMap"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

const PieChart = dynamic(() => import("../../pageUtil/chart"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

interface CollectionDetailsProps {
    selectedCol: Collection | undefined;
    metaData: ColMetaData[];
    loading: boolean;
    downloadMetadata: () => void;
    itemsStats: ItemsStats;
}

const CollectionDetails = (props: CollectionDetailsProps) => {
    useEffect(() => {
    }, [props.selectedCol]);
    const [chartType, setChartType] = useState(0);

    if (props.selectedCol === undefined) {
        return <div>Loading...</div>;
    }

    function getValue(tagName: string = ""): string {
        if (props.loading) {
            return "loading...";
        }
        if (props.metaData === undefined) {
            return "NA";
        }
        const found = props.metaData.find((x) => x.name === tagName);
        if (found === undefined) {
            return "NA";
        }

        return found.value;
    }

    function getValuesOfType(typeName: string = ""): ColMetaData[] {
        if (props.loading) {
            return null;
        }
        if (props.metaData === undefined) {
            return null;
        }
        const found = props.metaData.filter((x) => x.type === typeName);
        if (found === undefined) {
            return null;
        }

        return found;
    }

    function getFileName(url:string):string
    {        
        const values = url.split("/");
        if(values.length<1)
        {
            return url;
        }
        return values[values.length-1];
    }

    function getConf(value: string) {
        const intValue = Math.floor(parseFloat(value));
        if (intValue === 0 || Number.isNaN(intValue)) {
            return "n.a.";
        }
        return intValue;
    }

    const stats = [
        {
            name: "Feature Count",
            stat: getValue(NoOfObservations),
        },
    ];

    function getExtentMap() {
        return <ExtentMap ExtentData={props.selectedCol?.extent as Extent}/>;
    }

    return (
        <div className="bg-white shadow sm:rounded-lg">
            <Linkify>
                <div className="px-4 pt-1 pb-3 sm:px-6">
                    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
                        <div className="sm:col-span-2">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Title
                            </h3>
                            <p className="mt-1 max-w-2xl text-m text-gray-700">
                                {getValue(TitleCuratedDataSet)}
                            </p>
                        </div>
                        {stats.map((item) => (
                            <div
                                key={item.name}
                                className="px-2 sm:col-span-1 bg-white shadow rounded-md "
                            >
                                <dt className="text-sm font-medium text-gray-500 truncate">
                                    {item.name}
                                </dt>
                                <dd className="mt-1 text-xl font-medium  text-gray-900">
                                    {item.stat}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium pb-5 text-gray-900">
                        Dataset Details
                    </h3>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-4">
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Collection ID
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                <Link href={"/collections/" + props.selectedCol?.collectionId}>
                                    {props.selectedCol?.collectionId}
                                </Link>
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Country</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {getValue(GeometryCountry)}
                            </dd>
                        </div>
                        <div className="sm:col-span-2 sm:row-span-4">{getExtentMap()}</div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Description</dt>
                            <dd className="mt-1 text-sm break-words text-gray-900">
                                {getValue(DescriptionCuratedDataSet)}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Continent</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {getValue(GeometryContinent)}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Geometry Accuracy
                            </dt>
                            <dd className="mt-1 text-sm  break-words text-gray-900">
                                {getValue(GeometryAccuracy)}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Geometry type
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {getValue(PointOrPolygonOrRaster)}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Observation Time
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {wordToSentence(getValue(ObservationTime))}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Date Range of Observations
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {getValue(FirstDateObservation) +
                                " to " +
                                getValue(LastDateObservation)}
                            </dd>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Land Cover Types [Feature Count]
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {getValue(ListOfLandCovers)
                                    .split(";")
                                    ?.map((value) => {
                                        const lc = parseInt(value, 10);
                                        const count = props.itemsStats?.lcStats.find(
                                            (x) => x.code == lc
                                        )?.count;
                                        return GetLc(lc) + " [" + count + "]";
                                    })
                                    .join(", ")}
                            </dd>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Irrigation Types [Feature Count]
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {props.itemsStats?.irrStats
                                    .map((item) => {
                                        return GetIrr(item.code) + " [" + item.count + "]";
                                    })
                                    .join(", ")}
                            </dd>
                        </div>
                        <div className="sm:col-span-2 sm:row-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Crop Types [Feature Count]
                            </dt>
                            <dd className="mt-1 text-sm break-words text-gray-900">
                                {props.itemsStats?.ctStats
                                    .map((item) => {
                                        return GetCt(item.code) + " [" + item.count + "]";
                                    })
                                    .join(", ")}
                            </dd>
                        </div>
                        <div className="sm:col-span-4">
                            <Disclosure>
                                {({open}) => (
                                    <>
                                        <div className="flex justify-center sm:w-full">
                                            <div className="relative  items-center flex justify-center">
                                                <Disclosure.Button
                                                    className="inline-flex items-center shadow-sm px-4 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-300">
                                                    {!open ? (
                                                        <PlusSmIcon
                                                            className="-ml-1.5 mr-1 h-5 w-10 text-gray-400"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <MinusSmIcon
                                                            className="-ml-1.5 mr-1 h-5 w-10 text-gray-400"
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                    {open ? (
                                                        <span>Hide Charts</span>
                                                    ) : (
                                                        <span>Show Charts</span>
                                                    )}
                                                </Disclosure.Button>
                                            </div>
                                        </div>
                                        <Transition enter="transform duration-700 ease">
                                            <Disclosure.Panel>
                                                <div className="text-right">
                                                    <button
                                                        className="rounded-full w-6"
                                                        onClick={() => {
                                                            setChartType(chartType === 1 ? 0 : 1);
                                                        }}
                                                    >
                                                        {chartType ? <ChartSquareBarIcon/> : <ChartPieIcon/>}
                                                    </button>
                                                </div>
                                                <dl className="pt-2 h-auto w-full grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-4">
                                                    <div className="w-full sm:col-span-2 text-center">
                            <span className="text-lg font-medium text-gray-500">
                              Land Cover
                            </span>
                                                        {props.itemsStats !== undefined && (
                                                            <PieChart
                                                                type={chartType}
                                                                data={props.itemsStats.lcStats.map(
                                                                    (lcValue) => {
                                                                        return {
                                                                            name: GetLc(lcValue.code) as string,
                                                                            value: lcValue.count,
                                                                        };
                                                                    }
                                                                )}
                                                                total={props.itemsStats.lcStats.reduce(
                                                                    (sum, current) => sum + current.count,
                                                                    0
                                                                )}
                                                            />
                                                        )}
                                                    </div>
                                                    {props.itemsStats !== undefined &&
                                                    props.itemsStats.irrStats.length > 1 && (
                                                        <div className="w-full sm:col-span-2 text-center">
                                <span className="text-lg font-medium text-gray-500">
                                  Irrigation Types
                                </span>
                                                            {
                                                                <PieChart
                                                                    type={chartType}
                                                                    data={props.itemsStats.irrStats.map(
                                                                        (irrValue) => {
                                                                            return {
                                                                                name: GetIrr(irrValue.code) as string,
                                                                                value: irrValue.count,
                                                                            };
                                                                        }
                                                                    )}
                                                                    total={props.itemsStats.irrStats.reduce(
                                                                        (sum, current) => sum + current.count,
                                                                        0
                                                                    )}
                                                                />
                                                            }
                                                        </div>
                                                    )}
                                                    <div
                                                        className={classNames(
                                                            props.itemsStats !== undefined &&
                                                            props.itemsStats.irrStats.length > 1
                                                                ? "sm:col-span-4"
                                                                : "",
                                                            "w-full h-full sm:col-span-2 text-center"
                                                        )}
                                                    >
                            <span className="text-lg font-medium text-gray-500">
                              Crop Types
                            </span>
                                                        {props.itemsStats !== undefined && (
                                                            <PieChart
                                                                type={chartType}
                                                                data={props.itemsStats.ctStats.map(
                                                                    (ctValue) => {
                                                                        return {
                                                                            name: GetCt(ctValue.code) as string,
                                                                            value: ctValue.count,
                                                                        };
                                                                    }
                                                                )}
                                                                total={props.itemsStats.ctStats.reduce(
                                                                    (sum, current) => sum + current.count,
                                                                    0
                                                                )}
                                                            />
                                                        )}
                                                    </div>
                                                </dl>
                                            </Disclosure.Panel>
                                        </Transition>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <div className="sm:col-span-2 lg:pr-12">
                            <dt className="text-sm font-medium text-gray-500">Downloads</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                        <div className="w-0 flex-1 flex items-center">
                                            <PaperClipIcon
                                                className="flex-shrink-0 h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                            <span className="ml-2 flex-1 w-0 truncate">
                        Metadata.xlsx
                      </span>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a
                                                onClick={() => {
                                                    props.downloadMetadata();
                                                }}
                                                className="font-medium text-gray-600 hover:text-blue-500"
                                                href="#"
                                            >
                                                Download
                                            </a>
                                        </div>
                                    </li>
                                    {getValue(DatasetZipUrl) !== "NA" ? (
                                        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                            <div className="w-0 flex-1 flex items-center">
                                                <PaperClipIcon
                                                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                                <span className="ml-2 flex-1 w-0 truncate">
                          Worldcereal Harmonized Dataset
                        </span>
                                            </div>
                                            <div className="font-medium text-gray-600 hover:text-blue-500">
                                                <a href={getValue(DatasetZipUrl)}>Download</a>
                                            </div>
                                        </li>
                                    ) : null}
                                    {getValuesOfType("link") !== null ? (
                                        getValuesOfType("link").map(x=>(
                                        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                            <div className="w-0 flex-1 flex items-center">
                                                <PaperClipIcon
                                                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                                <span className="ml-2 flex-1 w-0 truncate">
                          {getFileName(x.value)}
                        </span>
                                            </div>
                                            <div className="font-medium text-gray-600 hover:text-blue-500">
                                                <a href={x.value} target="_blank" rel="noreferrer">Download</a>
                                            </div>
                                        </li>
                                        ))) : null}
                                </ul>
                            </dd>
                        </div>
                        <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">Citation</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {getValue(RequiredCitation)}
                            </dd>
                        </div>
                    </dl>
                </div>
                <div className="border-t border-gray-200 px-4 py-2 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium py-2 text-gray-900">
                        World Cereal Data Confidence Scores
                    </h3>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-4">
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Confidence LandCover
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {getConf(getValue(ConfidenceLandCover))}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Confidence CropType
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {getConf(getValue(ConfidenceCropType))}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Confidence IrrigationRainfed
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {getConf(getValue(ConfidenceIrrigationRainfed))}
                            </dd>
                        </div>
                    </dl>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium py-5 text-gray-900">
                        Dataset Provider Details
                    </h3>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-4">
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Code</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {getValue(ProviderCode)}
                            </dd>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium break-words text-gray-500">
                                Description
                            </dt>
                            <dd className="mt-1 text-sm  break-words text-gray-900">
                                {getValue(ProviderDescriptionCuratedDataSet)}
                            </dd>
                        </div>

                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Url</dt>
                            <dd className="mt-1  break-words text-sm text-gray-900">
                                {getValue(ProviderUrl)}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Contact</dt>
                            <dd className="mt-1 text-sm  break-words text-gray-900">
                                {getValue(ProviderContact)}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                DataSet Name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {getValue(NameDataSet)}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                ReferenceDataSet
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {getValue(OriginalDataSetDoi)}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                Type Of License
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {hasLicenseLink(getValue(TypeOfLicense)) !== "NA" ? (
                                    <a
                                        href={hasLicenseLink(getValue(TypeOfLicense))}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {getValue(TypeOfLicense)}
                                    </a>
                                ) : (
                                    getValue(TypeOfLicense)
                                )}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                                ReferenceToLicense
                            </dt>
                            <dd className="mt-1 text-sm  break-words text-gray-900">
                                {getValue(ReferenceToLicense)}
                            </dd>
                        </div>
                    </dl>
                    <Disclosure>
                        {({open}) => (
                            <>
                                <div className="flex justify-center py-6  sm:w-full">
                                    <div className="relative  items-center flex justify-center">
                                        <Disclosure.Button
                                            className="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-300">
                                            {!open ? (
                                                <PlusSmIcon
                                                    className="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <MinusSmIcon
                                                    className="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            )}
                                            {open ? (
                                                <span>Less Details</span>
                                            ) : (
                                                <span>More Details</span>
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                                <Transition enter="transform duration-700 ease">
                                    <Disclosure.Panel>
                                        <dl className="pt-2 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-4">
                                            <Linkify>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Objective
                                                    </dt>
                                                    <dd className="mt-1 text-sm  break-words text-gray-900">
                                                        {getValue(OriginalDataSetObjective)}
                                                    </dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Observation Method
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">
                                                        {
                                                            TypeOfObservationMethods.find(
                                                                (x) =>
                                                                    x.strName ===
                                                                    getValue(TypeOfObservationMethod)
                                                            )?.name
                                                        }
                                                    </dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Sampling Done
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">
                                                        {getValue(ObservationMethodSamplingDesign)}
                                                    </dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Sampling Design Details
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">
                                                        {getValue(ObservationMethodInfoOnSamplingDesign)}
                                                    </dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Validation Done
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">
                                                        {getValue(ObservationMethodValidation)}
                                                    </dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Validation Details
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">
                                                        {getValue(ObservationMethodInfoOnValidation)}
                                                    </dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Classification Accuracy
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">
                                                        {getValue(ObservationClassificationAccuracy)}
                                                    </dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Supporting Material
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">
                                                        {getValue(ObservationSupportingMaterial)}
                                                    </dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Type Of Geometry
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">
                                                        {getValue(TypeOfGeometry)}
                                                    </dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        GPS Field Method
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">
                                                        {wordToSentence(
                                                            getValue(ObservationGPSFieldMethod)
                                                        )}
                                                    </dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Coordinate System
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">
                                                        {getValue(ObservationCoordinateSystem)}
                                                    </dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Data Format
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">
                                                        {getValue(OriginalDataSetDataFormat)}
                                                    </dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Language
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">
                                                        {getValue(OriginalDataSetLanguage)}
                                                    </dd>
                                                </div>
                                            </Linkify>
                                        </dl>
                                    </Disclosure.Panel>
                                </Transition>
                            </>
                        )}
                    </Disclosure>
                </div>
            </Linkify>
        </div>
    );
};

export default CollectionDetails;
