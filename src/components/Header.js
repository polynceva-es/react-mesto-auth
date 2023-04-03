import React from "react";
import logo from '../images/logo.svg';
import HeaderNav from "./HeaderNav";

function Header(props) {
      return(
      <header className="header page__conteiner">
        <img
          className="header__logo"
          src={logo}
          alt="Логотип Место"
        />
        <HeaderNav  
          email={props.email}
          onClick={props.onClick}
          text={props.text}
          to={props.to}
          loggedIn={props.loggedIn}/>
      </header>
    )
}

export default Header;

