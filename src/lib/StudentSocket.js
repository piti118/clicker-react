import io from 'socket.io-client'

export default class StudentSocket {
  constructor(roomid, token) {
    this.socket = this.socket = io.connect(`/?token=${token}&roomid=${roomid}`)
  }

  onVoteClear(f) { // receive vote clear signal
    this.socket.on('vote-clear', f)
  }

  vote(roomid, token, answer) {
    this.socket.emit('vote', { roomid, token, answer })
  }

  disconnect() {
    this.socket.disconnect()
  }
}