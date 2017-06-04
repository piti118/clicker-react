import React from 'react'
import HomeIcon from 'material-ui/svg-icons/action/home';
import {withRouter} from 'react-router'
import IconButton from 'material-ui/IconButton';

function HomeButton(props) {
  return (
    <div className="hover-highlight">
      <IconButton
        onClick={()=>{
          props.history.push('/')
        }}
      >
        <HomeIcon color="rgba(0, 0, 0, 0.63)" />
      </IconButton>
    </div>
  )
}

export default withRouter(HomeButton)
