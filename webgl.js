
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
    constructor(shader, uniforms)
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
