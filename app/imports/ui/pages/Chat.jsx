import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, List, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ChatLog from '../components/ChatLog';
import AddChat from '../components/AddChat';

class Chat extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Chat</Header>
          {/* eslint-disable-next-line max-len */}
          <List divided relaxed>
            {/* eslint-disable-next-line max-len */}
            {this.props.chatLog.map((chatStuff, index) => <ChatLog key={index} ChatLog={chatStuff}/>)}
          </List>

          <div className="ui center aligned container">
            <AddChat/>
          </div>
        </Container>
    );
    // {this.studysessions.map((studysession, index) => <StudySession key={index} studysession={studysession}/>)} needs to fix
  }
}

Chat.propTypes = {
  chatLog: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Chat');
  return {
    chatLog: Chat.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Chat);
