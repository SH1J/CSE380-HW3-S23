import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { PlayerAnimations, PlayerTweens } from "../PlayerController";
import PlayerState from "./PlayerState";

import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import { AnimationState } from "../../../Wolfie2D/Rendering/Animations/AnimationTypes";

//
import { HW3Events } from "../../HW3Events";

/**
 * The Dead state for the player's FSM AI. 
 */
export default class Dead extends PlayerState {

    // Trigger the player's death animation when we enter the dead state
    public onEnter(options: Record<string, any>): void {
        let dyingSOUND = this.owner.getScene().getDyingKey();

        // sound is very low compared to menu music...
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: dyingSOUND, loop: false, holdReference: false});

        this.owner.animation.playIfNotAlready(PlayerAnimations.DYING, false);
        this.owner.animation.queue(PlayerAnimations.DEAD, false, HW3Events.PLAYER_DEAD);

        // throws an error since my death animation is only 1 frame
        //this.owner.tweens.play(PlayerTweens.DEATH);
    }

    // Ignore all events from the rest of the game
    public handleInput(event: GameEvent): void { }

    // Empty update method - if the player is dead, don't update anything
    public update(deltaT: number): void {}

    public onExit(): Record<string, any> { return {}; }
    
}