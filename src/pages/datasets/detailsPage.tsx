import { useEffect, useState } from 'react';
import { UserDataset } from '../../models/UserDatasetModels';
import { useJpex } from 'react-jpex';
import { ICollectionService } from '../../interfaces/Interfaces';
import {Collection, ColMetaData, ItemsStats} from '../../models/collectionsModels';
import CollectionDetails from '../collections/collectionDetails';
import DatasetDetailsView from './datasetDetails';
import PublicInstructions from './instructions';
import { DatasetState } from '../../utils/AppConfig';
import DsErrors from './dsErros';
import Tabs from '../../pageUtil/tabs';
import AdminPage from './Admin';
import { useRecoilState } from 'recoil';
import { showProgressState } from '../../services/state';

interface UserDatasetDetailsProps {
  data: UserDataset;
}

export default function UserDatasetDetailsView(props: UserDatasetDetailsProps) {
  const details = 'Details';
  const metaData = 'MetaData'; // only available if dataset is public,
  const instructions = 'Instructions'; // only available if dataset is private
  const errorTab = 'Errors'; // only available if dataset is private
  const admin = 'Admin';
  const [selectedTab, setSelectedTab] = useState(details);
  const [selectedCollection, setCollection] = useState(
    undefined as unknown as Collection
  );
  const [loading, setLoading] = useState(true);
  const inputs: Array<ColMetaData> = [];
  const [metaDataList, setMetaData] = useState(inputs);
  const [itemStats, setItemStats] = useState(
      undefined as unknown as ItemsStats
  );
  const jpex = useJpex();
  const collectionService =
    jpex.resolve<ICollectionService>('collectionService');

  const [isAdminValue, setIsAdmin] = useState(false);
  const [, setShowProgress] = useRecoilState(showProgressState);

  useEffect(() => {
    setSelectedTab(details);
    collectionService.IsAdminUser().then((data) => {
      setIsAdmin(data);
    });
  }, [props.data, isAdminValue]);

  function canDisplayMetadata(): boolean {
    return (
      selectedCollection !== undefined &&
      selectedCollection.accessType === 'Public' // change later to public
    );
  }

  function getDetails() {
    collectionService
      .GetCollection(props.data.collectionId)
      .then((data) => {
        setCollection(data);
      })
      .catch((res) => {
        console.log(res);
      });

    if (!canDisplayMetadata()) {
      return;
    }
    setLoading(true);
    setShowProgress(true);
    collectionService
      .GetColMetaData(props.data.collectionId)
      .then((data) => {
        setMetaData(data);
        
        collectionService.GetItemsStats(props.data.collectionId).then(stats=>{
          setItemStats(stats);
        });
        
      })
      .catch((res) => {
        console.log(res);
        setMetaData(inputs);
      })
      .finally(() => {
        setLoading(false);
        setShowProgress(false);
      });
  }

  function tabSelectionChanged(tabName: string) {
    setSelectedTab(tabName);
    if (tabName === metaData) {
      getDetails();
    }
  }

  function extracted() {
    const tabs = [{ name: details, current: selectedTab === details }];
    if (
      props.data === undefined ||
      props.data.state ===
        (DatasetState[
          DatasetState.ValidationFailedUploadRequired
        ] as unknown as DatasetState)
    ) {
      tabs.push({
        name: errorTab,
        current: selectedTab === errorTab,
      });

      return tabs;
    }

    if (
      props.data.state ===
      (DatasetState[DatasetState.AvailableInModule] as unknown as DatasetState)
    ) {
      tabs.push({
        name: instructions,
        current: selectedTab === instructions,
      });
    }
    if (
      props.data.state ===
      (DatasetState[DatasetState.PublicDataset] as unknown as DatasetState)
    ) {
      tabs.push({ name: metaData, current: selectedTab === metaData }); //  Remove later
    }

    if (isAdminValue) {
      tabs.push({
        name: admin,
        current: selectedTab === admin,
      });
      console.log('IsAdmin() - tabs.pushed');
    }
    return tabs;
  }

  function downloadMetadata() {
    if (props.data !== undefined) {
      setShowProgress(true);
      collectionService
        .DownloadMetadataExcel(props.data.collectionId)
        .then((blob) => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.setAttribute(
            'download',
            props.data?.collectionId + '_MetaData.xlsx'
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
    <div>
      <Tabs tabs={extracted()} selectHandler={tabSelectionChanged} />
      {selectedTab === details ? (
        <div>
          <DatasetDetailsView
            dataset={props.data}
            makeDatasetPublic={() => {
              tabSelectionChanged(instructions);
            }}
            showValErrors={() => {
              tabSelectionChanged(errorTab);
            }}
          />
        </div>
      ) : null}

      {selectedTab === admin ? (
        <div>
          <AdminPage userDataset={props.data} />
        </div>
      ) : null}

      {selectedTab === metaData ? (
        <div>
          <CollectionDetails
            selectedCol={selectedCollection as Collection}
            metaData={metaDataList}
            loading={loading}
            downloadMetadata={downloadMetadata}
            itemsStats={itemStats}
          />
        </div>
      ) : null}

      {selectedTab === instructions ? (
        <div>
          <PublicInstructions
            userDataset={props.data}
            downloadMetadata={downloadMetadata}
          />
        </div>
      ) : null}

      {selectedTab === errorTab ? (
        <div>
          <DsErrors
            errorList={props.data.errors}
            showDetailsTab={() => {
              tabSelectionChanged(details);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
