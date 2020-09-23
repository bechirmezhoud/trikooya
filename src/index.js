import { FirebaseAppProvider } from "reactfire";
import React from "react";
import ReactDOM from "react-dom";
import { SuspenseWithPerf } from "reactfire";

import App from "./App";
import Loader from "./components/Loader";
import { BasketProvider } from "./BasketProvider";

const firebaseConfig = {
  apiKey: "AIzaSyBwibRIFp5natSDozevIIc7TLUbaJ3w0HI",
  authDomain: "trikooya-c7332.firebaseapp.com",
  databaseURL: "https://trikooya-c7332.firebaseio.com",
  projectId: "trikooya-c7332",
  storageBucket: "trikooya-c7332.appspot.com",
  messagingSenderId: "229448912247",
  appId: "1:229448912247:web:0d15de33a8ab5466a6e572",
  measurementId: "G-B72SMSNCBL"
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <SuspenseWithPerf fallback={<Loader />}>
      <React.StrictMode>
        <BasketProvider>
          <App />
        </BasketProvider>
      </React.StrictMode>
    </SuspenseWithPerf>
  </FirebaseAppProvider>,
  rootElement
);
