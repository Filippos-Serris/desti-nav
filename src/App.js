import { Fragment, useState } from "react";

import background from "./assets/background.jpg";
import LandmarksBackground from "./assets/landmarks.jpg";
import DiningBackground from "./assets/dining.jpg";
import CoffeeBackground from "./assets/coffee.jpg";
import DrinksBackground from "./assets/drinking.jpg";
import ActivitiesBackground from "./assets/activities.jpg";

import Header from "./components/UI/Header.js";
import Locations from "./components/Locations/Locations.js";
import LocationContext from "./store/location-context.js";
import RadiusSearch from "./components/RadiusSearch/RadiusSearch.js";
import Weather from "./components/Weather/Weather.js";
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

  const backgroundDivStyle = {
    position: "fixed",
    backgroundSize: "cover",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundImage: `url(${background})`,
    zIndex: "-1",
    filter: "blur(8px)",
  };

  return (
    <Fragment>
      <Header menuOn={searchesActivated} />
      <div className="backgroundDivStyle">
        <LocationContext.Provider value={ctxValue}>
          <Locations locationSet={handleSearchesActivation} />

          {searchesActivated && (
            <Fragment>
              <RadiusSearch
                id="landmarks"
                background={LandmarksBackground}
                title={"Landmarks"}
                quote={"Grab your camera and go"}
                pointsOfInterest={landmarks}
              />
              <RadiusSearch
                id="dining"
                background={DiningBackground}
                title={"Dining"}
                quote={"Hungry for a good time? Join the table!"}
                pointsOfInterest={foods}
              />
              <RadiusSearch
                id="drinks"
                background={DrinksBackground}
                title={"Drinks"}
                quote={
                  "Cocktail o'clock: Where the hours are short and the drinks are tall"
                }
                pointsOfInterest={drinks}
              />
              <RadiusSearch
                id="coffee"
                background={CoffeeBackground}
                title={"Coffee"}
                quote={"Coffee: because Mondays happen every week"}
                pointsOfInterest={coffee}
              />
              <RadiusSearch
                id="activities"
                background={ActivitiesBackground}
                title={"Activities"}
                quote={"Let the adventure begin!"}
                pointsOfInterest={activities}
              />

              <Weather id="weather" />
              <Currency id="currency" />
            </Fragment>
          )}
        </LocationContext.Provider>
      </div>

      <Footer></Footer>
      <div style={backgroundDivStyle}></div>
    </Fragment>
  );
}

export default App;
