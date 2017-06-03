import React, {Component} from 'react'
import * as api from '../api'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton';
import * as util from '../util'
import HomeButton from './HomeButton'

function Choice(props){
  const {label, selected} = props
  const style={
    borderStyle: 'solid',
    borderColor: selected? 'rgb(102, 102, 102)' : 'rgba(0,0,0,0)'
  }
  const color = util.colorObjectForAnswer(label)
  const baseColor = color.rgb().string()
  const hoverColor = color.saturate(1.0).rgb().string()
  return (
    <div style={style} className="choice">
      <FlatButton
        label={label}
        backgroundColor={baseColor}
        hoverColor={hoverColor}
        fullWidth={true}
        onClick={props.onClick}
      />
    </div>
  )
}

function VoteButtons(props) {
  const choices = ['1','2','3','4']
  const {answer, onVote}= props
  const sanswer = String(answer)
  return (
    <div>
      {choices.map(v => (
        <div key={`choice-${v}`}>
          <Choice
            label={v}
            selected={v===sanswer}
            onClick={()=>onVote(v)}/>
        </div>
      ))}
    </div>
  )
}

VoteButtons.propTypes = {
  onVote: PropTypes.func.isRequired
}

export default class StudentRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      answer: null
    }
    this.poller=null
  }

  //there is a race here fix it later
  startPoller() {
    //only check if it's null throw away all other answer
    //to prevent flickering
    this.poller = setInterval(() => {
      if(!document.hidden){ //don't poll while inactive
        const {roomid, token} = this.props
        api.myAnswer(roomid, token).then(res => {
          const {answer} = res.data
          this.setState({answer: answer})
        })
      }
    }, 2000)
  }

  componentDidMount() {
    this.startPoller()
  }

  componentWillUnmount() {
    clearInterval(this.poller)
  }

  onVote(roomid, token, answer){
    this.setState({answer}, ()=>api.vote(roomid, token, answer))
  }

  render() {
    const {roomid, token} = this.props
    const {answer} = this.state
    return (
      <div className="full-screen vertical-center">
        <HomeButton/>
        <div className="horizontal-center card">
          <h1>Student Room {roomid}</h1>
          <VoteButtons answer={answer} onVote={(answer) => this.onVote(roomid, token, answer)}/>
        </div>
      </div>
    )
  }
}

StudentRoom.propTypes = {
  roomid: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
}
