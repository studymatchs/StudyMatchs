import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Chat = new Mongo.Collection('Chat');

/** Define a schema to specify the structure of each document in the collection. */
const ChatSchema = new SimpleSchema({
  chat: String,
  createdAt: Date,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Chat.attachSchema(ChatSchema);

/** Make the collection and schema available to other code. */
export { Chat, ChatSchema };
