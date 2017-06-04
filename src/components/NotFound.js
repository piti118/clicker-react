import React from 'react';
import BadMood from 'material-ui/svg-icons/social/mood-bad'
import { withRouter, NavLink } from 'react-router-dom'
import Content from './Content'

function NotFound() {
  return (
    <Content withHome={false}>
      <div>
        <h1><BadMood /> Page not found. <BadMood /></h1>
      </div>
      <div>
        Return to <NavLink to="/">Homepage</NavLink>.
      </div>
    </Content>
  )
}

export default withRouter(NotFound)
