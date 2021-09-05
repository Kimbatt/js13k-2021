
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
         * @type {Set<CSS3dObject>}
         */
        this.objects = new Set();

        this.element = document.createElement("div");
        document.body.appendChild(this.element);
        this.element.id = "scene";
    }

    /**
     * @param {CSS3dObject} obj
     */
    add(obj)
    {
        this.objects.add(obj);
        this.element.appendChild(obj.element);
    }

    /**
     * @param {CSS3dObject} obj
     */
    remove(obj)
    {
        this.objects.delete(obj);
        this.element.removeChild(obj.element);
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
    constructor(updateTransform = true)
    {
        this.element = document.createElement("div");
        // this.element.style.transformOrigin = "50% 50%";

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

        this.scale = 1;

        if (updateTransform)
        {
            this.updateTransform();
        }
    }

    updateTransform()
    {
        this.element.style.transform = `translate3d(${this.position.x * window.innerHeight}px, ${-this.position.y * window.innerHeight}px, ${this.position.z * window.innerHeight}px) rotateX(${this.rotation.x}deg) rotateY(${this.rotation.y}deg) rotateZ(${-this.rotation.z}deg) scale(${this.scale})`;
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

        this.radius = size / 2;
        this.circleElement = document.createElement("div");
        this.circleElement.style.borderRadius = "50%";
        this.circleElement.style.background = "radial-gradient(#0ff, #000)";
        this.circleElement.style.transform = "translate(-50%, -50%)";

        let arrow = document.createElement("div");
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttributeNS(null, "viewBox", "0 0 50 50");
        svg.setAttributeNS(null, "stroke-width", "1.5");
        svg.setAttributeNS(null, "stroke", "black");
        svg.setAttributeNS(null, "fill", "none");
        svg.setAttributeNS(null, "stroke-linecap", "round");
        svg.setAttributeNS(null, "stroke-linejoin", "round");

        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttributeNS(null, "fill", "red");
        path.setAttributeNS(null, "d", "M49.071 24.025l-.994-.984c-2.625-2.442-9.001-7.328-18.013-7.328-3.334.001-5.334.429-8.556.888L14.07 9.164.071 12.848v4.007l.525.262 7.536 3.768v8.229L.071 33.145v4.007l13.999 3.684 7.436-7.436c3.213.451 5.22.909 8.557.908 12.016 0 19.347-8.683 19.347-8.683l.518-.613-.52-.614s-.115-.135-.339-.373zm-10.432-1.04A2.84 2.84 0 0 1 39.473 25a2.85 2.85 0 0 1-2.85 2.85 2.85 2.85 0 0 1-2.85-2.85 2.85 2.85 0 0 1 2.85-2.85 2.84 2.84 0 0 1 2.015.834z");

        svg.appendChild(path);
        arrow.appendChild(svg);
        svg.style.transform = "translate(-50%, -50%)";

        this.styleUpdaterFunctions.push(() =>
        {
            this.circleElement.style.width = (size * window.innerHeight) + "px";
            this.circleElement.style.height = (size * window.innerHeight) + "px";

            svg.setAttributeNS(null, "width",  `${size * 1.5 * window.innerHeight}px`);
            svg.setAttributeNS(null, "height", `${size * 1.5 * window.innerHeight}px`);
        });

        this.element.appendChild(this.circleElement);
        this.element.appendChild(arrow);
        this.element.style.zIndex = "1";
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
