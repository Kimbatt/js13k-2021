
class CSS3dPlanet extends CSS3dObject
{
    /**
     * @param {number} radius
     * @param {number} seed
     * @param {[number, number, number][]} colors
     * @param {number} noiseScale
     */
    constructor(radius, seed, colors, noiseScale)
    {
        super(false);
        this.radius = radius;

        let shader = `

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

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    const vec2 planetPosition = vec2(0.0, 0.0);
    const float planetRadius = ${NumberToWebGL(radius / 2)};

    float glowRadius = -0.001;
    vec2 uv = (fragCoord - 0.5) * (planetRadius - glowRadius * 4.0) * 2.0;

    vec3 seed = vec3(${NumberToWebGL(seed)});

    float currentPlanetDistance = distance(planetPosition, uv);
    vec3 originalPlanetColor = vec3(${NumberToWebGL(colors[0][0])}, ${NumberToWebGL(colors[0][1])}, ${NumberToWebGL(colors[0][2])});

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

    planetNoise += smoothstep(-1.2, 1.6, simplex_noise(seed + normal * mul * scale)) / mul * vec3(${c[0]}, ${c[1]}, ${c[2]});
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

        const c = new WebGLCanvas(shader, []);

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
