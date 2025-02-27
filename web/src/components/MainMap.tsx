import { useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import { Map, NavigationControl, Marker } from "react-map-gl/mapbox";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export const accessToken = (mapboxgl.accessToken =
  import.meta.env.VITE_MAPBOX_TOKEN);

const MainMap = ({
  currentViewData,
  setSelectedLocationData,
  setIsModalOpen,
}) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 39.94596,
    longitude: -75.15654,
    zoom: 8,
  });

  const handleMapClick = useCallback(
    ({ lngLat: { lng, lat } }) => {
      if (!mapLoaded) return;

      setSelectedLocationData([lng, lat]);
      setIsModalOpen(true);
    },
    [mapLoaded]
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
      {currentViewData.map((location) => (
        <Marker
          key={location.id}
          longitude={location.coordinates[0]}
          latitude={location.coordinates[1]}
          color="red"
        />
      ))}
    </Map>
  );
};

export default MainMap;
