
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
            pulse.style.background = "#0f0";
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
