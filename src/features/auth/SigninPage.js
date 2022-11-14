import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Formik,
} from 'formik';
import * as Yup from 'yup';
import { signIn } from './authSlice';
import FormikForm from '../../components/FormikForm';

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

  const handleSubmit = (values) => {
    const user = {
      user: {
        ...values,
      },
    };
    dispatch(signIn(user));
    if (auth.status === 'loading') {
      document.querySelector('#signin-button').disabled = true;
    } else if (auth.status === 'failed') {
      setMessage('Could not signin with user details');
      document.querySelector('#signin-button').disabled = false;
    } else if (auth.status === 'succeeded') {
      navigate('/');
    }
  };

  const handleFocus = () => {
    setMessage('');
  };

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
              <FormikForm
                options={fields}
                message={message}
                buttonName="Signin"
                handleFocus={handleFocus}
              />
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
