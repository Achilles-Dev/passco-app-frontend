import React from 'react';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
} from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectQuestionById } from '../questions/questionsSlice';
import { addAnswer } from './answersSlice';

const AddAnswer = ({ auth }) => {
  const id = auth.ids[0];
  const { questionId } = useParams();
  const question = useSelector((state) => selectQuestionById(state, questionId));
  const dispatch = useDispatch();

  const initialValues = {
    value: '',
  };

  const validationSchema = Yup.object({
    value: Yup.string().required('Please enter answer for question'),
  });

  const handleSubmit = (values) => {
    const answers = {
      value: values.value,
    };
    if (auth.entities[id]) {
      const { token } = auth.entities[id];
      const ids = {
        questionId,
        subjectId: question.subjectId,
      };
      dispatch(addAnswer({ token, answers, ids }));
    }
  };

  const renderError = (message) => <span className="text-red-600">{message}</span>;

  return (
    <div className="flex flex-col py-5 h-screen bg-gray-200 md:px-40">
      <div className="h-3/4 lg:px-20">
        <div className="flex flex-col justify-center border min-h-full py-3 mx-5 md:mx-10 rounded-lg bg-white shadow-md">
          <div>
            <h2 className="text-3xl text-center text-blue-400">Add Answer</h2>
          </div>
          <div className="w-full min-h-full">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                handleSubmit(values);
                resetForm();
              }}
            >
              <Form>
                <div className="my-2">
                  <Field
                    className="input-field focus:shadow-outline"
                    name="value"
                    type="input"
                    placeholder="Enter answer"
                  />
                  <ErrorMessage name="value" render={renderError} />
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

AddAnswer.propTypes = {
  auth: PropTypes.func.isRequired,
};

export default AddAnswer;
