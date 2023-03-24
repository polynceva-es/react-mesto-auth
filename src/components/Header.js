import React from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.svg';

function Header(props) {
    return(
      <header className="header page__conteiner">
        <img
          className="header__logo"
          src={logo}
          alt="Логотип Место"
        />
        <div className="header__container">
          <p className="header__email">{props.email}</p>
          <Link to={`/ ${props.to}`} className="header__link">{props.text}</Link>
        </div>
      </header>
    )
}

export default Header;

