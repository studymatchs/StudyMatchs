import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/contact/Contacts';
import { Messages } from '../../api/message/Messages';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */

function addContact(data) {
  console.log(`  Adding: ${data.firstName} ${data.lastName} (${data.owner})`);
  Contacts.insert(data);
}

function addMessage(data) {
  console.log(`  Adding: ${data.description} (${data.owner})`);
  Messages.insert(data);
}

/** Initialize the collection if empty. */
if (Contacts.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default data.');
    Meteor.settings.defaultContacts.map(data => addContact(data));
  }
}
