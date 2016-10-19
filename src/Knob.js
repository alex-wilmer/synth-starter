import React, { Component } from 'react'
import { connect } from 'react-redux'

class Knob extends Component {
  state = { dragging: false }

  turn = event => {
    if (this.state.dragging) {
      this.props.dispatch({
        type: `UPDATE_KNOB`,
        id: this.props.id,
        value: this.props.value - event.movementY
      })
    }
  }

  render() {
    return (
      <div
        ref={node => this.node = node}
        className="outercircle"
        onMouseDown={
          () => {
            this.node.requestPointerLock()
            document.addEventListener('mousemove', this.turn)
            this.setState({ dragging: true })
          }
        }
        onMouseUp={
          () => {
            document.exitPointerLock()
            document.removeEventListener('mousemove', this.turn)
            this.setState({ dragging: false })
          }
        }
      >
        <div className="innercircle">
          <div className="knob">
            <div className="knoblabel">{this.props.value}</div>
          </div>
          <div className="knobrolling" style={{ transform: `rotate(${this.props.value - 180}deg)`}}>
            <div className="divider">
              <div className="pointer" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Knob)
