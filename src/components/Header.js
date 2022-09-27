import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import userIcon from '../assets/images/user_icon.png';
import { signOut } from '../features/auth/authSlice';

const Header = () => {
  const auth = useSelector((state) => state.auth);
  // const { status } = auth;
  const id = auth.ids[0];
  const dispatch = useDispatch();
  // const [visibility, setVisibility] = useState('hidden');
  // const toggleProfile = () => {
  //   if (visibility === 'hidden') {
  //     setVisibility('');
  //   } else {
  //     setVisibility('hidden');
  //   }
  // };

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
          <Link className="text-blue-500" to="/">
            WASSCE PASSCO
          </Link>
        </div>
        <div className="">
          {auth.entities[id] && auth.entities[id].token ? (
            <div>
              <ul className="navbar-nav flex flex-row justify-end pl-0 list-style-none mr-auto">
                <div className="relative inline-block text-left">
                  <li className="nav-item">
                    <button
                      className="nav-link bg-blue-400 hover:text-blue-700 focus:text-blue-700 p-0"
                      type="button"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      <img
                        className="w-10 h1-10"
                        src={userIcon}
                        alt="Profile"
                      />
                    </button>
                  </li>
                  <div
                    className="absolute right-0 z-10 mt-2 min-w-max origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                    id="dropdown"
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
                        onClick={handleSubmit}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </ul>
              <div className="flex justify-center">
                <div>
                  <div className="dropdown relative">
                    <a
                      className="dropdown-toggle px-6py-2.5 bg-blue-600
                      text-white
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        rounded
                        shadow-md
                        hover:bg-blue-700 hover:shadow-lg
                        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-blue-800 active:shadow-lg active:text-white
                        transition
                        duration-150
                        ease-in-out
                        flex
                        items-center
                        whitespace-nowrap
                      "
                      href="/"
                      type="button"
                      id="dropdownMenuButton2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Dropdown link
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="caret-down"
                        className="w-2 ml-2"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path
                          fill="currentColor"
                          d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                        />
                      </svg>
                    </a>
                    <ul
                      className="
                        dropdown-menu
                        min-w-max
                        absolute
                        hidden
                        bg-white
                        text-base
                        z-50
                        float-left
                        py-2
                        list-none
                        text-left
                        rounded-lg
                        shadow-lg
                        mt-1
                        hidden
                        m-0
                        bg-clip-padding
                        border-none
                      "
                      aria-labelledby="dropdownMenuButton2"
                    >
                      <li>
                        <a
                          className="
                            dropdown-item
                            text-sm
                            py-2
                            px-4
                            font-normal
                            block
                            w-full
                            whitespace-nowrap
                            bg-transparent
                            text-gray-700
                            hover:bg-gray-100
                          "
                          href="/"
                        >
                          Action
                        </a>
                      </li>
                      <li>
                        <a
                          className="
                            dropdown-item
                            text-sm
                            py-2
                            px-4
                            font-normal
                            block
                            w-full
                            whitespace-nowrap
                            bg-transparent
                            text-gray-700
                            hover:bg-gray-100
                          "
                          href="/"
                        >
                          Another action
                        </a>
                      </li>
                      <li>
                        <a
                          className="
                            dropdown-item
                            text-sm
                            py-2
                            px-4
                            font-normal
                            block
                            w-full
                            whitespace-nowrap
                            bg-transparent
                            text-gray-700
                            hover:bg-gray-100
                          "
                          href="/"
                        >
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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

export default Header;
