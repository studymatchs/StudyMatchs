import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/contact/Contacts';
import { StudySessions } from '../../api/studysession/StudySessions';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */

function addContact(data) {
  console.log(`  Adding: ${data.firstName} ${data.lastName} (${data.owner})`);
  Contacts.insert(data);
}

/** Initialize the collection if empty. */
if (Contacts.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default data.');
    Meteor.settings.defaultContacts.map(data => addContact(data));
  }
}

function addStudySession(data) {
  console.log(`  Adding: ${data.name} ${data.date} (${data.owner})`);
  StudySessions.insert(data);
}

/** Initialize the collection if empty. */
if (StudySessions.find().count() === 0) {
  if (Meteor.settings.defaultStudySessions) {
    console.log('Creating default sessions.');
    Meteor.settings.defaultStudySessions.map(data => addStudySession(data));
  }
}
