import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { storeUserWork } from '../users/usersSlice';

const optionLetters = ['A', 'B', 'C', 'D'];

const QuestionsList = ({
  questions, subjectId, userId, year,
}) => {
  const dispatch = useDispatch();
  const optionsInitialValues = () => {
    let object = {};
    questions.forEach((question) => {
      object = {
        ...object,
        [`option${question.question_no}`]: '',
      };
    });
    return object;
  };

  const initialValues = {
    options: optionsInitialValues(),
  };

  const optionsValidation = {};

  questions.forEach((question) => {
    Object.assign(optionsValidation, { [`option${question.question_no}`]: Yup.string().required('Please select an option') });
  });

  const validationSchema = Yup.object({
    options: Yup.object(optionsValidation),
  });

  const handleSubmit = (values) => {
    const work = [values.options];
    dispatch(storeUserWork({
      userId, subjectId, year, work,
    }));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
      }}
    >
      <Form>
        {
          questions.length > 0
            ? (
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
                          <Field
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
                <div className="flex mt-5">
                  <button type="submit" className="btn-primary disabled:btn-primary-light">Submit</button>
                </div>
              </div>
            )
            : <div><p>Questions not available</p></div>
        }
      </Form>
    </Formik>
  );
};

QuestionsList.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      question_no: PropTypes.number,
      content: PropTypes.string,
    }),
  ).isRequired,
  subjectId: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  year: PropTypes.string.isRequired,
};

export default QuestionsList;
