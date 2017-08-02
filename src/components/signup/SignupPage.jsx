import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userSignupRequest, isUserExists } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';

// components
import SignupForm from './SignupForm';

function SignupPage({ userSignupRequest, addFlashMessage, isUserExists }) {
  return (
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <SignupForm
          userSignupRequest={userSignupRequest}
          addFlashMessage={addFlashMessage}
          isUserExists={isUserExists}
        />
      </div>
    </div>
  )
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired,
}

export default connect(null, {
  userSignupRequest,
  addFlashMessage,
  isUserExists
})(SignupPage);
