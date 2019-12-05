import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Button, List, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { StudySessions } from '../../api/studysession/StudySessions';
import { StudySession } from '../components/StudySession';
import { Notes } from '../../api/note/Notes';
import SessionList from '../components/SessionList';

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
          <Header as="h2" textAlign="center">Schedule</Header>
            {/* eslint-disable-next-line max-len */}
              <List divided relaxed>
                {/* eslint-disable-next-line max-len */}
                {this.props.sessions.map((sessionGroup, index) => <SessionList key={index} SessionList={sessionGroup}/>)}
              </List>

            <div className="ui center aligned container">
              <Button as={NavLink} activeClassName="active" exact to="/addS" key='addS'>Add Session</Button>
            </div>
        </Container>
    );
    // {this.studysessions.map((studysession, index) => <StudySession key={index} studysession={studysession}/>)} needs to fix
  }
}

/** Require an array of Stuff documents in the props. */
Schedule.propTypes = {
  sessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Sessions');
  return {
    sessions: StudySessions.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Schedule);
