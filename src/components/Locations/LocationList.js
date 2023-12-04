import "./LocationList.css";

import Location from "./Location";
const LocationList = (props) => {
  return (
    <ul className="location-list">
      {props.addresses.map((data) => (
        <Location
          key={data.address}
          address={data}
          locationSet={props.locationSet}
        />
      ))}
    </ul>
  );
};

export default LocationList;
