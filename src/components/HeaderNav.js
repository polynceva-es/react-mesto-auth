import React from "react";
import { Link } from "react-router-dom";

function HeaderNav(props) {
    const headerLinkClassName = (`header__link ${props.loggedIn ? 'header__link_type_login' : 'header__link_type_logout'}`);

    return(
        <div className="header__container">
          <button className="header__nav-button"><span className="header__nav-icon"></span></button>
          <p className="header__email">{props.email}</p>
          <Link to={`/${props.to}`} onClick={props.onClick} className={headerLinkClassName} >{props.text}</Link>
        </div>
    )
}

export default HeaderNav;