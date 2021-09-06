
/**
 * @type { {[key: string]: boolean} }
 */
let keymap = {};
let spaceDown = false;
let spaceJustPressed = false;

window.addEventListener("keydown", ev =>
{
    keymap[ev.key] = true;
    spaceDown ||= ev.key === " ";
    spaceJustPressed = spaceDown && !ev.repeat;
});

window.addEventListener("keyup", ev =>
{
    keymap[ev.key] = false;
    spaceDown &&= ev.key !== " ";
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

    let angle = particle.userData.angle ?? Math.random() * Math.PI * 2;
    particle.sizeX = particle.userData.sizeX ?? 0.03;
    particle.sizeY = particle.userData.sizeY ?? 0.03;
    let speed = particle.userData.speed ?? Math.random() * 0.1 + 0.2;

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

/**
 * @type {CSS3dPlanet[]}
 */
let planets = [];

let planetColorRng = mulberry32(0);
function RandomPlanetColorHsv()
{
    return [planetColorRng() * 0.2, planetColorRng(), planetColorRng() * 0.5 + 0.5];
}

const checkpointColor = [[0.55, 1, 4]];
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

CreatePlanet(0, 0, new CSS3dPlanet(0.1, 0, checkpointColor, 0.001, true));
CreatePlanet(0.5, 0, new CSS3dPlanet(0.16, 0, [RandomPlanetColorHsv(), RandomPlanetColorHsv(), RandomPlanetColorHsv(), RandomPlanetColorHsv()], 1, false));
CreatePlanet(1, 0, new CSS3dPlanet(0.1, 0, [RandomPlanetColorHsv(), RandomPlanetColorHsv(), RandomPlanetColorHsv(), RandomPlanetColorHsv()], 1, false));
// CreatePlanet(5, 0, new CSS3dPlanet(0.5, 0, [color2, color1, color0, color3], 1));

CreatePlanet(1.5, 0, new CSS3dPlanet(0.1, 0, checkpointColor, 0.001, true));

/**
 * @type {[number, number, number][]}
 */
let blackHoles = [];

/**
 * @param {number} px
 * @param {number} py
 * @param {number} radius
 */
let blackHoleCount = 0;
function CreateBlackHole(px, py, radius)
{
    let idx = blackHoleCount++;
    setBlackHoleCount(blackHoleCount);
    setBlackHoleData(idx, px, py, radius, 1e-4);
    blackHoles.push([px, py, radius]);
}

CreateBlackHole(0.4, 0.4, 0.1);

/**
 * @type {CSS3dPlanet}
 */
let currentCheckpoint = planets[0];
currentCheckpoint.checkpointReached = true;
currentCheckpoint.element.style.filter = "hue-rotate(-88deg)";
let checkpointApproachTime = 0.5;
let checkpointApproachT = 0;
let checkpointApproachStartX = 0;
let checkpointApproachStartY = 0;
let checkpointApproachStartAngle = 0;

let circle = new CSS3dCircle(0.05);
scene.add(circle);

const ALIVE = 0;
const DEAD = 1;
const SPAWNING = 2;

let state = SPAWNING;
let velocityX = 2;
let velocityY = -2;
let facingAngle = Math.atan2(velocityY, velocityX);

let cpx = camera.position.x;
let cpy = camera.position.y;

let totalBoost = 2;
let remainingBoost = totalBoost;
let boostActive = false;
let overlay = document.getElementById("overlay");
let boostBar = document.getElementById("boost-bar").style;
function UpdateRemainingBoost(change)
{
    remainingBoost = Math.max(remainingBoost - change, 0);
    boostBar.width = (remainingBoost / totalBoost * 100) + "%";
}

function Reset()
{
    circle.element.style.opacity = 1;

    circle.position.x = -0.3;
    circle.position.y = -0.3;

    circle.scale = 1;

    camera.position.x = cpx = circle.position.x;
    camera.position.y = cpy = circle.position.y;

    velocityX = 2;
    velocityY = -2;
    facingAngle = Math.atan2(velocityY, velocityX);
    circle.rotation.z = facingAngle * 180 / Math.PI;

    overlay.classList.remove("visible");

    checkpointApproachT = 1;
    state = SPAWNING;

    remainingBoost = totalBoost;
    UpdateRemainingBoost(0);
}


Reset();

/**
 * @type {[() => void, number, boolean][]}
 */
let timers = []; // [0] - callback, [1] - duration, [2] - call every tick

/**
 * @param {() => void} callback
 * @param {number} time
 */
function SetFixedTimeout(callback, time)
{
    timers.push([callback, time, false]);
}

/**
 * @param {() => void} callback
 * @param {number} time
 */
function SetFixedTick(callback, time)
{
    timers.push([callback, time, true]);
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

    let boostWasActive = boostActive;

    while (accumulatedTime > 0)
    {
        accumulatedTime -= fixedDelta;
        PhysicsStep();

        for (let i = 0; i < timers.length; ++i)
        {
            let currentTimer = timers[i];
            currentTimer[2] && currentTimer[0]();
            if ((currentTimer[1] -= fixedDelta) <= 0)
            {
                timers.splice(i, 1);
                --i;
                currentTimer[0]();
            }
        }

        spaceJustPressed = false;
    }

    if (state === DEAD)
    {
        boostActive = false;
    }

    if (boostWasActive != boostActive)
    {
        boostVolumeNode.gain.linearRampToValueAtTime(boostActive ? 0 : 1, actx.currentTime);
        boostVolumeNode.gain.linearRampToValueAtTime(boostActive ? 1 : 0, actx.currentTime + 0.1);
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


let paused = false;

function PhysicsStep()
{
    if (keymap["p"])
    {
        paused = !paused;
    }

    if (paused)
    {
        return;
    }

    particleSystem.update(fixedDelta);

    if (state === DEAD)
    {
        return;
    }

    const speed = 0.02;
    const mult = fixedDelta * speed;

    // camera
    {
        const maxDistance = 1.5;

        let tx = Clamp(Math.abs(cpx - circle.position.x), 0, maxDistance) / maxDistance;
        let ty = Clamp(Math.abs(cpy - circle.position.y), 0, maxDistance) / maxDistance;
        cpx = Lerp(cpx, circle.position.x, falloff.easeInPoly(tx, 1));
        cpy = Lerp(cpy, circle.position.y, falloff.easeInPoly(ty, 1));

        camera.position.x = circle.position.x * 2 - cpx;
        camera.position.y = circle.position.y * 2 - cpy;
    }

    if (state === ALIVE)
    {
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

            let withinRange = Math.sqrt(distanceSq) < planet.radius + circle.radius + (planet.isCheckpoint && !planet.checkpointReached ? 0.05 : 0);

            if (withinRange)
            {
                if (planet.isCheckpoint && !planet.checkpointReached)
                {
                    state = SPAWNING;
                    boostActive = false;
                    remainingBoost = totalBoost;
                    UpdateRemainingBoost(0);
                    currentCheckpoint = planet;
                    planet.checkpointReached = true;
                    planet.element.style.filter = "hue-rotate(-88deg)";
                    checkpointApproachT = 0;
                    checkpointApproachStartX = circle.position.x;
                    checkpointApproachStartY = circle.position.y;
                    checkpointApproachStartAngle = facingAngle;
                    return;
                }

                CreateExplosion(circle.position.x, circle.position.y);
                PlayExplosionSound();
                state = DEAD;
                overlay.classList.add("visible");
                circle.element.style.opacity = 0;

                globalFilterNode.gain.linearRampToValueAtTime(0, actx.currentTime);
                globalFilterNode.gain.linearRampToValueAtTime(-20, actx.currentTime + 0.5);

                SetFixedTimeout(() =>
                {
                    Reset();

                    globalFilterNode.gain.linearRampToValueAtTime(-20, actx.currentTime);
                    globalFilterNode.gain.linearRampToValueAtTime(0, actx.currentTime + 0.5);
                }, 1.0);

                SetFixedTimeout(() =>
                {
                    state = SPAWNING;
                }, 1.2);

                return;
            }

            velocityX += dirX * magnitude * mult;
            velocityY += dirY * magnitude * mult;
        }

        for (const blackHole of blackHoles)
        {
            let dirX = blackHole[0] - circle.position.x;
            let dirY = blackHole[1] - circle.position.y;

            let distanceSq = dirX * dirX + dirY * dirY;

            let mass = blackHole[2] * 1000;

            let magnitude = mass / distanceSq;

            if (Math.sqrt(distanceSq) < blackHole[2] + circle.radius)
            {
                state = DEAD;
                overlay.classList.add("visible");

                let scaleTime = 0.3;
                let t = 0;
                let startX = circle.position.x;
                let startY = circle.position.y;

                SetFixedTick(() =>
                {
                    t += fixedDelta / scaleTime;
                    circle.element.style.opacity = circle.scale = Math.max(0, 1 - t);
                    circle.position.x = Lerp(startX, blackHole[0], t);
                    circle.position.y = Lerp(startY, blackHole[1], t);
                }, scaleTime);

                globalFilterNode.gain.linearRampToValueAtTime(0, actx.currentTime);
                globalFilterNode.gain.linearRampToValueAtTime(-20, actx.currentTime + 0.5);

                SetFixedTimeout(() =>
                {
                    Reset();

                    globalFilterNode.gain.linearRampToValueAtTime(-20, actx.currentTime);
                    globalFilterNode.gain.linearRampToValueAtTime(0, actx.currentTime + 0.5);
                }, 1.0);

                SetFixedTimeout(() =>
                {
                    state = SPAWNING;
                }, 1.2);

                return;
            }

            velocityX += dirX * magnitude * mult;
            velocityY += dirY * magnitude * mult;
        }

        boostActive = spaceDown && remainingBoost > 0;
        if (boostActive)
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

            const particleSize = Math.random() * 0.01 + 0.025;
            particleSystem.createParticles(1, {
                angle: facingAngle + (Math.random() - 0.5) * 1.0,
                x: circle.position.x - x * 0.02,
                y: circle.position.y - y * 0.02,
                speed: 5 * fixedDelta,
                sizeX: particleSize,
                sizeY: particleSize
            });

            UpdateRemainingBoost(fixedDelta);
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
    }
    else if (state === SPAWNING)
    {
        let angle = Math.atan2(circle.position.y - currentCheckpoint.position.y, circle.position.x - currentCheckpoint.position.x) + fixedDelta * 1.5;
        let x = Math.cos(angle);
        let y = Math.sin(angle);

        checkpointApproachT = Math.min(checkpointApproachT + fixedDelta / checkpointApproachTime, 1);

        let targetAngle = angle + Math.PI / 2;

        let targetPositionX = currentCheckpoint.position.x + (currentCheckpoint.radius + 0.05) * x;
        let targetPositionY = currentCheckpoint.position.y + (currentCheckpoint.radius + 0.05) * y;

        let cpt = falloff.easeOutPoly(checkpointApproachT, 2);

        facingAngle = LerpAngle(checkpointApproachStartAngle, targetAngle, cpt);
        circle.position.x = Lerp(checkpointApproachStartX, targetPositionX, cpt);
        circle.position.y = Lerp(checkpointApproachStartY, targetPositionY, cpt);

        if (spaceJustPressed)
        {
            state = ALIVE;
            velocityX = Math.cos(targetAngle) * 15;
            velocityY = Math.sin(targetAngle) * 15;
        }
    }

    circle.rotation.z = facingAngle * 180 / Math.PI;
}

window.requestAnimationFrame(Frame);

window.addEventListener("resize", () => scene.render());

})();
