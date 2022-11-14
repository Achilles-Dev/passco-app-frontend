import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  Formik,
} from 'formik';
import * as Yup from 'yup';
import { addSubject } from './subjectsSlice';
import FormikForm from '../../components/FormikForm';

const fields = [
  {
    index: 1, name: 'name', elementName: 'input', type: 'text', placeholder: 'Enter subject name',
  },
  {
    index: 2, name: 'code', elementName: 'input', type: 'number', placeholder: 'Enter subject code',
  },
];

const AddSubject = ({ auth }) => {
  const id = auth.ids[0];
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    code: '',
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
      dispatch(addSubject({ token, subjects }));
    }
  };

  return (
    <div className="flex flex-col py-5 h-screen bg-gray-200 md:px-40">
      <div className="h-3/4 lg:px-20">
        <div className="flex flex-col justify-center border min-h-full py-3 mx-5 md:mx-10 rounded-lg bg-white shadow-md">
          <div>
            <h2 className="text-3xl text-center text-blue-400">Add Subject</h2>
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
              <FormikForm options={fields} />
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

AddSubject.propTypes = {
  auth: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.number),
    entities: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
};

export default AddSubject;
