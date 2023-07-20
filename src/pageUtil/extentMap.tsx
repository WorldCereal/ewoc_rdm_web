import { MapContainer, Rectangle, TileLayer, useMap } from 'react-leaflet';
import { Bounds, LatLng, LatLngBoundsExpression, Point } from 'leaflet';
import React from 'react';
import { Extent } from '../models/collectionsModels';

interface ExtentMapProps {
  ExtentData: Extent | undefined;
}

const ExtentMap = (props: ExtentMapProps) => {
  if (props.ExtentData === null || props.ExtentData === undefined) {
    return <div>Map Loading...</div>;
  }

  // @ts-ignore
  let [[llx, lly, urx, ury]] = props?.ExtentData?.spatial?.bbox ?? [
    [0, 0, 0, 0],
  ];

  if (Number.isNaN(llx)) llx = 0;
  if (Number.isNaN(lly)) lly = 0;
  if (Number.isNaN(urx)) urx = 0;
  if (Number.isNaN(ury)) ury = 0;

  const bound = new Bounds(
    new Point(llx as number, lly as number),
    new Point(urx as number, ury as number)
  );

  function getCenter() {
    return new LatLng(bound.getCenter().y, bound.getCenter().x);
  }

  const options = { color: 'gray', fillOpacity: 0.3 };
  const zoom = 3;

  const rectangle = [
    [lly, llx],
    [ury, urx],
  ];

  function ChangeView() {
    const map = useMap();
    map.setView(getCenter(), zoom);
    return null;
  }

  return (
    <MapContainer
      className="map"
      center={getCenter()}
      zoom={3}
      style={{
        height: '300px',
      }}
      scrollWheelZoom={false}
    >
      <ChangeView />
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://carto.com/attribution/">© CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png"
      />

      <Rectangle
        bounds={rectangle as LatLngBoundsExpression}
        pathOptions={options}
      />
    </MapContainer>
  );
};

export default ExtentMap;
