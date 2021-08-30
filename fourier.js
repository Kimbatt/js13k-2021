
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
    if (document.getElementById("loopen").checked)
    {
        currentSamples = new Array(samples.length);
        const period = +document.getElementById("period").value;
        // TODO
        for (let i = 0; i < currentSamples.length; ++i)
        {
            currentSamples[i] = Lerp(samples[i], samples[samples.length - 1 - i], );
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

    const count = Math.min(+document.getElementById("max-length").value, fft.length);
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

    const decimalsMultiplier = 10 ** (+document.getElementById("decimals").value);
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
    oscillator.frequency.value = 1 / duration * (+document.getElementById("preview-frequency").value);
    oscillator.setPeriodicWave(wave);
    oscillator.start();
    oscillator.stop(actx.currentTime + 1);

    const gainNode = actx.createGain();
    gainNode.gain.value = +document.getElementById("preview-volume").value;

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

