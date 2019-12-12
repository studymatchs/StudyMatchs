import React from 'react';
import { Header, Card, Feed, Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link, NavLink } from 'react-router-dom';
import AddNote from './AddNote';
import Note from './Note';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Message extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Card.Header>{this.props.message.Name} {this.props.message.Name}</Card.Header>
            <Card.Description>
              {this.props.message.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='standard-size'>
            <Feed>
              {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
            </Feed>

            </div>

            <Modal trigger={<Button>Board</Button>}>
              <div className='standard-size'>
              <Feed>
                <Header>{this.props.message.Name}</Header>
                {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
              </Feed>
              </div>

              <Button as={NavLink} activeClassName="active" exact to="/AddMessage" key='AddMessage'>Make Message Board</Button>

            </Modal>
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
