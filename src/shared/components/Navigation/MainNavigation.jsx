import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./MainNavigation.css";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";

export default function MainNavigation(props) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  return (
    <React.Fragment>
      {drawerIsOpen ? <SideDrawer>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer> : null}
      <MainHeader>
        <button className="main-navigation__menu-btn">
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
}
