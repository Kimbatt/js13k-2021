
/// <reference path="dat.gui/dat.gui.d.ts" />
const gui = new dat.GUI({ autoPlace: false, width: 500 });
document.getElementById("datgui-container").appendChild(gui.domElement);

const params = {
    volume: 0.1,
    frequency: 200
};

gui.add(params, "volume", 0, 1).onChange(Play);
gui.add(params, "frequency", 0, 1000).onChange(Play);

// const rs = [0, 0, 0, 0.1, -0.4, 0, 1, 0, -0.9, 0.1, 0.4, -0.1, 0, 0.2, -0.1, 0.1, 0, 0, 0.1, 0.1, 0, 0, 0, 0, 0, 0.1, 0.2, -0.2, -0.3, 0.1, 0.1, -0.2, 0, 0, 0.1, 0, -0.1, -0.4, 0.2, 0.4, 0.1, 0.3, 0.3, 0, 0, -0.2, 0.1, -0.1, -0.1, -0.3, 0.1, -0.1, 0, 0, 0.1, 0.1, 0, 0.1, 0.1, -0.2, 0, -0.1, -0.1, 0, 0, -0.1, -0.2, 0, 0.1, 0, -0.1, 0.1, -0.1, 0, 0, -0.1, -0.1, 0, -0.1, -0.1, -0.1];
// const is = [0, 0, 0, -0.1, 0.2, 0, -0.3, 0.1, -0.5, -0.8, 0, 0, -0.4, 0, -0.3, -0.1, 0, 0, 0, 0, 0.1, 0.1, 0, -0.1, 0, 0.1, -0.4, 0.1, -0.1, -0.2, 0, 0, -0.1, 0, 0.1, -0.2, 0, -0.2, 0, -0.2, 0, 0.4, 0, -0.4, 0.3, 0.1, 0, -0.1, 0.2, -0.1, 0.2, -0.1, -0.2, -0.2, 0.2, 0, -0.2, 0.1, -0.2, -0.2, 0, 0, 0, 0, 0.1, -0.1, -0.1, 0, 0.1, 0, 0, 0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const count = 40; // rs.length;
const real = {};
const imag = {};
for (let i = 0; i < count; ++i)
{
    const key = "a" + i;
    real[key] = 0; // rs[i];
    imag[key] = 0; // is[i];
    gui.add(real, key, -1, 1, 0.001).name("real " + i).onChange(Play);
    gui.add(imag, key, -1, 1, 0.001).name("imag " + i).onChange(Play);
}

/**
 * @type {AudioContext}
 */
let actx = null;

/**
 * @type {OscillatorNode}
 */
let oscillator = null;

/**
 * @type {GainNode}
 */
let gain = null;
function Play()
{
    if (actx === null)
    {
        actx = new AudioContext();

        oscillator = actx.createOscillator();
        oscillator.start();

        gain = actx.createGain();

        oscillator.connect(gain);
        gain.connect(actx.destination);
    }

    const realValues = new Float32Array(count);
    const imagValues = new Float32Array(count);
    for (let i = 0; i < count; ++i)
    {
        const key = "a" + i;
        realValues[i] = real[key];
        imagValues[i] = imag[key];
    }

    oscillator.frequency.value = params.frequency;
    oscillator.setPeriodicWave(actx.createPeriodicWave(realValues, imagValues));

    gain.gain.value = params.volume;
}
