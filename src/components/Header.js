import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import userIcon from '../assets/images/user_icon.png';
import { signOut } from '../features/auth/authSlice';

const Header = ({ id, auth }) => {
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState('hidden');
  const toggleProfile = () => {
    if (visibility === 'hidden') {
      setVisibility('');
    } else {
      setVisibility('hidden');
    }
  };

  // const toggleProfileOnBlur = () => {
  //   if (visibility === '') {
  //     setVisibility('hidden');
  //   } else {
  //     setVisibility('hidden');
  //   }
  // };

  const handleSubmit = () => {
    dispatch(signOut(id));
  };

  return (
    <nav className="rounded-md shadow-md py-2 bg-white w-full mb-5">
      <div className="px-6 w-full flex flex-wrap items-center justify-between">
        <div>
          <Link className="text-blue-500" to="/">WASSCE PASSCO</Link>
        </div>
        <div className="">
          {auth.entities[id] && auth.entities[id].token ? (
            <ul className="navbar-nav flex flex-row justify-end pl-0 list-style-none mr-auto">
              <div className="relative inline-block text-left">
                <li className="nav-item">
                  <button
                    className="nav-link bg-blue-400 hover:text-blue-700 focus:text-blue-700 p-0"
                    type="button"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={toggleProfile}
                  >
                    <img className="w-10 h1-10" src={userIcon} alt="Profile" />
                  </button>
                </li>
                <div
                  className={`absolute right-0 z-10 mt-2 min-w-max origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${visibility}`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    <Link
                      to="/"
                      className="text-gray-700 block px-4 py-2"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-1"
                    >
                      Username
                    </Link>
                    <Link
                      to="/profile"
                      className="text-gray-700 block px-4 py-2"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-2"
                    >
                      Edit Profile
                    </Link>
                    <button
                      type="button"
                      className="text-gray-700 block w-full px-4 py-2 text-left"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-3"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </ul>
          ) : (
            <ul className="navbar-nav flex flex-row pl-0 list-style-none mr-auto">
              <li className="nav-item p-2">
                <Link
                  className="nav-link text-blue-500 hover:text-blue-700 focus:text-blue-700 p-0"
                  to="/signin"
                >
                  Signin
                </Link>
              </li>
              <li className="nav-item p-2">
                <Link
                  className="nav-link text-blue-500 hover:text-blue-700 focus:text-blue-700 p-0"
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

Header.propTypes = {
  id: PropTypes.number.isRequired,
  auth: PropTypes.arrayOf.isRequired,
};

export default Header;
