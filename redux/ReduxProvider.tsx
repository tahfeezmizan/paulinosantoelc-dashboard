"use client";
import { persister, store } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>{children}</PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
