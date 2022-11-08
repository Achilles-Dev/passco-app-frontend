import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  ErrorMessage,
  Field,
  Formik,
  Form,
} from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { selectQuestionById, updateQuestion } from './questionsSlice';
import closeIcon from '../../assets/images/icon-close.svg';

const fields = [
  {
    index: 1, name: 'question_no', elementName: 'input', type: 'number', placeholder: 'Enter number',
  },
  {
    index: 2, name: 'content', elementName: 'text-area', type: 'text', placeholder: 'Enter question',
  },
];

const EditQuestion = ({ auth }) => {
  const id = auth.ids[0];
  const dispatch = useDispatch();
  const { questionId } = useParams();
  const question = useSelector((state) => selectQuestionById(state, questionId));
  const [message, setMessage] = useState('');
  const [options, setOptions] = useState([...fields]);
  const [year, setYear] = useState('');
  const [yearMessage, setYearMessage] = useState('');
  const currentYear = new Date().getFullYear();
  const yearLength = currentYear - 1989;
  const yearRange = Array.from({ length: yearLength }, (_, i) => i + 1990);
  const navigate = useNavigate();

  const initialValues = {
    question_no: question.question_no,
    content: question.content,
    option1: question.options[0],
    option2: question.options[1],
    option3: question.options[2],
    option4: question.options[3],
  };

  const handleFocus = () => {
    setMessage('');
  };

  const handleYearSelect = () => {
    const year = document.querySelector('#year').value;
    setYear(year);
    if (yearMessage !== '') {
      setYearMessage('');
    }
  };

  const validationSchema = Yup.object({
    question_no: Yup.number().min(1, 'Enter a number not less than 1').required('Please enter question number'),
    content: Yup.string().required('Please enter question content'),
    option1: Yup.string().required('Please enter question option'),
    option2: Yup.string().required('Please enter question option'),
    option3: Yup.string(),
    option4: Yup.string(),
  });

  const handleSubmit = (values) => {
    const optionValues = [values.option1, values.option2, values.option3, values.option4];
    const questions = {
      year,
      question_no: values.question_no,
      content: values.content,
      options: optionValues.filter((value) => value !== '' || value !== null),
    };
    if (auth.entities[id] && (year !== '')) {
      const { token } = auth.entities[id];
      dispatch(updateQuestion({ token, questions, questionId }));
      navigate('/');
    } else {
      setYearMessage('Please choose a year');
    }
  };

  const renderError = (message) => <span className="text-red-600">{message}</span>;

  const addOption = () => {
    const newField = {
      index: options.length + 1, name: `option${options.length - 1}`, elementName: 'input', type: 'text', placeholder: 'Add option',
    };
    setOptions([...options, newField]);
  };

  const removeOption = (removeId) => {
    setOptions((options) => {
      const test = options.filter((option) => option.index !== removeId)
        .map((option, i) => ({ ...option, index: i + 1 }));
      return test;
    });
  };

  useEffect(() => {
    question.options.forEach(() => {
      addOption();
    });
  }, [question.options]);

  const optionLength = options && options.filter((option) => option.name.includes('option')).length;

  return (
    <div className="flex flex-col py-5 h-screen bg-gray-200 md:px-40">
      <div className="h-3/4 lg:px-20">
        <div className="flex flex-col justify-center border min-h-full py-3 mx-5 md:mx-10 rounded-lg bg-white shadow-md">
          <div>
            <h2 className="text-3xl text-center text-blue-400">Edit Question</h2>
          </div>
          <div className="flex flex-col justify-center px-3 md:px-10 mt-10">
            <select
              id="year"
              className="block py-2.5 px-0 w-auto text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
              onChange={handleYearSelect}
            >
              <option selected>Choose year</option>
              { yearRange.map((year) => (
                <option key={year}>{year}</option>
              ))}
            </select>
            <span className="text-red-600">{yearMessage}</span>
          </div>
          <div className="w-full min-h-full">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              <Form className="input-form">
                {
                  options.map((field) => (
                    field.name.includes('option')
                      ? (
                        <div key={field.index} className="my-2">
                          <div className="flex gap-2">
                            <Field
                              className="input-field focus:shadow-outline "
                              name={field.name}
                              type={field.type}
                              placeholder={field.placeholder}
                              onFocus={handleFocus}
                            />
                            <button
                              type="button"
                              className={`flex justify-center items-center border border-red-500 rounded-full px-1 mb-3 ${optionLength === 1 ? 'hidden' : ''}`}
                              onClick={() => removeOption(field.index)}
                            >
                              <img id="closeIcon" src={closeIcon} alt="Close" />
                            </button>
                          </div>
                          <ErrorMessage name={field.name} render={renderError} />
                        </div>
                      )
                      : (
                        <div key={field.index} className="my-2">
                          <Field
                            className="input-field focus:shadow-outline"
                            name={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            onFocus={handleFocus}
                          />
                          <ErrorMessage name={field.name} render={renderError} />
                        </div>
                      )
                  ))
                }
                <div className={`flex justify-start mb-3 ${optionLength === 4 ? 'hidden' : ''}`}>
                  <button type="button" className="btn-primary" onClick={addOption}>Add option</button>
                </div>
                <span className="text-red-600">{message}</span>
                <div id="save-button" className="flex justify-center">
                  <button type="submit" className="btn-primary disabled:btn-primary-light">Update Question</button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

EditQuestion.propTypes = {
  auth: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.number),
    entities: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
};

export default EditQuestion;
