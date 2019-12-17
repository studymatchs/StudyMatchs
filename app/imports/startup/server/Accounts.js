import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Classmates } from '../../api/classes/Classmates';
import { UserClasses } from '../../api/profile/UserClasses';

/* eslint-disable no-console */

function createUser(email, password, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
  return email;
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    // eslint-disable-next-line max-len
    Meteor.settings.defaultAccounts.map(({ email, password, role }) => (UserClasses.insert({
      userID: `${createUser(email, password, role)}`,
      firstName: 'None',
      lastName: 'None',
      major: 'None',
      classes: ['None'],
      image: 'https://media.wired.com/photos/5b17381815b2c744cb650b5f/master/pass/GettyImages-134367495.jpg',
      description: 'None',
      sign: 'None',
      gpa: 'None',
      friendList: ['None'],
    })));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
