import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectUserById } from '../features/users/usersSlice';
import ResultComparison from './ResultsComparison';

const ResultsPage = ({ auth }) => {
  const id = auth.ids[0];
  const user = useSelector((state) => selectUserById(state, id));
  const [score, setScore] = useState('');
  const [rightAnswers, setRightAnswers] = useState('');
  const [scoreVisibility, setScoreVisibility] = useState('hidden');

  const handleScore = (e) => {
    setScoreVisibility('flex');
    e.target.disabled = true;
    setScore(0);
  };

  const handleRightAnswers = () => {
    setRightAnswers(<ResultComparison />);
  };

  return (
    <div className="m-2 p-3 bg-white min-h-full">
      <div className="flex flex-col gap-5">
        <h2 className="text-center text-blue-400 text-3xl m-2">
          {`Congratulations ${user.username.toUpperCase()}`}
        </h2>
        <div className="flex justify-center gap-3">
          <div className="flex">
            <button className="btn-primary disabled:btn-primary-light" type="button" onClick={handleScore}>Click to view Score</button>
          </div>
          <div className="flex">
            <button className="btn-primary disabled:btn-primary-light" type="button" onClick={handleRightAnswers}>Click to see work</button>
          </div>
        </div>
        <div className={`${scoreVisibility} justify-center border border-blue-400 py-3 text-dark-400`}>
          <h3 className="text-5xl">{score}</h3>
        </div>
        <div>
          {rightAnswers}
        </div>
      </div>
    </div>
  );
};

ResultsPage.propTypes = {
  auth: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.number),
    entities: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
};

export default ResultsPage;
