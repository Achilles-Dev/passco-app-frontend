import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Field from '../../components/Field';
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
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (auth.status === 'failed') {
      setMessage('Could not create account with user details');
    } else if (auth.status === 'fulfilled') {
      navigate('/');
    }
  }, [auth]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      user: {
        ...formData,
      },
    };
    dispatch(signUp(user));
  };

  return (
    <div className="flex flex-col justify-center h-screen bg-gray-200 md:px-40 lg:px-56">
      <div className="border py-3 mx-5 md:mx-10 rounded-lg bg-white shadow-md">
        <div>
          <h2 className="text-2xl text-center text-blue-500">Create an account</h2>
        </div>
        <div className="w-full">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="input-form"
          >
            {
              fields.map((field) => (
                <Field
                  key={field.index}
                  name={field.name}
                  elementName={field.elementName}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  id={field.name}
                  onChange={handleChange}
                  errorMessage={`Please enter your ${field.name}]`}
                />
              ))
            }
            <span className="text-red-600">{message}</span>
            <div className="flex justify-center">
              <button type="submit" className="btn-primary">Signup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
