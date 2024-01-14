import { useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function NavItemExpandable({
  id = "",
  label = "",
  routes = [],
}) {
  const navItemRef = useRef(null);

  function handleNavItemToggle() {
    const anchor = navItemRef.current.querySelector("a");
    const magicContainer = navItemRef.current.querySelector(`div#${id}`);
    // CLOSE
    if (magicContainer.classList.contains("show")) {
      magicContainer.classList.remove("show");
      anchor.classList.add("collapsed");
      anchor.setAttribute("aria-expanded", false);
    }
    // OPEN
    else {
      magicContainer.classList.add("show");
      anchor.classList.remove("collapsed");
      anchor.setAttribute("aria-expanded", true);
    }
  }

  return (
    <li className="nav-item" ref={navItemRef} onClick={handleNavItemToggle}>
      <a
        className={"nav-link collapsed"}
        href="#"
        data-toggle="collapse"
        data-target={`#${id}`}
        aria-expanded={false}
        aria-controls={id}
      >
        <span className="col-6">{label}</span>
      </a>
      <div id={id} className={"collapse"}>
        <div className="bg-white py-2 collapse-inner rounded">
          {routes.map((route, index) => (
            <Link
              className="collapse-item"
              to={route.to}
              key={`${route.id}-${index}`}
            >
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </li>
  );
}

NavItemExpandable.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  routes: PropTypes.array,
};
