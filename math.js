
/**
 * @param {number} a
 * @param {number} b
 * @param {number} x
 */
function Lerp(a, b, x)
{
    return a + (b - a) * x;
}

/**
 * @param {number} a
 * @param {number} b
 * @param {number} t
 */
function Unlerp(a, b, t)
{
    return (b - a) / (t - a);
}

var falloff = {
    smoothstep: t => t * t * (3 - 2 * t),
    easeIn: t => 1 - Math.cos(t * Math.PI / 2),
    easeOut: t => Math.sin(t * Math.PI / 2)
};
