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
import { Classmates, ClassmatesSchema } from '../../api/classes/Classmates';
import { UserClasses } from '../../api/profile/UserClasses';

/** Renders the Page for adding a document. */
class AddClass extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { className, classmate } = data;
    const owner = Meteor.user().username;
    const profileID = UserClasses.findOne({ userID: owner })._id;
    UserClasses.update(profileID, { $addToSet: { classes: className } });
    Classmates.insert({ className, classmate },
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
        <AutoForm ref={ref => { fRef = ref; }} schema={ClassmatesSchema} onSubmit={data => this.submit(data, fRef)} >
          <Segment>
            <TextField label="Class:" name='className'/>
            <SubmitField value='Submit'/>
            <HiddenField name='classmate' value={this.props.owner}/>
            <ErrorsField/>
          </Segment>
        </AutoForm>
    );
  }
}

AddClass.propTypes = {
  owner: PropTypes.string.isRequired,
};

export default AddClass;
