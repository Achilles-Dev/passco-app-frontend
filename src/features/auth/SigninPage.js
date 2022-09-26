import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Field from '../../components/Field';
import { signIn } from './authSlice';

const fields = [
  {
    index: 1, name: 'email', elementName: 'input', type: 'email', placeholder: 'Your email',
  },
  {
    index: 2, name: 'password', elementName: 'input', type: 'password', placeholder: 'Your password',
  },
];

const SigninPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (auth.status === 'failed') {
      setMessage('Could not create account with user details');
    } else if (auth.status === 'succeeded') {
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
    dispatch(signIn(user));
  };

  return (
    <div className="flex flex-col justify-center h-screen bg-gray-200">
      <div className="border py-3 mx-5 md:mx-10 rounded-lg bg-white shadow-md">
        <div>
          <h2 className="text-2xl text-center text-blue-500">Sign in to your account</h2>
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
              <button type="submit" className="btn-primary">Signin</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
