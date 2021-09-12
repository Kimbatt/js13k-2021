
/**
 * @type { {[key: string]: boolean} }
 */
let keymap = {};
let spaceDown = false;
let spaceJustPressed = false;
let enterJustPressed = false;

window.addEventListener("keydown", ev =>
{
    keymap[ev.key] = true;
    spaceDown ||= ev.key === " ";
    spaceJustPressed = spaceDown && !ev.repeat;
    enterJustPressed ||= (ev.key === "Enter" || ev.key.toLowerCase() === "r") && !ev.repeat;
});

window.addEventListener("keyup", ev =>
{
    keymap[ev.key] = false;
    spaceDown &&= ev.key !== " ";
});

let scene = new CSS3dScene();
let camera = scene.camera;

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

const checkpointColor = [[0.25, 1, 1.5]];

const maxBlackHolesPerLevel = 2;
setBlackHoleCount(maxBlackHolesPerLevel * 3);

/**
 * @type {CSS3dPlanet[]}
 */
let planets = [];

/**
 * @type {[number, number, number, number, number][]} // posX, posY, radius, level, blackHoleIndex
 */
let blackHoles = [];

/**
 * @type {CSS3dPlanet}
 */
let nextCheckpoint;

const localStorageSaveKey = "kimbatt-js13k-2021";
let currentLevelIdx = (+window.localStorage.getItem(localStorageSaveKey) ?? 0) % (levelData.length - 1);

for (let i = 1; i < levelData.length; ++i)
{
    levelData[i].checkpoint[0] += levelData[i - 1].checkpoint[0];
    levelData[i].checkpoint[1] += levelData[i - 1].checkpoint[1];

    for (let planet of levelData[i].planets)
    {
        planet[0] += levelData[i].checkpoint[0];
        planet[1] += levelData[i].checkpoint[1];
    }

    for (let blackHole of levelData[i].blackholes)
    {
        blackHole[0] += levelData[i].checkpoint[0];
        blackHole[1] += levelData[i].checkpoint[1];
    }
}

/**
 * @param {number} idx
 */
function LoadLevel(idx)
{
    UnloadLevel(idx - 3);

    if (idx >= levelData.length || idx < 0)
    {
        return;
    }

    let planetColorRng = mulberry32(idx);
    let RandomPlanetColorHsv = () => [planetColorRng() * 0.2, planetColorRng(), planetColorRng() * 0.5 + 0.5];

    /**
     * @param {[number, number, number]} data
     * @param {boolean} isCheckpoint
     */
    function CreatePlanetLocal(data, isCheckpoint)
    {
        let planet = new CSS3dPlanet(data[2], data[3] ?? 80,
            planetColorRng() * 100,
            isCheckpoint ? checkpointColor : [RandomPlanetColorHsv(), RandomPlanetColorHsv(), RandomPlanetColorHsv(), RandomPlanetColorHsv()],
            planetColorRng() * 0.6 + 0.6,
            isCheckpoint,
            idx
        );
        (planet.checkpointReached = isCheckpoint && idx <= currentLevelIdx) && (planet.element.style.filter = "hue-rotate(88deg)");

        planet.position.x = data[0];
        planet.position.y = data[1];
        scene.add(planet);

        return planet;
    }

    let blackHoleCount = 0;
    /**
     * @param {[number, number, number]} data
     */
    function CreateBlackHoleLocal(data)
    {
        let i = (idx % 3) * maxBlackHolesPerLevel + blackHoleCount++;
        let x = data[0];
        let y = data[1];
        setBlackHoleData(i, x, y, data[2], data[3]);
        return [x, y, data[2], idx, i];
    }

    planets = [
        ...planets,
        nextCheckpoint = CreatePlanetLocal(levelData[idx].checkpoint, true),
        ...levelData[idx].planets.map(data => CreatePlanetLocal(data, false))
    ];

    blackHoles = [
        ...levelData[idx].blackholes.map(CreateBlackHoleLocal),
        ...blackHoles
    ];
}

LoadLevel(currentLevelIdx);
LoadLevel(currentLevelIdx - 1);
LoadLevel(currentLevelIdx + 1);

/**
 * @param {number} idx
 */
function UnloadLevel(idx)
{
    if (idx < 0)
    {
        return;
    }

    planets = planets.filter(planet =>
    {
        let remove = planet.level === idx;
        remove && scene.remove(planet);
        return !remove;
    });

    blackHoles = blackHoles.filter(blackHole =>
    {
        let remove = blackHole[3] === idx;
        remove && setBlackHoleData(blackHole[4], 9e9, 9e9, 0, 0);
        return !remove;
    });
}

let arrow = new CSS3dArrow();
scene.add(arrow);
arrow.position.x = 0;
arrow.position.y = 0;

/**
 * @type {CSS3dPlanet}
 */
let currentCheckpoint = planets[0];
let checkpointApproachTime = 0.5;
let checkpointApproachT = 0;
let checkpointApproachStartX = 0;
let checkpointApproachStartY = 0;
let checkpointApproachStartAngle = 0;

let circle = new CSS3dSpaceShip(0.05);
scene.add(circle);

const ALIVE = 0;
const DEAD = 1;
const SPAWNING = 2;

let state = SPAWNING;
let velocityX = 0;
let velocityY = 0;
let facingAngle = Math.atan2(velocityY, velocityX);

let cpx = camera.position.x;
let cpy = camera.position.y;

let totalBoost = levelData[currentLevelIdx].boost;
let remainingBoost = totalBoost;
let boostActive = false;
let overlay = document.getElementById("overlay");
let boostBar = document.getElementById("boost-bar").style;
let boostContainer = document.getElementById("boost-container").style;
boostContainer.width = totalBoost * 10 + "vh";

/**
 * @param {number} change
 */
function UpdateRemainingBoost(change)
{
    remainingBoost = Math.max(remainingBoost - change, 0);
    boostBar.width = (remainingBoost / totalBoost * 100) + "%";
}

function Reset()
{
    circle.element.style.opacity = 1;

    circle.position.x = currentCheckpoint.position.x - currentCheckpoint.radius - 0.05;
    circle.position.y = currentCheckpoint.position.y;

    circle.scale = 1;

    camera.position.x = cpx = circle.position.x;
    camera.position.y = cpy = circle.position.y;

    velocityX = 0;
    velocityY = 0;
    facingAngle = Math.atan2(velocityY, velocityX);
    circle.rotation.z = facingAngle * 180 / Math.PI;
    zoom = 1;

    overlay.classList.remove("visible");

    checkpointApproachT = 1;
    state = SPAWNING;
    cameraStyle = 0;

    remainingBoost = totalBoost;
    UpdateRemainingBoost(0);
}

let started = false;
function StartGame()
{
    if (started)
    {
        return;
    }

    started = true;
    InitAudio();
    Reset();
    paused = false;
}
window["StartGame"] = StartGame;

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

    while (accumulatedTime > -fixedDelta / 2)
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
        enterJustPressed = false;
    }

    if (state === DEAD)
    {
        boostActive = false;
    }

    if (boostWasActive !== boostActive)
    {
        boostVolumeNode.gain.linearRampToValueAtTime(boostActive ? 0 : 1, actx.currentTime);
        boostVolumeNode.gain.linearRampToValueAtTime(boostActive ? 1 : 0, actx.currentTime + 0.1);
    }

    {
        const arrowRadius = 0.45 / zoom;
        const aspect = window.innerWidth / window.innerHeight;

        const wx = arrowRadius * aspect;
        const wy = arrowRadius;
        const distX = nextCheckpoint.position.x - camera.position.x;
        const distY = nextCheckpoint.position.y - camera.position.y;
        const offsetX = Clamp(distX, -wx, wx);
        const offsetY = Clamp(distY, -wy, wy);

        arrow.position.x = camera.position.x + offsetX;
        arrow.position.y = camera.position.y + offsetY;

        arrow.rotation.z = Math.atan2(distY, distX) * 180 / Math.PI;

        let visible = Math.abs(distX) > wx * 1.5 || Math.abs(distY) > wy * 1.5;
        arrow.element.style.opacity = +visible;
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


function Explode()
{
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
}

let paused = true;
let cameraStyle = 0; // 0 - spawning, 1 - alive
function PhysicsStep()
{
    particleSystem.update(fixedDelta);

    if (paused)
    {
        return;
    }

    if (state === DEAD)
    {
        return;
    }

    const speed = 0.02;
    const mult = fixedDelta * speed;

    // camera
    {
        const maxDistance = 5;

        let tx = Clamp(Math.abs(cpx - circle.position.x), 0, maxDistance) / maxDistance;
        let ty = Clamp(Math.abs(cpy - circle.position.y), 0, maxDistance) / maxDistance;
        cpx = Lerp(cpx, circle.position.x, Lerp(falloff.easeInPoly(tx, 1.5), tx, cameraStyle));
        cpy = Lerp(cpy, circle.position.y, Lerp(falloff.easeInPoly(ty, 1.5), ty, cameraStyle));

        let posXspawning = cpx;
        let posYspawning = cpy;
        let posXalive = circle.position.x * 2 - cpx;
        let posYalive = circle.position.y * 2 - cpy;

        camera.position.x = Lerp(posXspawning, posXalive, falloff.smoothstep(cameraStyle));
        camera.position.y = Lerp(posYspawning, posYalive, falloff.smoothstep(cameraStyle));

        let j = 1 + Smoothstep(10, 25, Math.hypot(velocityX, velocityY)) * 0.5;
        zoom = Lerp(zoom, 1 / j, fixedDelta * 0.5);
    }

    if (state === ALIVE)
    {
        if (enterJustPressed)
        {
            Explode();
            return;
        }

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
            // const mass = 80;

            // just use the radius
            // const mass = planet.radius * 200;
            const mass = planet.mass;

            let magnitude = mass / distanceSq;

            let withinRange = Math.sqrt(distanceSq) < planet.radius + circle.radius + (planet.isCheckpoint && !planet.checkpointReached ? 0.05 : 0);

            if (withinRange)
            {
                if (planet.isCheckpoint && !planet.checkpointReached)
                {
                    state = SPAWNING;
                    velocityX = velocityY = 0;
                    LoadLevel(++currentLevelIdx + 1);
                    window.localStorage.setItem(localStorageSaveKey, currentLevelIdx);
                    PlayCheckpointSound();
                    boostActive = false;
                    totalBoost = levelData[currentLevelIdx].boost;
                    remainingBoost = totalBoost;
                    boostContainer.width = totalBoost * 10 + "vh";
                    UpdateRemainingBoost(0);
                    currentCheckpoint = planet;
                    planet.checkpointReached = true;
                    planet.element.style.filter = "hue-rotate(88deg)";
                    checkpointApproachT = 0;
                    checkpointApproachStartX = circle.position.x;
                    checkpointApproachStartY = circle.position.y;
                    checkpointApproachStartAngle = facingAngle;

                    const cameraTransitionTime = 2;
                    SetFixedTick(() =>
                    {
                        cameraStyle = Clamp(cameraStyle - fixedDelta / cameraTransitionTime, 0, 1);
                    }, cameraTransitionTime);

                    if (currentLevelIdx === levelData.length - 1)
                    {
                        paused = true;
                        SetFixedTimeout(() =>
                        {
                            document.getElementById("start-text").style.display = "none";
                            document.getElementById("game-completed").style.display = "";
                            overlay.classList.add("visible");
                        }, 0.5);

                        globalVolumeNode.gain.linearRampToValueAtTime(originalGlobalVolume, actx.currentTime);
                        globalVolumeNode.gain.linearRampToValueAtTime(0, actx.currentTime + 4);
                        originalGlobalVolume = 0;
                        globalVolume = 0;
                    }

                    return;
                }

                Explode();
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

            let mass = blackHole[2] * 2000;

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
        let angle = Math.atan2(circle.position.y - currentCheckpoint.position.y, circle.position.x - currentCheckpoint.position.x) + fixedDelta * 0.15 / currentCheckpoint.radius;
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

            const cameraTransitionTime = 3;
            SetFixedTick(() =>
            {
                cameraStyle = Clamp(cameraStyle + fixedDelta / cameraTransitionTime, 0, 1);
            }, cameraTransitionTime);
        }
    }

    circle.rotation.z = facingAngle * 180 / Math.PI;
}

window.requestAnimationFrame(Frame);

window.addEventListener("resize", () => scene.render());
