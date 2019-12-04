import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Grid, Icon, Header, Tab, Container, Feed, Segment } from 'semantic-ui-react';
import { Classmates } from '../../api/classes/Classmates';
import { Contacts } from '../../api/contact/Contacts';
import { Notes } from '../../api/note/Notes';
import Note from '../components/Note';

/** A simple static component to render some text for the landing page. */
class UserLanding extends React.Component {
  classmateList(classNam) {
    console.log();
    let fullList = '';
    for (let s = 0; s < this.props.classID.length; s++) {
      if (this.props.classID[s].className === classNam) {
        fullList += `${this.props.classID[s].classmateName}`;
      }
    }
    return fullList;
  }

  render() {
    const panes = [
      { menuItem: 'ICS101', pane: '' },
      { menuItem: 'ICS102', pane: 'ICS102 Content' },
      { menuItem: 'ICS103', pane: 'ICS103 Content' },
    ];
    // eslint-disable-next-line max-len
    const panes2 = this.props.userClasses.map((className) => ({ menuItem: className, pane: this.classmateList((className)) }));
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
            <Tab panes={panes2} renderActiveOnly={false} />
          </Grid.Column>

          <Grid.Column textAlign='center'>
            <Icon size="huge" name="file alternate" inverted/>
            <Header as="h1" inverted>Class Details</Header>
            <Tab panes={panes} renderActiveOnly={false} />
          </Grid.Column>

          <Grid.Column textAlign='center'>
            <Icon size="huge" name="calendar check" inverted/>
            <Header as="h1" inverted>Upcoming Events</Header>
            <Segment>
              <Feed>
            <Feed.Event >
              <Feed.Content>
                <Feed.Date content="7/7 | 3:30" />
                <Feed.Summary>
                  <label>ICS 101</label>
                  <ul/>
                  <label>Sinclair Library</label>
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
                <Feed.Event >
                  <Feed.Content>
                    <Feed.Date content="7/7 | 3:40" />
                    <Feed.Summary>
                      <label>ICS 111</label>
                      <ul/>
                      <label>Sinclair Library</label>
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event >
                  <Feed.Content>
                    <Feed.Date content="7/7 | 4:30" />
                    <Feed.Summary>
                      <label>ICS 112</label>
                      <ul/>
                      <label>Campus Center</label>
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
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
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Classmates');

  return {
    classID: Classmates.find({}).fetch(),
    userClasses: Meteor.user() ? Meteor.user().profile.classes : [],
    ready: subscription.ready(),
  };
})(UserLanding);
