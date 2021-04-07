import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import "./styles.scss";
import cx from "classnames";

const Header = ({ location }) => {
  return (
    <>
      <header className="header">
        <div className="header__wrapper">
          <Link className="header__logo">
            <img
              className="header__logo__img"
              src={require("../../../assets/images/brand.png")}
            />
          </Link>
          <nav className="header__nav">
            <ul>
              <li>
                <Link>TEST</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default withRouter(Header);
