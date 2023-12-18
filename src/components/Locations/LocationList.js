import "./LocationList.css";

import Location from "./Location";

const LocationList = (props) => {
  return (
    <div className="location-list-container">
      <h2>Where are you</h2>
      <ul className="location-list">
        {props.addresses.map((data) => (
          <Location
            key={data.address}
            address={data}
            locationSet={props.locationSet}
          />
        ))}
      </ul>
    </div>
  );
};

export default LocationList;
