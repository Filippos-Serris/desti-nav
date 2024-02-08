import { useContext } from "react";

import "../../assets/stylesheets/Locations/Location.css";

import LocationContext from "../../store/location-context";

const Location = (props) => {
  const { address, enableForms } = props;
  const locationCtx = useContext(LocationContext);

  const locationHandler = () => {
    enableForms();
    locationCtx.setSelectedLocation(props.address);
  };

  return (
    <div className="location-container">
      <li>
        <div className="location">
          <p className="address">{address.address}</p>
          <p className="flag">{address.flag}</p>
        </div>

        <button onClick={locationHandler}>Select</button>
      </li>
    </div>
  );
};

export default Location;
