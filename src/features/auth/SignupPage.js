import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { signUp } from './authSlice';

const fields = [
  {
    index: 1, name: 'username', elementName: 'input', type: 'text', placeholder: 'Enter username',
  },
  {
    index: 2, name: 'email', elementName: 'input', type: 'email', placeholder: 'Enter email',
  },
  {
    index: 3, name: 'password', elementName: 'input', type: 'password', placeholder: 'Enter password',
  },
  {
    index: 4, name: 'password_confirmation', elementName: 'input', type: 'password', placeholder: 'Confirm password',
  },
];

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (auth.status === 'loading') {
      document.querySelector('#signin-button').disabled = true;
    } else if (auth.status === 'failed') {
      setMessage('Could not create account with user details');
      setTimeout(setMessage, 3000);
      document.querySelector('#signin-button').disabled = false;
    } else if (auth.status === 'succeeded') {
      navigate('/');
    }
  }, [auth]);

  const renderError = (message) => <span className="text-red-600">{message}</span>;

  const handleSubmit = (values) => {
    const user = {
      user: {
        ...values,
      },
    };
    dispatch(signUp(user));
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Please enter your username'),
    email: Yup.string().email('Email is invalid').required('Please enter your email address'),
    password: Yup.string().min(6, 'Password must be least 6 characters long').required('Please enter your password'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const initialValues = {
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  return (
    <div className="flex flex-col justify-center h-screen bg-gray-200 md:px-40 lg:px-56">
      <div className="border py-3 mx-5 md:mx-10 rounded-lg bg-white shadow-md">
        <div>
          <h2 className="text-2xl text-center text-blue-500">Create an account</h2>
        </div>
        <div className="w-full">
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
                    />
                    <ErrorMessage name={field.name} render={renderError} />
                  </div>
                ))
              }
              <span className="text-red-600">{message}</span>
              <div className="flex justify-center">
                <button id="signin-button" type="submit" className="btn-primary disabled:btn-primary-light">Signup</button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
