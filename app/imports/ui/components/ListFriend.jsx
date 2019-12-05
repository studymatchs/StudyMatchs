import React from 'react';
import { List, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ListFriend extends React.Component {
  render() {
    return (
        <List.Item>
          <List.Content>
            <List.Header>Test</List.Header>
            <List.Summary>
              Test
            </List.Summary>
          </List.Content>
        </List.Item>
    );
  }
}

/** Require a document to be passed to this component. */
ListFriend.propTypes = {
  friend: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ListFriend);
