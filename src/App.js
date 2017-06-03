import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CircularProgress from 'material-ui/CircularProgress';
import './App.css';
import * as api from './api'
import PropTypes from 'prop-types'
import TeacherRoom from './components/TeacherRoom'
import StudentRoom from './components/StudentRoom'
import Home from './components/Home'

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
          <div className="bg-image"/>
          {!loading || <CircularProgress/>}
          {loading || (
            <Router>
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
