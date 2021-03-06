import React from 'react';
import { Grid, Segment, Header, Button } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import LongTextField from 'uniforms-semantic/LongTextField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import SubmitField from 'uniforms-semantic/SubmitField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { NavLink } from 'react-router-dom';
import TextField from 'uniforms-semantic/TextField';
import { Messages } from '../../api/message/Messages';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  Name: String,
  description: String,
});

/** Renders the Page for adding a document. */
class AddMessage extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { description, Name } = data;
    const owner = Meteor.user().username;
    Messages.insert({ description, Name, owner },
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
        <div className="studymachs-make-message-background-image">
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center" inverted>Post Message Board</Header>
              <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
                <Segment>
                  <TextField name='Name'/>
                  <LongTextField name='description'/>
                  <SubmitField value='Submit'/>
                  <Button as={NavLink} activeClassName="active" exact to="/ListMessages" key='ListMessages'>
                    List Message Boards</Button>
                  <ErrorsField/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default AddMessage;
