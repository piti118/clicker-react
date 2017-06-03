const colorWheel = [
  'rgba(255, 111, 111, 0.7)',
  'rgba(91, 199, 112, 0.7)',
  'rgba(150, 146, 217, 0.7)',
  'rgba(224, 217, 149, 0.7)']

export function colorForAnswer(a) {
  return colorWheel[(a-1)%colorWheel.length]
}
