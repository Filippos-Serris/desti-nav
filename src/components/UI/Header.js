import "./Header.css";

import { Link } from "react-scroll";

const Header = (props) => {
  return (
    <div className="navigation">
      <h2>DestiNav</h2>
      {props.menuOn && (
        <nav>
          <ul>
            <li>
              <Link to="landmarks">Landmarks</Link>
            </li>
            <li>
              <Link to="dining">Dining</Link>
            </li>
            <li>
              <Link to="coffee">Coffee</Link>
            </li>
            <li>
              <Link to="drinks">Drinks</Link>
            </li>
            <li>
              <Link to="activities">Activities</Link>
            </li>
            <li>
              <Link to="weather">Weather</Link>
            </li>
            <li>
              <Link to="currency">Currency</Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Header;
