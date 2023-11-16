import { createContext } from "react";

const LocationContext = createContext({
  street: null,
  postal: null,
  country: null,
  city: null,
  latitude: null,
  longitude: null,
});

export default LocationContext;
