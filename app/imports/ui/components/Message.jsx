import React from 'react';
import { Image, Card, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import AddNote from './AddNote';
import Note from './Note';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Message extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Card.Description>
              {this.props.message.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Feed>
              {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
            </Feed>
          </Card.Content>
          <Card.Content extra>
            <AddNote owner={this.props.message.owner} contactId={this.props.message._id}/>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Message.propTypes = {
  message: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Message);
