
/**
 * @type {AudioContext}
 */
let actx;

/**
 * @type {GainNode}
 */
let globalVolumeNode;
let globalVolume = 0.5;

/**
 * @type {AudioBuffer}
 */
let noiseBuffer;

/**
 * @type {PeriodicWave}
 */
let soundWave;


/**
 *
 * @param {AudioContext} audioContext
 * @param {number} length
 * @param {(t: number) => number} generator
 */
function CreateBufferWithData(audioContext, length, generator)
{
    let buffer = audioContext.createBuffer(1, audioContext.sampleRate * length | 0, audioContext.sampleRate);
    let data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; ++i)
    {
        data[i] = generator(i / audioContext.sampleRate);
    }

    return buffer;
}

let once = false;
function Init()
{
    if (once)
        return;
    once = true;
    actx = new AudioContext();
    globalVolumeNode = actx.createGain();
    globalVolumeNode.gain.value = globalVolume;
    globalVolumeNode.connect(actx.destination);

    let rng = mulberry32(0);
    noiseBuffer = CreateBufferWithData(actx, 1, () => rng() * 2 - 1);

    // let coeffs = [0, 1, 0.4, 0.2, 0.3, 0.1];
    // bassWave = actx.createPeriodicWave(coeffs, [0, 1, 0, 0.2, 0.5, 0.2]);
    soundWave = actx.createPeriodicWave(
        // [0, 1, 0, 0.6, 0.3, 0.6],[0, 1, 0, 0.6, 0.3, 0.6]
        [0, 0, 1, 0.1, -0.4, 0, 1, 0, -0.9, 0.1, 0.4, -0.1, 0, 0.2, -0.1, 0.1, 0, 0, 0.1, 0.1, 0, 0, 0, 0, 0, 0.1, 0.2, -0.2, -0.3, 0.1, 0.1, -0.2, 0, 0, 0.1, 0, -0.1, -0.4, 0.2, 0.4, 0.1, 0.3, 0.3, 0, 0, -0.2, 0.1, -0.1, -0.1, -0.3, 0.1, -0.1, 0, 0, 0.1, 0.1, 0, 0.1, 0.1, -0.2, 0, -0.1, -0.1, 0, 0, -0.1, -0.2, 0, 0.1, 0, -0.1, 0.1, -0.1, 0, 0, -0.1, -0.1, 0, -0.1, -0.1, -0.1],
        [0, 0, 1, -0.1, 0.2, 0, -0.3, 0.1, -0.5, -0.8, 0, 0, -0.4, 0, -0.3, -0.1, 0, 0, 0, 0, 0.1, 0.1, 0, -0.1, 0, 0.1, -0.4, 0.1, -0.1, -0.2, 0, 0, -0.1, 0, 0.1, -0.2, 0, -0.2, 0, -0.2, 0, 0.4, 0, -0.4, 0.3, 0.1, 0, -0.1, 0.2, -0.1, 0.2, -0.1, -0.2, -0.2, 0.2, 0, -0.2, 0.1, -0.2, -0.2, 0, 0, 0, 0, 0.1, -0.1, -0.1, 0, 0.1, 0, 0, 0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );

    Start();
}

document.addEventListener("click", Init);
// document.addEventListener("keydown", Init);

/**
 *
 * @param {AudioContext} audioContext
 * @param {AudioBuffer} bufferData
 * @returns
 */
function CreateNodeFromBufferData(audioContext, bufferData)
{
    let node = audioContext.createBufferSource();
    node.buffer = bufferData;
    return node;
}

function CreateNoiseNode()
{
    let node = CreateNodeFromBufferData(actx, noiseBuffer)
    node.loop = true;
    return node;
}

/**
 * @param {number} octave
 * @param {number} note
 */
function NoteToFrequency(octave, note)
{
    return 2 ** (Math.log2(440) + octave - 4 + (note - 9) / 12);
}


/**
 * @param {number} frequency
 * @param {number} volume
 * @param {number} when
 * @param {number} duration
 * @param {number} fadeInDuration
 * @param {number} fadeOutDuration
 * @param {number} Q
 * @param {PeriodicWave} wave
 */
function PlaySound(frequency, volume, when, duration, fadeInDuration, fadeOutDuration, Q, wave)
{
    let oscillator = actx.createOscillator();
    let gain = actx.createGain();
    let filter = actx.createBiquadFilter();
    // let filter2 = actx.createBiquadFilter();

    oscillator.frequency.value = frequency;

    gain.gain.value = 0;
    let time = when;
    gain.gain.linearRampToValueAtTime(0, time);
    time += fadeInDuration;
    gain.gain.linearRampToValueAtTime(volume, time);
    time += duration;
    gain.gain.linearRampToValueAtTime(volume, time);
    time += fadeOutDuration;
    gain.gain.linearRampToValueAtTime(0, time);

    filter.type = "bandpass";
    filter.Q.value = Q;
    filter.frequency.value = frequency;

    // filter2.type = "highpass";
    // filter2.frequency.value = frequency * 0.5;
    // filter2.Q.value = -10;


    // oscillator.connect(gain);
    // gain.connect(filter);
    // filter.connect(filter2);
    // filter2.connect(actx.destination);


    oscillator.connect(gain);
    gain.connect(filter);
    filter.connect(globalVolumeNode);

    oscillator.setPeriodicWave(wave);
    oscillator.start(when);
    oscillator.stop(time);
}

/**
 * @param {number} volume
 * @param {number} when
 * @param {AudioBufferSourceNode | OscillatorNode} sourceNode
 * @param {boolean} filter
 * @param {number} filterFrequency
 * @param {number} Q
 */
function Drum(volume, when, sourceNode, filter, filterFrequency, Q, fadeInDuration = 0.01, fadeOutDuration = 0.1, duration = 0)
{
    let gainNode = actx.createGain();
    let filterNode = actx.createBiquadFilter();

    gainNode.gain.value = 0;
    let time = when;
    gainNode.gain.linearRampToValueAtTime(0, time);
    time += fadeInDuration;
    gainNode.gain.linearRampToValueAtTime(volume, time);
    time += duration;
    gainNode.gain.linearRampToValueAtTime(volume, time);
    time += fadeOutDuration;
    gainNode.gain.linearRampToValueAtTime(0, time);

    filterNode.type = filter ? "bandpass" : "allpass";
    filterNode.frequency.value = filterFrequency;
    filterNode.Q.value = Q;

    sourceNode.connect(gainNode);
    gainNode.connect(filterNode);
    filterNode.connect(globalVolumeNode);

    sourceNode.start(when);
    sourceNode.stop(time);
}

function Hat(when)
{
    Drum(0.4, when, CreateNoiseNode(), true, 10000, 2);
}

function Hat2(when)
{
    Drum(0.4, when, CreateNoiseNode(), true, 10000, 1, 0.02, 0.06);
}

function Snare(when)
{
    Drum(0.3, when, CreateNoiseNode(), true, 1800, 1, 0.01, 0.05, 0.07);
}

function Kick(when)
{
    let sourceNode = actx.createOscillator();
    let startFreq = 250;
    let timeOffset = 0;
    sourceNode.frequency.value = startFreq;
    sourceNode.frequency.linearRampToValueAtTime(startFreq, when + 0.01 + timeOffset);
    sourceNode.frequency.linearRampToValueAtTime(50, when + 0.03 + timeOffset);

    Drum(0.6, when + timeOffset, sourceNode, false, 0, 0, 0.01, 0.1, 0.05);
}

let duration = 8;
let scheduleAheadTime = duration + 1;
let scheduledCount = 0;
function Start()
{
    let start = actx.currentTime + 0.1;

    /**
     * @param {number} when
     * @param {number} octave
     * @param {number} note
     * @param {number} duration
     */
    function PlayEcho(when, octave, note, duration)
    {
        let freq = NoteToFrequency(octave, note);
        let baseVolume = 0.2;
        PlaySound(freq, baseVolume / 1, when,        duration, 0.01, 0.05, 0.02, soundWave);
        PlaySound(freq, baseVolume / 1.5, when + 0.25, duration, 0.01, 0.05, 0.5, soundWave);
        PlaySound(freq, baseVolume / 2, when + 0.50, duration, 0.01, 0.05, 1, soundWave);
        // PlaySound(freq, baseVolume / 4, when + 0.50, duration, 0.01, 0.1, 0.8);
        // PlaySound(freq, baseVolume / 8, when + 0.75, duration, 0.01, 0.1, 2);
    }

    let kickActive = true;
    let snareActive = !true;
    let hatActive = !true;
    let hatFn = Hat;

    let rng = mulberry32(0);

    let noteRng;

    let update = () =>
    {
        let elapsed = actx.currentTime;
        let requiredCount = (elapsed + scheduleAheadTime) / duration;

        let half = duration / 2;
        let quarter = duration / 4;
        let eight = duration / 8;
        let sixteenth = duration / 16;
        let thirtytwoeth = duration / 32;

        while (scheduledCount < requiredCount)
        {
            let time = start + scheduledCount * duration;

            if (scheduledCount % 2 === 0)
            {
                const maxNoteSequenceCount = 10;
                noteRng = mulberry32(rng() * maxNoteSequenceCount | 0);
            }

            ++scheduledCount;

            if (kickActive)
            {
                for (let i = 0; i < 16; ++i)
                {
                    Kick(time + sixteenth * i);
                }
            }

            if (snareActive)
            {
                for (let i = 0; i < 8; ++i)
                {
                    Snare(time + eight * i + sixteenth);
                }
            }

            if (hatActive)
            {
                for (let i = 0; i < 16; ++i)
                {
                    hatFn(time + sixteenth * (i + 0.5));
                }
            }

            if (!kickActive || rng() < 0.1)
            {
                kickActive = !kickActive;
            }
            else if (!snareActive || rng() < 0.1)
            {
                snareActive = !snareActive;
            }
            else if (!hatActive || rng() < 0.1)
            {
                hatActive = !hatActive;
            }
            else if (rng() < 0.2)
            {
                hatFn = hatFn === Hat ? Hat2 : Hat;
            }

            // if (!kickActive && !snareActive && !hatActive)
            // {
            //     let random = rng();
            //     if (random < 0.33)
            //     {
            //         kickActive = true;
            //     }
            //     else if (random < 0.66)
            //     {
            //         snareActive = true;
            //     }
            //     else
            //     {
            //         hatActive = true;
            //     }
            // }

            const tones = [
                [0, 2, 4, 7, 9],
                [2, 4, 7, 9, 12],
                [4, 7, 9, 12, 14]
            ];
            // const tones = [4, 5, 9, 11, 12];
            const row = tones[noteRng() * tones.length | 0];
            const randomTone = () => row[noteRng() * row.length | 0] - 10;

            for (let i = 0; i < 16; ++i)
            {
                if (noteRng() < 0.5)
                {
                    PlayEcho(time + sixteenth * i, 2, randomTone(), thirtytwoeth * (noteRng() < 0.5 ? 1 : 0.5));
                }
                else
                {
                    PlayEcho(time + thirtytwoeth * (i * 2),     2, randomTone(), thirtytwoeth * 0.5);
                    PlayEcho(time + thirtytwoeth * (i * 2 + 1), 2, randomTone(), thirtytwoeth * 0.5);
                }
            }

            // let noteOffset = -5;
            // let empty = Symbol();
            // let timer = 0;
            // function Play(note, thirtytwoeths = 1)
            // {
            //     if (note !== empty)
            //     {
            //         PlayEcho(time + timer * thirtytwoeth, 2, note + noteOffset, thirtytwoeth * thirtytwoeths);
            //     }

            //     timer += thirtytwoeths;
            // }

            // if (rng() < 0.0)
            // {
            //     Play(-3, 2);
            //     Play(2);
            //     Play(-3);
            //     Play(7);
            //     Play(-3);
            //     Play(12);
            //     Play(9);
            //     Play(-3, 2);
            //     Play(2);
            //     Play(-3, 2);
            //     Play(2);
            //     Play(4);
            //     Play(-3);
            // }
            // else
            // {
            //     Play(4, 2);
            //     Play(empty, 3);
            //     Play(4, 0.5);
            //     Play(2, 0.5);
            //     Play(empty, 0.5);
            //     Play(0, 0.5);
            //     Play(-3, 0.5);
            //     Play(empty, 0.5);
            //     Play(0, 2);
            //     Play(empty, 3);
            //     Play(2, 0.5);
            //     Play(0, 0.5);
            //     Play(empty, 0.5);
            //     Play(-3, 0.5);
            //     Play(-5, 0.5);
            // }
        }
    };

    update();
    setInterval(update, 1379);
}
