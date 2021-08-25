
(() =>
{
let scene = new CSS3dScene();
let camera = scene.camera;

/**
 * @type {CSS3dPlanet[]}
 */
let planets = [];

const color0 = [1.0, 0.7, 0.5];
const color1 = [1.0, 1.0, 1.0];
const color2 = [0.2, 0.7, 0.8];
const color3 = [0.5, 0.7, 0.0];

// CreatePlanet(0.02, 0, [color0, color1, color2, color3], 1);
// CreatePlanet(0.04, 0, [color1, color2, color3, color0], 1);
// CreatePlanet(0.08, 0, [color2, color3, color0, color1], 1);
// CreatePlanet(0.16, 0, [color3, color0, color1, color2], 1);

/**
 * @param {number} px
 * @param {number} py
 * @param {CSS3dPlanet} planet
 */
function CreatePlanet(px, py, planet)
{
    planet.position.x = px;
    planet.position.y = py;
    scene.add(planet);
    planets.push(planet);
}

CreatePlanet(0, 0, new CSS3dPlanet(0.05, 0, [color0, color1, color2, color3], 1));
CreatePlanet(0.5, 0, new CSS3dPlanet(0.08, 0, [color1, color1, color1, color1], 1));
CreatePlanet(1, 0, new CSS3dPlanet(0.05, 0, [color2, color1, color0, color3], 1));

let circle = new CSS3dCircle(0.05);
scene.add(circle);

circle.position.x = -0.3;
circle.position.y = -0.3;


let lastTime = 0;
let accumulatedTime = 0;
const fixedDelta = 1 / 60;
/**
 * @param {number} time
 */
function Frame(time)
{
    time /= 1000;
    let delta = time - lastTime;
    lastTime = time;
    accumulatedTime += delta;
    window.requestAnimationFrame(Frame);

    const speed = 0.1;

    const multiplier = speed * delta * 4;
    let x = 0;
    let y = 0;

    if (keymap["a"]) x -= 1;
    if (keymap["d"]) x += 1;
    if (keymap["w"]) y += 1;
    if (keymap["s"]) y -= 1;

    camera.position.x += x * multiplier;
    camera.position.y += y * multiplier;

    while (accumulatedTime > 0)
    {
        accumulatedTime -= fixedDelta;
        PhysicsStep();
    }

    scene.render();
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
 *
 * @param {number} angle in radians
 */
function NormalizeAngle(angle)
{
    if (angle > Math.PI)
    {
        angle -= Math.PI * 2;
    }
    else if (angle < -Math.PI)
    {
        angle += Math.PI * 2;
    }

    return angle;
}

let velocityX = 2;
let velocityY = -2;
let facingAngle = Math.atan2(velocityY, velocityX);
function PhysicsStep()
{
    const speed = 0.02;
    const mult = fixedDelta * speed;
    for (const planet of planets)
    {
        let dirX = planet.position.x - circle.position.x;
        let dirY = planet.position.y - circle.position.y;

        // let radius = planet.radius * 4;
        let distanceSq = Math.max(0.001, dirX * dirX + dirY * dirY);

        // real gravity, based on volume, but just using the same mass for all planets seems to be better
        //const volume = 4 / 3 * Math.PI * radius * radius * radius;
        //const mass = 500 * volume;
        const mass = 80;
        let magnitude = mass / distanceSq;


        velocityX += dirX * magnitude * mult;
        velocityY += dirY * magnitude * mult;
    }

    if (keymap[" "])
    {
        let x = Math.cos(facingAngle);
        let y = Math.sin(facingAngle);

        const boost = 500;

        velocityX += x * mult * boost;
        velocityY += y * mult * boost;
    }

    velocityX *= 1 - mult * 5;
    velocityY *= 1 - mult * 5;

    circle.position.x += velocityX * mult;
    circle.position.y += velocityY * mult;

    let currentAngle = Math.atan2(velocityY, velocityX);
    let angleDiff = NormalizeAngle(currentAngle - facingAngle);

    const maxAngleDiff = 80 * mult;
    angleDiff = Clamp(angleDiff, -maxAngleDiff, maxAngleDiff);
    facingAngle = NormalizeAngle(facingAngle + angleDiff);

    circle.rotation.z = facingAngle * 180 / Math.PI;
}

window.requestAnimationFrame(Frame);

window.addEventListener("resize", () => scene.render());


function TouchClear()
{
    keymap["a"] = false;
    keymap["d"] = false;
    keymap["w"] = false;
    keymap["s"] = false;
}

/**
 * @param {TouchEvent} ev
 */
function TouchUpdate(ev)
{
    if (ev.touches[0].clientX < window.innerWidth / 3)
    {
        keymap["a"] = true;
    }
    else if (ev.touches[0].clientX > window.innerWidth / 3 * 2)
    {
        keymap["d"] = true;
    }

    if (ev.touches[0].clientY < window.innerHeight / 3)
    {
        keymap["w"] = true;
    }
    else if (ev.touches[0].clientY > window.innerHeight / 3 * 2)
    {
        keymap["s"] = true;
    }
}

window.addEventListener("touchstart", ev =>
{
    TouchClear();
    TouchUpdate(ev);
});

window.addEventListener("touchend", () =>
{
    TouchClear();
});

window.addEventListener("touchmove", ev =>
{
    TouchClear();
    TouchUpdate(ev);
});

})();
