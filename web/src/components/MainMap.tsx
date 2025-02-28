import { useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import { Map, NavigationControl, Marker } from "react-map-gl/mapbox";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSelectedLocations } from "../redux/slices/locationsSlice";

export const accessToken = (mapboxgl.accessToken =
  import.meta.env.VITE_MAPBOX_TOKEN);

interface MainMapProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

const MainMap = ({ setIsModalOpen }: MainMapProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const locations = useAppSelector((state) => state.location.locations);
  const [viewport, setViewport] = useState({
    latitude: locations[0]?.lat ?? undefined,
    longitude: locations[0]?.long ?? undefined,
    zoom: 8,
  });

  const handleMapClick = useCallback(
    ({ lngLat: { lng, lat } }: { lngLat: { lng: number; lat: number } }) => {
      if (!mapLoaded) return;
      dispatch(setSelectedLocations({ lng, lat }));
      setIsModalOpen(true);
    },
    [mapLoaded, dispatch, setIsModalOpen]
  );

  return (
    <Map
      {...viewport}
      projection={"globe"}
      fog={{
        color: "rgb(186, 210, 235)",
        "high-color": "rgb(36, 92, 223)",
        "horizon-blend": 0.02,
        "space-color": "rgb(11, 11, 25)",
        "star-intensity": 0.6,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onMove={(evt) => setViewport(evt.viewState)}
      onClick={handleMapClick}
      onLoad={() => setMapLoaded(true)}
      mapboxAccessToken={accessToken}
      style={{ width: "100%", height: "100%" }}
    >
      <NavigationControl />
      {locations.map((location) => (
        <Marker
          key={location.id}
          longitude={location.long}
          latitude={location.lat}
          color="red"
        />
      ))}
    </Map>
  );
};

export default MainMap;
