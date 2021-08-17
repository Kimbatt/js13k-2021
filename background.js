
class Vec3
{
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    constructor(x, y, z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    normalize()
    {
        let len = Math.hypot(this.x, this.y, this.z);
        this.x /= len;
        this.y /= len;
        this.z /= len;

        return this;
    }
}

class Quat
{
    /**
     * @param {Vec3} axis
     * @param {number} angle
     */
    constructor(axis, angle)
    {
        let halfAngle = angle / 2, s = Math.sin(halfAngle);

        this.x = axis.x * s;
        this.y = axis.y * s;
        this.z = axis.z * s;
        this.w = Math.cos(halfAngle);
    }

    /**
     * @param {Quat} other
     * @returns {Quat}
     */
    multiply(a, b)
    {
        const { x: qax, y: qay, z: qaz, w: qaw } = a;
        const { x: qbx, y: qby, z: qbz, w: qbw } = b;

        this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
        this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
        this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
        this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

        return this;
    }

    /**
     * @param {Vec3} axis
     * @param {number} angle
     */
    rotateWithAngleAxisLocal(axis, angle)
    {
        return this.multiply(new Quat(axis, angle), this);
    }

    toMatrix3()
    {
        let { x, y, z, w } = this;
        const x2 = x + x,    y2 = y + y, z2 = z + z;
        const xx = x * x2, xy = x * y2, xz = x * z2;
        const yy = y * y2, yz = y * z2, zz = z * z2;
        const wx = w * x2, wy = w * y2, wz = w * z2;

        return [
            (1 - (yy + zz)),
            (xy + wz),
            (xz - wy),

            (xy - wz),
            (1 - (xx + zz)),
            (yz + wx),

            (xz + wy),
            (yz - wx),
            (1 - (xx + yy))
        ];
    }
}


let rotation = new Quat(new Vec3(0, 1, 0), 0);

/**
 * @type { {[key: string]: boolean} }
 */
let keymap = {};

window.addEventListener("keydown", ev =>
{
    if (!ev.repeat)
    {
        keymap[ev.key] = true;
    }
});

window.addEventListener("keyup", ev =>
{
    if (!ev.repeat)
    {
        keymap[ev.key] = false;
    }
});

function UpdateRotation()
{
    const rotationMultiplier = 0.01;
    let x = 0;
    let y = 0;
    let z = 0;

    if (keymap["a"]) x += 1;
    if (keymap["d"]) x -= 1;
    if (keymap["w"]) y += 1;
    if (keymap["s"]) y -= 1;
    if (keymap["q"]) z -= 1;
    if (keymap["e"]) z += 1;

    rotation.rotateWithAngleAxisLocal(new Vec3(0, 1, 0), x * rotationMultiplier);
    rotation.rotateWithAngleAxisLocal(new Vec3(1, 0, 0), y * rotationMultiplier);
    rotation.rotateWithAngleAxisLocal(new Vec3(0, 0, 1), z * rotationMultiplier * 3);
}

/**
 * @param {string} shader
 * @returns {void}
 */
function CreateWebglCanvas(shader)
{
    const vertexShader = `
attribute vec2 aVertexPosition;

uniform vec4 uScreenSize;

uniform float uTime;

varying vec4 vPixelCoord;

void main()
{
    vec2 normalizedPosition = (aVertexPosition + vec2(1.0)) * 0.5;
    vec2 screenPosition = normalizedPosition * uScreenSize.xy;
    vPixelCoord = vec4(normalizedPosition, screenPosition);
    gl_Position = vec4(aVertexPosition, 0.0, 1.0);
}
    `;


    const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec4 uScreenSize;
uniform vec2 uAspect;

varying vec4 vPixelCoord;

${shader}


void main()
{
    vec4 color;
    mainImage(color, vPixelCoord.xy);
    gl_FragColor = color;
}
    `;

    const canvas = document.createElement("canvas");
    canvas.width = 1920/2;
    canvas.height = 1080/2;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("webgl");
    ctx.viewport(0, 0, canvas.width, canvas.height);

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

    const vertexBuffer = ctx.createBuffer();

    if (!vertexBuffer)
    {
        console.error("Cannot create buffers");
        return;
    }

    const vertexLocation = ctx.getAttribLocation(program, "aVertexPosition");
    const timeLocation = ctx.getUniformLocation(program, "uTime");
    const screenSizeLocation = ctx.getUniformLocation(program, "uScreenSize");
    const aspectLocation = ctx.getUniformLocation(program, "uAspect");

    const rotmatLocation = ctx.getUniformLocation(program, "rotmat");

    ctx.uniform4f(screenSizeLocation, canvas.width, canvas.height, 1 / canvas.width, 1 / canvas.height);
    ctx.uniform2f(aspectLocation, canvas.width / canvas.height, canvas.height / canvas.width);

    const vertexPositions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    ctx.bindBuffer(ctx.ARRAY_BUFFER, vertexBuffer);
    ctx.bufferData(ctx.ARRAY_BUFFER, vertexPositions, ctx.STATIC_DRAW);

    function Draw()
    {
        const time = performance.now() * 0.001;

        // time
        ctx.uniform1f(timeLocation, time);


        UpdateRotation();


        ctx.uniformMatrix3fv(rotmatLocation, false, rotation.toMatrix3());

        // render
        // ctx.clear(ctx.COLOR_BUFFER_BIT);
        ctx.enableVertexAttribArray(vertexLocation);
        ctx.bindBuffer(ctx.ARRAY_BUFFER, vertexBuffer);
        ctx.vertexAttribPointer(vertexLocation, 2, ctx.FLOAT, false, 0, 0);

        ctx.drawArrays(ctx.TRIANGLE_STRIP, 0, vertexPositions.length / 2);

        window.requestAnimationFrame(Draw);
    }

    Draw();
}

/**
 * @param {number} angle
 * @param {Vec3} axis
 * @returns {Array<number>}
 */
function getRotationMatrix(angle, axis)
{
    let a = angle;
    let m = Math;
    let c = m.cos(a);
    let s = m.sin(a);

    axis.normalize();
    let c1 = 1 - c,
        { x, y, z } = axis,
        cx = c1 * x,
        cy = c1 * y,
        cz = c1 * z,
        sx = s * x,
        sy = s * y,
        sz = s * z;

    return [
        c + cx * x,
        cx * y + sz,
        cx * z - sy,

        cy * x - sz,
        c + cy * y,
        cy * z + sx,

        cz * x + sy,
        cz * y - sx,
        c + cz * z
    ];
}

CreateWebglCanvas(`
// https://www.shadertoy.com/view/4dl3Ws

uniform mat3 rotmat;

#define iterations 15
#define formuparam 0.7

#define volsteps 15
#define stepsize 0.12

#define zoom   0.800
#define tile   0.850
#define speed  0.010

#define brightness 0.001
#define distfading 0.7
#define saturation 1.0



// basic noise
float noise( in float x )
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

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    //get coords and direction
    vec2 uv = fragCoord - 0.5;
    uv.y *= uAspect.y;
    vec3 dir = vec3(uv * zoom, 1.0);
    dir = normalize(dir);


    vec3 from = vec3(0.29 + noise(uTime * 0.002) * 0.01, 0.14 + noise(uTime * 0.002 + 3.45) * 0.01, 0.09);


    dir *= rotmat;

    //volumetric rendering
    float s = 0.1;
    float fade = 1.0;
    vec3 v = vec3(0.0);
    for (int r = 0; r < volsteps; ++r)
    {
        vec3 p = from + s * dir * 0.5;
        float pa = 0.0;
        float a = 0.0;

        for (int i = 0; i < iterations; ++i)
        {
            p = abs(p) / dot(p, p) - formuparam; // the magic formula
            float D = abs(length(p) - pa); // absolute sum of average change
            a += mix(D, min(20.0, D), clamp(float(i - 8), 0.0, 1.0));
            pa = pow(dot(p, p), 0.1);
        }

        a = pow(a, 3.2 + noise(uTime * 0.01) * 0.1); // add contrast

        v += fade;

        v += vec3(s, s * s, s * s * s * s) * a * brightness * fade; // coloring based on distance
        fade *= distfading + noise(uTime * 0.01) * 0.1; // distance fading
        s += stepsize;
    }

    v = mix(vec3(length(v)), v, saturation - noise(uTime * 0.03) * 0.2); //color adjust
    fragColor = vec4(v * 0.01, 1.0);
    fragColor.r *= 0.5 + noise(uTime * 0.02 + 1.23) * 0.3;
    // fragColor.g *= 0.6;
}
`);
