import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  ErrorMessage,
  Field,
  Formik,
  Form,
} from 'formik';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { selectSubjectById, updateSubject } from './subjectsSlice';

const fields = [
  {
    index: 1, name: 'name', elementName: 'input', type: 'text', placeholder: 'Enter subject name',
  },
  {
    index: 2, name: 'code', elementName: 'input', type: 'number', placeholder: 'Enter subject code',
  },
];

const EditSubject = ({ auth }) => {
  const { subjectId } = useParams();
  const subject = useSelector((state) => selectSubjectById(state, subjectId));
  const id = auth.ids[0];
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const initialValues = {
    name: subject.name,
    code: subject.code,
  };

  const handleFocus = () => {
    setMessage('');
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Please enter subject name'),
    code: Yup.number().max(999, 'Number must be less than 1000').min(100, 'Number must start from 100').required('Please enter subject code'),
  });

  const handleSubmit = (values) => {
    const subjects = {
      ...values,
    };
    if (auth.entities[id]) {
      const { token } = auth.entities[id];
      dispatch(updateSubject({ token, subjects, subjectId }));
    }
  };

  const renderError = (message) => <span className="text-red-600">{message}</span>;

  return (
    <div className="flex flex-col py-5 h-screen bg-gray-200 md:px-40">
      <div className="h-3/4 lg:px-20">
        <div className="flex flex-col justify-center border min-h-full py-3 mx-5 md:mx-10 rounded-lg bg-white shadow-md">
          <div>
            <h2 className="text-3xl text-center text-blue-400">Edit Subject</h2>
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
                  fields.map((field) => (
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
                  ))
                }
                <span className="text-red-600">{message}</span>
                <div className="flex justify-center">
                  <button type="submit" className="btn-primary disabled:btn-primary-light">Update Subject</button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

EditSubject.propTypes = {
  auth: PropTypes.func.isRequired,
};

export default EditSubject;
