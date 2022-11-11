import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectUserById } from '../features/users/usersSlice';
import ResultComparison from '../components/ResultsComparison';
import { selectAllAnswers } from '../features/answers/answersSlice';

const ResultsPage = ({ auth }) => {
  const id = auth.ids[0];
  const user = useSelector((state) => selectUserById(state, id));
  const answers = useSelector(selectAllAnswers);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState('');
  const [scoreVisibility, setScoreVisibility] = useState('hidden');
  const [correctAnswersVisibility, setCorrectAnswersVisibility] = useState('hidden');

  const handleScore = (e) => {
    answers.forEach((answer) => {
      if (user.userWork.work[0][`option${answer.answer_no}`] === answer.value) {
        setScore((score) => score + 1);
      }
    });
    setScoreVisibility('flex');
    e.target.disabled = true;
  };

  const handlecorrectAnswers = (e) => {
    setCorrectAnswers(<ResultComparison answers={answers} user={user} />);
    setCorrectAnswersVisibility('flex');
    e.target.disabled = true;
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
            <button className="btn-primary disabled:btn-primary-light" type="button" onClick={handlecorrectAnswers}>Click to see work</button>
          </div>
        </div>
        <div className={`${scoreVisibility} justify-center border border-blue-400 py-3 text-dark-400`}>
          <h3 className="text-5xl">{score}</h3>
        </div>
        <div className={`${correctAnswersVisibility} border border-blue-400 p-3`}>
          {correctAnswers}
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
