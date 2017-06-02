import React, {Component} from 'react'
import * as api from '../api'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

function VoteButtons(props) {
  const choices = ['1','2','3','4']
  return (
    <RadioButtonGroup
      name="Answer"
      valueSelected={props.answer}
      onChange={(e,v)=>props.onVote(v)}>
      {choices.map((v) =>
        <RadioButton
          key={v}
          value={v}
          label={v}
        />)}
    </RadioButtonGroup>
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
      const {roomid, token} = this.props
      api.myAnswer(roomid, token).then(res => {
        const {answer} = res.data
        this.setState({answer: answer})
      })
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
      <div>
        Student Room {roomid}
        <VoteButtons answer={answer} onVote={(answer) => this.onVote(roomid, token, answer)}/>
      </div>
    )
  }
}

StudentRoom.propTypes = {
  roomid: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
}
