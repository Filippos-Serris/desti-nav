import { useEffect, useState } from "react";

import "../../assets/stylesheets/RadiusSearch/Object.css";

import ObjectModal from "../UI/ObjectModal";

const API_KEY = "5ae2e3f221c38a28845f05b6489e6f49a73600131a4aece3c12d2d07";

const Object = (props) => {
  const { object } = props;
  const [firstLoad, setFirstLoad] = useState(true);
  const [search, setSearch] = useState(false);
  const [objectReady, setObjectReady] = useState(false);
  const [returnedInformation, setReturnedInformation] = useState({});
  const gridColum = Math.floor(Math.random() * (2 - 1 + 1)) + 1;

  const searchHandler = (event) => {
    event.preventDefault();
    setFirstLoad(false);
    setSearch(true);
  };

  const closeObject = () => {
    setSearch(false);
  };

  useEffect(() => {
    if (firstLoad) {
      return;
    }

    async function fetchDetails() {
      const res = await fetch(
        `https://api.opentripmap.com/0.1/en/places/xid/${object.id}?apikey=${API_KEY}`
      );
      const resData = await res.json();

      setReturnedInformation({
        name: resData.name,
        road: resData.address.road,
        neighbourhood: resData.address.neighbourhood,
        kinds: resData.kinds,
        rate: resData.rate,
        url: resData.otm,
      });

      setObjectReady(true);
    }
    fetchDetails();
  }, [firstLoad]);

  return (
    <div
      className="object-item"
      style={{ gridRow: `span 1`, gridColumn: `span ${gridColum}` }}
    >
      <li>
        <h2>{object.name}</h2>
        <div>
          <p>Tell me more</p>
          <button onClick={searchHandler} />
        </div>
      </li>
      {search && (
        <ObjectModal
          object={{ ...returnedInformation, distance: object.distance }}
          closeObject={closeObject}
          objectReady={objectReady}
        />
      )}
    </div>
  );
};

export default Object;
