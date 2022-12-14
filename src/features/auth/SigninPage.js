import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { signIn } from './authSlice';

const fields = [
  {
    index: 1, name: 'email', elementName: 'input', type: 'email', placeholder: 'Enter email address',
  },
  {
    index: 2, name: 'password', elementName: 'input', type: 'password', placeholder: 'Enter password',
  },
];

const SigninPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (auth.status === 'loading') {
      document.querySelector('#signin-button').disabled = true;
    } else if (auth.status === 'failed') {
      setMessage('Could not signin with user details');
      document.querySelector('#signin-button').disabled = false;
    } else if (auth.status === 'succeeded') {
      navigate('/');
    }
  }, [auth]);

  const handleSubmit = (values) => {
    const user = {
      user: {
        ...values,
      },
    };
    dispatch(signIn(user));
  };

  const handleFocus = () => {
    setMessage('');
  };

  const renderError = (message) => <span className="text-red-600">{message}</span>;

  const validationSchema = Yup.object({
    email: Yup.string().email('Email is invalid').required('Please enter  your email address'),
    password: Yup.string().min(6, 'Password must be least 6 characters long').required('Please enter your password'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <div className="flex flex-col justify-center h-screen bg-gray-200 md:px-40 lg:px-56">
      <div className="h-3/4 lg:px-20">
        <div className="flex flex-col justify-center border min-h-full py-3 mx-5 md:mx-10 rounded-lg bg-white shadow-md">
          <div>
            <h2 className="text-3xl text-center text-blue-400">Sign in to your account</h2>
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
                  <button id="signin-button" type="submit" className="btn-primary disabled:btn-primary-light">Signin</button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
