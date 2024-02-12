import { useEffect, useState, useContext, Fragment } from "react";

import "../../assets/stylesheets/RadiusSearch/RadiusSearch.css";

import RadiusSearchForm from "./RadiusSearchForm";
import ObjectList from "./ObjectList";
import LocationContext from "../../store/location-context";
import Searching from "../UI/Searching";

const API_KEY = "5ae2e3f221c38a28845f05b6489e6f49a73600131a4aece3c12d2d07";

const RadiusSearch = (props) => {
  const { id, background, title, quote, pointsOfInterest, buttonDisabled } =
    props;
  const [apiResponse, setApiResponse] = useState([]);
  const [params, setParams] = useState({});

  const [firstLoad, setFirstLoad] = useState(true);
  const [objectLIstActive, setObjectListActive] = useState(false);
  const [searching, setSearching] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const ctxLocation = useContext(LocationContext);

  const paramsHandler = (params) => {
    setFirstLoad(false);
    setParams({
      id: params.id,
      radius: params.radius,
      limit: params.limit,
      rate: params.rate,
    });
  };

  useEffect(() => {
    if (firstLoad) {
      return;
    }

    async function fetchObjects() {
      try {
        setSearching(true);

        const res = await fetch(
          `https://api.opentripmap.com/0.1/en/places/radius?radius=${params.radius}&lon=${ctxLocation.lng}&lat=${ctxLocation.lat}&kinds=${pointsOfInterest}&rate=${params.rate}&format=json&limit=${params.limit}&apikey=${API_KEY}`
        );
        const resData = await res.json();

        const returnedObjects = [];

        if (Array.isArray(resData)) {
          resData.map((data) =>
            returnedObjects.push({
              id: data.xid,
              name: data.name,
              distance: data.dist,
              lng: data.point.lon,
              lat: data.point.lat,
            })
          );
        }

        setSearching(false);
        setObjectListActive(true);
        setApiResponse(returnedObjects);
        setError(false);
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
      }
    }
    fetchObjects();
  }, [params]);

  return (
    <Fragment>
      <div
        className="search-container"
        style={{ backgroundImage: `url(${background})` }}
      >
        <h2 id={id}>{title}</h2>
        <div className="search-form">
          <p>{quote}</p>
          <RadiusSearchForm
            onSearch={paramsHandler}
            buttonDisabled={buttonDisabled}
          />
        </div>
      </div>
      {searching && <Searching />}
      {error && <p>{errorMessage}</p>}
      {objectLIstActive && <ObjectList objects={apiResponse} />}
    </Fragment>
  );
};

export default RadiusSearch;
