import React from 'react';
import { Button, Feed, Container, Segment, Header, List, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AddClass from './AddClass';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ClassList extends React.Component {
  render() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Your Classes</Header>
          {/* eslint-disable-next-line max-len */}
          <div className='standard-size'>
            <Segment>
              <List divided relaxed>
                {/* eslint-disable-next-line max-len */}
                {this.props.ClassList.map((classStuff, index) => <Label key={index}>
                  <Button icon='cancel'/> {classStuff}
                </Label>)}
              </List>
            </Segment>
          </div>

          <div className="ui center aligned container">
            <AddClass owner={this.props.user.userID}/>
          </div>
        </Container>
    );
  }
}

/** Require a document to be passed to this component. */
ClassList.propTypes = {
  ClassList: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ClassList);
