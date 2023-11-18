import { Fragment } from "react";
import Expenses from "./components/Expenses";
import Header from "./components/Header.js";
import Locations from "./components/Locations/Locations.js";
import LocationContext from "./store/location-context.js";

function App() {
  const handleSelectedLocation = (selectedLocation) => {
    ctxValue.address = selectedLocation.address;
    ctxValue.lat = selectedLocation.lat;
    ctxValue.lng = selectedLocation.lng;

    console.log(
      `Ctx Values => Address:${ctxValue.address},  Lat:${ctxValue.lat},  Lng:${ctxValue.lng}`
    );
  };

  const ctxValue = {
    address: null,
    lat: null,
    lng: null,
    setSelectedLocation: handleSelectedLocation,
  };

  return (
    <Fragment>
      <Header />
      <LocationContext.Provider value={ctxValue}>
        <Locations />
      </LocationContext.Provider>
      <Expenses />
    </Fragment>
  );
}

export default App;
