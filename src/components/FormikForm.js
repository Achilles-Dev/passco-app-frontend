import React, { useState } from 'react';
import { ErrorMessage, Field, Form } from 'formik';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const FormilForm = (props) => {
  const {
    options, removeOption, closeIcon, optionLength, addOption,
  } = props;
  const [message, setMessage] = useState('');
  const { pathname } = useLocation();

  const handleFocus = () => {
    setMessage('');
  };

  const renderError = (message) => <span className="text-red-600">{message}</span>;

  return (
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
      { pathname.includes('question')
        ? (
          <div className={`flex justify-start mb-3 ${optionLength === 4 ? 'hidden' : ''}`}>
            <button type="button" className="btn-primary" onClick={addOption}>Add option</button>
          </div>
        ) : ''}
      <span className="text-red-600">{message}</span>
      <div id="save-button" className="flex justify-center">
        <button type="submit" className="border px-10 py-3 border-green text-green hover:bg-slate-700">Save Question</button>
      </div>
    </Form>
  );
};

FormilForm.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      placeholder: PropTypes.string,
    }),
  ).isRequired,
  closeIcon: PropTypes.string.isRequired,
  removeOption: PropTypes.func.isRequired,
  optionLength: PropTypes.number.isRequired,
  addOption: PropTypes.func.isRequired,
};

export default FormilForm;
