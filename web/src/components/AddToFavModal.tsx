import { useState } from "react";
import Modal from "react-modal";
import { Map, Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import usePrivateAxios from "../hooks/usePrivateAxios";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { setLocations } from "../redux/slices/locationsSlice";
import { CSSProperties } from "react";

const customStyles: { content: CSSProperties; overlay: CSSProperties } = {
  content: {
    top: "62px",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, 0)",
    zIndex: "50",
    borderRadius: "18px",
    padding: "20px",
    width: "600px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  overlay: {
    backgroundColor: "#32323270",
    zIndex: "40",
  },
};

Modal.setAppElement("#root");

const AddToFavModal = ({
  isModalOpen,
  closeModal,
}: {
  isModalOpen: boolean;
  closeModal: () => void;
}) => {
  const [description, setDescription] = useState("");
  const mapboxAccessToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const API_URL = `${import.meta.env.VITE_API_DOMAIN}:${
    import.meta.env.VITE_API_PORT
  }/api/locations`;

  const axios = usePrivateAxios();
  const selectedLocation = useAppSelector(
    (state) => state.location.selectedLocations
  );
  const dispatch = useDispatch();
  if (!selectedLocation) return;
  const { lat: latitude, lng: longitude } = selectedLocation!;

  const handleSave = async () => {
    try {
      axios
        .post(API_URL, {
          lat: latitude,
          long: longitude,
          description,
        })
        .then((res) => {
          dispatch(setLocations(res.data));
        })
        .catch(() => console.log("err saving data"));
      closeModal();
    } catch (err) {
      console.error("Failed to save location:", err);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Add this location to favourites"
    >
      <div className="flex gap-4">
        <div className="w-1/2 h-64">
          <Map
            initialViewState={{
              latitude,
              longitude,
              zoom: 12,
            }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={mapboxAccessToken}
          >
            <Marker longitude={longitude} latitude={latitude} color="red" />
          </Map>
        </div>

        <div className="w-1/2 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={closeModal}
              className="flex-1 p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddToFavModal;
