import axios from 'axios';

const env = process.env.NODE_ENV || 'development'
const base = {
  'development': '/v1',
  'production': '/v1'
}[env]

export function createToken() {
  return axios.get(`${base}/create-token`)
}

export function createRoom(token) {
  return axios.post(`${base}/create-room`, {
    'token': token
  })
}

export function tally(roomid) {
  return axios.get(`${base}/tally/${roomid}`)
}

export function reset(roomid, token) {
  return axios.post(`${base}/reset/${roomid}`, {
    token: token
  })
}

export function vote(roomid, token, answer) {
  return axios.post(`${base}/vote/${roomid}`, {
    token: token,
    answer: answer
  })
}

export function myAnswer(roomid, token) {
  return axios.post(`${base}/my-answer/${roomid}`, {
    token: token
  })
}
