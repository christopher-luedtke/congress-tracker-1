import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <NavLink exact to='/'>Search</NavLink>
      <NavLink exact to='/create-new-user'>Sign Up</NavLink>
      <NavLink exact to='/profile'>Profile</NavLink>
      <NavLink exact to='/login'>Login</NavLink>
      <NavLink exact to='/following'>Following</NavLink>
    </nav>
  )
}

export default NavBar;