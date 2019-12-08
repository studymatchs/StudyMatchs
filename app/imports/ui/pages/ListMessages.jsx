import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Button, Icon, Modal  } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Message from '../components/Message';
import { Messages } from '../../api/message/Messages';
import { Notes } from '../../api/note/Notes';
import { NavLink } from 'react-router-dom';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListMessages extends React.Component {


  deleteThisMessage() {
    Messages.remove(this.props.message._id);
  }
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    console.log("Hello");
    return (
          <div className="studymachs-message-background-image">
            <Container>
              <Header as="h2" textAlign="center">Message Boards</Header>
              <Card.Group>
                {/* eslint-disable-next-line max-len */}
                {this.props.messages.map((message, index) => <Modal trigger={<Button>{message.Name} Board</Button>}>
                  <Message key={index} message={message} notes={this.props.notes.filter(note => (note.contactId === message._id))} />
                <Button as={NavLink} activeClassName="active" exact to="/AddMessage" key='AddMessage'>Make Message Board</Button>
                  <Button icon onClick={this.deleteThisMessage.bind(this)}>
                  <Icon name='trash' />
                </Button>
                </Modal>)}
              </Card.Group>

              <div className="ui center aligned container studymachs-message-foot">
                <Button as={NavLink} activeClassName="active" exact to="/AddMessage" key='AddMessage'>Make Message Board</Button>
              </div>

            </Container>
          </div>
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
    messages: Messages.find({}).fetch(),
    notes: Notes.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(ListMessages);
