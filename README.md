Synth Starter :zap::sound::notes:
=====================

A user interface with all of the fixins of a typical synthesizer--knobs, toggles, sliders, oh my!

It's your job to write the code that generates the sound and hooks into the UI to shape your synth's output into something beautiful (or chaotic, if that's your thing).

## Programs

 - **Required**: [NodeJS](https://nodejs.org/en/download/) >=4.0.0 -  [nvm aka Node Version Manager](https://github.com/creationix/nvm) recommended for osx / linux
 - **Optional** [yarn](https://yarnpkg.com/en/docs/install) - highly recommended!

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

## Code

### `src/Synth`

The `Synth` function is called when the page is loaded and it returns a function that will be called whenever the UI is updated.

```
let Synth = () => {

  //  Your synth code

  return (UI) => {

    //  Your reactions to UI updates

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
