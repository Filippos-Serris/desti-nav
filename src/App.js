import { Fragment, useState } from "react";

import Header from "./components/UI/Header.js";
import Locations from "./components/Locations/Locations.js";
import LocationContext from "./store/location-context.js";
import RadiusSearch from "./components/RadiusSearch/RadiusSearch.js";
import Weather from "./components/Weather.js";
import Currency from "./components/Currency.js";
import Footer from "./components/UI/Footer.js";

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
  const activities = "amusements";

  return (
    <Fragment>
      <Header menuOn={searchesActivated} />

      <LocationContext.Provider value={ctxValue}>
        <Locations locationSet={handleSearchesActivation} />

        {searchesActivated && (
          <Fragment>
            <RadiusSearch
              id="landmarks"
              title={"Landmarks"}
              pointsOfInterest={landmarks}
            />
            <RadiusSearch
              id="dining"
              title={"Dining"}
              pointsOfInterest={foods}
            />
            <RadiusSearch
              id="drinks"
              title={"Drinks"}
              pointsOfInterest={drinks}
            />
            <RadiusSearch
              id="coffee"
              title={"Coffee"}
              pointsOfInterest={coffee}
            />
            <RadiusSearch
              id="activities"
              title={"Activities"}
              pointsOfInterest={activities}
            />

            <Weather id="weather" />
            <Currency />
          </Fragment>
        )}
      </LocationContext.Provider>

      <Footer></Footer>
    </Fragment>
  );
}

export default App;
