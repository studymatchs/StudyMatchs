import React from 'react';
import { Button, Feed, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { Notes } from '../../api/note/Notes';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Note extends React.Component {

  // delete constructor for Note
  delete =() => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this message!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
        .then((willDelete) => {
          if (willDelete) {
            Notes.remove(this.props.note._id);
            swal('The message has been deleted!', {
              icon: 'success',
            });
          } else {
            swal('Your imaginary file is safe!');
          }
        });
  };

  render() {

    return (

        // start feed
        <Feed.Event >


          <Feed.Content>
            <Feed.Date>{this.props.note.owner}:</Feed.Date>
            <Feed.Summary>
              <Feed.Date content={this.props.note.createdAt.toLocaleDateString('en-US')} />
            </Feed.Summary>
          </Feed.Content>

          <Feed.Content>
            <Feed.Summary>
              {this.props.note.note}

            </Feed.Summary>
          </Feed.Content>

          <Feed.Content>
            <Feed.Summary>
              <Button animated='fade' onClick={this.delete}>
                <Button.Content visible><Icon name='trash' /></Button.Content>
                <Button.Content hidden>delete</Button.Content>
              </Button>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

    );
  }
}

/** Require a document to be passed to this component. */
Note.propTypes = {
  note: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Note);
