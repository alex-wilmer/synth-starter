import React, { Component } from 'react'
import { connect } from 'react-redux'
import Knob from './Knob'
import Slider from './Slider'
import setupSynth from '../Synth'

let Row = ({ children, style, className }) =>
  <div className={className} style={{ display: `flex`, ...style }}>
    {children}
  </div>

let Column = ({ children, style, className }) =>
  <div className={className} style={{ display: `flex`, flexDirection: `column`, ...style }}>
    {children}
  </div>

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
        <Column className="container">
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
          <Row
            className="knobs"
            style={{
              transform: `scale(0.7)`,
              width: `790px`,
              justifyContent: `space-between`,
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
          <canvas id="scope" />
        </Column>
      </Column>
    )
  }
}

export default connect(state => ({ state }))(App)
