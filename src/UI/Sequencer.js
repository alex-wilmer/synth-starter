import React, { Component } from 'react'
import { connect } from 'react-redux'
import range from 'lodash.range'
import { Row, Column } from './Flex'

let toggleSequencer = (playing, synthHandlers) => {
  return (dispatch, getState) => {
    dispatch({ type: `TOGGLE_SEQUENCER` })

    let update = () => {
      let state = getState()

      if (state.playing) {
        dispatch({ type: `UPDATE_STEP` })
        synthHandlers.onSequencerEvent(state)
        setTimeout(() => requestAnimationFrame(update), 60000 / state.tempo)
      }
    }

    if (!playing) update()
  }
}

class Sequencer extends Component {
  state = { dragging: false }

  turn = event => {
    if (this.state.dragging) {
      this.props.dispatch({
        type: `UPDATE_TEMPO`,
        value: this.props.state.tempo - event.movementY,
      })
    }
  }

  render() {
    return (
      <Row style={{
        justifyContent: `space-around`,
        alignItems: `center`,
        marginBottom: `20px`,
        padding: `0 30px 0 10px`,
      }}>
        <Column>
          <button
            style={{
              background: `white`,
              cursor: `pointer`,
              color: `#f4679f`,
              border: `2px solid #f4679f`,
              borderRadius: `5px`,
              width: `50px`,
              marginBottom: `5px`,
            }}
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
            {this.props.state.tempo}
          </button>
          <button
            style={{
              background: this.props.state.playing ? `#f4679f` : `white`,
              cursor: `pointer`,
              color: this.props.state.playing ? `white` : `#f4679f`,
              border: `2px solid #f4679f`,
              borderRadius: `5px`,
              width: `50px`,
            }}
            onClick={() => this.props.dispatch(toggleSequencer(this.props.state.playing, this.props.synthHandlers))}
          >
            {this.props.state.playing ? `STOP`: `PLAY`}
          </button>
        </Column>
        {range(16).map(x =>
          <div key={x} className={`led ${this.props.state.step === x ? `active` : ``}`} />
        )}
      </Row>
    )
  }
}

export default connect(state => ({ state }))(Sequencer)
