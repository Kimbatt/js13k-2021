
let zoom = 1;
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
        this.scene.element.style.transform = `scale(${zoom}) translate3d(${-this.position.x * WindowSize()}px, ${this.position.y * WindowSize()}px, ${-this.position.z * WindowSize()}px)`;
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
        this.element.style.transform = `translate3d(${this.position.x * WindowSize()}px, ${-this.position.y * WindowSize()}px, ${this.position.z * WindowSize()}px) rotateX(${this.rotation.x}deg) rotateY(${this.rotation.y}deg) rotateZ(${-this.rotation.z}deg) scale(${this.scale})`;
        this.styleUpdaterFunctions.forEach(fn => fn());
    }
}

class CSS3dSpaceShip extends CSS3dObject
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

        let svg = document.getElementById("ship");

        this.styleUpdaterFunctions.push(() =>
        {
            this.circleElement.style.width = (size * WindowSize()) + "px";
            this.circleElement.style.height = (size * WindowSize()) + "px";

            svg.style.width = `${size * 1.5 * WindowSize()}px`;
            svg.style.height = `${size * 1.5 * WindowSize()}px`;
            // svg.setAttributeNS(null, "width",  `${size * 1.5 * WindowSize()}px`);
            // svg.setAttributeNS(null, "height", `${size * 1.5 * WindowSize()}px`);
        });

        // this.element.appendChild(this.circleElement);
        this.element.appendChild(svg);
        this.element.style.zIndex = "1";
        this.updateTransform();
    }
}

class CSS3dArrow extends CSS3dObject
{
    constructor()
    {
        super();
        this.element.className = "arrow";

        let size = 0.1;

        let arrow = document.createElement("div");
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttributeNS(null, "viewBox", "0 0 8 8");
        svg.setAttributeNS(null, "stroke-width", "0.5");
        svg.setAttributeNS(null, "stroke", "#0cf");
        svg.setAttributeNS(null, "fill", "#bff");
        svg.setAttributeNS(null, "stroke-linecap", "round");
        svg.setAttributeNS(null, "stroke-linejoin", "round");

        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttributeNS(null, "d", "M2 2L6 4L2 6L3 4Z");

        svg.appendChild(path);
        arrow.appendChild(svg);
        svg.style.transform = "translate(-50%, -50%)";

        this.styleUpdaterFunctions.push(() =>
        {
            svg.setAttributeNS(null, "width",  `${size * WindowSize()}px`);
            svg.setAttributeNS(null, "height", `${size * WindowSize()}px`);
        });

        this.element.appendChild(arrow);
        this.element.style.zIndex = "2";
        this.element.style.opacity = 0;
        this.updateTransform();
    }
}
