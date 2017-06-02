import React, { Component } from 'react';
import JSONPretty from 'react-json-pretty';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import QRCode from 'qrcode.react'
import PropTypes from 'prop-types'
import * as api from '../api'

function VoteResult(props) {
  return <JSONPretty id="json-pretty" json={props.tally}/>
}

export default class TeacherRoom extends Component {

  constructor(props){
    super(props)
    this.state = {
      loading: true,
      tally: null
    }
    this.poller = null
  }

  updateTally() {
    const roomid = this.props.roomid
    return api.tally(roomid).then((res) => {
      console.log(res.data.counts)
      this.setState({
        loading: false,
        tally: res.data.counts
      })
    })
    .catch(e => {
      console.error(e)
    })
  }

  componentDidMount() {
    this.poller = setInterval(() => this.updateTally() , 2000 );
  }

  componentWillUnmount() {
    clearInterval(this.poller)
  }

  onReset(roomid, token) {
    api.reset(roomid, token)
  }

  render() {
    const {loading, tally} = this.state
    const {roomid, token} = this.props
    var {protocol, host} = window.location;
    var studentURL = `${protocol}//${host}/student/${roomid}`
    return (
      <div>
        {loading && <CircularProgress/>}
        {!loading && (
        <div>
          Room {this.props.roomid}
          <VoteResult tally={tally}/>
          <RaisedButton
            onClick={() => this.onReset(roomid, token)}
            label="Reset"
            secondary/>
          <QRCode value={studentURL}/>
        </div>
        )}
      </div>
    )
  }
}

TeacherRoom.propTypes = {
  roomid: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
}
