import React from 'react';
import { Grid, Icon, Header, Container } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className="digits-landing-background">
          <Container textAlign='center' >
            <Header as="h1" centered inverted>Welcome to University of Hawaii StudyMatchs</Header>
            <ln/>
            {/* eslint-disable-next-line max-len */}
            <Header as="h3" inverted>StudyMatchs is a UH service dedicated to helping students study by allowing them to schedule study sessions with other students in similar classes.</Header>
            <ln/>
          </Container>
        <Grid textAlign='center' stackable container columns={3} >

          <Grid.Column textAlign='center'>
            <Icon size="huge" name="users" inverted/>
            <Header as="h1" inverted>Classmates</Header>
            {/* eslint-disable-next-line max-len */}
            <Header as="h3" inverted>Students can interact with each other whether in a study session or via the online message board whenever they need help. They can get the help of anyone who is taking or has taken the class.</Header>
          </Grid.Column>

          <Grid.Column textAlign='center'>
            <Icon size="huge" name="file alternate" inverted/>
            <Header as="h1" inverted>Classes</Header>
            {/* eslint-disable-next-line max-len */}
            <Header as="h3" inverted>Students can sign up for classes that they can either study in themselves or assist other students having trouble. Because there is no limit in class size, all students, whether they already took the class or are taking it currently, are able to help each other.</Header>
          </Grid.Column>

          <Grid.Column textAlign='center'>
            <Icon size="huge" name="calendar check" inverted/>
            <Header as="h1" inverted>Schedule Study Sessions</Header>
            {/* eslint-disable-next-line max-len */}
            <Header as="h3" inverted>UH students can assist and be given assistance in a variety of subjects by scheduling study sessions with other users. Regardless of the session is one-on-one or win a big group, students can select the time, date, and location of a study session. Emergency sessions can be made as well.</Header>
          </Grid.Column>

        </Grid>
        </div>
    );
  }
}

export default Landing;
