import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Button, List, Modal } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Homework } from '../../api/homework/Homework';
import HomeworkList from '../components/HomeworkList';
import AddHomework from '../components/AddHomework';
/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListHomework extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Homework</Header>
            {/* eslint-disable-next-line max-len */}
              <List divided relaxed>
                {/* eslint-disable-next-line max-len */}
                {this.props.myHomework.map((sessionGroup, index) => <HomeworkList key={index} HomeworkList={sessionGroup}/>)}
              </List>

            <div className="ui center aligned container">
              <Modal trigger={<Button>Add Homework</Button>}>
                <AddHomework owner={Meteor.user().username}/>
              </Modal>
            </div>
        </Container>
    );
    // {this.Homeworks.map((Homework, index) => <Homework key={index} Homework={Homework}/>)} needs to fix
  }
}

/** Require an array of Stuff documents in the props. */
ListHomework.propTypes = {
  myHomework: PropTypes.array.isRequired,
  allHomework: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('MyHomework');
  const subscription2 = Meteor.subscribe('AllHomework');
  return {
    myHomework: Homework.find({}).fetch(),
    allHomework: Homework.find().fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(ListHomework);
