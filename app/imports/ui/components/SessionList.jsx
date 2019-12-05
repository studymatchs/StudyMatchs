import React from 'react';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SessionList extends React.Component {
  render() {
    return (
            <List.Item>
                <List.Icon name='marker' />
                <List.Content>
                    <List.Header as='a'>{this.props.SessionList.name} by
                        {this.props.SessionList.owner}</List.Header>
                    <List.Description>
                        {this.props.SessionList.description}
                    </List.Description>
                <List.Content extra>
                    {this.props.SessionList.date}
                </List.Content>
                </List.Content>
            </List.Item>
    );
  }
}

/** Require a document to be passed to this component. */
SessionList.propTypes = {
  SessionList: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(SessionList);
