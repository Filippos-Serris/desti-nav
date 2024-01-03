import { useState, useEffect, Fragment } from "react";
import React from "react";

import "./Locations.css";

import LocationForm from "./LocationForm";
import LocationList from "./LocationList";

const GEOCODING_API_KEY = "845ebdcc2d794f9785f968141732d5d9";

const Locations = (props) => {
  const [address, setAddress] = useState();
  const [geoResponse, setGeoResponse] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [showList, setShowList] = useState(false);

  const [showError, setShowError] = useState(false);
  const [error, setError] = useState(false);

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
        const res = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${GEOCODING_API_KEY}`
        );
        const resData = await res.json();

        const returnedLocations = [];
        resData.results.map((data) =>
          returnedLocations.push({
            address: data.formatted,
            lat: data.geometry.lat,
            lng: data.geometry.lng,
            flag: data.annotations.flag,
          })
        );
        setShowList(true);
        setGeoResponse(returnedLocations);
        console.log(geoResponse);
      } catch (error) {
        setError(error);
        setShowError(true);
        console.log(error);
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
      {showList && (
        <LocationList locationSet={props.locationSet} addresses={geoResponse} />
      )}
      {showError && <p>FUCK</p>}
    </Fragment>
  );
};

export default Locations;
