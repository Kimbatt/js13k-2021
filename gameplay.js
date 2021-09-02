
/**
 * @type { {[key: string]: boolean} }
 */
 let keymap = {};

 window.addEventListener("keydown", ev =>
 {
     keymap[ev.key] = true;
 });

 window.addEventListener("keyup", ev =>
 {
     keymap[ev.key] = false;
 });

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
    particleSystem.createParticles(50, { x, y });
}

window.CreateExplosion = CreateExplosion;

/**
 * @type {CSS3dPlanet[]}
 */
let planets = [];

let planetColorRng = mulberry32(0);
function RandomPlanetColorHsv()
{
    return [planetColorRng(), planetColorRng(), planetColorRng() * 0.5 + 0.5];
}


// const color0 = [1.0, 0.7, 0.5];
// const color1 = [1.0, 1.0, 1.0];
// const color2 = [0.2, 0.7, 0.8];
// const color3 = [0.5, 0.7, 0.0];

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

CreatePlanet(0, 0, new CSS3dPlanet(0.1, 0, [RandomPlanetColorHsv(), RandomPlanetColorHsv(), RandomPlanetColorHsv(), RandomPlanetColorHsv()], 1));
CreatePlanet(0.5, 0, new CSS3dPlanet(0.16, 0, [RandomPlanetColorHsv(), RandomPlanetColorHsv(), RandomPlanetColorHsv(), RandomPlanetColorHsv()], 1));
CreatePlanet(1, 0, new CSS3dPlanet(0.1, 0, [RandomPlanetColorHsv(), RandomPlanetColorHsv(), RandomPlanetColorHsv(), RandomPlanetColorHsv()], 1));
// CreatePlanet(5, 0, new CSS3dPlanet(0.5, 0, [color2, color1, color0, color3], 1));

let dead = false;
let circle = new CSS3dCircle(0.05);
scene.add(circle);

circle.position.x = -0.3;
circle.position.y = -0.3;

camera.position.x = circle.position.x;
camera.position.y = circle.position.y;

/**
 * @type {[() => void, number][]}
 */
let timers = [];

/**
 * @param {() => void} callback
 * @param {number} time
 */
function SetFixedTimeout(callback, time)
{
    timers.push([callback, time])
}

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
    delta = Math.min(delta, 0.1); // maximum 0.1 second of frame time

    accumulatedTime += delta;
    window.requestAnimationFrame(Frame);

    while (accumulatedTime > 0)
    {
        accumulatedTime -= fixedDelta;
        PhysicsStep();
        particleSystem.update(fixedDelta);

        for (let i = 0; i < timers.length; ++i)
        {
            let currentTimer = timers[i];
            if ((currentTimer[1] -= fixedDelta) <= 0)
            {
                timers.splice(i, 1);
                --i;
                currentTimer[0]();
            }
        }
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

let cpx = camera.position.x;
let cpy = camera.position.y;
function PhysicsStep()
{
    // camera
    {
        const maxDistance = 1.5;

        let tx = Clamp(Math.abs(cpx - circle.position.x), 0, maxDistance) / maxDistance;
        let ty = Clamp(Math.abs(cpy - circle.position.y), 0, maxDistance) / maxDistance;
        cpx = Lerp(cpx, circle.position.x, falloff.easeInPoly(tx, 2));
        cpy = Lerp(cpy, circle.position.y, falloff.easeInPoly(ty, 2));

        camera.position.x = cpx;
        camera.position.y = cpy;
    }

    if (dead)
    {
        return;
    }

    const speed = 0.02;
    const mult = fixedDelta * speed;
    for (const planet of planets)
    {
        let dirX = planet.position.x - circle.position.x;
        let dirY = planet.position.y - circle.position.y;

        // let radius = planet.radius * 4;
        let distanceSq = dirX * dirX + dirY * dirY;

        // real gravity, based on volume, but just using the same mass for all planets seems to be better
        // const volume = 4 / 3 * Math.PI * radius * radius * radius;
        // const mass = 500 * volume;

        // fixed mass
        const mass = 80;

        // just use the radius
        // const mass = planet.radius * 200;

        let magnitude = mass / distanceSq;

        if (Math.sqrt(distanceSq) < planet.radius + circle.radius)
        {
            CreateExplosion(circle.position.x, circle.position.y);
            dead = true;
            circle.element.style.opacity = 0;

            SetFixedTimeout(() =>
            {
                dead = false;
                circle.element.style.opacity = 1;

                // TODO: make a reset function
                circle.position.x = -0.3;
                circle.position.y = -0.3;

                cpx = circle.position.x;
                cpy = circle.position.y;

                velocityX = 2;
                velocityY = -2;
                facingAngle = Math.atan2(velocityY, velocityX);
            }, 1.5);

            return;
        }

        velocityX += dirX * magnitude * mult;
        velocityY += dirY * magnitude * mult;
    }

    if (keymap[" "])
    {
        let x = Math.cos(facingAngle);
        let y = Math.sin(facingAngle);

        const boostMaxAcceleration = 500;
        const normalAcceleration = 15;
        const minSpeed = 10;

        let speed = Math.hypot(velocityX, velocityY);
        let acceleration = Lerp(boostMaxAcceleration, normalAcceleration, Clamp(speed / minSpeed, 0, 1));

        velocityX += x * fixedDelta * acceleration;
        velocityY += y * fixedDelta * acceleration;
    }

    velocityX *= 1 - mult * 5;
    velocityY *= 1 - mult * 5;

    const maxSpeed = 25;
    let currentSpeed = Math.hypot(velocityX, velocityY);
    let targetSpeed = Math.min(maxSpeed, currentSpeed);
    velocityX *= targetSpeed / currentSpeed;
    velocityY *= targetSpeed / currentSpeed;

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

})();
