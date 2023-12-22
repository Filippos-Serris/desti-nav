import "./Location.css";

import { useContext } from "react";
import LocationContext from "../../store/location-context";
import Card from "../UI/Card";

const Location = (props) => {
  const locationCtx = useContext(LocationContext);

  const locationHandler = () => {
    props.locationSet();
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
