import { Fragment, useState } from "react";

import background from "./assets/img/background.jpg";
import LandmarksBackground from "./assets/img/landmarks.jpg";
import DiningBackground from "./assets/img/dining.jpg";
import CoffeeBackground from "./assets/img/coffee.jpg";
import DrinksBackground from "./assets/img/drinking.jpg";
import ActivitiesBackground from "./assets/img/activities.jpg";

import Header from "./components/UI/Header";
import Locations from "./components/Locations/Locations";
import LocationContext from "./store/location-context.js";
import RadiusSearch from "./components/RadiusSearch/RadiusSearch";
import Weather from "./components/Weather/Weather";
import Currency from "./components/Currency/Currency.jsx";
import Footer from "./components/UI/Footer";

function App() {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [currency, setCurrency] = useState();

  const handleSelectedLocation = (selectedLocation) => {
    ctxValue.address = selectedLocation.address;
    ctxValue.lat = selectedLocation.lat;
    ctxValue.lng = selectedLocation.lng;
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

  const radiusSearchSpecifications = [
    {
      id: "landmarks",
      background: LandmarksBackground,
      title: "Landmarks",
      quote: "Grab your camera and go",
      pointsOfInterest: landmarks,
    },
    {
      id: "dining",
      background: DiningBackground,
      title: "Dining",
      quote: "Hungry for a good time? Join the table!",
      pointsOfInterest: foods,
    },
    {
      id: "drinks",
      background: DrinksBackground,
      title: "Drinks",
      quote:
        "Cocktail o'clock: Where the hours are short and the drinks are tall",
      pointsOfInterest: drinks,
    },
    {
      id: "coffee",
      background: CoffeeBackground,
      title: "Coffee",
      quote: "Coffee: because Mondays happen every week",
      pointsOfInterest: coffee,
    },
    {
      id: "activities",
      background: ActivitiesBackground,
      title: "Activities",
      quote: "Let the adventure begin!",
      pointsOfInterest: activities,
    },
  ];

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
      <Header menuOn={true /*searchesActivated*/} />
      <div className="backgroundDivStyle">
        <LocationContext.Provider value={ctxValue}>
          <Locations setCurrency={setCurrency} />

          {radiusSearchSpecifications.map((data) => (
            <RadiusSearch
              key={data.id}
              id={data.id}
              background={data.background}
              title={data.title}
              quote={data.quote}
              pointsOfInterest={data.pointsOfInterest}
              buttonDisabled={buttonDisabled}
            />
          ))}

          <Weather id="weather" buttonDisabled={buttonDisabled} />
          <Currency
            id="currency"
            currency={currency}
            buttonDisabled={buttonDisabled}
          />
        </LocationContext.Provider>
      </div>

      <Footer />
      <div style={backgroundDivStyle}></div>
    </Fragment>
  );
}

export default App;
