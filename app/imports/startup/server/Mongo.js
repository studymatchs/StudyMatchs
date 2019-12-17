import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/contact/Contacts';
import { Messages } from '../../api/message/Messages';
import { StudySessions } from '../../api/studysession/StudySessions';
import { Classmates } from '../../api/classes/Classmates';

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

function addClassmates(data) {
  console.log(`  Adding ${data.classmate} ${data.className}`);
  Classmates.insert(data);
}

if (Classmates.find().count() === 0){
  if (Meteor.settings.defaultClassmates) {
    console.log(' Adding default classes');
    Meteor.settings.defaultClassmates.map(data => addClassmates(data));
  }
}