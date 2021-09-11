
function WindowSize()
{
    return innerHeight;
}

let levelData = [
    [
        1,
        [0, 0, 0.1],
        [
            [1, 0, 0.4]
        ],
        []
    ],
    [
        2,
        [2, 0, 0.1],
        [
            [1, 0, 0.3],
            [3, 0, 0.4],
        ],
        []
    ],
    [
        3,
        [4, 0, 0.1],
        [
            [0.75, 0, 0.15],
            [0.75, 0.5, 0.1]
        ],
        []
    ],
    [
        4,
        [1.5, 0.5, 0.15],
        [],
        [
            [1.5, 0, 0.2, 0.0007]
        ]
    ],
    [
        4,
        [2.5, 0, 0.1],
        [
            [1.5, 0, 0.4],
            [1.5, 0.6, 0.15],
            [1.5, -0.6, 0.15],
        ],
        []
    ],
    [
        3,
        [3, 0, 0.1],
        [
            [1, 0.1, 0.15],
            [2, 0.0, 0.1],
            [3, 0.0, 0.15],
            [4, -0.1, 0.15],
            [5, 0.0, 0.1],
        ],
        []
    ],
    [
        5,
        [6, 0, 0.1],
        [
            [1, 0.0, 0.15],
            [2, 0.1, 0.1],
            [3.5, 0.0, 0.5, 100],
            [5, -0.1, 0.15],
            [6, 0.0, 0.1],
        ],
        []
    ],
    [
        2,
        [7, 0, 0.1],
        [
            [0.8, 0, 0.2],
            [0, 1, 0.3],
            [1, 1, 0.3],
        ],
        []
    ],
    [
        2,
        [1, 1.5, 0.1],
        [
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
        []
    ],
    [
        1.5,
        [1, 0.9, 0.1],
        [
            [1, 0, 0.2],
            [1.5, 0.2, 0.15],
            [2, 0.22, 0.18],
            [2.5, 0.25, 0.1, 40],

            [0.5, 0.5, 0.1, 40],
            [1, 0.7, 0.18],
            [1.5, 0.9, 0.2],
            [2, 0.98, 0.22],
        ],
        []
    ],
    [
        4.5,
        [3, 0.6, 0.1],
        [
            [2.5, 1.5, 0.2]
        ],
        [
            [1.5, 0, 0.2, 0.0007]
        ]
    ],
    [
        4,
        [3, 1.5, 0.1],
        [],
        []
    ],
    [
        3,
        [1, -3, 0.1],
        [
            [1, 0, 0.2],
            [2, -0.15, 0.2],
            [3, 0.15, 0.2]
        ],
        []
    ],
    [
        5,
        [4, 0, 0.1],
        [
            [1, 0, 0.2],
            [3, 0, 0.15]
        ],
        [
            [2, 0, 0.1, 0.0001]
        ]
    ],
    [
        3,
        [4, 0, 0.1],
        [
            [0.5, 0, 0.15],
            [1, 0.5, 0.15],
            [1, -0.5, 0.15],
            [1.5, 0, 0.15],
            [2, 0.5, 0.15],
            [2, -0.5, 0.15],
            [2.5, 0, 0.15],
        ],
        []
    ],
    [
        3,
        [3, 0, 0.1],
        [],
        []
    ],
    [
        3,
        [2, 0, 0.1],
        [
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
        []
    ],
    [
        3,
        [3.5, 0.5, 0.1],
        [],
        []
    ],
    [
        9,
        [3, 0.5, 0.1],
        [
            [1, -0.5, 0.15],
            [1, -0.25, 0.05, 20],
            [1, 0, 0.15],
            [1, 0.25, 0.05, 20],
            [1, 0.5, 0.15]
        ],
        [
            [1, -0.9, 0.15, 0.0003],
            [1, 0.9, 0.15, 0.0003],
        ]
    ],
    [
        9,
        [2, 0, 0.3],
        [],
        []
    ]
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
    let t = Clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return t * t * (3 - 2 * t);
}

/**
 * @param {number} t
 * @param {number} pow
 */
function EaseInPoly(t, pow)
{
    return t ** pow;
}

/**
 * @param {number} t
 */
function EaseOut(t)
{
    return Math.sin(t * Math.PI / 2);
}

/**
 * @param {number} t
 * @param {number} pow
 * @returns
 */
function EaseOutPoly(t, pow)
{
    return 1 - (1 - t) ** pow;
}

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

    noiseBuffer = actx.createBuffer(1, actx.sampleRate, actx.sampleRate);
    let noiseData = noiseBuffer.getChannelData(0);
    let rng = mulberry32(0);
    noiseData.set(noiseData.map(_ => rng() * 2 - 1));

    soundWave = actx.createPeriodicWave(
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

function CreateNoiseNode()
{
    let node = actx.createBufferSource();
    node.buffer = noiseBuffer;
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
    }

    let kickActive = true;
    let snareActive = false;
    let hatActive = false;
    let hatFn = Hat;

    let rng = mulberry32(0);

    let noteRng;

    let update = () =>
    {
        let elapsed = actx.currentTime;
        let requiredCount = (elapsed + scheduleAheadTime) / duration;

        let eight = duration / 8;
        let sixteenth = duration / 16;
        let thirtytwoeth = duration / 32;

        while (scheduledCount < requiredCount)
        {
            let time = start + scheduledCount * duration;

            if (scheduledCount % 2 === 0)
            {
                noteRng = mulberry32(rng() * 10 | 0);
            }

            ++scheduledCount;

            for (let i = 0; i < 16; ++i)
            {
                kickActive && Kick(time + sixteenth * i);
                hatActive && hatFn(time + sixteenth * (i + 0.5));
            }

            for (let i = 0; i < 8; ++i)
            {
                snareActive && Snare(time + eight * i + sixteenth);
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

            const tones = [
                [0, 2, 4, 7, 9],
                [2, 4, 7, 9, 12],
                [4, 7, 9, 12, 14]
            ];

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
        }
    };

    update();
    setInterval(update, 1111);
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
    vec2 a=(aVertexPosition+vec2(1.))*.5;
    vPixelCoord=vec4(a,a*uScreenSize.xy);
    gl_Position=vec4(aVertexPosition,0.,1.);
}`;

        const fragmentShader = `#version 300 es
precision highp float;
uniform float uTime;
uniform vec4 uScreenSize;
uniform vec2 uAspect;
in vec4 vPixelCoord;
out vec4 f;
${shader}
void main()
{
    vec4 c;
    mainImage(c, vPixelCoord.xy);
    f = c;
}
        `;

        // element setup
        const canvas = this.canvas = document.createElement("canvas");
        const ctx = this.ctx = canvas.getContext("webgl2");

        // shader setup
        const vertShaderObj = ctx.createShader(ctx.VERTEX_SHADER);
        const fragShaderObj = ctx.createShader(ctx.FRAGMENT_SHADER);

        ctx.shaderSource(vertShaderObj, vertexShader);
        ctx.shaderSource(fragShaderObj, fragmentShader);
        ctx.compileShader(vertShaderObj);
        ctx.compileShader(fragShaderObj);

        // program setup
        const program = ctx.createProgram();

        ctx.attachShader(program, vertShaderObj);
        ctx.attachShader(program, fragShaderObj);
        ctx.linkProgram(program);

        ctx.useProgram(program);

        // buffer setup
        const vertexBuffer = ctx.createBuffer();

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

    let shader = `
    uniform vec2 offset;
    uniform float globalZoom;
    uniform int numBlackHoles;
    uniform vec4 blackHoleData[6];
    float noise(in float x)
    {
        float i=floor(x),f=fract(x),s=sign(fract(x*.5)-.5),k=fract(i*.1731);
        return s*f*(f-1.)*((16.*k-4.)*f*(f-1.)-1.);
    }
    void mainImage(out vec4 fragColor, in vec2 fragCoord)
    {
        vec2 uv=(fragCoord-.5)/4./globalZoom;
        uv.x*=uAspect.x;
        vec2 offsetLocal=offset/8.;
        vec3 from=vec3(offsetLocal,-11.11);

        float light=1.,blackHoleOutlineGlow=0.;
        vec2 originalUv = uv;
        vec3 blackHoleOutlineGlowColor=vec3(1,.3,0);
        for (int i=0;i<numBlackHoles;++i)
        {
            vec4 data=blackHoleData[i]/4.;
            vec2 pos=data.xy/2.-offsetLocal;
            pos*=2.;
            float radius=data.z,effectRadius=data.w,currentDist=distance(pos,originalUv);
            vec2 warp=normalize(pos-originalUv)*pow(currentDist,-2.)*effectRadius;
            uv+=warp;
            light*=clamp((currentDist-radius)*200.,0.,1.);
            blackHoleOutlineGlow+=2./(abs(currentDist-radius)*1e3);
        }
        vec3 dir=vec3(uv*5.,1);
        mat2 rot1=mat2(cos(1.),sin(1.),-sin(1.),cos(1.));
        mat2 rot2=mat2(cos(2.5),sin(2.5),-sin(2.5),cos(2.5));
        dir.xz*=rot1;
        dir.xy*=rot2;
        from.xz*=rot1;
        from.xy*=rot2;
        float s=.5,fade=.9;
        vec3 v=vec3(-1);
        for (int r=0;r<15;++r)
        {
            vec3 p=from+s*dir*.5;
            p=abs(vec3(.85)-mod(p,vec3(1.7)));
            float a=0.;
            for (int i=0;i<15;++i)
            {
                p=abs(p)/dot(p,p)-0.56;
                float D=length(p);
                float fade2=5./(float(i)*2.+20.);
                a+=mix(min(15.,D),D,fade2);
            }
            fade*=clamp(5./float(r+1),0.,1.);
            a=pow(a,3.2+noise(uTime*.01)*.1);
            v+=fade-.2+vec3(s*s*s*s,s*s,s)*a*8e-4*fade;
            fade*=.5-noise(uTime*.01)*.1;
            s+=.25;
        }
        vec3 rgb=pow(v*.01*sqrt(s),vec3(1.5))*1.5;
        rgb.r*=.4+noise(uTime*.02+1.23)*.3;
        rgb=clamp(rgb,vec3(0),vec3(1))*.8;
        rgb+=blackHoleOutlineGlowColor*clamp(blackHoleOutlineGlow,0.,1.)*.6;
        rgb=mix(vec3(0),rgb,light);
        fragColor=vec4(rgb,1.);
    }`;

    const c = new WebGLCanvas(shader, "offset", "globalZoom", "numBlackHoles", "blackHoleData");
    document.body.appendChild(c.canvas);
    c.canvas.style.position = "absolute";
    c.canvas.style.zIndex = -3;

    function Resize()
    {
        c.resize(innerWidth, innerHeight);
    }

    Resize();
    addEventListener("resize", Resize);

    requestAnimationFrame(Draw);
    function Draw()
    {
        requestAnimationFrame(Draw);
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
class CSS3dScene
{
    constructor()
    {
        this.camera = {
            position: {
                x: 0,
                y: 0
            }
        };

        /**
         * @type {Set<CSS3dObject>}
         */
        this.objects = new Set();

        this.element = document.body.appendChild(document.createElement("div"));
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
        this.element.style.left = (innerWidth / 2) + "px";
        this.element.style.top = (innerHeight / 2) + "px";

        this.element.style.transform = `scale(${zoom}) translate(${-this.camera.position.x * WindowSize()}px, ${this.camera.position.y * WindowSize()}px)`;
        this.objects.forEach(obj => obj.updateTransform());
    }
}

class CSS3dObject
{
    constructor(updateTransform = true)
    {
        this.element = document.createElement("div");

        /**
         * @type {(() => void)[]}
         */
        this.styleUpdaterFunctions = [];

        this.position = {
            x: 0,
            y: 0
        };

        this.rotation = 0;

        this.scale = 1;

        if (updateTransform)
        {
            this.updateTransform();
        }
    }

    updateTransform()
    {
        this.element.style.transform = `translate(${this.position.x * WindowSize()}px, ${-this.position.y * WindowSize()}px) rotate(${-this.rotation}rad) scale(${this.scale})`;
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

        let svg = this.element.appendChild(document.getElementById("ship"));

        this.styleUpdaterFunctions.push(() =>
        {
            svg.style.width = `${size * 1.5 * WindowSize()}px`;
            svg.style.height = `${size * 1.5 * WindowSize()}px`;
        });

        this.element.style.zIndex = 1;
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

        let arrow = this.element.appendChild(document.createElement("div"));
        let svg = arrow.appendChild(document.getElementById("arrow"));
        svg.style.transform = "translate(-50%, -50%)";

        this.styleUpdaterFunctions.push(() =>
        {
            svg.setAttributeNS(null, "width",  `${size * WindowSize()}px`);
            svg.setAttributeNS(null, "height", `${size * WindowSize()}px`);
        });

        this.element.style.zIndex = 2;
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

        /**
         * @type {Set<Particle>}
         */
        this.particles = new Set();

        this.setUpDate = setUpDate;
    }

    createParticles(count = 1, userData)
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
    }
}

let planetShader = `

uniform vec3 colorData[4];
uniform int numColors;

uniform float planetRadius;
uniform float seed;
uniform float noiseScale;

vec3 hash3(vec3 p)
{
    p = vec3(dot(p,vec3(127.1,311.7,74.7)),dot(p,vec3(269.5,183.3,246.1)),dot(p,vec3(113.5,271.9,124.6)));
    return 2.*fract(sin(p)*43758.5453123)-1.;
}

float simplexNoise(vec3 p)
{
    const float K2=1./6.;
    vec3 i=floor(p+(p.x+p.y+p.z)/3.),
        d0=p-(i-(i.x+i.y+i.z)*K2),
        e=step(vec3(0),d0-d0.yzx),
        i1=e*(1.-e.zxy),
        i2=1.-e.zxy*(1.-e),
        d1=d0-(i1-1.*K2),
        d2=d0-(i2-2.*K2),
        d3=d0-(1.-3.*K2);
    vec4 h=max(.6-vec4(dot(d0,d0),dot(d1,d1),dot(d2,d2),dot(d3,d3)),0.),
        n=h*h*h*h*vec4(dot(d0,hash3(i)),dot(d1,hash3(i+i1)),dot(d2,hash3(i+i2)),dot(d3,hash3(i+1.)));
    return dot(vec4(31.316),n);
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K=vec4(1,2./3.,1./3.,3);
    vec3 p=abs(fract(c.xxx+K.xyz)*6.-K.www);
    return c.z*mix(K.xxx,clamp(p-K.xxx,0.,1.),c.y);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv=(fragCoord-.5)*(planetRadius+.004)*2.;
    float currentPlanetDistance=length(uv);
    vec3 originalPlanetColor=hsv2rgb(colorData[0]);
    vec2 planetDir=uv/planetRadius;
    float len=clamp(length(planetDir),0.,1.),z=sqrt(1.-len*len);
    vec3 normal=vec3(planetDir,z),planetColor=vec3(0);
    float mul=1.,scale=planetRadius*50.*noiseScale,mulmul=2.5;
    for (int i=0;i<numColors;++i)
    {
        planetColor+=smoothstep(-1.2,1.6,simplexNoise(vec3(seed)+normal*mul*scale))/mul*hsv2rgb(colorData[i]);
        mul*=mulmul;
    }
    planetColor*=mix(.2,1.,pow(dot(normal,vec3(0,0,1)),2.));
    float glowIntensity=smoothstep(1.,0.,(currentPlanetDistance-planetRadius+.001)*2e2);
    vec3 rgb=glowIntensity*originalPlanetColor*.4;
    rgb=mix(planetColor,rgb,smoothstep(0.,1.,(currentPlanetDistance-planetRadius)*1e3));
    fragColor=vec4(rgb,glowIntensity);
}`;

const planetRenderer = new WebGLCanvas(planetShader, "numColors", "colorData", "planetRadius", "seed", "noiseScale");

/**
 * @type {(() => void)[]}
 */
const renderQueue = [];
function RenderPlanets()
{
    renderQueue.shift()?.call();
    requestAnimationFrame(RenderPlanets);
}
requestAnimationFrame(RenderPlanets);

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
        this.element.style.zIndex = -1;
        this.element.classList.add("planet");
        this.radius = radius;
        this.isCheckpoint = isCheckpoint;
        this.checkpointReached = false;
        this.level = level;
        this.mass = mass;

        if (isCheckpoint)
        {
            let pulse = this.element.appendChild(document.createElement("div"));
            pulse.classList.add("pulse");
            pulse.style.borderRadius = "50%";
            pulse.style.background = "cyan";
            this.styleUpdaterFunctions.push(() =>
            {
                pulse.style.width =  (2 * radius * WindowSize()) + "px";
                pulse.style.height = (2 * radius * WindowSize()) + "px";
            });
        }

        this.shouldRender = true;
        const img = this.element.appendChild(new Image());
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

        img.style.transform = "translate(-50%, -50%)";

        addEventListener("resize", () => this.shouldRender = true);
    }

    updateTransform()
    {
        super.updateTransform();
        this.renderIfNeeded();
    }
}

let spaceDown = false;
let spaceJustPressed = false;
let enterJustPressed = false;

addEventListener("keydown", ev =>
{
    spaceDown ||= ev.key === " ";
    spaceJustPressed = spaceDown && !ev.repeat;
    enterJustPressed ||= ev.key === "Enter" && !ev.repeat;
});

addEventListener("keyup", ev =>
{
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
        let currentSpeed = speed * (1 - EaseOutPoly(age(), 2));
        let velocityX = Math.cos(angle) * currentSpeed;
        let velocityY = Math.sin(angle) * currentSpeed;

        particle.position.x += delta * velocityX;
        particle.position.y += delta * velocityY;

        particle.element.style.opacity = EaseOut(1 - age()) / 2;
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
    levelData[i][1][0] += levelData[i - 1][1][0];
    levelData[i][1][1] += levelData[i - 1][1][1];

    for (let planet of levelData[i][2])
    {
        planet[0] += levelData[i][1][0];
        planet[1] += levelData[i][1][1];
    }

    for (let blackHole of levelData[i][3])
    {
        blackHole[0] += levelData[i][1][0];
        blackHole[1] += levelData[i][1][1];
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
        nextCheckpoint = CreatePlanetLocal(levelData[idx][1], true),
        ...levelData[idx][2].map(data => CreatePlanetLocal(data, false))
    ];

    blackHoles = [
        ...levelData[idx][3].map(CreateBlackHoleLocal),
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

let totalBoost = levelData[currentLevelIdx][0];
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
    circle.rotation = facingAngle;
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
let timers = [];

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
    requestAnimationFrame(Frame);

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

    boostActive &&= state !== DEAD;

    if (boostWasActive !== boostActive)
    {
        boostVolumeNode.gain.linearRampToValueAtTime(+!boostActive, actx.currentTime);
        boostVolumeNode.gain.linearRampToValueAtTime(+boostActive, actx.currentTime + 0.1);
    }

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

    arrow.rotation = Math.atan2(distY, distX);

    arrow.element.style.opacity = +(Math.abs(distX) > wx * 1.5 || Math.abs(distY) > wy * 1.5);

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
        cpx = Lerp(cpx, circle.position.x, EaseInPoly(tx, 1.5));
        cpy = Lerp(cpy, circle.position.y, EaseInPoly(ty, 1.5));

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

            let distanceSq = dirX * dirX + dirY * dirY;

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
                    totalBoost = levelData[currentLevelIdx][0];
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

        let cpt = EaseOutPoly(checkpointApproachT, 2);

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

    circle.rotation = facingAngle;
}

requestAnimationFrame(Frame);

addEventListener("resize", () => scene.render());
