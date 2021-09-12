
(() =>
{

let shader = `
${webglNoiseFunction}

// https://www.shadertoy.com/view/XsjSRt


const float timeScale = 0.005;
const float cloudScale = 1.0;
const float softness = 1.0;
const float brightness = 1.5;
const int noiseOctaves = 5;
const float curlStrain = 0.5;
const float cover = 0.5;

float saturate(float num)
{
    return clamp(num, 0.0, 1.0);
}

float noise(vec2 uv)
{
    return simplex_noise(vec3(uv * 1000.0, uTime * 0.08));
}

vec2 rotate(vec2 uv)
{
    uv = uv + noise(uv * 0.3) * 0.0004;
    float sinRot = sin(curlStrain);
    float cosRot = cos(curlStrain);
    mat2 rotMat = mat2(cosRot, -sinRot, sinRot, cosRot);
    return uv * rotMat;
}

float fbm (vec2 uv)
{
    float f = 0.0;
    float mul = 1.5;

    for(int i = 0; i < noiseOctaves; ++i)
    {
        f += noise(uv) * mul * 0.6;
        uv *= 2.2;
        uv=rotate(uv);
        mul *= 0.5;
    }

    return f;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 screenUV = fragCoord - 0.5;
    screenUV.x *= uAspect.x;
    vec2 uv = screenUV / (400.0 * cloudScale) + uTime * 0.2 * timeScale;

    float bright = brightness * (1.8 - cover);

    float color1 = fbm(uv - 0.0 + uTime * 0.025 * timeScale);
    float color2 = fbm(uv - 10.0 + uTime * 0.02 * timeScale);

    float clouds1 = smoothstep(1.0 - cover, min((1.0 - cover) + softness * 2.0, 1.0), color1);
    float clouds2 = smoothstep(1.0 - cover, min((1.0 - cover) + softness, 1.0), color2);

    float cloudsFormComb = saturate(clouds1 + clouds2);

    vec4 skyCol = vec4(0.6, 0.8, 1.0, 1.0);
    float cloudCol = saturate(saturate(1.0 - color1 * 0.2) * bright);
    vec4 clouds1Color = vec4(cloudCol, cloudCol, cloudCol, 1.0);
    vec4 clouds2Color = mix(clouds1Color, skyCol, 0.25);
    vec4 cloudColComb = mix(clouds1Color, clouds2Color, saturate(clouds2 - clouds1));

    fragColor = mix(skyCol, cloudColComb, cloudsFormComb);
}
`;

const c = new WebGLCanvas(shader);
document.body.appendChild(c.canvas);
c.canvas.style.position = "absolute";
c.canvas.style.zIndex = "-2";

function Resize()
{
    c.resize(window.innerWidth, window.innerHeight);
}

Resize();
window.addEventListener("resize", Resize);

function Draw()
{
    window.requestAnimationFrame(Draw);
    c.render();
}

Draw();

});
