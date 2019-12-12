import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const StudySessions = new Mongo.Collection('StudySessions');

/** Define a schema to specify the structure of each document in the collection. */
const StudySessionSchema = new SimpleSchema({
  name: String,
  location: String,
  time: String,
  description: String,
  subject: {
    type: String,
    allowedValues: ['ICS', 'Math', 'Biology', 'Chemistry', 'Physics', 'Art/Design', 'Performing Arts', 'Other'],
    defaultValue: 'Other',
  },
  SOS: {
    type: Boolean,
    defaultValue: false,
  },
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
StudySessions.attachSchema(StudySessionSchema);

/** Make the collection and schema available to other code. */
export { StudySessions, StudySessionSchema };
