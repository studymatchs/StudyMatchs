import React from 'react';
import { Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import LongTextField from 'uniforms-semantic/LongTextField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Homework, HomeworkSchema } from '../../api/homework/Homework';

/** Renders the Page for adding a document. */
class EditHomework extends React.Component {

  /** On submit, insert the data. */
  submit(data) {
    const { assignmentName, originClass, dueDate, description } = data;
    const owner = Meteor.user().username;
    const meToo = [' '];
    Homework.update(this.props.id, { $set: { assignmentName, originClass, dueDate, description, meToo, owner }},
        (error) => (error ?
            swal('Error', error.message, 'error') :
            swal('Success', 'Item updated successfully', 'success')));
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <AutoForm ref={ref => { fRef = ref; }} schema={HomeworkSchema} onSubmit={data => this.submit(data, fRef)} >
          <Segment>
            <TextField label="Homework:" name='assignmentName'/>
            <TextField label="From:" name='originClass'/>
            <LongTextField label="Description:" name='description'/>
            <TextField label="Due date:" name='dueDate'/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
            <HiddenField name='owner' value={this.props.owner}/>
            <HiddenField name='meToo' value={['']}/>
            <ErrorsField/>
          </Segment>
        </AutoForm>
    );
  }
}

EditHomework.propTypes = {
  owner: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default EditHomework;
