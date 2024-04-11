import { configureStore } from "@reduxjs/toolkit";
import hotelSlicer from "./hotelSlicer";

export const store = configureStore({
    reducer: {
        hotels: hotelSlicer,
    },
});

export type RootState = ReturnType<typeof store.getState>;