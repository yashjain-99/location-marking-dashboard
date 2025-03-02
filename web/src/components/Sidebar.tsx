import Map, { Marker } from "react-map-gl/mapbox";
import { useAppSelector } from "../redux/hooks";
import { useKeycloakContext } from "../contexts/KeycloakProvider";

const Sidebar = () => {
  const mapboxAccessToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const user = useAppSelector((state) => state.user.user);
  const { keyCloak: keycloak } = useKeycloakContext();
  const handleLogout = () => {
    keycloak?.logout();
  };

  const locations = useAppSelector((state) => state.location.locations);

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
          {locations.length} results
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {locations.map((location) => (
          <div
            key={location.id}
            className="flex-shrink-0 h-56 bg-gray-100 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="h-40">
              <Map
                style={{ width: "100%", height: "100%" }}
                zoom={3}
                initialViewState={{
                  longitude: location.long,
                  latitude: location.lat,
                  zoom: 14,
                }}
                mapboxAccessToken={mapboxAccessToken}
                mapStyle="mapbox://styles/ernebuta/ck6l5q6me1dmn1ip74713pndm"
                scrollZoom={false}
              >
                <Marker
                  longitude={location.long}
                  latitude={location.lat}
                  color="red"
                />
              </Map>
            </div>
            <div className="p-3">
              <p className="font-semibold text-lg font-sans">
                {location.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
