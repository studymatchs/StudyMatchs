import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Image, Card, Modal, Button } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { UserClasses } from '../../api/profile/UserClasses';
import EditProfile from './EditProfile';
import ClassList from './ClassList';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
      <Menu style={menuStyle} attached="top" borderless inverted color='green'>
        {this.props.currentUser ? (
            <Menu.Item as={NavLink} activeClassName="" exact to="/welcome">
              <Image floated="right" size="small" src="images/StudyMatchsLogoWithDescription.PNG"/>
            </Menu.Item>
        ) : (
            <Menu.Item as={NavLink} activeClassName="" exact to="/">
              <Header inverted as='h1'>StudyMatchs</Header>
            </Menu.Item>
        )}
        {this.props.currentUser ? (
            [<Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add'>Edit Your Profile</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/list" key='list'>You and Others</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/schedule" key='schedule'>Schedule</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/chat" key='chat'>Chat</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/homework" key='homework'>Homework</Menu.Item>,
              // eslint-disable-next-line max-len
            <Menu.Item as={NavLink} activeClassName="active" exact to="/AddMessage" key='AddMessage'>Add Message</Menu.Item>,
              // eslint-disable-next-line max-len
              <Menu.Item as={NavLink} activeClassName="active" exact to="/ListMessages" key='ListMessages'>List Message</Menu.Item>]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item>
                  {this.props.thisProfile.map((myProfile, stall) => <Card key={stall}>
                    <Card.Content>
                      <Image
                          floated='right'
                          size='mini'
                          src={myProfile.image}
                      />
                      <Card.Header>{myProfile.firstName} {myProfile.lastName}</Card.Header>
                      <Card.Meta>zodiacSign: {myProfile.zodiacSign}</Card.Meta>
                      <Card.Meta>gpa: {myProfile.gpa}</Card.Meta>
                      <Card.Description>
                        {myProfile.description}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content>
                      <Modal trigger={<Button icon='edit'/>}>
                        <EditProfile doc={myProfile} id={myProfile._id} friends={myProfile.friendList} classes={myProfile.classes}/>
                      </Modal>
                      <Modal trigger={<Button content='Show Classes'/>}>
                        <ClassList ClassList={myProfile.classes} user={myProfile}/>
                      </Modal>
                    </Card.Content>
                  </Card>)}
                </Dropdown.Item>
                <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
  thisProfile: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,

};

const subscription = Meteor.subscribe('Profile');
/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
  thisProfile: UserClasses.find({}).fetch(),
  ready: subscription.ready(),

}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
