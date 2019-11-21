import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Button, List } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { StudySessions } from '../../api/studysession/StudySessions';
import { StudySession } from '../components/StudySession';
import { Notes } from '../../api/note/Notes';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Schedule extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Schedule</Header>
            {/* eslint-disable-next-line max-len */}
          <List inverted>
            <List.Item>
              <List.Icon name='map' />
              <List.Content>
                <List.Header>ICS 314 Study Session by
                  john@foo.com</List.Header>
                <List.Description>
                  A student who passed ICS 314 is willing to help students taking this course at this time.
                </List.Description>
                <List.Content extra>
                  Date: Nov.30 2019
                </List.Content>
              </List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name='map' />
              <List.Content>
                <List.Header>ICS 311 Study Session by
                  john@foo.com</List.Header>
                <List.Description>
                  A student who passed ICS 311 is willing to help students taking this course at this time.
                </List.Description>
                <List.Content extra>
                  Date: Nov.31 2019
                </List.Content>
              </List.Content>
            </List.Item>

            <List.Item>
              <List.Icon name='map' />
              <List.Content>
                <List.Header>ART 101 Profile Drawing by
                  john@foo.com</List.Header>
                <List.Description>
                  I want to help people find other people they can draw portraits of!
                </List.Description>
                <List.Content extra>
                  Date: Jan.31 2020
                </List.Content>
              </List.Content>
            </List.Item>
          </List>

            <div className="ui center aligned container">
              <Button as={NavLink} activeClassName="active" exact to="/addS" key='addS'>Add Session</Button>
            </div>
        </Container>
    ); //{this.studysessions.map((studysession, index) => <StudySession key={index} studysession={studysession}/>)} needs to fix
  }
}

/** Require an array of Stuff documents in the props. */
Schedule.propTypes = {
  studysessions: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Contacts');
  const subscription2 = Meteor.subscribe('Notes');
  return {
    studysessions: StudySessions.find({}).fetch(),
    notes: Notes.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(Schedule);
