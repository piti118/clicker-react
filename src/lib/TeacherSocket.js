import io from 'socket.io-client'

export default class TeacherSocket {
  constructor(roomid, token) {
    this.socket = io.connect(`/?token=${token}&roomid=${roomid}`)
  }

  onTally(f) { // receive tally signal
    this.socket.on('tally', f)
  }

  tally() { // ask server to tally
    this.socket.emit('tally')
  }

  clearVote(roomid, token) {
    this.socket.emit('clear-vote', { roomid, token })
  }

  disconnect() {
    this.socket.disconnect()
  }
}