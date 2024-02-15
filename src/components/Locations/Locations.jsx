import { useState, useEffect, Fragment } from "react";
import React from "react";

import "../../assets/stylesheets/Locations/Locations.css";

import LocationForm from "./LocationForm";
import LocationList from "./LocationList";
import Hint from "../UI/Hint";

const GEOCODING_API_KEY = "845ebdcc2d794f9785f968141732d5d9";

const Locations = (props) => {
  const { setCurrency, enableForms } = props;

  const [address, setAddress] = useState();
  const [geoResponse, setGeoResponse] = useState([]);

  const [firstLoad, setFirstLoad] = useState(true);
  const [showList, setShowList] = useState(false);
  const [searching, setSearching] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const addressHandler = (address) => {
    setFirstLoad(false);
    setAddress(address);
  };

  useEffect(() => {
    if (firstLoad) {
      return;
    }

    async function fetchLocation() {
      try {
        setError(false);
        setSearching(true);

        const res = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${GEOCODING_API_KEY}`
        );
        const resData = await res.json();

        console.log(resData);

        const returnedLocations = [];
        resData.results.map((data) => {
          setCurrency(data.annotations.currency.iso_code);
          returnedLocations.push({
            address: data.formatted,
            lat: data.geometry.lat,
            lng: data.geometry.lng,
            flag: data.annotations.flag,
          });
        });

        if (returnedLocations.length > 0) {
          setShowList(true);
        }
        setSearching(false);
        setGeoResponse(returnedLocations);
      } catch (error) {
        setSearching(false);
        setErrorMessage(error.message);
        setError(true);
      }
    }
    fetchLocation();
  }, [address]);

  return (
    <Fragment>
      <div className="form-container">
        <h2>Discover your next destination with DestiNav</h2>
        <LocationForm onAddress={addressHandler} />
      </div>
      {searching && <Hint />}
      {error && <Hint message={errorMessage} />}
      {showList && !searching && (
        <LocationList addresses={geoResponse} enableForms={enableForms} />
      )}
    </Fragment>
  );
};

export default Locations;
