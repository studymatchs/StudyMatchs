import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const UserClasses = new Mongo.Collection('UserClasses');

/** Define a schema to specify the structure of each document in the collection. */
const UserClassesSchema = new SimpleSchema({
  userID: String,
  firstName: String,
  lastName: String,
  major: String,
  classes: [String],
  image: String,
  description: String,
  sign: String,
  gpa: String,
  friendList: [String],
}, { tracker: Tracker });

/** Attach this schema to the collection. */
UserClasses.attachSchema(UserClassesSchema);

/** Make the collection and schema available to other code. */
export { UserClasses, UserClassesSchema };
