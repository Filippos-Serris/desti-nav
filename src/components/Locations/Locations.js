import { useState, useEffect } from "react";
import React from "react";

import LocationForm from "./LocationForm";
import LocationList from "./LocationList";
import Card from "../UI/Card";
import RadiusSearchForm from "../RadiusSearch/RadiusSearchForm";

const GEOCODING_API_KEY = "845ebdcc2d794f9785f968141732d5d9";

const Locations = () => {
  const [address, setAddress] = useState();
  const [geoResponse, setGeoResponse] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);

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

        //console.log(resData);
        resData.results.map((data) =>
          console.log(
            `Address:${data.formatted} Lat:${data.geometry.lat}, Lng:${data.geometry.lng}`
          )
        );

        const returnedLocations = [];
        resData.results.map((data) =>
          returnedLocations.push({
            address: data.formatted,
            lat: data.geometry.lat,
            lng: data.geometry.lng,
          })
        );
        setGeoResponse(returnedLocations);
        //console.log(geoResponse);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLocation();
  }, [address]);

  return (
    <Card>
      <h2>Locations</h2>
      <LocationForm onAddress={addressHandler} />
      <LocationList addresses={geoResponse} />
    </Card>
  );
};

export default Locations;
