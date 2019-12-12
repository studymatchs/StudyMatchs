import React from 'react';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ChatLog extends React.Component {
  render() {
    return (
        <List.Item>
          <List.Icon name='marker' />
          <List.Content>
            <List.Header>{this.props.ChatLog.owner}:</List.Header>
            <List.Content>
              {this.props.ChatLog.chat}
            </List.Content>
            <List.Description>
              {this.props.ChatLog.createdAt.toString()}
          </List.Description>
          </List.Content>
        </List.Item>
    );
  }
}

/** Require a document to be passed to this component. */
ChatLog.propTypes = {
  ChatLog: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ChatLog);
