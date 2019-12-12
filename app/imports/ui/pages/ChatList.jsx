import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, List, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ChatLog from '../components/ChatLog';
import AddChat from '../components/AddChat';
import { Chat } from '../../api/chat/Chat';

class ChatList extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Chat</Header>
          {/* eslint-disable-next-line max-len */}
          <div className='standard-size' id='chatWindow'>
          <Segment>
          <List divided relaxed>
            {/* eslint-disable-next-line max-len */}
            {this.props.chatLog.map((chatStuff, index) => <ChatLog key={index} ChatLog={chatStuff}/>)}
          </List>
          </Segment>
          </div>

          <div className="ui center aligned container">
            <AddChat owner={Meteor.user().username}/>
          </div>
        </Container>
    );
    // {this.studysessions.map((studysession, index) => <StudySession key={index} studysession={studysession}/>)} needs to fix
  }
}

ChatList.propTypes = {
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
})(ChatList);
