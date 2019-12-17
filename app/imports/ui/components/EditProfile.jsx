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
import { UserClasses, UserClassesSchema } from '../../api/profile/UserClasses';

/** Renders the Page for adding a document. */
class EditProfile extends React.Component {

  /** On submit, insert the data. */
  submit(data) {
    const { userID, firstName, lastName, major, image, description, sign, gpa } = data;
    const classes = this.props.classes;
    const friendList = this.props.friends;
    // eslint-disable-next-line max-len
    UserClasses.update(this.props.id, { $set: { userID, firstName, lastName, major, classes, image, description, sign, gpa, friendList } },
        (error) => (error ?
            swal('Error', error.message, 'error') :
            swal('Success', 'Item updated successfully', 'success')));
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <AutoForm ref={ref => { fRef = ref; }} schema={UserClassesSchema} onSubmit={data => this.submit(data, fRef)} model={this.props.doc}>
          <Segment>
            <TextField label="First Name:" name='firstName'/>
            <TextField label="Last Name:" name='lastName'/>
            <TextField label="Major:" name='major'/>
            <TextField label="Image:" name='image'/>
            <LongTextField label="Description:" name='description'/>
            <TextField label="Zodiac Sign:" name='sign'/>
            <TextField label="GPA:" name='gpa'/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
          </Segment>
        </AutoForm>
    );
  }
}

EditProfile.propTypes = {
  doc: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  friends: PropTypes.array.isRequired,
  classes: PropTypes.array.isRequired,
};

export default EditProfile;
