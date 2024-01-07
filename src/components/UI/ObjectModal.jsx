import { Fragment } from "react";
import ReactDOM from "react-dom";

import "../../assets/stylesheets/UI/ObjectModal.css";

const API_KEY = "5ae2e3f221c38a28845f05b6489e6f49a73600131a4aece3c12d2d07";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.closeObject}></div>;
};

const ModalOverlay = (props) => {
  const distance = props.object.distance / 1000;
  return (
    <div className="modal">
      <h2 className="name">{props.object.name}</h2>

      <div className="info-container">
        <p className="object-address">{props.object.address}</p>
        <div className="object-distance">
          <h3>Distance</h3>
          <p>{`${distance.toFixed(1)}km`}</p>
        </div>

        <p className="object-rate">{`Rate: ${props.object.rate}`}</p>
      </div>

      <div className="kinds">
        <p>{props.object.kinds}</p>
      </div>

      <a href={props.object.url} target="_blank">
        Click here fro more info
      </a>
      <button onClick={props.closeObject}>Close</button>
    </div>
  );
};

const ObjectModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop closeObject={props.closeObject} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay object={props.object} closeObject={props.closeObject} />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default ObjectModal;
