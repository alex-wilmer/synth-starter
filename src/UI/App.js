import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Column } from './Flex'
import Knob from './Knob'
import Slider from './Slider'
import Keyboard from './Keyboard'
import WaveShapeButtons from './WaveShapeButtons'
import setupSynth from '../Synth'

class App extends Component {
  componentDidMount() {
    let updateSynth = setupSynth()
    this.props.store.subscribe(() =>
      updateSynth(this.props.store.getState())
    )
  }

  render() {
    return (
      <Column style={{ justifyContent: `center`, alignItems: `center`, height: `100vh` }}>
        <Column className="container" style={{ justifyContent: `center` }}>
          <Row style={{ alignItems: `center`, padding: `20px 40px` }}>
            <span className="title">JSWS-101</span>
            <span style={{ marginLeft: `auto` }}>
              <Slider
                min="0"
                max="100"
                value="100"
                style={{ marginRight: `20px` }}
                action="UPDATE_MASTER_VOLUME"
              />
              <button
                onClick={() => this.props.dispatch({ type: `TOGGLE_POWER` })}
                style={{
                  background: this.props.state.power ? `#f4679f` : `white`,
                  cursor: `pointer`,
                  color: this.props.state.power ? `white` : `#f4679f`,
                  border: `2px solid #f4679f`,
                  borderRadius: `5px`,
                  width: `50px`,
                }}
              >
                {this.props.state.power ? `ON` : `OFF`}
              </button>
            </span>
          </Row>
          <Row style={{ justifyContent: `space-around`, width: `540px`, margin: `0 auto` }}>
            {Object.keys(this.props.state.waveShapes).map(id =>
              <WaveShapeButtons
                key={id}
                id={id}
                active={this.props.state.waveShapes[id]}
              />
            )}
          </Row>
          <Row
            className="knobs"
            style={{
              transform: `scale(0.7)`,
              width: `700px`,
              justifyContent: `space-between`,
              marginTop: `-20px`,
            }}
          >
            {Object.keys(this.props.state.knobs).map(id =>
              <Knob
                key={id}
                id={id}
                value={this.props.state.knobs[id].value}
                name={this.props.state.knobs[id].name}
              />
            )}
          </Row>
          <canvas style={{ marginTop: `-40px` }} id="scope" />
          <Keyboard />
        </Column>
      </Column>
    )
  }
}

export default connect(state => ({ state }))(App)
