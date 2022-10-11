import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, selectAllQuestions } from './questionsSlice';

// const optionLetters = ['A', 'B', 'C', 'D'];

const QuestionsList = ({ auth }) => {
  const id = auth.ids[0];
  const questions = useSelector(selectAllQuestions);
  const dispatch = useDispatch();
  const { subjectId, year } = useParams();

  useEffect(() => {
    if (auth.entities[id]) {
      const { token } = auth.entities[id];
      dispatch(fetchQuestions({ token, year, subjectId }));
    }
  }, [dispatch]);

  const initialValues = {
    option: '',
  };

  const validationSchema = Yup.object({

  });

  const handleSubmit = () => {

  };

  return (
    <div>
      <h2>
        {`Questions for the year, ${year}`}
      </h2>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <Form>
            { questions.map((question, index) => (
              <div key={question.id}>
                <h3>
                  {`${index + 1}. `}
                  {question.content}
                </h3>
                {
                  question.options.length > 0 ? question.options.map((option) => (
                    option !== null
                      ? (
                        <div key={option}>
                          <Field type="radio" name="option" value={option} />
                          <>{` ${option}`}</>
                        </div>
                      )
                      : ''
                  ))
                    : ''
                }
              </div>
            ))}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

QuestionsList.propTypes = {
  auth: PropTypes.func.isRequired,
};

export default QuestionsList;
