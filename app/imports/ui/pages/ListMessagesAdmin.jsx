import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Message from '../components/MessageAdmin';
import { Messages } from '../../api/message/Messages';
import { Notes } from '../../api/note/Notes';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListMessagesAdmin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    return (
        <div className="studymachs-message-background-image">
          <Container>
            <Header as="h2" textAlign="center">Message Boards</Header>
            <Card.Group>
              {/* eslint-disable-next-line max-len */}
              {this.props.messages.map((message, index) => <Message key={index} message={message} notes={this.props.notes.filter(note => (note.contactId === message._id))} />)}
            </Card.Group>
            <div className="ui center aligned container studymachs-message-foot">
              <Button as={NavLink} activeClassName="active" exact to="/AddMessage" key='AddMessage'>Make Message Board
              </Button>
            </div>

          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListMessagesAdmin.propTypes = {
  messages: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Messages');
  const subscription2 = Meteor.subscribe('Notes');
  return {
    messages: Messages.find({}).fetch(),
    notes: Notes.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(ListMessagesAdmin);
