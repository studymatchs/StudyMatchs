import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Grid, Icon, Header, Tab, Container, Segment, List } from 'semantic-ui-react';
import { Classmates } from '../../api/classes/Classmates';
import { StudySessions } from '../../api/studysession/StudySessions';
import SessionList from '../components/SessionList';

/** A simple static component to render some text for the landing page. */
class UserLanding extends React.Component {
  classmateList(classNam) {
    const fullList = ['None'];
    let forward = 0;
    const myName = `${Meteor.user().profile.firstName} ${Meteor.user().profile.lastName}`;
    for (let s = 0; s < this.props.classID.length; s++) {
      if (this.props.classID[s].className === classNam && this.props.classID[s].classmateName !== myName) {
        fullList[forward] = `${this.props.classID[s].classmateName}`;
        forward++;
      }
    }
    console.log(fullList);
    return fullList;
  }

  render() {
    const panes = [
      { menuItem: 'ICS101', pane: '' },
      { menuItem: 'ICS102', pane: 'ICS102 Content' },
      { menuItem: 'ICS103', pane: 'ICS103 Content' },
    ];
    // eslint-disable-next-line max-len
    const panes2 = this.props.userClasses.map((className) => ({ menuItem: className, pane: this.classmateList(className) }));
    return (
        <div className="digits-landing-background">
          <Container textAlign='center'>
          <Header as="h1" inverted>Welcome, {this.props.currentUser}</Header>
          </Container>
        <Grid textAlign='center' stackable container columns={3} >

          <Grid.Column textAlign='center'>
            <Icon size="huge" name="users" inverted/>
            <Header as="h1" inverted>Classmates</Header>
            {/* eslint-disable-next-line max-len */}
            <Segment>
            <Tab panes={panes2} renderActiveOnly={false} />
            </Segment>
          </Grid.Column>

          <Grid.Column textAlign='center'>
            <Icon size="huge" name="file alternate" inverted/>
            <Header as="h1" inverted>Class Details</Header>
            <Segment>
            <Tab panes={panes} renderActiveOnly={false} />
            </Segment>
          </Grid.Column>

          <Grid.Column textAlign='center'>
            <Icon size="huge" name="calendar check" inverted/>
            <Header as="h1" inverted>Upcoming Events</Header>
            <Segment>
              <List divided relaxed>
                {/* eslint-disable-next-line max-len */}
                {this.props.sessions.map((sessionGroup, index) => <SessionList key={index} SessionList={sessionGroup}/>)}
              </List>
            </Segment>
          </Grid.Column>

        </Grid>
        </div>
    );
  }
}

UserLanding.propTypes = {
  currentUser: PropTypes.string,
  classID: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  userClasses: PropTypes.array.isRequired,
  sessions: PropTypes.array.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Classmates');
  const subscription2 = Meteor.subscribe('Sessions');

  return {
    currentUser: Meteor.user() ? `${Meteor.user().username}` : '',
    classID: Classmates.find({}).fetch(),
    userClasses: Meteor.user() ? Meteor.user().profile.classes : [''],
    sessions: StudySessions.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(UserLanding);
