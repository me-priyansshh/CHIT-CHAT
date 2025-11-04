// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

import userReducer from "./userSlice.js";
import messageReducer from "./messageSlice.js";
import socketReducer from "./socketSlice.js";
import groupsReducer from "./groupsSlice.js";

// Step 1: Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  socket: socketReducer,
  groups: groupsReducer
});

// Step 2: Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // persist only the 'user' slice
};

// Step 3: Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Step 4: Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Step 5: Export store and persistor
export const persistor = persistStore(store);
export default store;
