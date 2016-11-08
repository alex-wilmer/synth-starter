Synth Starter :zap::sound::notes:
=====================

![JSWS-101](https://raw.githubusercontent.com/alex-wilmer/synth-starter/master/static/img/synth.png "JSWS-101")

A user interface with all of the fixins of a typical synthesizer--knobs, toggles, sliders, oh my!

It's your job to write the code that generates the sound and hooks into the UI to shape your synth's output into something beautiful (or chaotic, if that's your thing).

## Programs

 - **Required**: [NodeJS](https://nodejs.org/en/download/) >=4.0.0 -  [nvm aka Node Version Manager](https://github.com/creationix/nvm) recommended for osx / linux
 - **Optional** [yarn](https://yarnpkg.com/en/docs/install) - highly recommended!

## Checkout a blank slate!

```
git checkout blank
```

## Install / Run

yarn:

```
make yarn
```

npm:

```
make npm
```

Open http://localhost:3000 in your browser.

Already installed? Just run:

```
npm start
```

## Code

### `src/Synth`

The `Synth` function is called when the page is loaded and it returns an object with two listener functions that will be called whenever the UI is updated, or the next sequencer step fires.

```
let Synth = () => {

  //  Your synth code

  return {

    onUIChange(UI) {

      // Listen to UI changes!

    },

    onSequencerEvent(UI) {

      // Listen to sequencer steps!

    },

  }
}

export default Synth
```

### `src/Oscilloscope` (requires AudioContext)

The `Oscilloscope` function returns an analyzer node that will draw the waveform of the nodes that connect to it.

```
import Oscilloscope from './Oscilloscope'

let ctx = new AudioContext()
...
node.connect(Oscilloscope(ctx))
```
