import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

function MobileMenu(props) {
  const navButtonMenuClassName = `header__nav-icon ${
    props.isMenuOpen && "header__nav-icon_close"
  }`;

  return (
    <header className="header_type_mobile page__conteiner">
      <div className="header__container_mobile_column">
        <p className="header__email_mobile">{props.email}</p>
        <Link
          to={`/${props.to}`}
          onClick={props.onClick}
          className="header__link_mobile"
        >
          {props.text}
        </Link>
      </div>

      <div className="header__container_mobile_row">
        <img className="header__logo" src={logo} alt="Логотип Место" />
        <button className="header__nav-button" onClick={props.handleMenuOpen}>
          <span className={navButtonMenuClassName}></span>
        </button>
      </div>
    </header>
  );
}

export default MobileMenu;
