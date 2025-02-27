import { useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import { useAppSelector } from "../redux/hooks";

const Sidebar = () => {
  const mapboxAccessToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const user = useAppSelector((state) => state.user.user);
  const [currentViewData] = useState([
    {
      id: "1",
      description: "Location 1",
      coordinates: [139.6917, 35.6895],
    },
    {
      id: "2",
      description: "Location 2",
      coordinates: [-0.1278, 51.5074],
    },
    {
      id: "3",
      description: "Location 3",
      coordinates: [-74.006, 40.7128],
    },
    {
      id: "4",
      description: "Location 4",
      coordinates: [77.209, 28.6139],
    },
    {
      id: "5",
      description: "Location 5",
      coordinates: [151.2093, -33.8688],
    },
    {
      id: "6",
      description: "Location 6",
      coordinates: [31.2357, 30.0444],
    },
    {
      id: "7",
      description: "Location 7",
      coordinates: [-43.1729, -22.9068],
    },
    {
      id: "8",
      description: "Location 8",
      coordinates: [37.6173, 55.7558],
    },
    {
      id: "9",
      description: "Location 9",
      coordinates: [2.3522, 48.8566],
    },
    {
      id: "10",
      description: "Location 10",
      coordinates: [-79.3832, 43.6532],
    },
  ]);

  const handleLogout = () => {
    user?.logout();
  };

  return (
    <div className="absolute lg:static top-0 p-4 w-full lg:w-96 shadow-xl z-10 overflow-scroll lg:z-30 h-full lg:h-auto bg-white">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl text-black font-semibold font-sans">
          Hi, {user?.name}
        </div>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

      <hr className="border-t border-gray-300 mb-4" />

      <div className="text-xl text-black font-bold italic w-full mb-1.5 font-serif">
        Find your favourites below
      </div>
      <div className="mb-4">
        <div className="font-medium text-gray-500 font-sans">
          {currentViewData.length} results
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {currentViewData.map((map) => (
          <div
            key={map.id}
            className="flex-shrink-0 h-56 bg-gray-100 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="h-40">
              <Map
                style={{ width: "100%", height: "100%" }}
                zoom={3}
                initialViewState={{
                  longitude: map.coordinates[0],
                  latitude: map.coordinates[1],
                  zoom: 14,
                }}
                mapboxAccessToken={mapboxAccessToken}
                mapStyle="mapbox://styles/ernebuta/ck6l5q6me1dmn1ip74713pndm"
                scrollZoom={false}
              >
                <Marker
                  longitude={map.coordinates[0]}
                  latitude={map.coordinates[1]}
                  color="red"
                />
              </Map>
            </div>
            <div className="p-3">
              <p className="font-semibold text-lg font-sans">
                {map.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
