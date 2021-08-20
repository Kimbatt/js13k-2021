
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
        this.scene.element.style.transform = `translate3d(${-this.position.x}vh, ${this.position.y}vh, ${-this.position.z}vh)`;
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
        this.element.style.transform = `rotateX(${this.rotation.x}deg) rotateY(${this.rotation.y}deg) rotateZ(${this.rotation.z}deg) translate3d(${this.position.x}vh, ${this.position.y}vh, ${this.position.z}vh)`;
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
        this.circleElement.style.width = size + "vh";
        this.circleElement.style.height = size + "vh";
        this.circleElement.style.borderRadius = "50%";
        this.circleElement.style.background = "radial-gradient(#0ff, #000)";
        this.circleElement.style.transform = "translate(-50%, -50%)";

        this.element.appendChild(this.circleElement);
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

        this.element.style.animation = "rot 4s linear infinite";

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
            side.style.width = size + "vh";
            side.style.height = size + "vh";
            side.style.background = "radial-gradient(#00f, #f00)";
            side.style.transform = `translate(-50%, -50%) translate3d(${mult0*size}vh, ${mult1*size}vh, ${mult2*size}vh) rotate3d(${rot}, ${angle}deg)`;
            this.element.appendChild(side);
        };

        createSide(0, 0, 0.5, "0,1,0", 0);
        createSide(0, 0, -0.5, "0,1,0", 180);
        createSide(0, 0.5, 0, "1,0,0", -90);
        createSide(0, -0.5, 0, "1,0,0", 90);
        createSide(0.5, 0, 0, "0,1,0", 90);
        createSide(-0.5, 0, 0, "0,1,0", -90);
    }
}


(() =>
{

let scene = new CSS3dScene();
let camera = scene.camera;

let cube = new CSS3dCube(10);
scene.add(cube);

let circle = new CSS3dCircle(10);
scene.add(circle);


/**
 * @type { {[key: string]: boolean} }
 */
let keymap = {};
window.addEventListener("keydown", ev =>
{
    if (!ev.repeat)
    {
        keymap[ev.key] = true;
    }
});

window.addEventListener("keyup", ev =>
{
    if (!ev.repeat)
    {
        keymap[ev.key] = false;
    }
});

/**
 * @param {number} time
 */
let lastTime = 0;
function Frame(time)
{
    time /= 1000;
    let delta = time - lastTime;
    lastTime = time;
    window.requestAnimationFrame(Frame);

    const speed = 0.1;

    const multiplier = speed * delta * 400;
    let x = 0;
    let y = 0;

    if (keymap["a"]) x -= 1;
    if (keymap["d"]) x += 1;
    if (keymap["w"]) y += 1;
    if (keymap["s"]) y -= 1;

    camera.position.x += x * multiplier;
    camera.position.y += y * multiplier;

    circle.position.x = Math.cos(time * 2) * 30;
    circle.position.y = Math.sin(time * 2) * 30;
    cube.rotation.y = time * 50;

    scene.render();
}

window.requestAnimationFrame(Frame);

})();
