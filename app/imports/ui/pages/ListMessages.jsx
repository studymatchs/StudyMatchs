import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Message from '../components/Message';
import { Messages } from '../../api/Message/Messages';
import { Notes } from '../../api/note/Notes';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListMessages extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>List Messages</Header>
          <Card.Group>
            {/* eslint-disable-next-line max-len */}
            {this.props.Messages.map((Message, index) => <Message key={index} Message={Message} notes={this.props.notes.filter(note => (note.MessageId === Message._id))}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListMessages.propTypes = {
  Messages: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Messages');
  const subscription2 = Meteor.subscribe('Notes');
  return {
    Messages: Messages.find({}).fetch(),
    notes: Notes.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(ListMessages);
