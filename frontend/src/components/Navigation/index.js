import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='navbar'>
      <div>
        <NavLink exact to="/">
          <i className="fa-solid fa-tv"></i>
        </NavLink>
      </div>
      <div className='nav-right'>
        {isLoaded && (
          <div>
            <ProfileButton user={sessionUser} />
          </div>
        )}
        {sessionUser && (
          <NavLink to="/spots/new">
            Create a New Spot
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Navigation;
