import { Fragment, useState } from "react";

import Header from "./components/UI/Header.js";
import Locations from "./components/Locations/Locations.js";
import LocationContext from "./store/location-context.js";
import RadiusSearch from "./components/RadiusSearch/RadiusSearch.js";
import Weather from "./components/Weather.js";

function App() {
  const [searchesActivated, setSearchesActivated] = useState(false);

  const handleSearchesActivation = () => {
    setSearchesActivated(true);
  };

  const handleSelectedLocation = (selectedLocation) => {
    ctxValue.address = selectedLocation.address;
    ctxValue.lat = selectedLocation.lat;
    ctxValue.lng = selectedLocation.lng;

    console.log(ctxValue);
  };

  const ctxValue = {
    address: null,
    lat: null,
    lng: null,
    setSelectedLocation: handleSelectedLocation,
  };

  const landmarks = "castles,monuments,other_archaeological_sites";
  const foods =
    "fast_food%2Cfood_courts%2Cpicnic_site%2Crestaurants%2Cbakeries";
  const drinks = "bars%2Cpubs";
  const coffee = "cafes";

  return (
    <Fragment>
      <Header />

      <LocationContext.Provider value={ctxValue}>
        <Locations locationSet={handleSearchesActivation} />

        {searchesActivated && (
          <Fragment>
            <RadiusSearch title={"Landmarks"} pointsOfInterest={landmarks} />
            <RadiusSearch title={"Restaurants"} pointsOfInterest={foods} />
            <RadiusSearch title={"Drinks"} pointsOfInterest={drinks} />
            <RadiusSearch title={"Coffee"} pointsOfInterest={coffee} />

            <Weather />
          </Fragment>
        )}
      </LocationContext.Provider>
    </Fragment>
  );
}

export default App;
