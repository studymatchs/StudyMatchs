import React from 'react';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StudySession extends React.Component {
  render() {
    return (
        <List>
            <List.Item>
                <List.Icon name='marker' />
                <List.Content>
                    <List.Header as='a'>{this.props.studysession.name} by
                        {this.props.studysession.owner}</List.Header>
                    <List.Description>
                        {this.props.studysession.description}
                    </List.Description>
                <List.Content extra>
                    {this.props.studysession.date}
                </List.Content>
                </List.Content>
            </List.Item>
        </List>
    );
  }
}

/** Require a document to be passed to this component. */
StudySession.propTypes = {
  studysession: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StudySession);
