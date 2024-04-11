import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Hotel {
  id: string;
  name: string;
  freeBreakfast: boolean;
  favorite: boolean;
  description?: string;
  image: string;
  price: number;
  location: string;
}

interface HotelState {
  hotels: Hotel[];
}

const initialState: HotelState = {
  hotels: [],
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    setHotels(state, action: PayloadAction<Hotel[]>) {
      state.hotels = action.payload;
    },
    addToFavorites(state, action: PayloadAction<string>) {
      const hotelId = action.payload;
      const hotel = state.hotels.find((hotel) => hotel.id === hotelId);
      if (hotel) {
        hotel.favorite = true;
      }
    },
    removeFromFavorites(state, action: PayloadAction<string>) {
      const hotelId = action.payload;
      const hotel = state.hotels.find((hotel) => hotel.id === hotelId);
      if (hotel) {
        hotel.favorite = false;
      }
    },
  },
});

export const { setHotels, addToFavorites, removeFromFavorites } = hotelSlice.actions;
export default hotelSlice.reducer;
