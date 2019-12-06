import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Classmates } from '../../api/classes/Classmates';
import { UserClasses } from '../../api/profile/UserClasses';

/* eslint-disable no-console */

function createUser(email, password, classes, firstName, lastName, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
    profile: {
      firstName: firstName,
      lastName: lastName,
      major: '',
      classes: classes,
      image: '',
      description: '',
      sign: '',
      gpa: '',
      friendList: [],
    },
  });
  for (let x = 0; x < classes.length; x++) {
    const newClass = classes[x];
    const student = `${firstName} ${lastName}`;
    Classmates.insert({
      className: newClass,
      classmateID: email,
      classmateName: student,
    });
    console.log(`  Adding user ${email} to ${newClass}.`);
  }
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
  UserClasses.insert({
    userID: email,
    firstName: firstName,
    lastName: lastName,
    major: 'None',
    classes: classes,
    image: 'None',
    description: 'None',
    sign: 'None',
    gpa: 'None',
    friendList: ['None'],
  });
  console.log(`  Adding ${classes} to profile.`);
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    // eslint-disable-next-line max-len
    Meteor.settings.defaultAccounts.map(({ email, password, classes, firstName, lastName, role }) => createUser(email, password, classes, firstName, lastName, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
