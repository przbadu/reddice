import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function TextFieldGroup({ field, value, label, error, type, onChange }) {
  return (
    <div className={classnames("form-group", { 'has-error': error })}>
      <label className="control-label">{label}</label>
      <input
        type={type}
        name={field}
        value={value}
        onChange={onChange}
        className='form-control'
      />
      {error && <span className="help-block">{error}</span>}
    </div>
  )
}

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup;
