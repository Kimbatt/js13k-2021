
/// <reference path="dat.gui/dat.gui.d.ts" />
const gui = new dat.GUI({ autoPlace: false, width: 500 });
document.getElementById("datgui-container").appendChild(gui.domElement);

const guiParams = {
    volume: 0.1,
    frequency: 1,
    loopen: false,
    loopenPercentage: 0.1,
    maxLength: 100,
    decimals: 2
};

gui.add(guiParams, "volume", 0, 1).name("Preview volume");
gui.add(guiParams, "frequency", 0, 4).name("Preview frequency");
gui.add(guiParams, "loopen").name("Loopen");
gui.add(guiParams, "loopenPercentage", 0, 1).name("Loopen percentage");
gui.add(guiParams, "maxLength", 0, undefined, 1).name("Max output length");
gui.add(guiParams, "decimals", 0, 10, 1).name("Output decimals");


class Complex
{
    /**
     * @param {number} real
     * @param {number} imag
     */
    constructor(real, imag)
    {
        this.real = real;
        this.imag = imag;
    }

    /**
     * @param {Complex} a
     * @param {Complex} b
     */
    static add(a, b)
    {
        return new Complex(a.real + b.real, a.imag + b.imag);
    }

    /**
     * @param {Complex} a
     * @param {Complex} b
     */
    static sub(a, b)
    {
        return new Complex(a.real - b.real, a.imag - b.imag);
    }

    /**
     * @param {Complex} a
     * @param {Complex} b
     */
    static mul(a, b)
    {
        return new Complex(a.real * b.real - a.imag * b.imag, a.real * b.imag + b.real * a.imag);
    }

    /**
     * @param {number} x
     */
    static expImag(x)
    {
        return new Complex(Math.cos(x), Math.sin(x));
    }
}

/**
 * @param {number} x
 */
function NextPowerOf2(x)
{
    x -= 1;
    x |= x >> 16;
    x |= x >> 8;
    x |= x >> 4;
    x |= x >> 2;
    x |= x >> 1;
    return x + 1;
}

/**
 * @param {number} a
 * @param {number} b
 * @param {number} t
 */
function Lerp(a, b, t)
{
    return a + (b - a) * t;
}

/**
 * @param {number} x
 * @param {number} a
 * @param {number} b
 */
function Clamp(x, a, b)
{
    return Math.min(Math.max(x, a), b);
}

/**
 * @param {number[] | Float32Array} data
 * @param {number} newCount
 */
function ResampleLinear(data, newCount)
{
    const ratio = (data.length - 1) / (newCount - 1);
    const result = [];

    for (let i = 0; i < newCount; ++i)
    {
        const t = i * ratio;
        const idx0 = Math.floor(t);
        const idx1 = Math.min(Math.ceil(t), newCount - 1);
        const localT = t - idx0;
        const real = Lerp(data[idx0], data[idx1], localT);
        result.push(new Complex(real, 0));
    }

    return result;
}

/**
 * @param {number[] | Float32Array} input
 */
function FFTSamples(input)
{
    return FFT(ResampleLinear(input, NextPowerOf2(input.length)));
}

/**
 * @param {Complex[]} data
 */
function FFT(data)
{
    let N = data.length;

    /**
     * @type {Complex[]}
     */
    const temp = new Array(N >>> 1);

    const originalN = N;
    while (N > 1)
    {
        const length = N >>> 1;

        for (let x = 0; x < originalN; x += N)
        {
            for (let i = 0; i < length; ++i)    // copy all odd elements to b
                temp[i] = data[x + i * 2 + 1];

            for (let i = 0; i < length; ++i)    // copy all even elements to lower-half of a
                data[x + i] = data[x + i * 2];

            for (let i = 0; i < length; ++i)    // copy all odd (from b) to upper-half of a[]
                data[x + i + length] = temp[i];
        }

        N >>= 1;
    }

    N <<= 1;

    let twiddleIndex = 1;
    while (N <= originalN)
    {
        let length = N >> 1;
        const twiddleFactor = -2 * Math.PI / (2 ** twiddleIndex);
        for (let x = 0; x < originalN; x += N)
        {
            for (let i = 0; i < length; ++i)
            {
                const index1 = x + i;
                const index2 = x + length + i;
                const e = data[index1];
                const w = Complex.mul(Complex.expImag(twiddleFactor * i), data[index2]);
                data[index1] = Complex.add(e, w);
                data[index2] = Complex.sub(e, w);
            }
        }

        ++twiddleIndex;
        N <<= 1;
    }

    return data;
}

/**
 * @type {Float32Array}
 */
let samples = null;
let duration = 1;

function Play()
{
    if (samples === null)
    {
        return;
    }

    let currentSamples;
    if (guiParams.loopen)
    {
        currentSamples = samples.slice();
        const len = currentSamples.length *  guiParams.loopenPercentage | 0;
        const startIndex = currentSamples.length - 1 - len;

        for (let i = startIndex; i < currentSamples.length; ++i)
        {
            currentSamples[i] = Lerp(samples[i], samples[samples.length - 1], (i - startIndex) / len);
        }
    }
    else
    {
        currentSamples = samples;
    }

    let fft = FFTSamples(currentSamples);
    fft = fft.slice(0, fft.length / 2);

    const invMagnitude = 2 / fft.length;
    for (let i = 0; i < fft.length; ++i)
    {
        fft[i].real *= invMagnitude;
        fft[i].imag *= invMagnitude;
    }

    const count = Math.min(guiParams.maxLength, fft.length);
    /** @type {number[]} */
    let real = new Array(count);
    /** @type {number[]} */
    let imag = new Array(count);

    let maxMagnitude = -Infinity;
    let maxIndex = -1;
    for (let i = 0; i < count; ++i)
    {
        real[i] = fft[i].real;
        imag[i] = fft[i].imag;

        const magnitude = Math.abs(fft[i].real);
        if (magnitude > maxMagnitude)
        {
            maxMagnitude = magnitude;
            maxIndex = i;
        }
    }

    const decimalsMultiplier = 10 ** guiParams.decimals;
    for (let i = 0; i < count; ++i)
    {
        real[i] /= maxMagnitude;
        imag[i] /= maxMagnitude;

        real[i] = Math.round(real[i] * decimalsMultiplier) / decimalsMultiplier;
        imag[i] = Math.round(imag[i] * decimalsMultiplier) / decimalsMultiplier;

        // remove -0 values
        if (real[i] === 0) real[i] = 0;
        if (imag[i] === 0) imag[i] = 0;
    }

    while (real[real.length - 1] === 0)
    {
        real.pop();
        imag.pop();
    }

    /**
     * @param {number[]} arr
     */
    function ToString(arr)
    {
        return "[" + arr.map(value => value.toString()) + "]";
    }

    const rs = ToString(real);
    const is = ToString(imag);
    document.getElementById("real").value = rs;
    document.getElementById("imag").value = is;

    const wave = actx.createPeriodicWave(eval(rs), eval(is));

    const oscillator = actx.createOscillator();
    oscillator.frequency.value = guiParams.frequency / duration;
    oscillator.setPeriodicWave(wave);
    oscillator.start();
    oscillator.stop(actx.currentTime + 1);

    const gainNode = actx.createGain();
    gainNode.gain.value = guiParams.volume;

    oscillator.connect(gainNode);
    gainNode.connect(actx.destination);
}

/**
 * @type {AudioContext}
 */
let actx = null;

/**
 * @param {File} file
 */
function FileSelected(file)
{
    actx ??= new AudioContext();

    const fr = new FileReader();
    fr.onload = async () =>
    {
        const buffer = fr.result;
        if (buffer instanceof ArrayBuffer)
        {
            let audioBuffer;
            try
            {
                audioBuffer = await actx.decodeAudioData(buffer);
            }
            catch
            {
                alert("Cannot decode audio file");
            }

            samples = audioBuffer.getChannelData(0);
            duration = audioBuffer.duration;
        }
    };
    fr.readAsArrayBuffer(file);
}

