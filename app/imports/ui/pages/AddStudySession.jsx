import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import SubmitField from 'uniforms-semantic/SubmitField';
import SelectField from 'uniforms-semantic/SelectField';
import BoolField from 'uniforms-semantic/BoolField';

import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { StudySessions } from '../../api/studysession/StudySessions';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  location: String,
  time: String,
  description: String,
  subject: {
    type: String,
    allowedValues: ['Select one', 'ICS', 'Math', 'Biology', 'Chemistry', 'Physics', 'Art/Design', 'Performing Arts', 'Environmental Sci', 'Business/Econ', 'Law', 'Nursing', 'Medical', 'Other'],
    defaultValue: 'Select one',
  },
  SOS: {
    type: Boolean,
    defaultValue: false,
  },
  finished: {
    type: Boolean,
    defaultValue: false,
  },
});

/** Renders the Page for adding a document. */
class AddStudySession extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, location, time, description, subject, SOS } = data;
    const owner = Meteor.user().username;
    const team = [' '];
    StudySessions.insert({ name, location, time, description, subject, SOS, team, owner },
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
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Study Session</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <Grid columns="3">
                  <Grid.Column><TextField name='name'
                    label='Title' placeholder='Enter the name of your study session'/></Grid.Column>
                  <Grid.Column><TextField name='location' placeholder='Enter the address'/></Grid.Column>
                  <Grid.Column><TextField name='time' placeholder='Enter the date, start time, and end time'/></Grid.Column>
                </Grid>
                <LongTextField name='description'
                placeholder='Enter any details that may be necessary. Examples include: topics being covered, recommended supplies'/>
                <SelectField name='subject'/>
                <BoolField name='SOS' label='SOS'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddStudySession;
