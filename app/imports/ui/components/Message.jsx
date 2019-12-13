import React from 'react';
import { Header, Card, Feed, Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link, NavLink } from 'react-router-dom';
import AddNote from './AddNote';
import Note from './Note';
import swal from 'sweetalert';
import { Messages } from '../../api/message/Messages';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Message extends React.Component {

  delete =() => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this message board!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
        .then((willDelete) => {
          if (willDelete) {
            Messages.remove(this.props.message._id);
            swal('The message board has been deleted!', {
              icon: 'success',
            });
          } else {
            swal('Your imaginary file is safe!');
          }
        });
  }

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
