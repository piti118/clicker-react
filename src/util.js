import Color from 'color'

const colorWheel = [
  Color('rgba(255, 111, 111, 0.7)'),
  Color('rgba(91, 199, 112, 0.7)'),
  Color('rgba(150, 146, 217, 0.7)'),
  Color('rgba(224, 217, 149, 0.7)')]

export function colorObjectForAnswer(a) {
  return colorWheel[(a - 1) % colorWheel.length]
}

export function colorForAnswer(a) {
  return colorObjectForAnswer(a).rgb().string()
}


export function shuffleArray(a) {
  const secret = a.map(Math.random)
  const tmp = a.map((e, i) => ({ index: i, secret: secret[i] }))
  tmp.sort((x, y) => (x.secret - y.secret))
  return tmp.map(x => a[x.index])
}

export function shuffleObject(o) {
  const keys = Object.keys(o)
  const values = keys.map(k => o[k])
  const shuffledKeys = shuffleArray(keys)
  const ret = shuffledKeys.reduce((obj, x, i) => {
    obj[x] = values[i] // eslint-disable-line
    return obj
  }, {})
  return ret
}
