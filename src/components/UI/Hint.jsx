import "../../assets/stylesheets/UI/Hint.css";

const Searching = (props) => {
  const { message } = props;
  return <p className="searching">{message ? message : "Searching..."}</p>;
};

export default Searching;
