
/**
 * @type { {[key: string]: boolean} }
 */
let keymap = {};

(() =>
{

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

let posX = 0;
let posY = 0;
let lastTime = 0;
function UpdatePosition()
{
    let currentTime = performance.now() * 0.001;
    let delta = currentTime - lastTime;
    lastTime = currentTime;

    const speed = 0.1;

    let multiplier = speed * delta;
    let x = 0;
    let y = 0;

    if (keymap["a"]) x -= 1;
    if (keymap["d"]) x += 1;
    if (keymap["w"]) y += 1;
    if (keymap["s"]) y -= 1;

    posX += x * multiplier;
    posY += y * multiplier;
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
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("webgl");

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

    const offsetLocation = ctx.getUniformLocation(program, "offset");

    const blackHoleCountLocation = ctx.getUniformLocation(program, "numBlackHoles");
    const blackHoleDataLocation = ctx.getUniformLocation(program, "blackHoleData");

    ctx.uniform1i(blackHoleCountLocation, 3);


    const vertexPositions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    ctx.bindBuffer(ctx.ARRAY_BUFFER, vertexBuffer);
    ctx.bufferData(ctx.ARRAY_BUFFER, vertexPositions, ctx.STATIC_DRAW);


    function Resize()
    {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.viewport(0, 0, canvas.width, canvas.height);
        ctx.uniform4f(screenSizeLocation, canvas.width, canvas.height, 1 / canvas.width, 1 / canvas.height);
        ctx.uniform2f(aspectLocation, canvas.width / canvas.height, canvas.height / canvas.width);
    }

    Resize();
    window.addEventListener("resize", Resize);


    let prevPosX = NaN;
    let prevPosY = NaN;
    function Draw()
    {
        window.requestAnimationFrame(Draw);
        UpdatePosition();

        if (prevPosX === posX && prevPosY === posY && !keymap["q"])
        {
            // return;
        }

        prevPosX = posX;
        prevPosY = posY;


        const time = performance.now() * 0.001;

        // time
        ctx.uniform1f(timeLocation, time);

        ctx.uniform2f(offsetLocation, posX, posY);


        // black holes
        ctx.uniform4fv(blackHoleDataLocation, [
            0, 0, 0.04, 0.0001,
            Math.cos(time) * 0.1, Math.sin(time) * 0.1, 0.02, 2e-5,
            -Math.cos(time * 1.1) * 0.07, Math.sin(time * 1.1) * 0.07, 0.02, 2e-5
        ]);


        // render
        // ctx.clear(ctx.COLOR_BUFFER_BIT);
        ctx.enableVertexAttribArray(vertexLocation);
        ctx.bindBuffer(ctx.ARRAY_BUFFER, vertexBuffer);
        ctx.vertexAttribPointer(vertexLocation, 2, ctx.FLOAT, false, 0, 0);

        ctx.drawArrays(ctx.TRIANGLE_STRIP, 0, vertexPositions.length / 2);
    }

    Draw();
}

CreateWebglCanvas(`
// https://www.shadertoy.com/view/XlfGRj

uniform vec2 offset;

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


#define maxNumBlackHoles 5
uniform int numBlackHoles;
uniform vec4 blackHoleData[maxNumBlackHoles]; // xy - position, z - radius, w - effect radius


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
    uv *= 0.25;
    uv.x *= uAspect.x;


    vec3 from = vec3(offset.x, offset.y, -11.11);

    // const float blackHoleEffectRadius = 0.0002;
    // const float blackHoleRadius = 0.04;
    const float blackHoleEdgeSharpness = 200.0;
    const float blackHolePower = 2.0;
    const vec3 blackHoleColor = vec3(0.0);

    float light = 1.0;
    vec2 originalUv = uv;
    float blackHoleOutlineGlow = 0.0;
    vec3 blackHoleOutlineGlowColor = vec3(1.0, 0.3, 0.0);
    for (int i = 0; i < maxNumBlackHoles; ++i)
    {
        if (i < numBlackHoles)
        {
            vec2 pos = blackHoleData[i].xy - offset;
            float radius = blackHoleData[i].z;
            float effectRadius = blackHoleData[i].w;

            float currentDist = distance(pos, originalUv);
            vec2 warp = normalize(pos - originalUv) * pow(currentDist, -blackHolePower) * effectRadius;
            uv += warp;
            light *= clamp((currentDist - radius) * blackHoleEdgeSharpness, 0.0, 1.0);

            blackHoleOutlineGlow += 2.0 / (abs(currentDist - radius) * 1000.0);
        }
    }

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
    vec3 rgb = pow(v * 0.01 * sqrt(s), vec3(1.5)) * 1.5;
    rgb.r *= 0.4 + noise(uTime * 0.02 + 1.23) * 0.3;
    rgb = clamp(rgb, vec3(0.0), vec3(1.0)) * 0.8;

    rgb += blackHoleOutlineGlowColor * clamp(blackHoleOutlineGlow, 0.0, 1.0) * 0.6;
    rgb = mix(blackHoleColor, rgb, light);

    fragColor = vec4(rgb, 1.0);
    // fragColor.g *= 0.6;
}
`);

})();
