import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';

import TextFieldGroup from '../common/TextFieldGroup';

function validateInput(data) {
  const errors = {};

  if (validator.isEmpty(data.identifier)) {
    errors.identifier = "can't be blank";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "can't be blank";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true }, function() {
        this.props.login(this.state).then(
          (res) => this.context.router.push('/'),
          (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
        );
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  render() {
    const { errors, identifier, password, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        { errors.form && <div className="alert alert-danger">{errors.form}</div> }

        <TextFieldGroup
          field="identifier"
          label="Username / Email"
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}
        />

        <TextFieldGroup
          field="password"
          label="password"
          value={password}
          error={errors.password}
          onChange={this.onChange}
          type="password"
        />

        <div className="form-group">
          <button
            className="btn btn-primary btn-lg"
            disabled={isLoading}
          >
            Login
          </button>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
}

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(null, { login })(LoginForm);
