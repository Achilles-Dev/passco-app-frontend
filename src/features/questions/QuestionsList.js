import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, resetQuestions, selectAllQuestions } from './questionsSlice';
import { selectSubjectById } from '../subjects/subjectsSlice';

const optionLetters = ['A', 'B', 'C', 'D'];

const QuestionsList = ({ auth }) => {
  const id = auth.ids[0];
  const questions = useSelector(selectAllQuestions);
  const dispatch = useDispatch();
  const { subjectId, year } = useParams();
  const subject = useSelector((state) => selectSubjectById(state, subjectId));

  useEffect(() => {
    if (auth.entities[id]) {
      const { token } = auth.entities[id];
      dispatch(resetQuestions());
      dispatch(fetchQuestions({ token, year, subjectId }));
    }
  }, [dispatch, auth, year]);

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

  const validationSchema = Yup.object({
    options: {
      option: Yup.string().required('Please select an option'),
    },
  });

  const handleSubmit = () => {

  };

  return (
    <div className="m-2 p-3 bg-white h-screen">
      <h2 className="text-center text-blue-400 text-3xl">
        {` ${subject.name} questions for the year, ${year}`}
      </h2>
      <div className="p-3 text-lg">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
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
                            <label key={option} htmlFor={`question${question.question_no}option${i + 1}`} className="flex gap-2">
                              {`${optionLetters[i]}.`}
                              <Field type="radio" id={`question${question.question_no}option${i + 1}`} name={`options[option${index + 1}]`} value={optionLetters[i]} />
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
                    <div id="save-button" className="flex mt-5">
                      <button type="submit" className="btn-primary disabled:btn-primary-light">Submit</button>
                    </div>
                  </div>
                )
                : <div><p>Questions not available</p></div>
            }
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
