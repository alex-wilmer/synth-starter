import draw from './ui'
import findFirstPositiveZeroCrossing from './findFirstPositiveZeroCrossing'

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

export default ctx => {
  let analyser = ctx.createAnalyser()
  analyser.fftSize = 2048

  let myOscilloscope = new Oscilloscope(analyser, 512, 256)
  draw(myOscilloscope)

  return analyser
}
