import React from 'react'
import { connect } from 'react-redux'

let Slider = props =>
  <input
    type="range"
    min={props.min}
    max={props.max}
    value={props.value}
    style={{...props.style, ...(props.vertical ? { transform: `rotate(270deg)`, height: `30px` } : {}) }}
    onChange={
      event => props.dispatch({
        type: props.action || `UPDATE_SLIDER_VALUE`,
        id: props.id,
        value: event.target.value,
      })
    }
  />

export default connect()(Slider)
