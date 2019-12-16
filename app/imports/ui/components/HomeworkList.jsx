import React from 'react';
import { List, Modal, Header, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class HomeworkList extends React.Component {
  render() {
    function homeworkDetails() {
      return (<Modal basic size='small'>
        <Header icon='archive' content='Archive Old Messages' />
        <Modal.Content>
          <p>
            Your inbox is getting full, would you like us to enable automatic
            archiving of old messages?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>);
    }
    return (
            <List.Item>
                <List.Icon name='marker' />
                <List.Content>
                    <List.Header as='a'>{this.props.HomeworkList.assignmentName} for {this.props.HomeworkList.originClass}</List.Header>
                    <List.Description>
                        {this.props.HomeworkList.description}
                    </List.Description>
                <List.Content>
                    {this.props.HomeworkList.dueDate}
                </List.Content>
                </List.Content>
            </List.Item>
    );
  }
}

/** Require a document to be passed to this component. */
HomeworkList.propTypes = {
  HomeworkList: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(HomeworkList);
