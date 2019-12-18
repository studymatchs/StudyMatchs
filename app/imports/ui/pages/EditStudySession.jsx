import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField'; // required for Uniforms
import SelectField from 'uniforms-semantic/SelectField';
import BoolField from 'uniforms-semantic/BoolField';
import { StudySessions, StudySessionSchema } from '/imports/api/studysession/StudySessions';

/** Renders the Page for editing a single document. */
class EditStudySession extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, location, time, description, subject, finished, SOS, _id } = data;
    StudySessions.update(_id, { $set: { name, location, time, description, subject, finished, SOS } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Edit Schedule</Header>
            <AutoForm schema={StudySessionSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
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
                <Grid columns="2">
                  <Grid.Column><BoolField name='SOS' label='SOS'/></Grid.Column>
                  <Grid.Column><BoolField name='finished' label='Finished?'/></Grid.Column>
                </Grid>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Contact document in the props object. Uniforms adds 'model' to the props, which we use. */
EditStudySession.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Contact documents.
  const subscription = Meteor.subscribe('Sessions');
  return {
    doc: StudySessions.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditStudySession);
