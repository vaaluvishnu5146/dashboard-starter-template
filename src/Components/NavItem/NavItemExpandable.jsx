import { useRef } from "react";

export default function NavItemExpandable({ id = "", label = "" }) {
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
          <h6 className="collapse-header">Custom Components:</h6>
          <a className="collapse-item" href="buttons.html">
            Buttons
          </a>
          <a className="collapse-item" href="cards.html">
            Cards
          </a>
        </div>
      </div>
    </li>
  );
}

NavItemExpandable.propTypes = {
  id: String,
  label: String,
};
