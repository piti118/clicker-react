import React from 'react'
import HomeIcon from 'material-ui/svg-icons/action/home';
import {withRouter} from 'react-router'
import IconButton from 'material-ui/IconButton';

function HomeButton(props) {
  return (
    <div className="home-button-container">
      <div className="home-button">
        <IconButton
          backgroundColor="rgba(0,0,0,0)"
          onClick={()=>{
            props.history.push('/')
          }}
          hoveredStyle={{backgroundColor:'rgba(196, 196, 196, 0.64)'}}>
          <HomeIcon color="rgba(0, 0, 0, 0.63)"/>
        </IconButton>
      </div>
    </div>
  )
}

export default withRouter(HomeButton)
