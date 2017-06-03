import React from 'react'
import HomeIcon from 'material-ui/svg-icons/action/home';
import {withRouter} from 'react-router'
import FlatButton from 'material-ui/FlatButton';

function HomeButton(props) {
  return (
    <div className="home-button-container">
      <div className="home-button">
        <FlatButton
          icon={<HomeIcon color="rgba(0, 0, 0, 0.63)"/>}
          onClick={()=>{
            props.history.push('/')
          }}/>
      </div>
    </div>
  )
}

export default withRouter(HomeButton)
