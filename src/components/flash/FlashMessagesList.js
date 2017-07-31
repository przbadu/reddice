import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FlashMessage from './FlashMessage';
import { deleteFlashMessage } from '../../actions/flashMessages';

function FlashMessagesList({ messages, deleteFlashMessage }) {
  return (
    <div className="flashMessagesList">
      {
        messages.map(message =>
          <FlashMessage
            key={message.id}
            message={message}
            deleteFlashMessage={deleteFlashMessage}
          />
        )
      }
    </div>
  );
}

FlashMessagesList.defaultProps = {};

FlashMessagesList.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    messages: state.flashMessages,
  };
}

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessagesList);
