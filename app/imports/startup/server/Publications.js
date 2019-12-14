import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Contacts } from '../../api/contact/Contacts';
import { Messages } from '../../api/message/Messages';
import { Notes } from '../../api/note/Notes';
import { Classmates } from '../../api/classes/Classmates';
import { StudySessions } from '../../api/studysession/StudySessions';
import { UserClasses } from '../../api/profile/UserClasses';
import { Chat } from '../../api/chat/Chat';
import { Homework } from '../../api/homework/Homework';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Contacts', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Contacts.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('ContactsAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Contacts.find();
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('AllContacts', function publish() {
    return Contacts.find();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Messages', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Messages.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('Notes', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Notes.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('Classmates', function publish() {
  if (this.userId) {
    // const classmate = Meteor.users.findOne(this.userId).classes;
    return Classmates.find();
  }
  return this.ready();
});

Meteor.publish('Sessions', function publish() {
  if (this.userId) {
    // const classmate = Meteor.users.findOne(this.userId).username;
    return StudySessions.find();
  }
  return this.ready();
});

Meteor.publish('Profile', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return UserClasses.find({ userID: username });
  }
  return this.ready();
});

Meteor.publish('Chat', function publish() {
  if (this.userId) {
    // const classmate = Meteor.users.findOne(this.userId).username;
    return Chat.find();
  }
  return this.ready();
});

Meteor.publish('MyHomework', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Homework.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('AllHomework', function publish() {
  if (this.userId) {
    return Homework.find();
  }
  return this.ready();
});
