import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Grid, Icon, Header, Tab, Container, Segment, List } from 'semantic-ui-react';
import { Classmates } from '../../api/classes/Classmates';
import { StudySessions } from '../../api/studysession/StudySessions';
import SessionList from '../components/SessionList';
import { UserClasses } from '../../api/profile/UserClasses';

/** A simple static component to render some text for the landing page. */
class UserLanding extends React.Component {
  classmateList(classNam, user) {
    const fullList = ['None'];
    let forward = 0;
    const myName = `${user.firstName} ${user.lastName}`;
    for (let s = 0; s < this.props.classID.length; s++) {
      if (this.props.classID[s].className === classNam && this.props.classID[s].classmateName !== myName) {
        fullList[forward] = `${this.props.classID[s].classmateName}`;
        forward++;
      }
    }
    // console.log(fullList);
    return fullList;
  }

  render() {
    let panes = [
      { menuItem: '', pane: 'You have not enrolled in any classes' },
    ];
    // eslint-disable-next-line max-len
    /*let dummyObject = {
      userID: 'None',
      firstName: 'None',
      lastName: 'None',
      major: 'None',
      classes: ['None'],
      image: 'None',
      description: 'None',
      sign: 'None',
      gpa: 'None',
      friendList: ['None'],
    };
    dummyObject = Object.assign(dummyObject, this.props.userClasses.pop());
    if (typeof (dummyObject.classes) !== 'undefined') {
      // eslint-disable-next-line max-len
      panes = dummyObject.classes.map((className) => ({ menuItem: className, pane: this.classmateList(className, dummyObject) }));
    } */
    console.log(this.props.userClasses);
    // eslint-disable-next-line max-len
    // const panes2 = userObject.classes.map((className) => ({ menuItem: className, pane: this.classmateList(className) }));
    return (
        <div className="digits-landing-background">
          <Container textAlign='center'>
          {this.props.userClasses.map((foo, index) => <Header key={index} as="h1" inverted>Welcome, {foo.firstName}</Header>)}
          </Container>
        <Grid textAlign='center' stackable container columns={3} >

          <Grid.Column textAlign='center'>
            <Icon size="huge" name="users" inverted/>
            <Header as="h1" inverted>Classmates</Header>
            {/* eslint-disable-next-line max-len */}
            <Segment>
            <Tab panes={panes} renderActiveOnly={false} />
            </Segment>
          </Grid.Column>

          <Grid.Column textAlign='center'>
            <Icon size="huge" name="file alternate" inverted/>
            <Header as="h1" inverted>Class Details</Header>
            <Segment>
              {this.props.userClasses.map((foo, index) => <li key={index}>{foo.classes}</li>)}
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
  userClasses: PropTypes.array,
  sessions: PropTypes.array.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Classmates');
  const subscription2 = Meteor.subscribe('Sessions');
  const subscription3 = Meteor.subscribe('Profile');

  return {
    currentUser: Meteor.user() ? `${Meteor.user().username}` : '',
    classID: Classmates.find({}).fetch(),
    userClasses: UserClasses.find({}).fetch(),
    sessions: StudySessions.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(UserLanding);
