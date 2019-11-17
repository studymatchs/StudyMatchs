import React from 'react';
import { Image, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ContactAdmin extends React.Component {
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
            <Card.Meta>{this.props.contact.address}</Card.Meta>
            <Card.Description>
              {this.props.contact.description}
            </Card.Description>
            <Card.Meta extra>
              {this.props.contact.owner}
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