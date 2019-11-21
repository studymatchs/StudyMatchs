import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Grid, Icon, Header, Tab, Container, Feed, Segment } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class UserLanding extends React.Component {
  render() {
    const panes = [
      { menuItem: 'ICS101', pane: 'ICS101 Content' },
      { menuItem: 'ICS102', pane: 'ICS102 Content' },
      { menuItem: 'ICS103', pane: 'ICS103 Content' },
    ];
    return (
        <div className="digits-landing-background">
          <Container textAlign='center'>
          <Header as="h1" centered inverted>Welcome, {this.props.currentUser}</Header>
          </Container>
        <Grid textAlign='center' stackable container columns={3} >

          <Grid.Column textAlign='center'>
            <Icon size="huge" name="users" inverted/>
            <Header as="h1" inverted>Classmates</Header>
            {/* eslint-disable-next-line max-len */}
            <Tab panes={panes} renderActiveOnly={false} />
          </Grid.Column>

          <Grid.Column textAlign='center'>
            <Icon size="huge" name="file alternate" inverted/>
            <Header as="h1" inverted>Class Details</Header>
            <Tab panes={panes} renderActiveOnly={false} />
          </Grid.Column>

          <Grid.Column textAlign='center'>
            <Icon size="huge" name="calendar check" inverted/>
            <Header as="h1" inverted>Upcoming Events</Header>
            <Segment color="white">
              <Feed color="white">
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
};

const UserLandingContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(UserLanding);

export default withRouter(UserLandingContainer);
