import draw from './ui'

class Oscilloscope {
  constructor(analyser, width, height) {
    this.analyser = analyser
  	this.data = new Uint8Array(analyser.frequencyBinCount)
  	this.width = width
  	this.height = height
    this.draw = this.draw.bind(this)
  }

  draw(context) {
    let data = this.data
  	let quarterHeight = this.height / 4
  	let scaling = this.height / 256

  	this.analyser.getByteTimeDomainData(data)

  	context.fillStyle = `#ffffff`
  	context.fillRect(0, 0, this.width, this.height)
  	context.strokeStyle = `#D94882`
  	context.beginPath()

  	let zeroCross = findFirstPositiveZeroCrossing(data, this.width)

  	context.moveTo(0, (256 - data[zeroCross]) * scaling)

  	for (let i = zeroCross, j = 0; (j < this.width) && (i < data.length); i++, j++) {
  		context.lineTo(j, (256 - data[i]) * scaling)
    }

  	context.stroke()
  }
}

let MINVAL = 134  // 128 == zero.  MINVAL is the "minimum detected signal" level.

function findFirstPositiveZeroCrossing(buf, buflen) {
  let i = 0
  let last_zero = -1
  let t

  // advance until we're zero or negative
  while (i < buflen && (buf[i] > 128 ))
    i++

  if (i >= buflen) return 0

  // advance until we're above MINVAL, keeping track of last zero.
  while (i < buflen && ((t = buf[i]) < MINVAL )) {
    if (t >= 128) {
      if (last_zero === -1)
        last_zero = i
    } else last_zero = -1
    i++
  }

  // we may have jumped over MINVAL in one sample.
  if (last_zero == -1) last_zero = i

  // We didn't find any positive zero crossings
  if (i === buflen) return 0

  // The first sample might be a zero.  If so, return it.
  if (last_zero === 0) return 0

  return last_zero
}


export default ctx => {
  let analyser = ctx.createAnalyser()
  analyser.fftSize = 2048

  let myOscilloscope = new Oscilloscope(analyser, 512, 256)
  draw(myOscilloscope)

  return analyser
}
