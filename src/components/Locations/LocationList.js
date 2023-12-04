import Location from "./Location";
const LocationList = (props) => {
  return (
    <ul>
      {props.addresses.map((data) => (
        <Location key={data.address} address={data} />
      ))}
    </ul>
  );
};

export default LocationList;
