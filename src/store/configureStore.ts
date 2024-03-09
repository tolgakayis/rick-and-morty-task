import { homepageReducer } from "./homepage/homepageSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "./loading/loadingSlice";

const rootReducer = combineReducers({
	homepage: homepageReducer,
	loading: loadingReducer,
});

export type AppDispatch = typeof store.dispatch;
export const store = configureStore({ reducer: rootReducer });
