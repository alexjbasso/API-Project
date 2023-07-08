import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='navbar'>
      <div id='home-button'>
        <NavLink exact to="/">
          <i className="fa-solid fa-tv"> ToonBnb</i>
        </NavLink>
      </div>
      <div className='nav-right'>

        {isLoaded && sessionUser ? (
          <>
            <li>
              <NavLink to="/spots/new"
                id="nav-create-spot">
                Create a New Spot
              </NavLink>
            </li>
            <ProfileButton user={sessionUser} />
          </>
        ) : (
          <li>
            <ProfileButton />
          </li>
        )}
      </div>
    </div>
  );
}

export default Navigation;
