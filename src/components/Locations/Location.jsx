import { useContext } from "react";

import "./Location.css";

import LocationContext from "../../store/location-context";

const Location = (props) => {
  const locationCtx = useContext(LocationContext);

  const locationHandler = () => {
    locationCtx.setSelectedLocation(props.address);
  };

  return (
    <div className="location-container">
      <li>
        <div className="location">
          <p className="address">{props.address.address}</p>
          <p className="flag">{props.address.flag}</p>
        </div>

        <button onClick={locationHandler}>Select</button>
      </li>
    </div>
  );
};

export default Location;
