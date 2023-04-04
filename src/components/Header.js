import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState("false");
  const headerLinkClassName = `header__link ${
    props.loggedIn
      ? "header__link_type_login header__container_hiden"
      : "header__link_type_logout"
  }`;
  const navButtonMenuClassName = `header__nav-icon ${
    !isMenuOpen && "header__nav-icon_close"
  }`;

  function handleMenuOpen() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="header page__conteiner">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      <div className="header__container">
        {props.loggedIn && (
          <button className="header__nav-button" onClick={handleMenuOpen}>
            <span className={navButtonMenuClassName}></span>
          </button>
        )}
        {props.loggedIn && (
          <p className="header__email header__container_hiden">{props.email}</p>
        )}
        <Link
          to={`/${props.to}`}
          onClick={props.onClick}
          className={headerLinkClassName}
        >
          {props.text}
        </Link>
      </div>
    </header>
  );
}

export default Header;
