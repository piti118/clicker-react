import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import './App.css';
import * as api from './api'
import PropTypes from 'prop-types'
import HomeIcon from 'material-ui/svg-icons/action/home';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import TeacherRoom from './components/TeacherRoom'
import StudentRoom from './components/StudentRoom'
import IconButton from 'material-ui/IconButton';

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
          style={{width:100}}
          value={roomid}
          hintText="ABCXYZ"
          floatingLabelText="Room ID"
          onChange={(e, v) => this.onRoomChange(v)}
          maxLength="6"
        />
        <RaisedButton
          style={{marginLeft:30}}
          label="Join Room"
          disabled={!this.validRoom(roomid)}
          onClick={() => history.push(`/student/${roomid}`)}
          primary
        />
      </div>
    )
  }
}

function Home(props) {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Clickery</h1>
        <div>
          <JoinRoom history={props.history}/>
        </div>
        <h2>or</h2>
        <RaisedButton
          onClick = {() => props.onCreateRoom()}
          label="Create Room"
          secondary
        />
      </div>
    </div>
  )
}

Home.propTypes = {
  onCreateRoom: PropTypes.func.isRequired
}

function NotFound() {
  return <div>Not Found</div>
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      token: null,
      loading: true
    }
  }

  //fetch from session storage if exists
  //if not get from api
  //then save and set token
  initializeToken() {

    var currentToken = sessionStorage.getItem('token')
    var fetcher = null
    if(!currentToken) { //not in seesionStorage
      //fetch it
      fetcher = api.createToken()
      .then((res) => res.data.token)
      .then((token) => {
        sessionStorage.setItem('token', token)
        return token
      })
    } else {

      fetcher = Promise.resolve(currentToken)
    }
    fetcher.then((token) => this.setState({
      token: token,
      loading: false
    }))
  }

  componentDidMount() {
    this.initializeToken()
  }

  onCreateRoom(token, history) {
    api.createRoom(token).then((res) => {
      console.log(res.data)
      const roomid = res.data.roomId
      history.push(`/teacher/${roomid}`)
    })
  }

  render() {
    const {loading, token} = this.state
    return (
      <MuiThemeProvider>
        <div>
          {!loading || <CircularProgress/>}
          {loading || (
            <Router>
              <div>
                <Route render={({history}) => (
                  <AppBar
                    iconElementLeft={
                      <IconButton>
                        <HomeIcon/>
                      </IconButton>
                    }
                    onTouchTap={()=>history.push('/')}
                  />)}
                />
                <Switch>
                  <Route exact path="/" render={(props) =>
                    <Home
                      history={props.history}
                      onCreateRoom={() => this.onCreateRoom(token, props.history)}
                    />}
                  />
                  <Route path="/teacher/:roomid" render={(props)=>
                    <TeacherRoom roomid={props.match.params.roomid} token={token}/>}
                  />
                  <Route path="/student/:roomid" render={(props)=>
                    <StudentRoom roomid={props.match.params.roomid} token={token}/>}
                  />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </Router>
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object
};

export default App;
