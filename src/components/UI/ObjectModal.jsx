import { Fragment } from "react";
import ReactDOM from "react-dom";

import "../../assets/stylesheets/UI/ObjectModal.css";

const API_KEY = "5ae2e3f221c38a28845f05b6489e6f49a73600131a4aece3c12d2d07";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.closeObject}></div>;
};

const ModalOverlay = (props) => {
  const { object, closeObject } = props;
  const distance = object.distance / 1000;

  const address = `${
    object.road === undefined ? "Road information not available" : object.road
  }, ${
    object.neighbourhood === undefined
      ? "neighbourhood information not available"
      : object.neighbourhood
  }`;

  //object.kinds.replace(/_/g, " ").split(",");
  const kindsArray = object.kinds.replace(/_/g, " ").split(",");

  return (
    <div className="modal">
      <h2 className="name">{object.name}</h2>

      <div className="info-container">
        <p className="object-address">{address}</p>
        <div className="object-distance">
          <h3>Distance</h3>
          <p>{`${distance.toFixed(1)}km`}</p>
        </div>

        <p className="object-rate">{`Rate: ${object.rate}`}</p>
      </div>

      <ul className="kinds-list">
        {kindsArray.map((data) => (
          <li key={data} className="kind">
            {data}
          </li>
        ))}
      </ul>

      <a href={object.url} target="_blank">
        Click here fro more info
      </a>
      <button onClick={closeObject}>Close</button>
    </div>
  );
};

const ObjectModal = (props) => {
  const { object, closeObject, objectReady } = props;
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop closeObject={closeObject} />,
        document.getElementById("backdrop-root")
      )}

      {objectReady ? (
        ReactDOM.createPortal(
          <ModalOverlay object={object} closeObject={closeObject} />,
          document.getElementById("overlay-root")
        )
      ) : (
        <p className="modal">Loading</p>
      )}
    </Fragment>
  );
};

export default ObjectModal;
