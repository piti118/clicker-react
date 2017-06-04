import axios from 'axios';

const env = process.env.NODE_ENV || 'development'
const base = {
  development: '/v1',
  production: '/v1',
}[env]

export function studentURL(roomid) {
  const { protocol, host } = window.location;
  const url = `${protocol}//${host}/student/${roomid}`
  return url
}

export function teacherURL(roomid) {
  const { protocol, host } = window.location;
  const url = `${protocol}//${host}/teacher/${roomid}`
  return url
}

export function createToken() {
  return axios.get(`${base}/create-token`)
}

export function createRoom(token) {
  return axios.post(`${base}/create-room`, {
    token,
  })
}

export function tally(roomid) {
  return axios.get(`${base}/tally/${roomid}`)
}

export function reset(roomid, token) {
  return axios.post(`${base}/reset/${roomid}`, {
    token,
  })
}

export function vote(roomid, token, answer) {
  return axios.post(`${base}/vote/${roomid}`, {
    token,
    answer,
  })
}

export function myAnswer(roomid, token) {
  return axios.post(`${base}/my-answer/${roomid}`, {
    token,
  })
}
