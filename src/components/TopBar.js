import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import HomeIcon from 'material-ui/svg-icons/action/home';
import {withRouter} from 'react-router'

function TopBar(props) {
  return (<AppBar
    iconElementLeft={
      <IconButton>
        <HomeIcon/>
      </IconButton>
    }
    title={props.title}
    onTouchTap={()=>{
      props.match.history.push('/')
    }}
  />)
}

TopBar.propTypes = {
  'title': PropTypes.string.isRequired
}

export default withRouter(TopBar)
