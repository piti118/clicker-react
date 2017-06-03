import React, { Component } from 'react';
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class JoinRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roomid: ''
    }
  }

  validRoom(roomid) {
    return roomid.length===6
  }

  onRoomChange(roomid) {
    const txt = roomid.replace(/[^0-9a-z]/gi, '')
    this.setState({roomid: txt.toUpperCase()})
  }

  render() {
    const {roomid} = this.state
    const {history} = this.props
    return (
      <div>
        <TextField
          style={{width:100, marginLeft:20, marginRight:20}}
          value={roomid}
          hintText="ABCXYZ"
          floatingLabelText="Room ID"
          onChange={(e, v) => this.onRoomChange(v)}
          maxLength="6"
        />
        <RaisedButton
          style={{marginLeft:20, marginRight:20}}
          label="Join Room"
          disabled={!this.validRoom(roomid)}
          onClick={() => history.push(`/student/${roomid}`)}
          primary
        />
      </div>
    )
  }
}

function CreateRoom(props)  {
  return (<RaisedButton
    onClick = {props.onCreateRoom}
    label="Create Room"
    secondary
  />)
}

function Home(props) {
  return (
    <div className="full-screen vertical-center">
      <div className="horizontal-center card home">
        <h1>Clickery</h1>
        <div className="rounded-highlight">
          <div className="zoom horizontal-center">
            <JoinRoom history={props.history}/>
          </div>
          <h2>or</h2>
          <div className="zoom">
            <CreateRoom onCreateRoom={props.onCreateRoom}/>
          </div>
        </div>
      </div>
    </div>
  )
}

Home.propTypes = {
  onCreateRoom: PropTypes.func.isRequired
}

export default Home
