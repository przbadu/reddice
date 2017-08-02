import React, { Component } from 'react';
// import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import validator from 'validator';
import { map, isEmpty } from 'lodash';

import timezones from '../../data/timezones';
import TextFieldGroup from './../common/TextFieldGroup';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: '',
      errors: {},
      isLoading: false,
      invalid: false,
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value  })
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  checkUserExists(e) {
    const field = e.target.name;
    const value = e.target.value;

    if (value !== '') {
      this.props.isUserExists(value).then(res => {
        let errors = this.state.errors;
        let invalid;

        if (res.data.user) {
          errors[field] = 'is already taken'
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You signed up successfully. Welcome!'
          })
          this.context.router.push('/');
        },
        (err) => this.setState({ errors: err.response.data, isLoading: false })
      );
    }
  }

  render () {
    const { errors } = this.state;
    const options = map(timezones, (val, key) =>
      <option key={key} value={val}>{key}</option>
    );

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join our community!</h1>

        <TextFieldGroup
          type="username"
          field="username"
          value={this.state.username}
          onChange={this.onChange}
          label="Username"
          error={errors.username}
          checkUserExists={this.checkUserExists}
        />

        <TextFieldGroup
          type="email"
          field="email"
          value={this.state.email}
          onChange={this.onChange}
          label="Email"
          error={errors.email}
          checkUserExists={this.checkUserExists}
        />

        <TextFieldGroup
          type="password"
          field="password"
          value={this.state.password}
          onChange={this.onChange}
          label="Password"
          error={errors.password}
        />

        <TextFieldGroup
          type="password"
          field="passwordConfirmation"
          value={this.state.passwordConfirmation}
          onChange={this.onChange}
          label="Password Confirmation"
          error={errors.passwordConfirmation}
        />

        <div className={classnames("form-group", { 'has-error': errors.timezone })}>
          <label className="control-label">Timezones</label>
          <select
              name="timezone"
              className="form-control"
              value={this.state.timezone}
              onChange={this.onChange}
          >
            <option value="" disabled>Choose Your Timezone</option>
            {options}
          </select>
          {errors.timezone &&
            <span className="help-block">{errors.timezone}</span>
          }
        </div>

        <div className={classnames("form-group")}>
          <button
            disabled={this.state.isLoading || this.state.invalid}
            className="btn btn-primary btn-lg"
            >
              Sign up
            </button>
        </div>
      </form>
    )
  }
};

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired,
}

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired
}

function validateInput(data) {
  let errors = {};

  if (validator.isEmpty(data.username)) {
    errors.username = "is required"
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'is required';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'invalid email!';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'is required';
  }

  if (validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'is required';
  }

  if (!validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = "Passwords must match";
  }

  if (validator.isEmpty(data.timezone)) {
    errors.timezone = 'is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export default SignupForm;
