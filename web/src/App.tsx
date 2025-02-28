import { useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import useAuth from "./hooks/useAuth";
import MainMap from "./components/MainMap";
import AddToFavModal from "./components/AddToFavModal";
import Sidebar from "./components/Sidebar";
import useFetchLocations from "./hooks/useFetchLocations";

export default function App() {
  const isLoggedIn = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { locationData, loading, error } = useFetchLocations(isLoggedIn);

  if (!isLoggedIn) return "Please log in";

  if (loading) return "Loading...";
  if (error) return "Error fetching locations. Please try again later.";

  return (
    <>
      <main className="flex flex-col h-screen w-screen">
        <div className="relative lg:flex grow shrink min-h-0">
          <div className="grow shrink-0 relative h-full lg:h-auto z-30">
            <MainMap setIsModalOpen={setIsModalOpen} />
          </div>
          <Sidebar currentViewData={locationData} />
        </div>
        <AddToFavModal
          isModalOpen={isModalOpen}
          closeModal={() => {
            setIsModalOpen(false);
          }}
        />
      </main>
    </>
  );
}
