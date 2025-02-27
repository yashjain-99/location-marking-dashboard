import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import useAuth from "./hooks/useAuth";
import MainMap from "./components/MainMap";
import { useState } from "react";
import AddToFavModal from "./components/AddToFavModal";

export default function App() {
  const [isLogin, token] = useAuth();
  const mapboxAccessToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const [selectedLocationData, setSelectedLocationData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentViewData, setCurrentViewData] = useState([
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

  if (!isLogin) return "please log in";

  return (
    <>
      <main className="flex flex-col h-screen w-screen">
        <div className="relative lg:flex grow shrink min-h-0">
          <div className="grow shrink-0 relative h-full lg:h-auto z-30">
            <MainMap
              currentViewData={currentViewData}
              setSelectedLocationData={setSelectedLocationData}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
          <div className="absolute lg:static top-0 p-4 w-full lg:w-96 shadow-xl z-10 overflow-scroll lg:z-30 h-full lg:h-auto bg-white">
            <div className="text-2xl text-black font-semibold w-full mb-1.5">
              Your Favourites
            </div>
            <div className="mb-4">
              <div className="font-medium text-gray-500">
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
                    <p className="font-semibold text-lg">{map.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <AddToFavModal
          isModalOpen={isModalOpen}
          coordinates={selectedLocationData}
          closeModal={() => {
            setIsModalOpen(false);
          }}
        />
      </main>
    </>
  );
}
