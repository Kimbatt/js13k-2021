
function WindowSize()
{
    return innerHeight;
}

// [x, y, radius]
let levelData = [
    {
        boost: 1,
        checkpoint: [0, 0, 0.1],
        planets: [
            [1, 0, 0.4]
        ],
        blackholes: []
    },
    {
        boost: 2,
        checkpoint: [2, 0, 0.1],
        planets: [
            [1, 0, 0.3],
            [3, 0, 0.4],
        ],
        blackholes: []
    },
    {
        boost: 3,
        checkpoint: [4, 0, 0.1],
        planets: [
            [0.75, 0, 0.15],
            [0.75, 0.5, 0.1]
        ],
        blackholes: []
    },
    {
        boost: 4,
        checkpoint: [1.5, 0.5, 0.15],
        planets: [],
        blackholes: [
            [1.5, 0, 0.2, 0.0007]
        ]
    },
    {
        boost: 4,
        checkpoint: [2.5, 0, 0.1],
        planets: [
            [1.5, 0, 0.4],
            [1.5, 0.6, 0.15],
            [1.5, -0.6, 0.15],
        ],
        blackholes: []
    },
    {
        boost: 3,
        checkpoint: [3, 0, 0.1],
        planets: [
            [1, 0.1, 0.15],
            [2, 0.0, 0.1],
            [3, 0.0, 0.15],
            [4, -0.1, 0.15],
            [5, 0.0, 0.1],
        ],
        blackholes: []
    },
    {
        boost: 5,
        checkpoint: [6, 0, 0.1],
        planets: [
            [1, 0.0, 0.15],
            [2, 0.1, 0.1],
            [3.5, 0.0, 0.5, 100],
            [5, -0.1, 0.15],
            [6, 0.0, 0.1],
        ],
        blackholes: []
    },
    {
        boost: 2,
        checkpoint: [7, 0, 0.1],
        planets: [
            [0.8, 0, 0.2],
            [0, 1, 0.3],
            [1, 1, 0.3],
        ],
        blackholes: []
    },
    {
        boost: 2,
        checkpoint: [1, 1.5, 0.1],
        planets: [
            [0.3, 0.2, 0.05, 10],
            [0.5, 0.52, 0.05, 10],
            [0.35, 0.48, 0.03, 10],
            [0.55, 0.3, 0.05, 10],
            [0.4, 0.1, 0.08, 10],
            [0.6, 0.6, 0.05, 10],
            [0.5, 0.94, 0.06, 10],
            [0.6, 0.86, 0.05, 10],
            [0.8, 0.7, 0.04, 10],
            [0.7, 0.5, 0.05, 10],
            [0.5, -0.2, 0.2, 40],
            [0.2, 0.94, 0.15, 30],
            [0, 0.7, 0.08, 20],
            [-0.2, 0.5, 0.15, 30],
        ],
        blackholes: []
    },
    {
        boost: 1.5,
        checkpoint: [1, 0.9, 0.1],
        planets: [
            [1, 0, 0.2],
            [1.5, 0.2, 0.15],
            [2, 0.22, 0.18],
            [2.5, 0.25, 0.1, 40],

            [0.5, 0.5, 0.1, 40],
            [1, 0.7, 0.18],
            [1.5, 0.9, 0.2],
            [2, 0.98, 0.22],
        ],
        blackholes: []
    },
    {
        boost: 4.5,
        checkpoint: [3, 0.6, 0.1],
        planets: [
            [2.5, 1.5, 0.2]
        ],
        blackholes: [
            [1.5, 0, 0.2, 0.0007]
        ]
    },
    {
        boost: 4,
        checkpoint: [3, 1.5, 0.1],
        planets: [],
        blackholes: []
    },
    {
        boost: 3,
        checkpoint: [1, -3, 0.1],
        planets: [
            [1, 0, 0.2],
            [2, -0.15, 0.2],
            [3, 0.15, 0.2]
        ],
        blackholes: []
    },
    {
        boost: 5,
        checkpoint: [4, 0, 0.1],
        planets: [
            [1, 0, 0.2],
            [3, 0, 0.15]
        ],
        blackholes: [
            [2, 0, 0.1, 0.0001]
        ]
    },
    {
        boost: 3,
        checkpoint: [4, 0, 0.1],
        planets: [
            [0.5, 0, 0.15],
            [1, 0.5, 0.15],
            [1, -0.5, 0.15],
            [1.5, 0, 0.15],
            [2, 0.5, 0.15],
            [2, -0.5, 0.15],
            [2.5, 0, 0.15],
        ],
        blackholes: []
    },
    {
        boost: 3,
        checkpoint: [3, 0, 0.1],
        planets: [],
        blackholes: []
    },
    {
        boost: 3,
        checkpoint: [2, 0, 0.1],
        planets: [
            // [0.5, 0.3, 0.08, 30],
            // [1.2, 0.1, 0.08, 30],
            // [0.8, -0.1, 0.08, 30],
            // [1.8, 0.5, 0.08, 30],

            [0.6, 0.3, 0.08, 20],
            [2.1, 1.2, 0.08, 20],
            [2.7, -0.6, 0.08, 20],
            [2.9, -0.2, 0.08, 20],
            [2.2, 0.1, 0.08, 20],
            [2.5, -0.5, 0.08, 20],
            [0.2, 1.2, 0.08, 20],
            [1.1, -0.1, 0.08, 20],
            [2.4, 0  , 0.08, 20],
            [1  , -0.3, 0.08, 20],
            [2.3, 0.9, 0.08, 20],
            [0  , 1.1, 0.08, 20],
            [1.1, -0.8, 0.08, 20],
            [1.6, 1.6, 0.08, 20],
            [2.3, -0.7, 0.08, 20],
            [2.7, 0.6, 0.08, 20],
            [2.2, 0.4, 0.08, 20],
            [2.7, 0.3, 0.08, 20],
            [0.3, -0.1, 0.08, 20],
            [1.3, 1.3, 0.08, 20]
        ],
        blackholes: []
    },
    {
        boost: 3,
        checkpoint: [3.5, 0.5, 0.1],
        planets: [],
        blackholes: []
    },
    {
        boost: 9,
        checkpoint: [3, 0.5, 0.1],
        planets: [
            [1, -0.5, 0.15],
            [1, -0.25, 0.05, 20],
            // [1, 0, 0.15],
            [1, 0.25, 0.05, 20],
            [1, 0.5, 0.15]
        ],
        blackholes: [
            [1, -0.9, 0.15, 0.0003],
            [1, 0.9, 0.15, 0.0003],
        ]
    },
    {
        boost: 9,
        checkpoint: [2, 0, 0.3],
        planets: [],
        blackholes: []
    }
];


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
 * @param {number} a
 * @param {number} b
 * @param {number} t
 */
function Unlerp(a, b, t)
{
    return (t - a) / (b - a);
}

/**
 * @param {number} a
 * @param {number} b
 * @param {number} t
 */
function LerpAngle(a, b, t)
{
    let ax = Math.cos(a), ay = Math.sin(a);
    let bx = Math.cos(b), by = Math.sin(b);
    let tx = Lerp(ax, bx, t);
    let ty = Lerp(ay, by, t);
    return Math.atan2(ty, tx);
}

/**
 * @param {number} x
 * @param {number} min
 * @param {number} max
 */
function Clamp(x, min, max)
{
    return x < min ? min : x > max ? max : x;
}

/**
 * @param {number} edge0
 * @param {number} edge1
 * @param {number} x
 */
function Smoothstep(edge0, edge1, x)
{
    return falloff.smoothstep(Clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0));
}

var falloff = {
    smoothstep: t => t * t * (3 - 2 * t),
    easeIn: t => 1 - Math.cos(t * Math.PI / 2),
    easeOut: t => Math.sin(t * Math.PI / 2),
    easeInPoly: (t, pow) => t ** pow,
    easeOutPoly: (t, pow) => 1 - (1 - t) ** pow
};

/**
 * @param {number} seed
 */
function mulberry32(seed)
{
    return () =>
    {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / (2 ** 32);
    };
}


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
 * @type {BiquadFilterNode}
 */
let globalFilterNode;

/**
 * @type {AudioBuffer}
 */
let noiseBuffer;

/**
 * @type {PeriodicWave}
 */
let soundWave;

/**
 * @type {GainNode}
 */
let boostVolumeNode;

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

function InitAudio()
{
    actx = new AudioContext();
    globalVolumeNode = actx.createGain();
    globalVolumeNode.gain.value = globalVolume;

    globalFilterNode = actx.createBiquadFilter();
    globalFilterNode.type = "highshelf";
    globalFilterNode.frequency.value = 200;
    globalFilterNode.gain.value = 0;

    globalFilterNode.connect(globalVolumeNode);
    globalVolumeNode.connect(actx.destination);

    let rng = mulberry32(0);
    noiseBuffer = CreateBufferWithData(actx, 1, () => rng() * 2 - 1);

    // let coeffs = [0, 1, 0.4, 0.2, 0.3, 0.1];
    // bassWave = actx.createPeriodicWave(coeffs, [0, 1, 0, 0.2, 0.5, 0.2]);
    soundWave = actx.createPeriodicWave(
        // [0, 1, 0, 0.6, 0.3, 0.6],[0, 1, 0, 0.6, 0.3, 0.6]
        new Float32Array([0, 0, 1, 0.1, -0.4, 0, 1, 0, -0.9, 0.1, 0.4, -0.1, 0, 0.2, -0.1, 0.1, 0, 0, 0.1, 0.1, 0, 0, 0, 0, 0,
            0.1, 0.2, -0.2, -0.3, 0.1, 0.1, -0.2, 0, 0, 0.1, 0, -0.1, -0.4, 0.2, 0.4, 0.1, 0.3, 0.3, 0, 0, -0.2, 0.1, -0.1, -0.1,
            -0.3, 0.1, -0.1, 0, 0, 0.1, 0.1, 0, 0.1, 0.1, -0.2, 0, -0.1, -0.1, 0, 0, -0.1, -0.2, 0, 0.1, 0, -0.1, 0.1, -0.1, 0,
            0, -0.1, -0.1, 0, -0.1, -0.1, -0.1]),
        new Float32Array([0, 0, 1, -0.1, 0.2, 0, -0.3, 0.1, -0.5, -0.8, 0, 0, -0.4, 0, -0.3, -0.1, 0, 0, 0, 0, 0.1, 0.1, 0, -0.1,
            0, 0.1, -0.4, 0.1, -0.1, -0.2, 0, 0, -0.1, 0, 0.1, -0.2, 0, -0.2, 0, -0.2, 0, 0.4, 0, -0.4, 0.3, 0.1, 0, -0.1, 0.2,
            -0.1, 0.2, -0.1, -0.2, -0.2, 0.2, 0, -0.2, 0.1, -0.2, -0.2, 0, 0, 0, 0, 0.1, -0.1, -0.1, 0, 0.1, 0, 0, 0.1, 0, 0, 0,
            0, 0, 0, 0, 0, 0])
    );

    Start();

    {
        let boostNoiseNode = CreateNoiseNode();
        boostVolumeNode = actx.createGain();

        let boostFilterNode = actx.createBiquadFilter();

        boostVolumeNode.gain.value = 0;

        boostFilterNode.type = "bandpass";
        boostFilterNode.frequency.value = 250;
        boostFilterNode.Q.value = 5;

        boostNoiseNode.connect(boostFilterNode);
        boostFilterNode.connect(boostVolumeNode);
        boostVolumeNode.connect(globalFilterNode);

        boostNoiseNode.start();
    }
}

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

function PlayExplosionSound()
{
    PlaySound(50, 0.5, actx.currentTime, 0.1, 0.01, 0.5, 0.5, "square");
    PlaySound(70, 0.5, actx.currentTime, 0.1, 0.01, 0.3, 0.3, "sawtooth");
    Drum(0.3, actx.currentTime, CreateNoiseNode(), true, 1000, 2, 0.02, 0.6, 0);
}

function PlayCheckpointSound()
{
    Drum(0.2, actx.currentTime, CreateNoiseNode(), true, 1000, 2, 0.01, 0.05, 0.1);
    PlaySound(555, 1, actx.currentTime, 0.1, 0.01, 0.2, 10, "sawtooth");
    PlaySound(66, 1, actx.currentTime, 0.1, 0.01, 0.2, 10, "sawtooth");
}

/**
 * @param {number} frequency
 * @param {number} volume
 * @param {number} when
 * @param {number} duration
 * @param {number} fadeInDuration
 * @param {number} fadeOutDuration
 * @param {number} Q
 * @param {PeriodicWave | OscillatorType} wave
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
    filter.connect(globalFilterNode);

    if (typeof wave === "string")
    {
        oscillator.type = wave;
    }
    else
    {
        oscillator.setPeriodicWave(wave);
    }

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
    filterNode.connect(globalFilterNode);

    sourceNode.start(when);
    sourceNode.stop(time);
}

function Hat(when)
{
    Drum(0.2, when, CreateNoiseNode(), true, 10000, 2);
}

function Hat2(when)
{
    Drum(0.2, when, CreateNoiseNode(), true, 10000, 1, 0.02, 0.06);
}

function Snare(when)
{
    Drum(0.1, when, CreateNoiseNode(), true, 1800, 1, 0.01, 0.05, 0.07);
}

function Kick(when)
{
    let sourceNode = actx.createOscillator();
    let startFreq = 250;
    let timeOffset = 0;
    sourceNode.frequency.value = startFreq;
    sourceNode.frequency.linearRampToValueAtTime(startFreq, when + 0.01 + timeOffset);
    sourceNode.frequency.linearRampToValueAtTime(50, when + 0.03 + timeOffset);

    Drum(0.3, when + timeOffset, sourceNode, false, 0, 0, 0.01, 0.1, 0.05);
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
        let baseVolume = 0.1;
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


var webglNoiseFunction = `
vec3 hash3(vec3 p)
{
    p = vec3(
        dot(p,vec3(127.1, 311.7, 74.7)),
        dot(p,vec3(269.5, 183.3, 246.1)),
        dot(p,vec3(113.5, 271.9, 124.6))
    );

    return 2.0 * fract(sin(p) * 43758.5453123) - 1.0;
}

float simplex_noise(vec3 p)
{
    const float K1 = 1.0 / 3.0;
    const float K2 = 1.0 / 6.0;

    vec3 i = floor(p + (p.x + p.y + p.z) * K1);
    vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);

    vec3 e = step(vec3(0.0), d0 - d0.yzx);
    vec3 i1 = e * (1.0 - e.zxy);
    vec3 i2 = 1.0 - e.zxy * (1.0 - e);

    vec3 d1 = d0 - (i1 - 1.0 * K2);
    vec3 d2 = d0 - (i2 - 2.0 * K2);
    vec3 d3 = d0 - (1.0 - 3.0 * K2);

    vec4 h = max(0.6 - vec4(dot(d0, d0), dot(d1, d1), dot(d2, d2), dot(d3, d3)), 0.0);
    vec4 n = h * h * h * h * vec4(dot(d0, hash3(i)), dot(d1, hash3(i + i1)), dot(d2, hash3(i + i2)), dot(d3, hash3(i + 1.0)));

    return dot(vec4(31.316), n);
}
`;

/**
 * @param {number} num
 */
function NumberToWebGL(num)
{
    return Number.isInteger(num) ? num.toFixed(1) : num.toString();
}

class WebGLCanvas
{
    /**
     * @param {string} shader
     * @param {string[]} uniforms
     */
    constructor(shader, ...uniforms)
    {
        // shaders
        uniforms.push("uTime", "uScreenSize", "uAspect");

        const vertexShader = `#version 300 es
in vec2 aVertexPosition;

uniform vec4 uScreenSize;

uniform float uTime;

out vec4 vPixelCoord;

void main()
{
    vec2 normalizedPosition = (aVertexPosition + vec2(1.0)) * 0.5;
    vec2 screenPosition = normalizedPosition * uScreenSize.xy;
    vPixelCoord = vec4(normalizedPosition, screenPosition);
    gl_Position = vec4(aVertexPosition, 0.0, 1.0);
}
        `;


        const fragmentShader = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec4 uScreenSize;
uniform vec2 uAspect;

in vec4 vPixelCoord;
out vec4 fragColor;

${shader}


void main()
{
    vec4 color;
    mainImage(color, vPixelCoord.xy);
    fragColor = color;
}
        `;

        // element setup
        const canvas = this.canvas = document.createElement("canvas");
        const ctx = this.ctx = canvas.getContext("webgl2");

        // shader setup
        const vertShaderObj = ctx.createShader(ctx.VERTEX_SHADER);
        const fragShaderObj = ctx.createShader(ctx.FRAGMENT_SHADER);

        if (!vertShaderObj || !fragShaderObj)
        {
            console.error("Cannot create shader object");
            return;
        }

        ctx.shaderSource(vertShaderObj, vertexShader);
        ctx.shaderSource(fragShaderObj, fragmentShader);
        ctx.compileShader(vertShaderObj);
        ctx.compileShader(fragShaderObj);

        function LogShader(shaderSource)
        {
            const lines = shaderSource.split("\n");
            const padCount = Math.log10(lines.length + 1) | 0 + 4;
            console.error("\n" + lines.map((line, idx) => (idx + 1).toString().padEnd(padCount, " ") + line).join("\n"));
        }

        const vertexShaderError = ctx.getShaderInfoLog(vertShaderObj);
        if (vertexShaderError && vertexShaderError.length !== 0)
        {
            console.error("Error compiling vertex shader");
            console.error(vertexShaderError);
            LogShader(vertexShader);
            return;
        }

        const fragmentShaderError = ctx.getShaderInfoLog(fragShaderObj);
        if (fragmentShaderError && fragmentShaderError.length !== 0)
        {
            console.error("Error compiling fragment shader");
            console.error(fragmentShaderError);
            LogShader(fragmentShader);
            return;
        }

        // program setup
        const program = ctx.createProgram();

        if (!program)
        {
            console.error("Cannot create WebGL program");
            return;
        }

        ctx.attachShader(program, vertShaderObj);
        ctx.attachShader(program, fragShaderObj);
        ctx.linkProgram(program);

        const programError = ctx.getProgramInfoLog(program);
        if (programError && programError.length !== 0)
        {
            console.error("Error linking program");
            console.error(programError);
            return;
        }

        ctx.useProgram(program);

        // buffer setup
        const vertexBuffer = ctx.createBuffer();

        if (!vertexBuffer)
        {
            console.error("Cannot create buffers");
            return;
        }

        // vertex data setup
        this.vertexPositions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
        const vertexLocation = ctx.getAttribLocation(program, "aVertexPosition");
        ctx.bindBuffer(ctx.ARRAY_BUFFER, vertexBuffer);
        ctx.enableVertexAttribArray(vertexLocation);
        ctx.vertexAttribPointer(vertexLocation, 2, ctx.FLOAT, false, 0, 0);
        ctx.bufferData(ctx.ARRAY_BUFFER, this.vertexPositions, ctx.STATIC_DRAW);

        // uniforms setup

        /** @type {[key: string]: number} */
        this.uniformLocations = {};
        for (const uniform of uniforms)
        {
            this.uniformLocations[uniform] = ctx.getUniformLocation(program, uniform);
        }
    }

    /**
     * @param {number} width
     * @param {number} height
     */
    resize(width, height)
    {
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx.viewport(0, 0, width, height);
        this.ctx.uniform4f(this.uniformLocations["uScreenSize"], width, height, 1 / width, 1 / height);
        this.ctx.uniform2f(this.uniformLocations["uAspect"], width / height, height / width);
    }

    render()
    {
        this.ctx.uniform1f(this.uniformLocations["uTime"], performance.now() * 0.001);
        this.ctx.drawArrays(this.ctx.TRIANGLE_STRIP, 0, this.vertexPositions.length / 2);
    }
}


let setBlackHoleData;
let setBlackHoleCount;

{
    let backgroundDistance = 4;
    let backgroundDistanceMultiplier = 2;

    let shader = `
    // https://www.shadertoy.com/view/XlfGRj

    uniform vec2 offset;
    uniform float globalZoom;

    #define iterations 15
    #define formuparam 0.56

    #define volsteps 15
    #define stepsize 0.25

    #define zoom   5.000
    #define tile   0.850
    #define speed  0.010

    #define brightness 0.0008
    #define darkmatter 0.000
    #define distfading 0.5
    #define saturation 1.0


    #define maxNumBlackHoles 6
    uniform int numBlackHoles;
    uniform vec4 blackHoleData[maxNumBlackHoles]; // xy - position, z - radius, w - effect radius


    // basic noise
    float noise(in float x)
    {
        // setup
        float i = floor(x);
        float f = fract(x);
        float s = sign(fract(x*0.5)-0.5);

        // use some hash to create a random value k in [0..1] from i
        //float k = rand(i);
        //float k = 0.5+0.5*sin(i);
        float k = fract(i*.1731);

        // quartic polynomial
        return s*f*(f-1.0)*((16.0*k-4.0)*f*(f-1.0)-1.0);
    }


    void mainImage(out vec4 fragColor, in vec2 fragCoord)
    {
        float backgroundDistance = ${NumberToWebGL(backgroundDistance)};
        float backgroundDistanceMultiplier = ${NumberToWebGL(backgroundDistanceMultiplier)};

        //get coords and direction
        vec2 uv = fragCoord - 0.5;
        uv /= backgroundDistance * globalZoom;
        uv.x *= uAspect.x;

        vec2 offsetLocal = offset / backgroundDistance / backgroundDistanceMultiplier;
        vec3 from = vec3(offsetLocal, -11.11);

        // const float blackHoleEffectRadius = 0.0002;
        // const float blackHoleRadius = 0.04;
        const float blackHoleEdgeSharpness = 200.0;
        const float blackHolePower = 2.0;
        const vec3 blackHoleColor = vec3(0.0);

        float light = 1.0;
        vec2 originalUv = uv;
        float blackHoleOutlineGlow = 0.0;
        vec3 blackHoleOutlineGlowColor = vec3(1.0, 0.3, 0.0);
        for (int i = 0; i < numBlackHoles; ++i)
        {
            vec4 data = blackHoleData[i] / backgroundDistance;
            vec2 pos = data.xy / backgroundDistanceMultiplier - offsetLocal;
            pos *= backgroundDistanceMultiplier;
            float radius = data.z;
            float effectRadius = data.w;

            float currentDist = distance(pos, originalUv);
            vec2 warp = normalize(pos - originalUv) * pow(currentDist, -blackHolePower) * effectRadius;
            uv += warp;
            light *= clamp((currentDist - radius) * blackHoleEdgeSharpness, 0.0, 1.0);

            blackHoleOutlineGlow += 2.0 / (abs(currentDist - radius) * 1000.0);
        }

        vec3 rgb;
        {
            vec3 dir = vec3(uv * zoom, 1.0);

            float a1 = 1.0;
            float a2 = 2.5;
            mat2 rot1=mat2(cos(a1),sin(a1),-sin(a1),cos(a1));
            mat2 rot2=mat2(cos(a2),sin(a2),-sin(a2),cos(a2));
            dir.xz*=rot1;
            dir.xy*=rot2;
            from.xz*=rot1;
            from.xy*=rot2;

            // volumetric rendering
            float s = 0.5;
            float fade = 0.9;
            vec3 v = vec3(-1.0);
            for (int r = 0; r < volsteps; ++r)
            {
                vec3 p = from + s * dir * 0.5;
                p = abs(vec3(tile) - mod(p, vec3(tile * 2.0))); // tiling fold
                float a = 0.0;

                vec3 sp = p;

                for (int i = 0; i < iterations; ++i)
                {
                    p = abs(p) / dot(p, p) - formuparam; // the magic formula
                    float D = length(p); // absolute sum of average change
                    float fade2 = 5.0 / (float(i) * 2.0 + 20.0);
                    a += mix(min(15.0, D), D, fade2);
                }
                // float dm = max(0.0, darkmatter - a * a * 0.001); //dark matter
                // fade *= (1.0 - clamp(float(r - 8), 0.0, 1.0)) * (1.0 - dm); // dark matter, don't render near

                fade *= clamp(5.0 / float(r + 1), 0.0, 1.0);

                a = pow(a, 3.2 + noise(uTime * 0.01) * 0.1); // add contrast

                v += fade;
                v -= 0.2;

                v += vec3(s * s * s * s, s * s, s) * a * brightness * fade; // coloring based on distance
                fade *= distfading - noise(uTime * 0.01) * 0.1; // distance fading
                s += stepsize;
            }

            //v = mix(vec3(length(v)), v, saturation - noise(uTime * 0.03) * 0.2); //color adjust
            rgb = pow(v * 0.01 * sqrt(s), vec3(1.5)) * 1.5;
            rgb.r *= 0.4 + noise(uTime * 0.02 + 1.23) * 0.3;
            rgb = clamp(rgb, vec3(0.0), vec3(1.0)) * 0.8;
        }

        rgb += blackHoleOutlineGlowColor * clamp(blackHoleOutlineGlow, 0.0, 1.0) * 0.6;
        rgb = mix(blackHoleColor, rgb, light);

        fragColor = vec4(rgb, 1.0);
        // fragColor.g *= 0.6;
    }`;

    const c = new WebGLCanvas(shader, "offset", "globalZoom", "numBlackHoles", "blackHoleData");
    document.body.appendChild(c.canvas);
    c.canvas.style.position = "absolute";
    c.canvas.style.zIndex = "-3";

    function Resize()
    {
        c.resize(window.innerWidth, window.innerHeight);
    }

    Resize();
    window.addEventListener("resize", Resize);

    window.requestAnimationFrame(Draw);
    function Draw()
    {
        window.requestAnimationFrame(Draw);
        c.ctx.uniform2f(c.uniformLocations["offset"], camera.position.x, camera.position.y);
        c.ctx.uniform1f(c.uniformLocations["globalZoom"], zoom);

        c.render();
    }

    let blackHoleData = [
        9e9, 9e9, 0, 0,
        9e9, 9e9, 0, 0,
        9e9, 9e9, 0, 0,
        9e9, 9e9, 0, 0,
        9e9, 9e9, 0, 0,
        9e9, 9e9, 0, 0,
    ];

    setBlackHoleCount = count =>
    {
        c.ctx.uniform1i(c.uniformLocations["numBlackHoles"], count);
    };

    setBlackHoleData = (idx, posX, posY, radius, effectRadius) =>
    {
        idx *= 4;
        blackHoleData[idx + 0] = posX;
        blackHoleData[idx + 1] = posY;
        blackHoleData[idx + 2] = radius;
        blackHoleData[idx + 3] = effectRadius;

        c.ctx.uniform4fv(c.uniformLocations["blackHoleData"], blackHoleData);
    };
    c.ctx.uniform4fv(c.uniformLocations["blackHoleData"], blackHoleData);
}


let zoom = 1;
class CSS3dCamera
{
    /**
     * @param {CSS3dScene} scene
     */
    constructor(scene)
    {
        this.scene = scene;

        this.position = {
            x: 0,
            y: 0,
            z: 0
        };
    }

    updateTransform()
    {
        this.scene.element.style.transform = `scale(${zoom}) translate3d(${-this.position.x * WindowSize()}px, ${this.position.y * WindowSize()}px, ${-this.position.z * WindowSize()}px)`;
    }
}

class CSS3dScene
{
    constructor()
    {
        this.camera = new CSS3dCamera(this);

        /**
         * @type {Set<CSS3dObject>}
         */
        this.objects = new Set();

        this.element = document.createElement("div");
        document.body.appendChild(this.element);
        this.element.id = "scene";
    }

    /**
     * @param {CSS3dObject} obj
     */
    add(obj)
    {
        this.objects.add(obj);
        this.element.appendChild(obj.element);
    }

    /**
     * @param {CSS3dObject} obj
     */
    remove(obj)
    {
        this.objects.delete(obj);
        this.element.removeChild(obj.element);
    }

    render()
    {
        this.element.style.left = (window.innerWidth * 0.5) + "px";
        this.element.style.top = (window.innerHeight * 0.5) + "px";

        this.camera.updateTransform();
        this.objects.forEach(obj => obj.updateTransform());
    }
}

class CSS3dObject
{
    constructor(updateTransform = true)
    {
        this.element = document.createElement("div");
        // this.element.style.transformOrigin = "50% 50%";

        /**
         * @type {(() => void)[]}
         */
        this.styleUpdaterFunctions = [];

        this.position = {
            x: 0,
            y: 0,
            z: 0
        };

        this.rotation = {
            x: 0,
            y: 0,
            z: 0
        };

        this.scale = 1;

        if (updateTransform)
        {
            this.updateTransform();
        }
    }

    updateTransform()
    {
        this.element.style.transform = `translate3d(${this.position.x * WindowSize()}px, ${-this.position.y * WindowSize()}px, ${this.position.z * WindowSize()}px) rotateX(${this.rotation.x}deg) rotateY(${this.rotation.y}deg) rotateZ(${-this.rotation.z}deg) scale(${this.scale})`;
        this.styleUpdaterFunctions.forEach(fn => fn());
    }
}

class CSS3dSpaceShip extends CSS3dObject
{
    /**
     * @param {number} size
     */
    constructor(size)
    {
        super();

        this.radius = size / 2;
        this.circleElement = document.createElement("div");
        this.circleElement.style.borderRadius = "50%";
        this.circleElement.style.background = "radial-gradient(#0ff, #000)";
        this.circleElement.style.transform = "translate(-50%, -50%)";

        let svg = document.getElementById("ship");

        this.styleUpdaterFunctions.push(() =>
        {
            this.circleElement.style.width = (size * WindowSize()) + "px";
            this.circleElement.style.height = (size * WindowSize()) + "px";

            svg.style.width = `${size * 1.5 * WindowSize()}px`;
            svg.style.height = `${size * 1.5 * WindowSize()}px`;
            // svg.setAttributeNS(null, "width",  `${size * 1.5 * WindowSize()}px`);
            // svg.setAttributeNS(null, "height", `${size * 1.5 * WindowSize()}px`);
        });

        // this.element.appendChild(this.circleElement);
        this.element.appendChild(svg);
        this.element.style.zIndex = "1";
        this.updateTransform();
    }
}

class CSS3dArrow extends CSS3dObject
{
    constructor()
    {
        super();
        this.element.className = "arrow";

        let size = 0.1;

        let arrow = document.createElement("div");
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttributeNS(null, "viewBox", "0 0 8 8");
        svg.setAttributeNS(null, "stroke-width", "0.5");
        svg.setAttributeNS(null, "stroke", "#030");
        svg.setAttributeNS(null, "fill", "#0f0");
        svg.setAttributeNS(null, "stroke-linecap", "round");
        svg.setAttributeNS(null, "stroke-linejoin", "round");

        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttributeNS(null, "d", "M2 2L6 4L2 6L3 4Z");

        svg.appendChild(path);
        arrow.appendChild(svg);
        svg.style.transform = "translate(-50%, -50%)";

        this.styleUpdaterFunctions.push(() =>
        {
            svg.setAttributeNS(null, "width",  `${size * WindowSize()}px`);
            svg.setAttributeNS(null, "height", `${size * WindowSize()}px`);
        });

        this.element.appendChild(arrow);
        this.element.style.zIndex = "2";
        this.element.style.opacity = 0;
        this.updateTransform();
    }
}


class Particle extends CSS3dObject
{
    /**
     * @param {HTMLElement} element
     * @param {(p: Particle) => ((delta: number) => void)} setUpDate
     * @param {userData} any
     */
    constructor(element, setUpDate, userData)
    {
        super();

        this.element.appendChild(element);
        element.style.transform = "translate(-50%, -50%)";

        this.alive = true;
        this.age = 0;
        this.sizeX = 1;
        this.sizeY = 1;
        this.userData = userData;
        this.update = setUpDate(this);

        this.styleUpdaterFunctions.push(() =>
        {
            element.style.width = (WindowSize() * this.sizeX) + "px";
            element.style.height = (WindowSize() * this.sizeY) + "px";
        });

        this.update(0);
    }
}

class ParticleSystem
{
    /**
     * @param {CSS3dScene} scene
     * @param {HTMLElement} particleTemplate
     * @param {(p: Particle) => ((delta: number) => void)} setUpDate
     */
    constructor(scene, particleTemplate, setUpDate)
    {
        this.scene = scene;
        this.particleTemplate = particleTemplate;
        this.particlesPerSecond = 0;
        this.particlesToCreate = 0;

        /**
         * @type {Set<Particle>}
         */
        this.particles = new Set();

        this.setUpDate = setUpDate;
    }

    createParticles(count = 1, userData = null)
    {
        for (let i = 0; i < count; ++i)
        {
            let particle = new Particle(this.particleTemplate.cloneNode(true), this.setUpDate, userData);
            this.scene.add(particle);
            this.particles.add(particle);
        }
    }

    /**
     * @param {number} fixedDelta
     */
    update(fixedDelta)
    {
        for (let particle of this.particles)
        {
            particle.age += fixedDelta;
            particle.update(fixedDelta);
            if (!particle.alive)
            {
                this.particles.delete(particle);
                this.scene.remove(particle);
            }
        }

        this.particlesToCreate += fixedDelta * this.particlesPerSecond;
        while (this.particlesToCreate >= 1)
        {
            --this.particlesToCreate;
            this.createParticles();
        }
    }
}


let planetShader = `

uniform vec3 colorData[4];
uniform int numColors;

uniform float planetRadius;
uniform float seed;
uniform float noiseScale;

${webglNoiseFunction}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    const vec2 planetPosition = vec2(0.0, 0.0);

    float glowRadius = -0.001;
    vec2 uv = (fragCoord - 0.5) * (planetRadius - glowRadius * 4.0) * 2.0;

    float currentPlanetDistance = distance(planetPosition, uv);
    vec3 originalPlanetColor = hsv2rgb(colorData[0]);

    vec2 planetDir = (uv - planetPosition) / planetRadius;
    float len = clamp(length(planetDir), 0.0, 1.0);
    float z = sqrt(1.0 - len * len);
    vec3 normal = vec3(planetDir, z);

    vec3 planetNoise = vec3(0.0);

    float mul = 1.0;
    float scale = planetRadius * 50.0 * noiseScale;
    float mulmul = 2.5;

    for (int i = 0; i < numColors; ++i)
    {
        planetNoise += smoothstep(-1.2, 1.6, simplex_noise(vec3(seed) + normal * mul * scale)) / mul * hsv2rgb(colorData[i]);
        mul *= mulmul;
    }

    vec3 planetColor = planetNoise;
    float side = smoothstep(0.0, 1.0, (currentPlanetDistance - planetRadius) * 1000.0);
    planetColor *= mix(0.2, 1.0, pow(dot(normal, vec3(0.0, 0.0, 1.0)), 2.0));

    float glowIntensity = smoothstep(1.0, 0.0, (currentPlanetDistance - planetRadius - glowRadius) * 200.0);
    vec3 rgb = glowIntensity * originalPlanetColor * 0.4;
    rgb = mix(planetColor, rgb, smoothstep(0.0, 1.0, (currentPlanetDistance - planetRadius) * 1000.0));
    fragColor = vec4(rgb, glowIntensity);
}`;

const planetRenderer = new WebGLCanvas(planetShader, "numColors", "colorData", "planetRadius", "seed", "noiseScale");

/**
 * @type {(() => void)[]}
 */
const renderQueue = [];
function RenderPlanets()
{
    window.requestAnimationFrame(RenderPlanets);
    renderQueue.shift()?.call();
}

RenderPlanets();

class CSS3dPlanet extends CSS3dObject
{
    /**
     * @param {number} radius
     * @param {number} mass
     * @param {number} seed
     * @param {[number, number, number][]} colors
     * @param {number} noiseScale
     * @param {boolean} isCheckpoint
     * @param {number} level
     */
    constructor(radius, mass, seed, colors, noiseScale, isCheckpoint, level)
    {
        super(false);
        this.element.style.zIndex = "-1";
        this.element.classList.add("planet");
        this.radius = radius;
        this.isCheckpoint = isCheckpoint;
        this.checkpointReached = false;
        this.level = level;
        this.mass = mass;

        this.shouldRender = true;
        const img = new Image();
        this.renderIfNeeded = () =>
        {
            if (this.shouldRender)
            {
                this.shouldRender = false;

                renderQueue.push(() =>
                {
                    const size = WindowSize() * radius * 2;
                    planetRenderer.resize(size, size);

                    planetRenderer.ctx.uniform1i(planetRenderer.uniformLocations["numColors"], colors.length);
                    planetRenderer.ctx.uniform3fv(planetRenderer.uniformLocations["colorData"], colors.flat());

                    planetRenderer.ctx.uniform1f(planetRenderer.uniformLocations["planetRadius"], radius / 2);
                    planetRenderer.ctx.uniform1f(planetRenderer.uniformLocations["seed"], seed);
                    planetRenderer.ctx.uniform1f(planetRenderer.uniformLocations["noiseScale"], noiseScale);

                    planetRenderer.render();
                    img.src = planetRenderer.canvas.toDataURL();
                });
            }
        };

        if (isCheckpoint)
        {
            let pulse = document.createElement("div");
            pulse.classList.add("pulse");
            this.element.appendChild(pulse);
            pulse.style.borderRadius = "50%";
            pulse.style.background = "cyan";
            this.styleUpdaterFunctions.push(() =>
            {
                pulse.style.width =  (2 * radius * WindowSize()) + "px";
                pulse.style.height = (2 * radius * WindowSize()) + "px";
            });
        }

        this.element.appendChild(img);
        img.style.transform = "translate(-50%, -50%)";

        window.addEventListener("resize", () => this.shouldRender = true);
    }

    updateTransform()
    {
        super.updateTransform();
        this.renderIfNeeded();
    }
}

/**
 * @type { {[key: string]: boolean} }
 */
let keymap = {};
let spaceDown = false;
let spaceJustPressed = false;
let enterJustPressed = false;

window.addEventListener("keydown", ev =>
{
    keymap[ev.key] = true;
    spaceDown ||= ev.key === " ";
    spaceJustPressed = spaceDown && !ev.repeat;
    enterJustPressed ||= ev.key === "Enter" && !ev.repeat;
});

window.addEventListener("keyup", ev =>
{
    keymap[ev.key] = false;
    spaceDown &&= ev.key !== " ";
});

let scene = new CSS3dScene();
let camera = scene.camera;

let particleTemplate = document.createElement("div");
particleTemplate.style.borderRadius = "50%";
particleTemplate.style.background = "radial-gradient(#ff6, #f52 30%, #0006 50%, #0000 80%)";

let particleSystem = new ParticleSystem(scene, particleTemplate, particle =>
{
    particle.element.style.filter = `brightness(${Math.random() + 0.5})`; //`hue-rotate(${Math.random()-0.5}rad)`;

    let maxAge = Math.random() * 0.5 + 0.5;
    let age = () => particle.age / maxAge; // percentage [0, 1]

    let angle = particle.userData.angle ?? Math.random() * Math.PI * 2;
    particle.sizeX = particle.userData.sizeX ?? 0.03;
    particle.sizeY = particle.userData.sizeY ?? 0.03;
    let speed = particle.userData.speed ?? Math.random() * 0.1 + 0.2;

    particle.position.x = particle.userData.x;
    particle.position.y = particle.userData.y;

    return (delta) =>
    {
        let currentSpeed = speed * (1 - falloff.easeOutPoly(age(), 2));
        let velocityX = Math.cos(angle) * currentSpeed;
        let velocityY = Math.sin(angle) * currentSpeed;

        particle.position.x += delta * velocityX;
        particle.position.y += delta * velocityY;

        particle.element.style.opacity = falloff.easeOut(1 - age()) / 2;
        particle.alive = age() < 1.0;
    };
});

function CreateExplosion(x, y)
{
    particleSystem.createParticles(50, { x, y });
}

const checkpointColor = [[0.55, 1, 2.5]];

const maxBlackHolesPerLevel = 2;
setBlackHoleCount(maxBlackHolesPerLevel * 3);

/**
 * @type {CSS3dPlanet[]}
 */
let planets = [];

/**
 * @type {[number, number, number, number, number][]} // posX, posY, radius, level, blackHoleIndex
 */
let blackHoles = [];

/**
 * @type {CSS3dPlanet}
 */
let nextCheckpoint;

const localStorageSaveKey = "kimbatt-js13k-2021";
let currentLevelIdx = (+localStorage.getItem(localStorageSaveKey) ?? 0) % (levelData.length - 1);

for (let i = 1; i < levelData.length; ++i)
{
    levelData[i].checkpoint[0] += levelData[i - 1].checkpoint[0];
    levelData[i].checkpoint[1] += levelData[i - 1].checkpoint[1];

    for (let planet of levelData[i].planets)
    {
        planet[0] += levelData[i].checkpoint[0];
        planet[1] += levelData[i].checkpoint[1];
    }

    for (let blackHole of levelData[i].blackholes)
    {
        blackHole[0] += levelData[i].checkpoint[0];
        blackHole[1] += levelData[i].checkpoint[1];
    }
}

/**
 * @param {number} idx
 */
function LoadLevel(idx)
{
    UnloadLevel(idx - 3);

    if (idx >= levelData.length || idx < 0)
    {
        return;
    }

    let planetColorRng = mulberry32(idx);
    let RandomPlanetColorHsv = () => [planetColorRng() * 0.2, planetColorRng(), planetColorRng() * 0.5 + 0.5];

    /**
     * @param {[number, number, number]} data
     * @param {boolean} isCheckpoint
     */
    function CreatePlanetLocal(data, isCheckpoint)
    {
        let planet = new CSS3dPlanet(data[2], data[3] ?? 80,
            isCheckpoint ? 0 : planetColorRng() * 100,
            isCheckpoint ? checkpointColor : [RandomPlanetColorHsv(), RandomPlanetColorHsv(), RandomPlanetColorHsv(), RandomPlanetColorHsv()],
            isCheckpoint ? 0.001 : planetColorRng() * 0.6 + 0.6,
            isCheckpoint,
            idx
        );
        (planet.checkpointReached = isCheckpoint && idx <= currentLevelIdx) && (planet.element.style.filter = "hue-rotate(-88deg)");

        planet.position.x = data[0];
        planet.position.y = data[1];
        scene.add(planet);

        return planet;
    }

    let blackHoleCount = 0;
    /**
     * @param {[number, number, number]} data
     */
    function CreateBlackHoleLocal(data)
    {
        let i = (idx % 3) * maxBlackHolesPerLevel + blackHoleCount++;
        let x = data[0];
        let y = data[1];
        setBlackHoleData(i, x, y, data[2], data[3]);
        return [x, y, data[2], idx, i];
    }

    planets = [
        ...planets,
        nextCheckpoint = CreatePlanetLocal(levelData[idx].checkpoint, true),
        ...levelData[idx].planets.map(data => CreatePlanetLocal(data, false))
    ];

    blackHoles = [
        ...levelData[idx].blackholes.map(CreateBlackHoleLocal),
        ...blackHoles
    ];
}

LoadLevel(currentLevelIdx);
LoadLevel(currentLevelIdx - 1);
LoadLevel(currentLevelIdx + 1);

/**
 * @param {number} idx
 */
function UnloadLevel(idx)
{
    if (idx < 0)
    {
        return;
    }

    planets = planets.filter(planet =>
    {
        let remove = planet.level === idx;
        remove && scene.remove(planet);
        return !remove;
    });

    blackHoles = blackHoles.filter(blackHole =>
    {
        let remove = blackHole[3] === idx;
        remove && setBlackHoleData(blackHole[4], 9e9, 9e9, 0, 0);
        return !remove;
    });
}

let arrow = new CSS3dArrow();
scene.add(arrow);
arrow.position.x = 0;
arrow.position.y = 0;

/**
 * @type {CSS3dPlanet}
 */
let currentCheckpoint = planets[0];
let checkpointApproachTime = 0.5;
let checkpointApproachT = 0;
let checkpointApproachStartX = 0;
let checkpointApproachStartY = 0;
let checkpointApproachStartAngle = 0;

let circle = new CSS3dSpaceShip(0.05);
scene.add(circle);

const ALIVE = 0;
const DEAD = 1;
const SPAWNING = 2;

let state = SPAWNING;
let velocityX = 0;
let velocityY = 0;
let facingAngle = Math.atan2(velocityY, velocityX);

let cpx = camera.position.x;
let cpy = camera.position.y;

let totalBoost = levelData[currentLevelIdx].boost;
let remainingBoost = totalBoost;
let boostActive = false;
let overlay = document.getElementById("overlay");
let boostBar = document.getElementById("boost-bar").style;
let boostContainer = document.getElementById("boost-container").style;
boostContainer.width = totalBoost * 10 + "vh";

/**
 * @param {number} change
 */
function UpdateRemainingBoost(change)
{
    remainingBoost = Math.max(remainingBoost - change, 0);
    boostBar.width = (remainingBoost / totalBoost * 100) + "%";
}

function Reset()
{
    circle.element.style.opacity = 1;

    circle.position.x = currentCheckpoint.position.x;
    circle.position.y = currentCheckpoint.position.y - currentCheckpoint.radius - 0.05;

    circle.scale = 1;

    camera.position.x = cpx = circle.position.x;
    camera.position.y = cpy = circle.position.y;

    velocityX = 0;
    velocityY = 0;
    facingAngle = Math.atan2(velocityY, velocityX);
    circle.rotation.z = facingAngle * 180 / Math.PI;
    zoom = 1;

    overlay.classList.remove("visible");

    checkpointApproachT = 1;
    state = SPAWNING;

    remainingBoost = totalBoost;
    UpdateRemainingBoost(0);
}

let started = false;
function StartGame()
{
    if (started)
    {
        return;
    }

    started = true;
    InitAudio();
    Reset();
    paused = false;
}


/**
 * @type {[() => void, number, boolean][]}
 */
let timers = []; // [0] - callback, [1] - duration, [2] - call every tick

/**
 * @param {() => void} callback
 * @param {number} time
 */
function SetFixedTimeout(callback, time)
{
    timers.push([callback, time, false]);
}

/**
 * @param {() => void} callback
 * @param {number} time
 */
function SetFixedTick(callback, time)
{
    timers.push([callback, time, true]);
}

let lastTime = 0;
let accumulatedTime = 0;
const fixedDelta = 1 / 60;
/**
 * @param {number} time
 */
function Frame(time)
{
    time /= 1000;
    let delta = time - lastTime;
    lastTime = time;
    delta = Math.min(delta, 0.1); // maximum 0.1 second of frame time

    accumulatedTime += delta;
    window.requestAnimationFrame(Frame);

    let boostWasActive = boostActive;

    while (accumulatedTime > -fixedDelta / 2)
    {
        accumulatedTime -= fixedDelta;
        PhysicsStep();

        for (let i = 0; i < timers.length; ++i)
        {
            let currentTimer = timers[i];
            currentTimer[2] && currentTimer[0]();
            if ((currentTimer[1] -= fixedDelta) <= 0)
            {
                timers.splice(i, 1);
                --i;
                currentTimer[0]();
            }
        }

        spaceJustPressed = false;
        enterJustPressed = false;
    }

    if (state === DEAD)
    {
        boostActive = false;
    }

    if (boostWasActive !== boostActive)
    {
        boostVolumeNode.gain.linearRampToValueAtTime(boostActive ? 0 : 1, actx.currentTime);
        boostVolumeNode.gain.linearRampToValueAtTime(boostActive ? 1 : 0, actx.currentTime + 0.1);
    }

    {
        const arrowRadius = 0.45 / zoom;
        const aspect = innerWidth / innerHeight;

        const wx = arrowRadius * aspect;
        const wy = arrowRadius;
        const distX = nextCheckpoint.position.x - camera.position.x;
        const distY = nextCheckpoint.position.y - camera.position.y;
        const offsetX = Clamp(distX, -wx, wx);
        const offsetY = Clamp(distY, -wy, wy);

        arrow.position.x = camera.position.x + offsetX;
        arrow.position.y = camera.position.y + offsetY;

        arrow.rotation.z = Math.atan2(distY, distX) * 180 / Math.PI;

        let visible = Math.abs(distX) > wx * 1.5 || Math.abs(distY) > wy * 1.5;
        arrow.element.style.opacity = +visible;
    }

    scene.render();
}

/**
 *
 * @param {number} angle in radians
 */
function NormalizeAngle(angle)
{
    if (angle > Math.PI)
    {
        angle -= Math.PI * 2;
    }
    else if (angle < -Math.PI)
    {
        angle += Math.PI * 2;
    }

    return angle;
}


function Explode()
{
    CreateExplosion(circle.position.x, circle.position.y);
    PlayExplosionSound();
    state = DEAD;
    overlay.classList.add("visible");
    circle.element.style.opacity = 0;

    globalFilterNode.gain.linearRampToValueAtTime(0, actx.currentTime);
    globalFilterNode.gain.linearRampToValueAtTime(-20, actx.currentTime + 0.5);

    SetFixedTimeout(() =>
    {
        Reset();

        globalFilterNode.gain.linearRampToValueAtTime(-20, actx.currentTime);
        globalFilterNode.gain.linearRampToValueAtTime(0, actx.currentTime + 0.5);
    }, 1.0);
}

let paused = true;

function PhysicsStep()
{
    particleSystem.update(fixedDelta);

    if (paused)
    {
        return;
    }

    if (state === DEAD)
    {
        return;
    }

    const speed = 0.02;
    const mult = fixedDelta * speed;

    // camera
    {
        const maxDistance = 5;

        let tx = Clamp(Math.abs(cpx - circle.position.x), 0, maxDistance) / maxDistance;
        let ty = Clamp(Math.abs(cpy - circle.position.y), 0, maxDistance) / maxDistance;
        cpx = Lerp(cpx, circle.position.x, falloff.easeInPoly(tx, 1.5));
        cpy = Lerp(cpy, circle.position.y, falloff.easeInPoly(ty, 1.5));

        camera.position.x = cpx;
        camera.position.y = cpy;

        let j = 1 + Smoothstep(10, 25, Math.hypot(velocityX, velocityY)) * 0.5;
        zoom = Lerp(zoom, 1 / j, fixedDelta * 0.5);
    }

    if (state === ALIVE)
    {
        if (enterJustPressed)
        {
            Explode();
            return;
        }

        for (const planet of planets)
        {
            let dirX = planet.position.x - circle.position.x;
            let dirY = planet.position.y - circle.position.y;

            // let radius = planet.radius * 4;
            let distanceSq = dirX * dirX + dirY * dirY;

            // real gravity, based on volume, but just using the same mass for all planets seems to be better
            // const volume = 4 / 3 * Math.PI * radius * radius * radius;
            // const mass = 500 * volume;

            // fixed mass
            // const mass = 80;

            // just use the radius
            // const mass = planet.radius * 200;
            const mass = planet.mass;

            let magnitude = mass / distanceSq;

            let withinRange = Math.sqrt(distanceSq) < planet.radius + circle.radius + (planet.isCheckpoint && !planet.checkpointReached ? 0.05 : 0);

            if (withinRange)
            {
                if (planet.isCheckpoint && !planet.checkpointReached)
                {
                    state = SPAWNING;
                    velocityX = velocityY = 0;
                    LoadLevel(++currentLevelIdx + 1);
                    localStorage.setItem(localStorageSaveKey, currentLevelIdx);
                    PlayCheckpointSound();
                    boostActive = false;
                    totalBoost = levelData[currentLevelIdx].boost;
                    remainingBoost = totalBoost;
                    boostContainer.width = totalBoost * 10 + "vh";
                    UpdateRemainingBoost(0);
                    currentCheckpoint = planet;
                    planet.checkpointReached = true;
                    planet.element.style.filter = "hue-rotate(-88deg)";
                    checkpointApproachT = 0;
                    checkpointApproachStartX = circle.position.x;
                    checkpointApproachStartY = circle.position.y;
                    checkpointApproachStartAngle = facingAngle;

                    if (currentLevelIdx === levelData.length - 1)
                    {
                        paused = true;
                        SetFixedTimeout(() =>
                        {
                            document.getElementById("start-text").style.display = "none";
                            document.getElementById("game-completed").style.display = "";
                            overlay.classList.add("visible");
                        }, 0.5);

                        globalVolumeNode.gain.linearRampToValueAtTime(globalVolume, actx.currentTime);
                        globalVolumeNode.gain.linearRampToValueAtTime(0, actx.currentTime + 4);
                    }

                    return;
                }

                Explode();
                return;
            }

            velocityX += dirX * magnitude * mult;
            velocityY += dirY * magnitude * mult;
        }

        for (const blackHole of blackHoles)
        {
            let dirX = blackHole[0] - circle.position.x;
            let dirY = blackHole[1] - circle.position.y;

            let distanceSq = dirX * dirX + dirY * dirY;

            let mass = blackHole[2] * 2000;

            let magnitude = mass / distanceSq;

            if (Math.sqrt(distanceSq) < blackHole[2] + circle.radius)
            {
                state = DEAD;
                overlay.classList.add("visible");

                let scaleTime = 0.3;
                let t = 0;
                let startX = circle.position.x;
                let startY = circle.position.y;

                SetFixedTick(() =>
                {
                    t += fixedDelta / scaleTime;
                    circle.element.style.opacity = circle.scale = Math.max(0, 1 - t);
                    circle.position.x = Lerp(startX, blackHole[0], t);
                    circle.position.y = Lerp(startY, blackHole[1], t);
                }, scaleTime);

                globalFilterNode.gain.linearRampToValueAtTime(0, actx.currentTime);
                globalFilterNode.gain.linearRampToValueAtTime(-20, actx.currentTime + 0.5);

                SetFixedTimeout(() =>
                {
                    Reset();

                    globalFilterNode.gain.linearRampToValueAtTime(-20, actx.currentTime);
                    globalFilterNode.gain.linearRampToValueAtTime(0, actx.currentTime + 0.5);
                }, 1.0);

                return;
            }

            velocityX += dirX * magnitude * mult;
            velocityY += dirY * magnitude * mult;
        }

        boostActive = spaceDown && remainingBoost > 0;
        if (boostActive)
        {
            let x = Math.cos(facingAngle);
            let y = Math.sin(facingAngle);

            const boostMaxAcceleration = 500;
            const normalAcceleration = 15;
            const minSpeed = 10;

            let speed = Math.hypot(velocityX, velocityY);
            let acceleration = Lerp(boostMaxAcceleration, normalAcceleration, Clamp(speed / minSpeed, 0, 1));

            velocityX += x * fixedDelta * acceleration;
            velocityY += y * fixedDelta * acceleration;

            const particleSize = Math.random() * 0.01 + 0.025;
            particleSystem.createParticles(1, {
                angle: facingAngle + (Math.random() - 0.5) * 1.0,
                x: circle.position.x - x * 0.02,
                y: circle.position.y - y * 0.02,
                speed: 5 * fixedDelta,
                sizeX: particleSize,
                sizeY: particleSize
            });

            UpdateRemainingBoost(fixedDelta);
        }

        velocityX *= 1 - mult * 5;
        velocityY *= 1 - mult * 5;

        const maxSpeed = 25;
        let currentSpeed = Math.hypot(velocityX, velocityY);
        let targetSpeed = Math.min(maxSpeed, currentSpeed);
        velocityX *= targetSpeed / currentSpeed;
        velocityY *= targetSpeed / currentSpeed;

        circle.position.x += velocityX * mult;
        circle.position.y += velocityY * mult;

        let currentAngle = Math.atan2(velocityY, velocityX);
        let angleDiff = NormalizeAngle(currentAngle - facingAngle);

        const maxAngleDiff = 80 * mult;
        angleDiff = Clamp(angleDiff, -maxAngleDiff, maxAngleDiff);
        facingAngle = NormalizeAngle(facingAngle + angleDiff);
    }
    else if (state === SPAWNING)
    {
        let angle = Math.atan2(circle.position.y - currentCheckpoint.position.y, circle.position.x - currentCheckpoint.position.x) + fixedDelta * 0.15 / currentCheckpoint.radius;
        let x = Math.cos(angle);
        let y = Math.sin(angle);

        checkpointApproachT = Math.min(checkpointApproachT + fixedDelta / checkpointApproachTime, 1);

        let targetAngle = angle + Math.PI / 2;

        let targetPositionX = currentCheckpoint.position.x + (currentCheckpoint.radius + 0.05) * x;
        let targetPositionY = currentCheckpoint.position.y + (currentCheckpoint.radius + 0.05) * y;

        let cpt = falloff.easeOutPoly(checkpointApproachT, 2);

        facingAngle = LerpAngle(checkpointApproachStartAngle, targetAngle, cpt);
        circle.position.x = Lerp(checkpointApproachStartX, targetPositionX, cpt);
        circle.position.y = Lerp(checkpointApproachStartY, targetPositionY, cpt);

        if (spaceJustPressed)
        {
            state = ALIVE;
            velocityX = Math.cos(targetAngle) * 15;
            velocityY = Math.sin(targetAngle) * 15;
        }
    }

    circle.rotation.z = facingAngle * 180 / Math.PI;
}

window.requestAnimationFrame(Frame);

window.addEventListener("resize", () => scene.render());
