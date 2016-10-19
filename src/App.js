import React, { Component } from 'react'
import { connect } from 'react-redux'
import Knob from './knob'
import setupSynth from './Synth'

let Row = ({ children, style, className }) =>
  <div className={className} style={{ display: `flex`, ...style }}>{children}</div>

let Column = ({ children, style, className }) =>
  <div className={className} style={{ display: `flex`, flexDirection: `column`, ...style }}>{children}</div>

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
          <Row><span className="title">JSWS-101</span></Row>
          <Row
            className="knobs"
            style={{
              transform: `scale(0.7)`,
              width: `700px`,
              justifyContent: `space-between`
            }}
          >
            {Object.keys(this.props.state.knobs).map(id =>
              <Knob key={id} id={id} value={this.props.state.knobs[id]} />
            )}
          </Row>
          <canvas id="scope" />
        </Column>
      </Column>
    )
  }
}

export default connect(state => ({ state }))(App)
