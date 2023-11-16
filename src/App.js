import { Fragment } from "react";

import Expenses from "./components/Expenses";
import Header from "./components/Header.js";
import Location from "./components/Locations/Location.js";
import LocationContext from "./store/location-context.js";

function App() {
  return (
    <LocationContext.Provider>
      <Header />
      <Location />
      <Expenses />
    </LocationContext.Provider>
  );
}

export default App;
