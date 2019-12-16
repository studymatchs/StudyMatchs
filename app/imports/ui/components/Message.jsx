import React from 'react';
import { Header, Card, Feed, Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import AddNote from './AddNote';
import Note from './Note';
import swal from 'sweetalert';
import { Messages } from '../../api/message/Messages';
import ModalDescription from 'semantic-ui-react/dist/commonjs/modules/Modal/ModalDescription';
import { Notes } from '../../api/note/Notes';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Message extends React.Component {

  delete =() => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this message board. You must delete all messages first',
      icon: 'warning',
    })
        .then((willDelete) => {
          if (willDelete) {
            if ((this.props.notes.filter(note => (note.contactId === this.props.message._id))).length === 0) {

              Messages.remove(this.props.message._id);
              swal('The message board has been deleted.', {
                icon: 'success',
              });
            } else {
              swal('You must delete all messages first');
            }
          } else {
            swal('done');
          }
        });
  };

  render() {
    return (
        <Card>
          <Card.Content>
            <Card.Header>{this.props.message.Name} {this.props.message.Name} </Card.Header>
            <Card.Content>Made by {this.props.message.owner}</Card.Content>
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
            <Modal trigger={<Button>View Board</Button>}>
              <div className='standard-size'>
                <Feed>
                  <Header>{this.props.message.Name}</Header>
                  <ModalDescription>{this.props.message.description}</ModalDescription>
                  {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
                </Feed>
              </div>
              <Card.Content extra>
                <AddNote owner={this.props.message.owner} contactId={this.props.message._id}/>
              </Card.Content>
            </Modal>
          </Card.Content>
          <Card.Meta extra>
            <Button onClick={this.delete}>Delete Board</Button>
          </Card.Meta>
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
