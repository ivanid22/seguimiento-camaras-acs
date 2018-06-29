import React from 'react';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';

export class NavbarUserPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    }
  }

  userPanel() {
    if(this.props.user) {
      return (
        <div>
          <li className="nav-item pull-right">
            <button className="btn btn-primary" onClick={() => {Meteor.logout()}}>Logout</button>
          </li>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.userPanel()}
      </div>
    )
  }
}

export default NavbarUserPanelContainer = withTracker(() => {
  return{
    user: Meteor.user()
  }
})(NavbarUserPanel);
