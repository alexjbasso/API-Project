import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className="profile-button" onClick={openMenu}>
        <i className="fas fa-bars"></i>
        <i className="fas fa-user-circle" />
      </button>

      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="dropdown-items">
            <div className="user-info">
              <div>Hello, {user.firstName}</div>
              <div>{user.email}</div>
            </div>
            <div>
              <div className="manage-spots-link-wrapper">
                <Link to="/spots/current" className="manage-spots-link">Manage Spots</Link>
              </div>
            </div>
            <div>
              <div className="logout-button-wrapper">
                <button onClick={logout} id="logout-button">Log Out</button>
              </div>
            </div>

          </div>
        ) : (
          <div className="dropdown-items auth-links">
            <div className="auth-link">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
            <div className="auth-link">
              <OpenModalMenuItem
                className="auth-link"
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
