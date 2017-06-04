import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'
import * as api from './api'
import TeacherRoom from './components/TeacherRoom'
import StudentRoom from './components/StudentRoom'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Loading from './components/Loading'
import './App.css';


function AppRoutes({ token, onCreateRoom }) {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={props =>
          (<Home
            key="home"
            history={props.history}
            onCreateRoom={() => onCreateRoom(token)}
          />)
        }
      />
      <Route
        path="/teacher/:roomid"
        render={props =>
        (<TeacherRoom
          key="teacher"
          roomid={props.match.params.roomid}
          token={token}
        />)}
      />
      <Route
        path="/student/:roomid"
        render={props =>
        (<StudentRoom
          key="student"
          roomid={props.match.params.roomid}
          token={token}
        />)}
      />
      <Route component={NotFound} />
    </Switch>)
}

AppRoutes.propTypes = {
  token: PropTypes.string.isRequired,
  onCreateRoom: PropTypes.func.isRequired,
}

function FadeRouter({ render }) {
  return (
    <Router>
      <Route render={({ location, history }) => (
        <CSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          <Route location={location} key={location.key}>
            {render({ location, history })}
          </Route>
        </CSSTransitionGroup>
        )}
      />
    </Router>
  )
}

FadeRouter.propTypes = {
  render: PropTypes.func.isRequired,
}


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      token: null,
      loading: true,
    }
  }

  // fetch from session storage if exists
  // if not get from api
  // then save and set token
  initializeToken() {
    let fetcher = null
    const currentToken = sessionStorage.getItem('token')
    if (!currentToken) { // not in seesionStorage
      // fetch it
      fetcher = api.createToken()
      .then(res => res.data.token)
      .then((token) => {
        try {
          sessionStorage.setItem('token', token)
        } catch (err) {
          console.error(err,
            'This may happen if you are on private mode browsing. ' +
            'You can still use the application but refreshing will ' +
            'lose your teacher token')
        }
        return token
      })
    } else {
      fetcher = Promise.resolve(currentToken)
    }
    fetcher.then(token => this.setState({
      token,
      loading: false,
    })).catch((e) => { console.error(e) })
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
    const { loading, token } = this.state
    return (
      <MuiThemeProvider>
        <div>
          <div className="bg-image" />
          <Loading loading={loading} showLoader={false}>
            <FadeRouter render={({ history }) => (
              <AppRoutes
                token={token}
                onCreateRoom={() => this.onCreateRoom(token, history)}
              />
              )}
            />
          </Loading>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object,
};

export default App;
