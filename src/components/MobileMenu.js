import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

function MobileMenu(props) {

//   const headerLinkClassName = `header__link ${
//     props.loggedIn
//       ? "header__link_type_login"
//       : "header__link_type_logout"
//   }`;
  const navButtonMenuClassName = `header__nav-icon ${
    props.isMenuOpen && "header__nav-icon_close"
  }`;

  return (
    // <header className="header page__conteiner">
    //   <img className="header__logo" src={logo} alt="Логотип Место" />
    //   <div className="header__container">
    //     {props.loggedIn && (
    //       <button className="header__nav-button" onClick={props.handleMenuOpen}>
    //         <span className={navButtonMenuClassName}></span>
    //       </button>
    //     )}
    //     {props.loggedIn && (
    //       <p className='header__email header__email-mobile'>{props.email}</p>
    //     )}
    //     <Link
    //       to={`/${props.to}`}
    //       onClick={props.onClick}
    //       className={headerLinkClassName}
    //     >
    //       {props.text}
    //     </Link>
    //   </div>
    // </header>
    <header className="header_mobile page__conteiner">
     <div className="header__conteiner_mobile_column">
        <p className='header__email-mobile'>{props.email}</p>
        <Link
            to={`/${props.to}`}
            onClick={props.onClick}
            className="header__link_mobile"
            >
            {props.text}
        </Link>
     </div>

    <div className="header__conteiner_mobile_row">
        <img className="header__logo" src={logo} alt="Логотип Место" />
        <button className="header__nav-button" onClick={props.handleMenuOpen}>
            <span className={navButtonMenuClassName}></span>
        </button>
    </div>

    </header>
  );
}

export default MobileMenu;
