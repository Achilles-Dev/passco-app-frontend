import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllQuestions } from '../features/questions/questionsSlice';

const optionLetters = ['A', 'B', 'C', 'D'];

const ResultComparison = () => {
  const questions = useSelector(selectAllQuestions);
  return (
    <div>
      { questions.map((question, index) => (
        <div key={question.id} className="py-2">
          <h3>
            {`${index + 1}. `}
            {question.content}
          </h3>
          <div role="group" className="">
            {
        question.options.length > 0 ? question.options.map((option, i) => (
          option !== null
            ? (
              <label key={option} htmlFor={`question${question.question_no}option${i + 1}`} className="flex gap-2 my-2">
                {`${optionLetters[i]}.`}
                <input
                  type="radio"
                  id={`question${question.question_no}option${i + 1}`}
                  name={`options[option${index + 1}]`}
                  value={optionLetters[i]}
                />
                <>{` ${option}`}</>
              </label>
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

export default ResultComparison;
