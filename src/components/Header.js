import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import userIcon from '../assets/images/user_icon.svg';
import { signOut } from '../features/auth/authSlice';
import { fetchSubjects, resetSubjects } from '../features/subjects/subjectsSlice';
import { resetQuestions } from '../features/questions/questionsSlice';
import { resetUsers } from '../features/users/usersSlice';
import { resetAnswers } from '../features/answers/answersSlice';

const Header = ({ auth, subjects }) => {
  const id = auth.ids[0];
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState('hidden');
  const [subjectVisibility, setSubjectVisibility] = useState('hidden');

  const toggleProfile = () => {
    if (visibility === 'hidden') {
      setVisibility('');
    } else {
      setVisibility('hidden');
    }
  };

  useEffect(() => {
    if (auth.entities[id]) {
      const { token } = auth.entities[id];
      dispatch(fetchSubjects(token));
    }
  }, [dispatch, auth]);

  const handleSubjectFocus = () => {
    if (subjectVisibility === 'hidden') {
      setSubjectVisibility('');
    } else {
      setSubjectVisibility('hidden');
    }
  };

  useEffect(() => {
    const icon = document.querySelector('#icon');
    document.addEventListener('mousedown', (e) => {
      if (icon && !icon.contains(e.target) && visibility === '') {
        setVisibility('hidden');
      }
    });
  }, [visibility]);

  useEffect(() => {
    const subjectDropdown = document.querySelector('#subject-dropdown');
    const subjectButton = document.querySelector('#subjectButton');
    document.addEventListener('mousedown', (e) => {
      if ((subjectDropdown && !subjectDropdown.contains(e.target)) && (subjectButton && !subjectButton.contains(e.target)) && subjectVisibility === '') {
        setSubjectVisibility('hidden');
      }
    });
  }, [subjectVisibility]);

  const handleSubmit = () => {
    dispatch(signOut(id));
    dispatch(resetSubjects());
    dispatch(resetQuestions());
    dispatch(resetUsers());
    dispatch(resetAnswers());
  };

  return (
    <nav className="rounded-md shadow-md py-2 bg-white w-full">
      <div className="px-6 w-full flex flex-wrap items-center justify-between">
        <div>
          <Link className="text-blue-500 text-xl" to="/">
            WASSCE PASSCO
          </Link>
        </div>
        <div className="">
          {auth.entities[id] && auth.entities[id].token ? (
            <ul className="navbar-nav flex flex-row gap-10 items-center justify-end pl-0 list-style-none mr-auto">
              <div className="inline-block text-left" id="subjectButton">
                <li className="nav-item">
                  <button
                    className="hover:bg-blue-100 focus:bg-blue-100 p-2 hover:border hover:border-blue-400 rounded-full"
                    type="button"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={handleSubjectFocus}
                  >
                    Subjects
                  </button>
                </li>
              </div>
              <div
                className={`absolute left-0 top-16 z-10 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${subjectVisibility}`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
                id="subject-dropdown"
              >
                <div className="flex gap-3 flex-wrap p-2">
                  { subjects.length > 0 ? subjects.map((subject) => (
                    <div key={subject.id}>
                      <Link
                        to={`/subjects/${subject.id}`}
                        className="text-gray-700 block px-4 py-2 hover:border hover:bg-gray-100 rounded-full hover:text-blue-400 focus:text-blue-400"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-1"
                        onClick={handleSubjectFocus}
                      >
                        {subject.name.toUpperCase()}
                      </Link>
                    </div>
                  ))
                    : ''}
                </div>
              </div>
              <div className="relative inline-block text-left" id="icon">
                <li className="nav-item">
                  <button
                    className="hover:bg-blue-100 focus:bg-blue-100 p-1 border border-blue-400 rounded-full"
                    type="button"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={toggleProfile}
                  >
                    <img
                      className="w-8 h1-10"
                      src={userIcon}
                      alt="Profile"
                    />
                  </button>
                </li>
                <div
                  className={`absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${visibility}`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                  id="dropdown"
                >
                  <div className="py-1" role="none" onClick={toggleProfile}>
                    <Link
                      to="/"
                      className="text-gray-700 block px-4 py-2 hover:text-blue-400 focus:text-blue-400"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-1"
                    >
                      Username
                    </Link>
                    <Link
                      to="/profile"
                      className="text-gray-700 block px-4 py-2 hover:text-blue-400 focus:text-blue-400"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-2"
                    >
                      Edit Profile
                    </Link>
                    <button
                      type="button"
                      className="text-gray-700 block px-4 py-2 hover:text-blue-400 focus:text-blue-400"
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
          ) : (
            <ul className="navbar-nav flex flex-row pl-0 list-style-none mr-auto">
              <li className="nav-item p-2">
                <Link
                  className="nav-link"
                  to="/signin"
                >
                  Signin
                </Link>
              </li>
              <li className="nav-item p-2">
                <Link
                  className="nav-link text-blue-500 hover:text-blue-700 focus:text-blue-700 p-2 focus:border focus:rounded focus:border-blue-400"
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
  auth: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.number),
    entities: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default Header;
