import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Icon, List, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Homework } from '../../api/homework/Homework';
import EditHomework from './EditHomework';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class HomeworkList extends React.Component {

  render() {
    return (
            <List.Item>
                <List.Icon name='file' size='big' />
                <List.Content>
                    <List.Header>{this.props.HomeworkList.assignmentName} for {this.props.HomeworkList.originClass}</List.Header>
                    <List.Description>
                        {this.props.HomeworkList.description}
                    </List.Description>
                <List.Content>
                   Due: {this.props.HomeworkList.dueDate}
                </List.Content>
                  { this.props.HomeworkList.owner === Meteor.user().username ? (
                  <List.Content>
                        <Button onClick={() => Homework.remove(this.props.HomeworkList._id)} icon='cancel'/>
                    <Modal trigger={<Button icon='edit'/>}>
                      <EditHomework owner={this.props.HomeworkList.owner} id={this.props.HomeworkList._id}/>
                    </Modal>
                  </List.Content>
                      ) : (
                      <List.Content>
                        <Button onClick={() => Homework.update({_id: this.props.HomeworkList._id }, { $addToSet: { meToo: Meteor.user().username } })}>
                          <Icon name='handshake'/>
                          {this.props.HomeworkList.meToo.length}
                        </Button>
                      </List.Content>
                  )}
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
