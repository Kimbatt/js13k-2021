
class CSS3dPlanet extends CSS3dObject
{
    /**
     * @param {number} radius
     * @param {number} seed
     * @param {[number, number, number][]} colors
     * @param {number} noiseScale
     * @param {boolean} isCheckpoint
     * @param {number} level
     */
    constructor(radius, seed, colors, noiseScale, isCheckpoint, level)
    {
        super(false);
        this.element.style.zIndex = "-1";
        this.element.classList.add("planet");
        this.radius = radius;
        this.isCheckpoint = isCheckpoint;
        this.checkpointReached = false;
        this.level = level;

        let shader = `

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
    const float planetRadius = ${NumberToWebGL(radius / 2)};

    float glowRadius = -0.001;
    vec2 uv = (fragCoord - 0.5) * (planetRadius - glowRadius * 4.0) * 2.0;

    vec3 seed = vec3(${NumberToWebGL(seed)});

    float currentPlanetDistance = distance(planetPosition, uv);
    vec3 originalPlanetColor = hsv2rgb(vec3(${NumberToWebGL(colors[0][0])}, ${NumberToWebGL(colors[0][1])}, ${NumberToWebGL(colors[0][2])}));

    vec2 planetDir = (uv - planetPosition) / planetRadius;
    float len = clamp(length(planetDir), 0.0, 1.0);
    float z = sqrt(1.0 - len * len);
    vec3 normal = vec3(planetDir, z);

    vec3 planetNoise = vec3(0.0);

    float mul = 1.0;
    float scale = planetRadius * 50.0 * ${NumberToWebGL(noiseScale)};
    float mulmul = 2.5;
    ${
        colors.map(c => `

    planetNoise += smoothstep(-1.2, 1.6, simplex_noise(seed + normal * mul * scale)) / mul * hsv2rgb(vec3(${NumberToWebGL(c[0])}, ${NumberToWebGL(c[1])}, ${NumberToWebGL(c[2])}));
    mul *= mulmul;

        `).join("\n")
    }

    vec3 planetColor = planetNoise;
    float side = smoothstep(0.0, 1.0, (currentPlanetDistance - planetRadius) * 1000.0);
    planetColor *= mix(0.2, 1.0, pow(dot(normal, vec3(0.0, 0.0, 1.0)), 2.0));

    float glowIntensity = smoothstep(1.0, 0.0, (currentPlanetDistance - planetRadius - glowRadius) * 200.0);
    vec3 rgb = glowIntensity * originalPlanetColor * 0.4;
    rgb = mix(planetColor, rgb, smoothstep(0.0, 1.0, (currentPlanetDistance - planetRadius) * 1000.0));
    fragColor = vec4(rgb, glowIntensity);
}
        `;

        const c = new WebGLCanvas(shader);

        this.shouldRender = true;
        this.renderIfNeeded = () =>
        {
            if (this.shouldRender)
            {
                this.shouldRender = false;
                const size = window.innerHeight * radius * 2;
                c.resize(size, size);
                c.render();
            }
        };

        this.element.appendChild(c.canvas);
        c.canvas.style.transform = "translate(-50%, -50%)";

        window.addEventListener("resize", () => this.shouldRender = true);
    }

    updateTransform()
    {
        super.updateTransform();
        this.renderIfNeeded();
    }
}
