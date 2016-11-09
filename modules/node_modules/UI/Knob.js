import React, { Component } from 'react'
import { connect } from 'react-redux'

class Knob extends Component {
  state = {
    dragging: false,
    editing: false,
  }

  turn = event => {
    if (this.state.dragging) {
      this.props.dispatch({
        type: `UPDATE_KNOB_VALUE`,
        id: this.props.id,
        value: this.props.value - event.movementY,
      })
    }
  }

  render() {
    return (
      <div className="knob-container">
        <div
          ref={node => this.node = node}
          className="outercircle"
          onMouseDown={
            () => {
              this.node.requestPointerLock()
              document.addEventListener(`mousemove`, this.turn)
              this.setState({ dragging: true })
            }
          }
          onMouseUp={
            () => {
              document.exitPointerLock()
              document.removeEventListener(`mousemove`, this.turn)
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
        <div style={{ marginTop: `16px`, padding: `0 5px` }}>
          {this.state.editing
            ? <input
                type="text"
                ref={node => {
                  if (node) {
                    node.focus()
                    let tmp = node.value
                    node.value = ``
                    node.value = tmp
                  }
                }}
                defaultValue={this.props.name}
                onKeyUp={event => {
                  if (event.key === `Enter`) {
                    this.props.dispatch({
                      type: `UPDATE_KNOB_NAME`,
                      id: this.props.id,
                      name: event.target.value,
                    })

                    this.setState({ editing: false })
                  }
                }}
              />
            : <span>{this.props.name}</span>
          }
          <span
            style={{ float: `right`, cursor: `pointer` }}
            onClick={() => this.setState({ editing: true })}
          >
            ☰
          </span>
        </div>
      </div>
    )
  }
}

export default connect()(Knob)
