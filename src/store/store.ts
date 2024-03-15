import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todosReducer from "./reducers/TodosSlice";

const rootReducers = combineReducers({ todosReducer });

export const setupStore = () => {
  return configureStore({ reducer: rootReducers });
};

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const store = setupStore();
