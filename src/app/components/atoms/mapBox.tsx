import L, { LatLngExpression, LatLngTuple, divIcon } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import icon from '../../../assets/marker.png'

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";

export interface MarkerPoint {
  id: string;
  lat: number;
  lng: number;
}


// delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: icon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
})

interface Props {
  markers: MarkerPoint[];
  handleClickMarker: (id: string) => void;
  className?: string;
  zoom?: number;
  center?: LatLngTuple;
  mapEvent?: JSX.Element;
}

export default function MapBox({
  markers,
  handleClickMarker,
  zoom = 5,
  className,
  mapEvent,
}: Props) {
  const initialPosition: LatLngExpression = [-15, -54];

  return (
    <div className={`relative ${className}`}>
      <MapContainer
        center={initialPosition}
        zoom={zoom}
        scrollWheelZoom={true}
        maxZoom={12}
        className={className}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map(
          (
            mark,
            index //alterar index para o id
          ) => (
            <Marker
              key={index}
              position={[mark.lat, mark.lng]}
              eventHandlers={{
                click: () => handleClickMarker(mark.id),
              }}
            />
          )
        )}
        {mapEvent ?? <></>}
      </MapContainer>
    </div>
  );
}
