import { useRef } from "react";
import { Link } from "react-router-dom";
import Icons from "../../Assets/icons";
import NavItemExpandable from "../NavItem/NavItemExpandable";

export default function Sidebar() {
  const sidebarRef = useRef(null);

  function handleSidebarToggle() {
    if (sidebarRef.current.classList.contains("toggled")) {
      sidebarRef.current.classList.remove("toggled");
    } else {
      sidebarRef.current.classList.add("toggled");
    }
  }

  return (
    <ul
      ref={sidebarRef}
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <div className="sidebar-brand d-flex align-items-center justify-content-center">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">ByOnline</div>
      </div>

      <hr className="sidebar-divider" />

      <li className="nav-item">
        <Link className="nav-link" to="/dashboard/products">
          <i className="fas fa-fw fa-table"></i>
          <span>Products</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/dashboard/settings">
          <i className="fas fa-fw fa-table"></i>
          <span>Settings</span>
        </Link>
      </li>

      <NavItemExpandable id="nav-item-1" label="Nav 1" />
      <NavItemExpandable id="nav-item-2" label="Nav 2" />

      <hr className="sidebar-divider d-none d-md-block" />

      <div className="text-center d-none d-md-inline">
        <button
          className="rounded-circle border-0"
          id="sidebarToggle"
          onClick={handleSidebarToggle}
        >
          <Icons.arrowRight color="#FFFFFF" />
        </button>
      </div>
    </ul>
  );
}
