import React from 'react';
import { Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Chat, ChatSchema } from '../../api/chat/Chat';

/** Renders the Page for adding a document. */
class AddChat extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { chat, contactId, createdAt } = data;
    const owner = Meteor.user().username;
    Chat.insert({ chat, contactId, createdAt, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <AutoForm ref={ref => { fRef = ref; }} schema={ChatSchema} onSubmit={data => this.submit(data, fRef)} >
          <Segment>
            <TextField label="Chat:" name='Chat'/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
            <HiddenField name='owner' value={this.props.owner}/>
            <HiddenField name='createdAt' value={new Date()}/>
            <ErrorsField/>
          </Segment>
        </AutoForm>
    );
  }
}

AddChat.propTypes = {
  owner: PropTypes.string.isRequired,
};

export default AddChat;
