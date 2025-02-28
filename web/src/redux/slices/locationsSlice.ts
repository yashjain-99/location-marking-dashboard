import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LocationsState {
  locations: CurrLocation[];
  selectedLocations: undefined | SelectedLocation;
}

const initialState: LocationsState = {
  locations: [],
  selectedLocations: undefined,
};

export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<CurrLocation[]>) => {
      state.locations = action.payload;
    },
    setSelectedLocations: (state, action: PayloadAction<SelectedLocation>) => {
      state.selectedLocations = action.payload;
    },
  },
});

export const { setLocations, setSelectedLocations } = locationsSlice.actions;

export default locationsSlice.reducer;
