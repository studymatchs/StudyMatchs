import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Grid, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Contact from '../components/Contact';
import { Contacts } from '../../api/contact/Contacts';
import { Notes } from '../../api/note/Notes';
import { UserClasses } from '../../api/profile/UserClasses';
import UserCard from '../components/UserCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListContacts extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Others</Header>
          <Grid textAlign='center' stackable container columns={2} >
            <Grid.Column textAlign='center'>
              <Header as="h4" textAlign="center">My Contacts</Header>
              <Segment className='standard-size'>
          <Card.Group>
            {/* eslint-disable-next-line max-len */}
            {this.props.contacts.map((contact, index) => <Contact key={index} contact={contact} notes={this.props.notes.filter(note => (note.contactId === contact._id))}/>)}
          </Card.Group>
              </Segment>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Header as="h4" textAlign="center">All Users</Header>
              <Segment className='standard-size'>
                <Card.Group>
                  {/* eslint-disable-next-line max-len */}
                  {this.props.userlist.map((contact, index) => <UserCard key={index} user={contact}/>)}
                </Card.Group>
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  userlist: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('AllContacts');
  const subscription2 = Meteor.subscribe('Notes');
  const subscription3 = Meteor.subscribe('AllUsers');
  return {
    contacts: Contacts.find({}).fetch(),
    userlist: UserClasses.find({}).fetch(),
    notes: Notes.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(ListContacts);
