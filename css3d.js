
class CSS3dCamera
{
    /**
     * @param {CSS3dScene} scene
     */
    constructor(scene)
    {
        this.scene = scene;

        this.position = {
            x: 0,
            y: 0,
            z: 0
        };
    }

    updateTransform()
    {
        this.scene.element.style.transform = `translate3d(${-this.position.x * window.innerHeight}px, ${this.position.y * window.innerHeight}px, ${-this.position.z * window.innerHeight}px)`;
    }
}

class CSS3dScene
{
    constructor()
    {
        this.camera = new CSS3dCamera(this);

        /**
         * @type {CSS3dObject[]}
         */
        this.objects = [];

        this.element = document.createElement("div");
        document.body.appendChild(this.element);
        this.element.id = "scene";
    }

    /**
     * @param {CSS3dObject} obj
     */
    add(obj)
    {
        this.objects.push(obj);
        this.element.appendChild(obj.element);
    }

    render()
    {
        this.element.style.left = (window.innerWidth * 0.5) + "px";
        this.element.style.top = (window.innerHeight * 0.5) + "px";

        this.camera.updateTransform();
        this.objects.forEach(obj => obj.updateTransform());
    }
}

class CSS3dObject
{
    constructor()
    {
        this.element = document.createElement("div");
        this.element.style.transformOrigin = "50% 50%";

        /**
         * @type {(() => void)[]}
         */
        this.styleUpdaterFunctions = [];

        this.position = {
            x: 0,
            y: 0,
            z: 0
        };

        this.rotation = {
            x: 0,
            y: 0,
            z: 0
        };

        this.updateTransform();
    }

    updateTransform()
    {
        this.element.style.transform = `translate3d(${this.position.x * window.innerHeight}px, ${-this.position.y * window.innerHeight}px, ${this.position.z * window.innerHeight}px) rotateX(${this.rotation.x}deg) rotateY(${this.rotation.y}deg) rotateZ(${this.rotation.z}deg)`;
        this.styleUpdaterFunctions.forEach(fn => fn());
    }
}

class CSS3dCircle extends CSS3dObject
{
    /**
     * @param {number} size
     */
    constructor(size)
    {
        super();

        this.circleElement = document.createElement("div");
        this.circleElement.style.borderRadius = "50%";
        this.circleElement.style.background = "radial-gradient(#0ff, #000)";
        this.circleElement.style.transform = "translate(-50%, -50%)";

        this.styleUpdaterFunctions.push(() =>
        {
            this.circleElement.style.width = (size * window.innerHeight) + "px";
            this.circleElement.style.height = (size * window.innerHeight) + "px";
        });

        this.element.appendChild(this.circleElement);
        this.updateTransform();
    }
}

class CSS3dCube extends CSS3dObject
{
    /**
     * @param {number} size
     */
    constructor(size)
    {
        super();

        this.sideUpdaters = [];

        /**
         * @param {number} mult0
         * @param {number} mult1
         * @param {number} mult2
         * @param {string} rot
         * @param {number} angle
         */
        let createSide = (mult0, mult1, mult2, rot, angle) =>
        {
            let side = document.createElement("div");
            side.style.background = "radial-gradient(#00f, #f00)";
            this.element.appendChild(side);

            this.styleUpdaterFunctions.push(() =>
            {
                side.style.width = (size * window.innerHeight) + "px";
                side.style.height = (size * window.innerHeight) + "px";
                side.style.transform = `translate(-50%, -50%) translate3d(${mult0*size * window.innerHeight}px, ${mult1*size * window.innerHeight}px, ${mult2*size * window.innerHeight}px) rotate3d(${rot}, ${angle}deg)`;
            });
        };

        createSide(0, 0, 0.5, "0,1,0", 0);
        createSide(0, 0, -0.5, "0,1,0", 180);
        createSide(0, 0.5, 0, "1,0,0", -90);
        createSide(0, -0.5, 0, "1,0,0", 90);
        createSide(0.5, 0, 0, "0,1,0", 90);
        createSide(-0.5, 0, 0, "0,1,0", -90);

        this.updateTransform();
    }
}


(() =>
{

let scene = new CSS3dScene();
let camera = scene.camera;

/**
 * @type {CSS3dCube[]}
 */
let cubes = [];

function CreateCube(px, py, size)
{
    let cube = new CSS3dCube(size);
    cube.position.x = px;
    cube.position.y = py;
    scene.add(cube);
    cubes.push(cube);
}

CreateCube(0, 0, 0.05);
// CreateCube(0.2, 0.2, 0.05);

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


    for (const cube of cubes)
    {
        cube.rotation.y = time * 50;
    }

    while (accumulatedTime > 0)
    {
        accumulatedTime -= fixedDelta;
        PhysicsStep();
    }

    scene.render();
}

let velocityX = 2;
let velocityY = 0;
function PhysicsStep()
{
    const speed = 0.1;
    const mult = fixedDelta * speed;
    for (const cube of cubes)
    {
        let dirX = cube.position.x - circle.position.x;
        let dirY = cube.position.y - circle.position.y;

        // TODO?: use planet radius here
        let distanceSq = Math.max(1, dirX * dirX + dirY * dirY);
        // distanceSq = Math.sqrt(distanceSq);
        const param = 10;
        let magnitude = param / distanceSq;


        velocityX += dirX * magnitude * mult;
        velocityY += dirY * magnitude * mult;
    }

    // velocityX *= 0.999;

    circle.position.x += velocityX * mult;
    circle.position.y += velocityY * mult;
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
