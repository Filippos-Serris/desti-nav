import { createContext } from "react";

const LocationContext = createContext({
  address: null,
  lat: null,
  lng: null,
  setSelectedLocation: () => {},
});

export default LocationContext;
