import { TableController } from './TableController.js';

export class CameraController {

    static moveDistance = TableController.cellHeight *20;
    static moveStep = 0.1;
    static verticalViewDistance = 2;

    /**
     * Gets the camera-component of the scene
     * @return {camera-component} the camera of the scene
     */
    static getCamera(){
        return document.getElementById('camera').components["camera"];
    }

    /**
     * Gets the rig element of the scene (area containing camera, controllers, tool-belt, ...)
     * @return {Html element} the rig
     */
    static getRig(){
        return document.getElementById('rig');
    }

    /**
     * Moves the rig smoothly in the given vertical direction (rig includes camera)
     * @param {'up' | 'down'} direction the vertical direction of the movement
     */
    static async move (direction) {
        let rig = this.getRig();
        let directionAffect = 0;
        if(direction == 'up'){
            directionAffect = 1;
        }
        else if (direction == 'down'){
            directionAffect = -1;
        }
        for(let i = 0; i<this.moveDistance;i+=this.moveStep){
            rig.setAttribute('position',{x:rig.getAttribute('position').x ,y:rig.getAttribute('position').y +  (this.moveStep * directionAffect), z:rig.getAttribute('position').z});
            await new Promise(done => setTimeout(() => done(), 5));
        }
    }

    /**
     * Resets rig's position position in the given axe (rig includes camera)
     * @param {'vertical' | 'horizontal'} axe the axe to reset position of (y or x+z)
     */
    static reset (axe) {
        let rig = this.getRig();
        let camera = this.getCamera();

        if(axe == 'vertical'){
            rig.setAttribute('position',{y:0},true);
        }
        else if (axe == 'horizontal'){
            rig.setAttribute('position',{x:0,z:0},true);
        }
    }

};
