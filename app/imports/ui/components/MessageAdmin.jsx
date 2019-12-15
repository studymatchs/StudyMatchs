import React from 'react';
import { Header, Card, Feed, Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import AddNote from './AddNote';
import NoteAdmin from './NoteAdmin';
import swal from 'sweetalert';
import { Messages } from '../../api/message/Messages';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MessageAdmin extends React.Component {

  delete =() => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this message board!',
      icon: 'warning',
    })
        .then((willDelete) => {
          if (willDelete) {
            //Notes.remove(this.props.notes.filter(note =>(this.props.notes.contactId === this.props.message._id)));
            //_.each((this.props.notes.filter(note =>(this.props.notes.contactId === this.props.message._id), Notes.remove)
            Messages.remove(this.props.message._id);
            swal('The message board has been deleted.', {
              icon: 'success',
            });
          } else {
            swal('done');
          }
        });
  }

  render() {
    return (
        <Card>
          <Card.Content>
            <Card.Header>{this.props.message.Name} {this.props.message.Name} </Card.Header>
            <Card.Content>Made  by  {this.props.message.owner}</Card.Content>
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
                  {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
                </Feed>
              </div>
              <Card.Content extra>
                <AddNote owner={this.props.message.owner} contactId={this.props.message._id}/>
              </Card.Content>
              <Button as={NavLink} activeClassName="active" exact to="/AddMessage" key='AddMessage'>Make Message Board</Button>
            </Modal>
          </Card.Content>
          <Card.Meta extra>
            <Button onClick={this.delete}>Admin Delete Board</Button>
          </Card.Meta>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
MessageAdmin.propTypes = {
  message: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(MessageAdmin);
