import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSubjects } from '../features/subjects/subjectsSlice';

const Homepage = ({ auth }) => {
  const id = auth.ids[0];
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.entities[id]) {
      const { token } = auth.entities[id];
      dispatch(fetchSubjects(token));
    }
  }, [dispatch, auth]);

  return (
    <div className="py-5">
      <h1 className="text-3xl text-center">WASSCE Passco</h1>
      <div className="mx-3 mt-5">
        <Link to="/subjects/0" className="btn-primary mt-5">Go to Questions Page </Link>
      </div>
    </div>
  );
};

Homepage.propTypes = {
  auth: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.number),
    entities: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
};

export default Homepage;
