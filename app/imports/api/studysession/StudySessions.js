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
  team: [String],

  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
StudySessions.attachSchema(StudySessionSchema);

/** Make the collection and schema available to other code. */
export { StudySessions, StudySessionSchema };
