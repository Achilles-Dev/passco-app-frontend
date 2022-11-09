import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectAllQuestions } from '../features/questions/questionsSlice';

const optionLetters = ['A', 'B', 'C', 'D'];

const ResultComparison = ({ answers, user }) => {
  const questions = useSelector(selectAllQuestions);
  const answerMap = new Map();

  answers.forEach((answer) => {
    // question_id for anser was used here, could be changed later
    answerMap.set(answer.question_id, answer);
  });

  return (
    <div>
      { questions.map((question, index) => (
        <div key={question.id} className="py-2">
          <h3>
            {`${index + 1}. `}
            {question.content}
            {
              user.userWork.work[0][`option${question.question_no}`] === answerMap.get(question.id).value
                ? <span className="ml-3 text-green-500">Correct</span> : <span className="ml-3 text-red-500">Wrong</span>
            }
          </h3>
          <div className="">
            {
              question.options.length > 0 ? question.options.map((option, i) => (
                option !== null
                  ? (
                    <div
                      key={option}
                      className={`flex gap-3 my-2 ${answerMap.get(question.id).value === optionLetters[i] ? 'border border-green-500 rounded' : ''}
                      ${user.userWork.work[0][`option${question.question_no}`] === optionLetters[i]
                          && answerMap.get(question.id).value !== optionLetters[i] ? 'border  border-red-500 rounded' : ''}
                      `}
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
