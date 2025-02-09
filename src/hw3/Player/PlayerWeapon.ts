import Particle from "../../Wolfie2D/Nodes/Graphics/Particle";
import ParticleSystem from "../../Wolfie2D/Rendering/Animations/ParticleSystem";
import Color from "../../Wolfie2D/Utils/Color";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import RandUtils from "../../Wolfie2D/Utils/RandUtils";

import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Timer from "../../Wolfie2D/Timing/Timer";
import { HW3PhysicsGroups } from "../HW3PhysicsGroups";


/**
 * // TODO get the particles to move towards the mouse when the player attacks
 * 
 * The particle system used for the player's attack. Particles in the particle system should
 * be spawned at the player's position and fired in the direction of the mouse's position.
 */
export default class PlayerWeapon extends ParticleSystem {

    private faceDirection: Vec2;

    public getPool(): Readonly<Array<Particle>> {
        return this.particlePool;
    }

    /**
     * @returns true if the particle system is running; false otherwise.
     */
    public isSystemRunning(): boolean { return this.systemRunning; }

    /**
     * Sets the animations for a particle in the player's weapon
     * @param particle the particle to give the animation to
     */
    public setParticleAnimation(particle: Particle) {
        // Give the particle a random velocity.
        let fact = 2; // larger factor = wider and farther
        particle.vel = RandUtils.randVec(0, this.faceDirection.x*fact, 0, this.faceDirection.y*fact);
        particle.color = Color.RED;

        // took so long to realize i forgot this
        particle.setGroup(HW3PhysicsGroups.PLAYER_WEAPON);

        // Give the particle tweens
        particle.tweens.add("active", {
            startDelay: 0,
            duration: this.lifetime,
            effects: [
                {
                    property: "alpha",
                    start: 1,
                    end: 0,
                    ease: EaseFunctionType.IN_OUT_SINE
                }
            ]
        });
    }
    
    public startSystem(time: number, mass?: number, startPoint?: Vec2, faceDir?: Vec2) {
        this.faceDirection = faceDir.scale(100);
        this.stopSystem();

        this.systemLifetime = new Timer(time)

        if (mass !== undefined) {
            this.particleMass = mass;
        }

        if (startPoint !== undefined) {
            this.sourcePoint = startPoint;
        }

        this.systemLifetime.start();
        this.systemRunning = true;
        this.particlesToRender = this.particlesPerFrame;
    }
}