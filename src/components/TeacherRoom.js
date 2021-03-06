import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import QRCode from 'qrcode.react'
import PropTypes from 'prop-types'
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from 'recharts'

import Dialog from 'material-ui/Dialog';
import MemoryIcon from 'material-ui/svg-icons/hardware/memory';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh'
import TeacherSocket from '../lib/TeacherSocket'
import * as api from '../api'
import * as util from '../util'
import Loading from './Loading'
import Content from './Content'


function transformData(o) {
  return Object.keys(o).map(k => ({ answer: k, count: o[k] }))
}

function VoteResult(props) {
  // return <JSONPretty id="json-pretty" json={props.tally}/>
  const data = transformData(props.data)
  return (
    <div className="graph-container">
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="answer" />
          <CartesianGrid stroke="#c1bebe" />
          <Bar
            dataKey="count"
            fill="#8884d8"
            label={{ fill: 'rgba(0, 0, 0, 0.6)', fontSize: '20px' }}
            animationDuration={200}
          >
            {
              data.map(k => (
                <Cell key={`cell-${k}`} fill={util.colorForAnswer(k.answer)} label={{ color: 'black' }} />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

VoteResult.propTypes = {
  data: PropTypes.object.isRequired,
}


function QRDialog({ open, onRequestClose, value }) {
  return (
    <Dialog
      modal={false}
      contentStyle={{ width: '100%' }}
      open={open}
      onRequestClose={onRequestClose}
    >
      <div className="horizontal-center" style={{ fontSize: '20px' }}>
        Join : <a href={value}>{value}</a>
      </div>
      <div className="horizontal-center qr-canvas">
        <QRCode size={200} value={value} />
      </div>
    </Dialog>
  )
}

QRDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

class RoomInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      qropen: false,
    }
    this.onQRClose = this.onQRClose.bind(this)
    this.onQROpen = this.onQROpen.bind(this)
  }

  onQRClose() {
    this.setState({ qropen: false })
  }

  onQROpen() {
    this.setState({ qropen: true })
  }

  render() {
    const { roomid } = this.props
    const studentURL = api.studentURL(roomid)
    return (
      <div>
        <h1>
          Room {roomid}
        </h1>
        <RaisedButton
          onClick={this.onQROpen}
          label="Join"
          style={{ margin: 15 }}
          primary
          icon={<MemoryIcon />}
        />
        <RaisedButton
          onClick={() => this.props.onReset(roomid)}
          label="Reset"
          style={{ margin: 15 }}
          secondary
          icon={<RefreshIcon />}
        />

        <div style={{
          display: 'inline-block',
          verticalAlign: 'middle',
        }}
        >
          <Toggle
            style={{ margin: 15 }}
            label="Shuffle Mode"
            labelPosition="right"
            toggled={this.props.shuffleMode}
            onToggle={(e, v) => this.props.onShuffleModeChange(v)}
            labelStyle={{ color: 'rgba(0, 0, 0, 0.7)' }}
          />
        </div>
        <QRDialog
          open={this.state.qropen}
          onRequestClose={this.onQRClose}
          value={studentURL}
        />
      </div>
    )
  }
}

RoomInfo.propTypes = {
  roomid: PropTypes.string.isRequired,
  shuffleMode: PropTypes.bool.isRequired,
  onReset: PropTypes.func.isRequired,
  onShuffleModeChange: PropTypes.func.isRequired, //(v) =>
}

//TODO: Seperate this into container and presentational
export default class TeacherRoom extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      tally: { 1: 0, 2: 0, 3: 0, 4: 0 },
      shuffleMode: false,
    }
    this.poller = null
    this.socket = null
  }

  componentDidMount() {
    const { roomid, token } = this.props
    this.socket = new TeacherSocket(roomid, token)
    this.socket.onTally((data) => {
      this.setState({ tally: data, loading: false })
    })
    this.socket.tally()
  }

  componentWillUnmount() {
    this.socket.disconnect()
  }

  onReset(roomid, token) {
    this.socket.clearVote(roomid, token)
  }

  onShuffleModeChange(value) {
    this.setState({ shuffleMode: value })
  }

  render() {
    const { loading, tally, shuffleMode } = this.state
    const { roomid, token } = this.props
    const showTally = shuffleMode ? util.shuffleObject(tally) : tally
    return (
      <Content withHome={!loading}>
        <Loading loading={loading}>
          <div>
            <RoomInfo
              roomid={roomid}
              onReset={() => this.onReset(roomid, token)}
              shuffleMode={shuffleMode}
              onShuffleModeChange={v => this.onShuffleModeChange(v)}
            />
            <div style={{ paddingTop: 20, paddingBotom: 20 }}>
              <VoteResult data={showTally} />
            </div>
          </div>
        </Loading>
      </Content>
    )
  }
}

TeacherRoom.propTypes = {
  roomid: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
}
