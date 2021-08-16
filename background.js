
/**
 *
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
varying mat3 rotmat; // TODO: uniform


mat3 getRotationMatrix(float angle, vec3 v)
{
    float a = angle;
    float c = cos(a);
    float s = sin(a);
    mat3 Result;

    vec3 axis = normalize(v);

    Result[0][0] = c + (1.0 - c)      * axis.x     * axis.x;
    Result[0][1] = (1.0 - c) * axis.x * axis.y + s * axis.z;
    Result[0][2] = (1.0 - c) * axis.x * axis.z - s * axis.y;

    Result[1][0] = (1.0 - c) * axis.y * axis.x - s * axis.z;
    Result[1][1] = c + (1.0 - c) * axis.y * axis.y;
    Result[1][2] = (1.0 - c) * axis.y * axis.z + s * axis.x;

    Result[2][0] = (1.0 - c) * axis.z * axis.x + s * axis.y;
    Result[2][1] = (1.0 - c) * axis.z * axis.y - s * axis.x;
    Result[2][2] = c + (1.0 - c) * axis.z * axis.z;

    return Result;
}

void main()
{
    vec2 normalizedPosition = (aVertexPosition + vec2(1.0)) * 0.5;
    vec2 screenPosition = normalizedPosition * uScreenSize.xy;
    vPixelCoord = vec4(normalizedPosition, screenPosition);
    gl_Position = vec4(aVertexPosition, 0.0, 1.0);

    rotmat = getRotationMatrix(uTime * 0.05, vec3(cos(uTime * 0.1), cos(uTime * 0.15), cos(uTime * 0.2)));
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
    canvas.width = 1920;
    canvas.height = 1080;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("webgl2");
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

    ctx.uniform4f(screenSizeLocation, canvas.width, canvas.height, 1 / canvas.width, 1 / canvas.height);
    ctx.uniform2f(aspectLocation, canvas.width / canvas.height, canvas.height / canvas.width);

    const vertexPositions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    ctx.bindBuffer(ctx.ARRAY_BUFFER, vertexBuffer);
    ctx.bufferData(ctx.ARRAY_BUFFER, vertexPositions, ctx.STATIC_DRAW);

    function Draw()
    {
        // time
        ctx.uniform1f(timeLocation, performance.now() * 0.001);

        // render
        ctx.clear(ctx.COLOR_BUFFER_BIT);
        ctx.enableVertexAttribArray(vertexLocation);
        ctx.bindBuffer(ctx.ARRAY_BUFFER, vertexBuffer);
        ctx.vertexAttribPointer(vertexLocation, 2, ctx.FLOAT, false, 0, 0);

        ctx.drawArrays(ctx.TRIANGLE_STRIP, 0, vertexPositions.length / 2);

        window.requestAnimationFrame(Draw);
    }

    Draw();
}

CreateWebglCanvas(`
// https://www.shadertoy.com/view/4dl3Ws

varying mat3 rotmat;


#define iterations 15
#define formuparam 0.5

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


    vec3 from = vec3(0.23 + noise(uTime * 0.01) * 0.01, 0.56 + noise(uTime * 0.01 + 3.45) * 0.01, 0.09);


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
            a += abs(length(p) - pa); // absolute sum of average change
            pa = pow(dot(p, p), 0.3 + noise(uTime * 0.1) * 0.3);
        }

        a *= a * a; // add contrast

        v += fade;

        v += vec3(s, s * s, s * s * s * s) * a * brightness * fade; // coloring based on distance
		fade *= distfading; // distance fading
        s += stepsize;
    }

    v = mix(vec3(length(v)), v, saturation - noise(uTime * 0.03) * 0.5); //color adjust
    fragColor = vec4(v * 0.01, 1.0);
    fragColor.r *= 0.7 + noise(uTime * 0.07 + 1.23) * 0.3;
    // fragColor.g *= 0.6;
}
`);
