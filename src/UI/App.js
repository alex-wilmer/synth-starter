import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Column } from './Flex'
import Knob from './Knob'
import Slider from './Slider'
import Keyboard from './Keyboard'
import WaveShapeButtons from './WaveShapeButtons'
import FilterTypeButtons from './FilterTypeButtons'
import Sequencer from './Sequencer'
import setupSynth from '../Synth'

class App extends Component {
  state = { synthHandlers: {} }

  componentDidMount() {
    let synthHandlers = setupSynth(this.props.store.getState)

    this.props.store.subscribe(() =>
      synthHandlers.onUIChange(this.props.store.getState())
    )

    this.setState({ synthHandlers })
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
                value={this.props.state.masterVolume * 100}
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
          <Row>
            <Column style={{ marginLeft: `-60px` }}>
              <Row style={{ justifyContent: `space-around`, width: `536px`, marginLeft: `87px` }}>
                {Object.keys(this.props.state.waveShapes).map(id =>
                  <WaveShapeButtons
                    key={id}
                    id={id}
                    active={this.props.state.waveShapes[id]}
                  />
                )}
                <FilterTypeButtons
                  key="filter1"
                  id="filter1"
                  active={this.props.state.filterTypes.filter1}
                />
              </Row>
              <Row
                className="knobs"
                style={{
                  transform: `scale(0.7)`,
                  width: `625px`,
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
            </Column>
            <Row style={{ position: `relative`, width: `100px` }}>
              {Object.keys(this.props.state.sliders).map((id, i) =>
                <Slider
                  key={id}
                  id={id}
                  vertical
                  min="0"
                  max="100"
                  value={this.props.state.sliders[id].value}
                  style={{
                    width: `175px`,
                    position: `absolute`,
                    top: `80px`,
                    left: `${(i * 40) - 50}px`,
                  }}
                />
              )}
            </Row>
          </Row>

          <canvas style={{ marginTop: `-40px` }} id="scope" />

          <Sequencer synthHandlers={this.state.synthHandlers} />

          <Row>
            <Column
              style={{ justifyContent: `center`, alignItems: `center`, width: `67px` }}
            >
              <div style={{ color : `#f4679f`, fontSize: `11px`, fontWeight: `bold` }}>
                OCT: {this.props.state.octave}
              </div>
              <Row style={{ marginTop: `10px` }}>
                <Row
                  onClick={() => this.props.dispatch({ type: `DECREMENT_OCTAVE` })}
                  style={{
                    cursor: `pointer`,
                    justifyContent: `center`,
                    borderTop: `2px solid #f4679f`,
                    borderLeft: `2px solid #f4679f`,
                    borderBottom: `2px solid #f4679f`,
                    borderRight: `1px solid #f4679f`,
                    color: `#f4679f`,
                    width: `20px`,
                  }}
                >
                  -
                </Row>
                <Row
                  onClick={() => this.props.dispatch({ type: `INCREMENT_OCTAVE` })}
                  style={{
                    cursor: `pointer`,
                    justifyContent: `center`,
                    borderTop: `2px solid #f4679f`,
                    borderLeft: `1px solid #f4679f`,
                    borderBottom: `2px solid #f4679f`,
                    borderRight: `2px solid #f4679f`,
                    color: `#f4679f`,
                    width: `20px`,
                    borderLeft: `none`,
                  }}
                >
                  +
                </Row>
              </Row>
            </Column>
            <Keyboard />
          </Row>
        </Column>
      </Column>
    )
  }
}

export default connect(state => ({ state }))(App)
