let state = {
  power: false,
  masterVolume: 1,
  waveShapes: {
    shape1: `sine`,
    shape2: `sine`,
    shape3: `sine`,
    shape4: `sine`,
  },
  knobs: {
    knob1: {
      value: 0,
      name: `Knob 1`,
    },
    knob2: {
      value: 0,
      name: `Knob 2`,
    },
    knob3: {
      value: 0,
      name: `Knob 3`,
    },
    knob4: {
      value: 0,
      name: `Knob 4`,
    },
  },
  sliders: {
    slider1: {
      value: 0,
      name: `Slider 1`,
    },
    slider2: {
      value: 0,
      name: `Slider 2`,
    },
    slider3: {
      value: 0,
      name: `Slider 3`,
    },
    slider4: {
      value: 0,
      name: `Slider 4`,
    },
  },
  activeKeys: [],
  octave: 2,
}

/*----------------------------------------------------------------------------*/

export default state
