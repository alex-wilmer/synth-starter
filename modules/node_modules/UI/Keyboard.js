import React from 'react'
import { connect } from 'react-redux'

import { toFreq } from 'tonal-freq'

let Keyboard = ({ dispatch, octave }) => {
  return (
    <ul
      className="piano"
      onMouseUp={() => dispatch({ type: `CLEAR_KEYS` })}
    >
      <li
        className="white"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`C` + octave) })}
      />
      <li
        className="black"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`C#` + octave) })}
      />
      <li
        className="white"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`D` + octave) })}
      />
      <li
        className="black"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`D#` + octave) })}
      />
      <li
        className="white"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`E` + octave) })}
      />
      <li
        className="white"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`F` + octave) })}
      />
      <li
        className="black"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`F#` + octave) })}
      />
      <li
        className="white"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`G` + octave) })}
      />
      <li
        className="black"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`G#` + octave) })}
      />
      <li
        className="white"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`A` + octave) })}
      />
      <li
        className="black"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`A#` + octave) })}
      />
      <li
        className="white"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`B` + octave) })}
      />
      <li
        className="white"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`C` + (octave + 1)) })}
      />
      <li
        className="black"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`C#` + (octave + 1)) })}
      />
      <li
        className="white"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`D` + (octave + 1)) })}
      />
      <li
        className="black"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`D#` + (octave + 1)) })}
      />
      <li
        className="white"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`E` + (octave + 1)) })}
      />
      <li
        className="white"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`F` + (octave + 1)) })}
      />
      <li
        className="black"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`F#` + (octave + 1)) })}
      />
      <li
        className="white"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`G` + (octave + 1)) })}
      />
      <li
        className="black"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`G#` + (octave + 1)) })}
      />
      <li
        className="white"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`A` + (octave + 1)) })}
      />
      <li
        className="black"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`A#` + (octave + 1)) })}
      />
      <li
        className="white"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`B` + (octave + 1)) })}
      />
      <li
        className="white"
        onMouseDown={() => dispatch({ type: `PLAY_KEY`, key: toFreq(`C` + (octave + 2)) })}
      />
    </ul>
  )
}

export default connect(state => ({ octave: state.octave }))(Keyboard)
