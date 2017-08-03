import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function TextFieldGroup({
  field,
  value,
  label,
  error,
  type,
  onChange,
  checkUserExists,
}) {
  return (
    <div className={classnames('form-group', { 'has-error': error })}>
      <label htmlFor={field} className="control-label">{label}</label>
      <input
        type={type}
        name={field}
        value={value}
        onChange={onChange}
        onBlur={checkUserExists}
        className="form-control"
      />
      {error && <span className="help-block">{error}</span>}
    </div>
  );
}

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checkUserExists: PropTypes.func,
};

TextFieldGroup.defaultProps = {
  type: 'text',
  error: '',
  checkUserExists: () => {},
};

export default TextFieldGroup;
