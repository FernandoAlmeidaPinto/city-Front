import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useMapEvents } from "react-leaflet";
import { v4 as uuidv4 } from "uuid";
import { MarkerPoint } from "../atoms/mapBox";

interface Props {
  className: string;
}

export function Map({ className }: Props) {
  const [markers, setMarkers] = useState<MarkerPoint[]>([]);

  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setMarkers([...markers, { lat, lng, id: uuidv4() }]);
      },
    });

    return null; // Não renderiza nada, apenas anexa eventos
  };

  const removeMarker = (id: string) => {
    setMarkers(markers.filter((m) => m.id !== id));
  };

  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/atoms/mapBox"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return <div>
      <Map handleClickMarker={removeMarker}
        className={`${className}`}
        markers={markers.map((marker) => marker)}
        mapEvent={<MapEvents />} /> 
    </div>
}
