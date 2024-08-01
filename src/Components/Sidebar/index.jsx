import { useRef } from "react";
import Icons from "../../Assets/icons";
import NavItemExpandable from "../NavItem/NavItemExpandable";
import { useAuthContext } from '../../Context/AuthContext';
import { useBrandContext } from "../../Context/BrandContext";

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
const FOOD_ROUTES = [{
    label: "Create Food",
    to: "/dashboard/food/create",
    id: "createFood",
  },
  {
    label: "Manage Foods",
    to: "/dashboard/food/manage",
    id: "manageFoods",
  },
];
const ORDER_ROUTES = [
  {
    label: "Manage Orders",
    to: "/dashboard/orders/manage",
    id: "manageOrders",
  },
];
const USER_ROUTES = [{
    label: "Create User",
    to: "/dashboard/user/create",
    id: "createUser",
  },
  {
    label: "Manage Users",
    to: "/dashboard/user/manage",
    id: "manageUser",
  },
];

export default function Sidebar() {
  const sidebarRef = useRef(null);
  const {currentUser = {}} = useAuthContext();
  const { brand = {} } = useBrandContext();
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
        <div className="sidebar-brand-text mx-3">{brand?.name}</div>
      </div>

      <hr className="sidebar-divider" />

      <NavItemExpandable
        id="products"
        label="Products"
        routes={PRODUCT_ROUTES}
      />
      <NavItemExpandable id="offer" label="Offers" routes={OFFER_ROUTES} />
      <NavItemExpandable id = "offer"
      label = "Foods"
      routes = {
        FOOD_ROUTES
      }
      />
      <NavItemExpandable 
        id="orders"
        label="Orders"
        routes={ORDER_ROUTES}
      />
      {currentUser && currentUser.isSuperAdmin 
        ? <NavItemExpandable 
        id="users"
        label = "Users"
        routes = {
          USER_ROUTES
        }
      />: null}

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
