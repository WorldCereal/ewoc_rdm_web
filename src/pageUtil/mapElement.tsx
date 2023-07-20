import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Polygon,
} from "react-leaflet";
import { LatLng, Layer } from "leaflet";
import React, { useEffect, useState } from "react";
import hash from "object-hash";
import { useRouter } from "next/router";
import { GeoJsonObject } from "geojson";

interface MapElementProps {
  geojsonData: GeoJsonObject | undefined;
}

const MapElement = (props: MapElementProps) => {
  const [polygonPositions, setPolygonPositions] = useState(
    null as unknown as LatLng[] | null
  );
  const router = useRouter();
  const zoom = 3;
  const options = { color: "gray", fillOpacity: 0.3 };

  useEffect(() => {}, []);

  function openPopup(data: any) {
    let len = data.sourceTarget?.feature?.properties?.Extent.length;
    let latLngs = new Array<LatLng>();
    for (let i = 0; i < len; i++) {
      latLngs.push(
        new LatLng(
          data.sourceTarget?.feature?.properties?.Extent[i].Y,
          data.sourceTarget?.feature?.properties?.Extent[i].X
        )
      );
    }
    setPolygonPositions(latLngs);
  }

  function onEachFeature(feature: any, layer: Layer) {
    if (feature.properties && feature.properties.CollectionId) {
      const name = feature.properties.Title;
      const count = feature.properties.FeatureCount;
      const type = feature.properties.CollectionType;
      const url =
        router.basePath + "/collections/" + feature.properties.CollectionId;
      layer.bindPopup(
        ` <h5> <a href=${url}>${name}</a></h5> <p>${type} Count: ${count}</p>`
      );
      layer.on({ popupopen: openPopup });
    }
  }

  return (
    <MapContainer
      className="map"
      center={new LatLng(20, 16)}
      zoom={zoom}
      style={{
        height: "75vh",
      }}
    >      
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://carto.com/attribution/">© CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png"
      />
      {polygonPositions !== null ? (
        <Polygon
          pathOptions={options}
          positions={polygonPositions as LatLng[]}
        />
      ) : null}

      {props.geojsonData === null ? null : (
        <GeoJSON
          onEachFeature={onEachFeature}
          key={hash("MyKeyHash")}
          data={props.geojsonData as unknown as GeoJsonObject}
        />
      )}
    </MapContainer>
  );
};

export default MapElement;
