import Color from 'color'
const colorWheel = [
  Color('rgba(255, 111, 111, 0.7)'),
  Color('rgba(91, 199, 112, 0.7)'),
  Color('rgba(150, 146, 217, 0.7)'),
  Color('rgba(224, 217, 149, 0.7)')]

export function colorObjectForAnswer(a) {
  return colorWheel[(a-1)%colorWheel.length]
}

export function colorForAnswer(a) {
  return colorObjectForAnswer(a).rgb().string()
}
