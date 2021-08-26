
class Particle extends CSS3dObject
{
    /**
     * @param {HTMLElement} element
     * @param {(p: Particle) => ((delta: number) => void)} setUpDate
     */
    constructor(element, setUpDate)
    {
        super();

        this.element.appendChild(element);
        element.style.transform = "translate(-50%, -50%)";

        this.alive = true;
        this.age = 0;
        this.sizeX = 1;
        this.sizeY = 1;
        this.update = setUpDate(this);

        this.styleUpdaterFunctions.push(() =>
        {
            element.style.width = (window.innerHeight * this.sizeX) + "px";
            element.style.height = (window.innerHeight * this.sizeY) + "px";
        });

        this.update(0);
    }
}

class ParticleSystem
{
    /**
     * @param {CSS3dScene} scene
     * @param {HTMLElement} particleTemplate
     * @param {(p: Particle) => ((delta: number) => void)} setUpDate
     */
    constructor(scene, particleTemplate, setUpDate)
    {
        this.scene = scene;
        this.particleTemplate = particleTemplate;
        this.particlesPerSecond = 0;
        this.particlesToCreate = 0;

        /**
         * @type {Set<Particle>}
         */
        this.particles = new Set();

        this.setUpDate = setUpDate;
    }

    createParticles(count = 1)
    {
        for (let i = 0; i < count; ++i)
        {
            let particle = new Particle(this.particleTemplate.cloneNode(true), this.setUpDate);
            this.scene.add(particle);
            this.particles.add(particle);
        }
    }

    /**
     * @param {number} fixedDelta
     */
    update(fixedDelta)
    {
        for (let particle of this.particles)
        {
            particle.age += fixedDelta;
            particle.update(fixedDelta);
            if (!particle.alive)
            {
                this.particles.delete(particle);
                this.scene.remove(particle);
            }
        }

        this.particlesToCreate += fixedDelta * this.particlesPerSecond;
        while (this.particlesToCreate >= 1)
        {
            --this.particlesToCreate;
            this.createParticles();
        }
    }
}
