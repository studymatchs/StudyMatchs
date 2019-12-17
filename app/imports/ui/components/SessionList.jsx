import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Card, Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { StudySessions } from '/imports/api/studysession/StudySessions';
import { Roles } from 'meteor/alanning:roles';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SessionList extends React.Component {

    handleClickTrash() {
        StudySessions.remove(this.props.SessionList._id);
    }

    checkFinished() {
        if (this.props.SessionList.finished === true) {
            return 'Finished';
        }
        if (this.props.SessionList.SOS === true) {
            return 'SOS Urgent!';
        }
        return 'Ongoing';
}

    render() {
    return (
        <Card raised>
            <Card.Content>
                <Card.Header>{this.props.SessionList.name} {this.props.SessionList.lastName}</Card.Header>
                <Card.Description>{this.props.SessionList.time} at {this.props.SessionList.location}</Card.Description>
                <Label color='black'>
                    {this.props.SessionList.subject}
                </Label>
                <Label color='red'>{this.checkFinished()}</Label>
                <Card.Meta>
                    <div className="mini-size">
                    {this.props.SessionList.description}
                    </div>
                </Card.Meta>
            </Card.Content>

            {(this.props.SessionList.owner === Meteor.user().username || Roles.userIsInRole(Meteor.userId(), 'admin')) ?
                (<Card.Content extra>
                        <Button color='green'><Link to={`/editS/${this.props.SessionList._id}`}>Edit</Link></Button>
                        <Button color='black' onClick={this.handleClickTrash.bind(this)}>
                            <Button.Content>
                                <Icon name='trash alternate' inverted/>
                            </Button.Content>
                        </Button>
                </Card.Content>
                ) : ''}
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
SessionList.propTypes = {
  SessionList: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(SessionList);
