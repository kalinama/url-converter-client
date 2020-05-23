import React, { useContext } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

export const NavBar = token => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { isAuthenticated } = token;

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  };

  return (
    <nav>
      <div className="nav-wrapper blue darken-1">
        <a href="/" className="brand-logo center">URL Shortener</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          { isAuthenticated && <li><a href='/auth' onClick={logoutHandler}>Logout</a></li> }
          { !isAuthenticated && <li><a href='/auth'>Sing in or Register</a></li> }
        </ul>
        <ul className="left hide-on-med-and-down">
          <li><NavLink to='/'>Top 10 Links</NavLink></li>
          { isAuthenticated && <li><NavLink to='/links'>My links</NavLink></li> }
          { isAuthenticated && <li><NavLink to='/create'>Create</NavLink></li> }
        </ul>
      </div>
    </nav>
  )
};