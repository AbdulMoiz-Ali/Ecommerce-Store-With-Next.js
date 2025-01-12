"use client";

import { store, persistor } from "../redux/store";
import { Provider } from "react-redux";
import React from "react";
import { PersistGate } from "redux-persist/integration/react";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>{children}</PersistGate></Provider>;
}
