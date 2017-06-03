import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import * as api from './api'
import PropTypes from 'prop-types'
import TeacherRoom from './components/TeacherRoom'
import StudentRoom from './components/StudentRoom'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Loading from './components/Loading'
import {CSSTransitionGroup} from 'react-transition-group'

function AppRoutes({token, onCreateRoom}) {
  return (
    <Switch>
      <Route exact path="/" render={(props) =>
        <Home
          key='home'
          history={props.history}
          onCreateRoom={() => onCreateRoom(token)}
        />
      }/>
      <Route path="/teacher/:roomid" render={(props)=>
        <TeacherRoom
          key='teacher'
          roomid={props.match.params.roomid}
          token={token}/>}
      />
      <Route path="/student/:roomid" render={(props)=>
        <StudentRoom
          key='student'
          roomid={props.match.params.roomid}
          token={token}/>}
      />
      <Route component={NotFound} />
    </Switch>)
}

function FadeRouter({render}) {
  return (
    <Router>
      <Route render={({ location, history }) => {
        return (
          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            <Route location={location} key={location.key}>
              {render({location, history})}
            </Route>
          </CSSTransitionGroup>
        )}}/>
    </Router>
  )
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
          <Loading loading={loading} showLoader={false}>
            <FadeRouter render={({location, history}) => (
              <AppRoutes token={token}
                onCreateRoom={() => this.onCreateRoom(token, history)}
              />)}
            />
          </Loading>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object
};

export default App;
