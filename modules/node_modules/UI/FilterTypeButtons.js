import React from 'react'
import { connect } from 'react-redux'
import { Row, Column } from './Flex'

let containerStyle = {
  height: `80px`,
  border: `2px solid #f4679f`,
  borderRadius: `7px`,
  transform: `scale(0.8)`,
}

let FilterTypeButtons = props => {
  return (
    <Column style={containerStyle}>
      <Row>
        <span
          className={`waveshape ${props.active === `lowpass` ? `active` : ``}`}
          style={{ backgroundColor: props.active === `lowpass` ? `#ffe3ee` : `transparent` }}
          onClick={() => props.dispatch({ type: `CHANGE_FILTER`, filter: `lowpass`, id: props.id })}
        >
          <img style={{ width: `50px`, padding: `5px` }} src="/static/img/lopass.svg" />
        </span>
        <span
          className={`waveshape ${props.active === `highpass` ? `active` : ``}`}
          style={{ backgroundColor: props.active === `highpass` ? `#ffe3ee` : `transparent` }}
          onClick={() => props.dispatch({ type: `CHANGE_FILTER`, filter: `highpass`, id: props.id })}
        >
          <img style={{ width: `50px`, padding: `5px`, transform: `rotateY(180deg)` }} src="/static/img/lopass.svg" />
        </span>
      </Row>
      <Row>
        <span
          className={`waveshape ${props.active === `bandpass` ? `active` : ``}`}
          style={{ backgroundColor: props.active === `bandpass` ? `#ffe3ee` : `transparent` }}
          onClick={() => props.dispatch({ type: `CHANGE_FILTER`, filter: `bandpass`, id: props.id })}
        >
          <img style={{ width: `50px`, padding: `5px` }} src="/static/img/bandpass.svg" />
        </span>
        <span
          className={`waveshape ${props.active === `notch` ? `active` : ``}`}
          style={{ backgroundColor: props.active === `notch` ? `#ffe3ee` : `transparent` }}
          onClick={() => props.dispatch({ type: `CHANGE_FILTER`, filter: `notch`, id: props.id })}
        >
          <img style={{ width: `50px`, padding: `5px` }} src="/static/img/notch.svg" />
        </span>
      </Row>
    </Column>
  )
}

export default connect()(FilterTypeButtons)
