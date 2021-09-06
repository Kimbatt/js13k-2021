
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
