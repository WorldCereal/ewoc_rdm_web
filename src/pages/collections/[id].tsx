import { Meta } from "../../layout/Meta";
import { Main } from "../../templates/Main";
import { useRouter } from "next/router";
import CollectionDetails from "./collectionDetails";
import { useEffect, useState } from "react";
import {
  Collection,
  ColMetaData,
  ItemsStats,
} from "../../models/collectionsModels";
import { useJpex } from "react-jpex";
import { ICollectionService } from "../../interfaces/Interfaces";

export default function CollectionDetailsPage() {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const [selectCol, setSelectedCol] = useState(
    undefined as Collection | undefined
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

  function downloadMetadata() {
    if (selectCol !== undefined) {
      collectionService
        .DownloadMetadataExcel(selectCol?.collectionId)
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
        });
    }
  }

  useEffect(() => {
    if (id === undefined) {
      return;
    }
    setLoading(true);
    collectionService
      .GetCollection(id as string)
      .then((col) => {
        setSelectedCol(col);

        collectionService.GetColMetaData(id as string).then((data) => {
          setMetaData(data);
        });

        collectionService.GetItemsStats(id as string).then((stats) => {
          setItemStats(stats);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

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
          <div className=" w-auto  lg:justify-left">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Reference Data Collections
            </h2>
            <p className="mt-5 text-xl text-gray-400">
              Collection of datasets available as input for processing
            </p>
          </div>
        </div>
      </div>
      <div className="lg:relative lg:h-full lg:w-full">
        <CollectionDetails
          selectedCol={selectCol}
          metaData={metaData}
          loading={loading}
          downloadMetadata={downloadMetadata}
          itemsStats={itemStats}
        />
      </div>
    </Main>
  );
}
