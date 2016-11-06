import React from 'react'
import { connect } from 'react-redux'
import { Row, Column } from './Flex'

let containerStyle = {
  height: `80px`,
  border: `2px solid #f4679f`,
  borderRadius: `7px`,
  transform: `scale(0.8)`,
}

let WaveShapeButtons = props => {
  return (
    <Column style={containerStyle}>
      <Row>
        <span
          className={`waveshape ${props.active === `sine` ? `active` : ``}`}
          style={{ backgroundColor: props.active === `sine` ? `#ffe3ee` : `transparent` }}
          onClick={() => props.dispatch({ type: `CHANGE_SHAPE`, shape: `sine`, id: props.id })}
        >
          <img style={{ width: `50px`, padding: `5px` }} src="/static/img/sin.svg" />
        </span>
        <span
          className={`waveshape ${props.active === `triangle` ? `active` : ``}`}
          style={{ backgroundColor: props.active === `triangle` ? `#ffe3ee` : `transparent` }}
          onClick={() => props.dispatch({ type: `CHANGE_SHAPE`, shape: `triangle`, id: props.id })}
        >
          <img style={{ width: `50px`, padding: `5px` }} src="/static/img/triangle.svg" />
        </span>
      </Row>
      <Row>
        <span
          className={`waveshape ${props.active === `sawtooth` ? `active` : ``}`}
          style={{ backgroundColor: props.active === `sawtooth` ? `#ffe3ee` : `transparent` }}
          onClick={() => props.dispatch({ type: `CHANGE_SHAPE`, shape: `sawtooth`, id: props.id })}
        >
          <img style={{ width: `50px`, padding: `5px` }} src="/static/img/saw.svg" />
        </span>
        <span
          className={`waveshape ${props.active === `square` ? `active` : ``}`}
          style={{ backgroundColor: props.active === `square` ? `#ffe3ee` : `transparent` }}
          onClick={() => props.dispatch({ type: `CHANGE_SHAPE`, shape: `square`, id: props.id })}
        >
          <img style={{ width: `50px`, padding: `5px` }} src="/static/img/square.svg" />
        </span>
      </Row>
    </Column>
  )
}

export default connect()(WaveShapeButtons)
