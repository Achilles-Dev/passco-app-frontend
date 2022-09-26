import React from 'react';
/* eslint-disable react/prop-types */

const Field = (props) => {
  const {
    elementName,
    name,
    type,
    placeholder,
    errorMessage,
    onChange,
    onBlur,
  } = props;

  return (
    <div>
      {elementName === 'input'
        ? (
          <div>
            <input
              className="input-field focus:shadow-outline"
              id={name}
              type={type}
              placeholder={placeholder}
              required="required"
              data-validation-required-message={errorMessage}
              name={name}
              onChange={onChange}
            />
          </div>
        )
        : (
          <div>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={name}
              placeholder={placeholder}
              required="required"
              data-validation-required-message={errorMessage}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
            />
          </div>
        )}
    </div>
  );
};

export default Field;
