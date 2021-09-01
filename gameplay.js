
let scene = new CSS3dScene();
let camera = scene.camera;

(() =>
{

let particleTemplate = document.createElement("div");
particleTemplate.style.borderRadius = "50%";
particleTemplate.style.background = "radial-gradient(#ff6, #f52 30%, #0006 50%, #0000 80%)";

let particleSystem = new ParticleSystem(scene, particleTemplate, particle =>
{
    particle.element.style.filter = `brightness(${Math.random() + 0.5})`; //`hue-rotate(${Math.random()-0.5}rad)`;

    let maxAge = Math.random() * 0.5 + 0.5;
    let age = () => particle.age / maxAge; // percentage [0, 1]

    let angle = Math.random() * Math.PI * 2;
    particle.sizeX = 0.03;
    particle.sizeY = 0.03;
    let speed = Math.random() * 0.1 + 0.2;

    particle.position.x = particle.userData.x;
    particle.position.y = particle.userData.y;

    return (delta) =>
    {
        let currentSpeed = speed * (1 - falloff.easeOutPoly(age(), 2));
        let velocityX = Math.cos(angle) * currentSpeed;
        let velocityY = Math.sin(angle) * currentSpeed;

        particle.position.x += delta * velocityX;
        particle.position.y += delta * velocityY;

        particle.element.style.opacity = falloff.easeOut(1 - age()) / 2;
        particle.alive = age() < 1.0;
    };
});

function CreateExplosion(x, y)
{
    particleSystem.createParticles(20, { x, y });
}

window.CreateExplosion = CreateExplosion;

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
// CreatePlanet(5, 0, new CSS3dPlanet(0.5, 0, [color2, color1, color0, color3], 1));

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
    delta = Math.min(delta, 1.0); // maximum 1 second of frame time

    accumulatedTime += delta;
    window.requestAnimationFrame(Frame);

    // const speed = 0.1;

    // const multiplier = speed * delta * 4;
    // let x = 0;
    // let y = 0;

    // if (keymap["a"]) x -= 1;
    // if (keymap["d"]) x += 1;
    // if (keymap["w"]) y += 1;
    // if (keymap["s"]) y -= 1;

    // camera.position.x += x * multiplier;
    // camera.position.y += y * multiplier;

    const maxDistance = 1.5;

    let tx = Clamp(Math.abs(camera.position.x - circle.position.x), 0, maxDistance) / maxDistance;
    let ty = Clamp(Math.abs(camera.position.y - circle.position.y), 0, maxDistance) / maxDistance;
    camera.position.x = Lerp(camera.position.x, circle.position.x, falloff.easeInPoly(tx, 2));
    camera.position.y = Lerp(camera.position.y, circle.position.y, falloff.easeInPoly(ty, 2));

    while (accumulatedTime > 0)
    {
        accumulatedTime -= fixedDelta;
        PhysicsStep();
        particleSystem.update(fixedDelta);
    }

    scene.render();
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
    const scaleMultiplier = 1;

    const speed = 0.02;
    const mult = fixedDelta * speed;
    for (const planet of planets)
    {
        let dirX = planet.position.x - circle.position.x;
        let dirY = planet.position.y - circle.position.y;

        // let radius = planet.radius * 4;
        let distanceSq = Math.max(0.001, dirX * dirX * scaleMultiplier + dirY * dirY * scaleMultiplier);

        // real gravity, based on volume, but just using the same mass for all planets seems to be better
        // const volume = 4 / 3 * Math.PI * radius * radius * radius;
        // const mass = 500 * volume;

        // fixed mass
        const mass = 80;

        // just use the radius
        // const mass = planet.radius * 200;

        let magnitude = mass / distanceSq;


        velocityX += dirX * magnitude * mult;
        velocityY += dirY * magnitude * mult;
    }

    if (keymap[" "])
    {
        let x = Math.cos(facingAngle);
        let y = Math.sin(facingAngle);

        // TODO: accelerate faster up until reaching a certain speed, instead of jumping to a minimum speed
        const boost = 10;
        const minBoostSpeed = 10;

        let minBoostVelocityX = x * minBoostSpeed;
        let minBoostVelocityY = y * minBoostSpeed;
        let normalVelocityX = velocityX + x * fixedDelta * boost;
        let normalVelocityY = velocityY + y * fixedDelta * boost;
        velocityX = Math.abs(minBoostVelocityX) > Math.abs(normalVelocityX) ? minBoostVelocityX : normalVelocityX;
        velocityY = Math.abs(minBoostVelocityY) > Math.abs(normalVelocityY) ? minBoostVelocityY : normalVelocityY
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
