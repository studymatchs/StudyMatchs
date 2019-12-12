import React from 'react';
import { Image, Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { Contacts } from '../../api/contact/Contacts';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ContactAdmin extends React.Component {

  delete =() => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
        .then((willDelete) => {
          if (willDelete) {
            Contacts.remove(this.props.contact._id);
            swal('Poof! Your imaginary file has been deleted!', {
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
            <Image
                floated='right'
                size='mini'
                src={this.props.contact.image}
            />
            <Card.Header>{this.props.contact.firstName} {this.props.contact.lastName}</Card.Header>
            <Card.Meta>{this.props.contact.zodiacSign}</Card.Meta>
            <Card.Meta>{this.props.contact.gpa}</Card.Meta>
            <Card.Description>
              {this.props.contact.description}
            </Card.Description>
            <Card.Meta extra>
              {this.props.contact.owner}
            </Card.Meta>
            <Card.Meta extra>
              <Button onClick={this.delete}>DELETE</Button>
            </Card.Meta>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
ContactAdmin.propTypes = {
  stuff: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ContactAdmin);
