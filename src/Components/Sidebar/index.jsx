import { useRef } from "react";
import { Link } from "react-router-dom";
import Icons from "../../Assets/icons";
import NavItemExpandable from "../NavItem/NavItemExpandable";

const PRODUCT_ROUTES = [
  {
    label: "Create Product",
    to: "/dashboard/products/create",
    id: "createProduct",
  },
  {
    label: "Manage Products",
    to: "/dashboard/products",
    id: "manageProducts",
  },
];
const OFFER_ROUTES = [
  {
    label: "Create Offer",
    to: "/dashboard/offers/create",
    id: "createProduct",
  },
  {
    label: "Manage Offers",
    to: "/dashboard/offers",
    id: "manageOffers",
  },
];

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

      <NavItemExpandable
        id="products"
        label="Products"
        routes={PRODUCT_ROUTES}
      />
      <NavItemExpandable id="offer" label="Offers" routes={OFFER_ROUTES} />

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
