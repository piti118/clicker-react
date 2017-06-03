import React, { Component } from 'react';
import BadMood from 'material-ui/svg-icons/social/mood-bad'
import {withRouter, NavLink} from 'react-router-dom'
import HomeIcon from 'material-ui/svg-icons/action/home';

function NotFound(props) {
  return (
    <div className="full-screen vertical-center">
      <div className="horizontal-center card">
        <div>
          <h1><BadMood/> Page not found. <BadMood/></h1>
        </div>
        <div>
          Return to <NavLink to="/">Homepage</NavLink>.
        </div>
      </div>
    </div>
  )
}

export default withRouter(NotFound)
