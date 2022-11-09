import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectAllQuestions } from '../features/questions/questionsSlice';

const optionLetters = ['A', 'B', 'C', 'D'];

const ResultComparison = ({ answers, user }) => {
  const questions = useSelector(selectAllQuestions);
  const answerMap = new Map();

  answers.forEach((answer) => {
    answerMap.set(answer.question_id, answer);
  });

  console.log(user);

  return (
    <div>
      { questions.map((question, index) => (
        <div key={question.id} className="py-2">
          <h3>
            {`${index + 1}. `}
            {question.content}
          </h3>
          <div className="">
            {
              question.options.length > 0 ? question.options.map((option, i) => (
                option !== null
                  ? (
                    <div
                      key={option}
                      className={`flex gap-3 my-2 ${answerMap.get(question.question_no).value === optionLetters[i] ? 'border border-green-400' : ''}`}
                    >
                      {`${optionLetters[i]}.`}
                      <>{` ${option}`}</>
                    </div>
                  )
                  : ''
              ))
                : ''
      }
          </div>
        </div>
      ))}
    </div>
  );
};

ResultComparison.propTypes = {
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      subject_id: PropTypes.number,
      question_id: PropTypes.number,
      value: PropTypes.string,
    }),
  ).isRequired,
  user: PropTypes.shape({
    userWork: PropTypes.shape({
      subject_id: PropTypes.number,
      user_id: PropTypes.number,
      year: PropTypes.string,
      work: PropTypes.arrayOf(PropTypes.shape({
        option: PropTypes.string,
      })),
    }),
  }).isRequired,
};

export default ResultComparison;
