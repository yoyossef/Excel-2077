import { TableController } from './TableController.js';

export class CameraController {

    static moveDistance = TableController.cellHeight *20;
    static moveStep = 0.1;
    static verticalViewDistance = 2;

    static getCamera(){
        return document.getElementById('camera').components["camera"];
    }

    static getRig(){
        return document.getElementById('rig');
    }

    static getGroundGrid(){
        return document.getElementById('ground');
    }

    static logging() {
        console.log("Grid:");
        console.log(this.getGroundGrid().getAttribute('position'));
        const gridwp = new THREE.Vector3();
        this.getGroundGrid().object3D.getWorldPosition(gridwp);
        console.log(gridwp);
        console.log("Rig:");
        console.log(this.getRig().getAttribute('position'));
        const worldPosition = new THREE.Vector3();
        this.getRig().object3D.getWorldPosition(worldPosition);
        console.log(worldPosition);
        console.log("Camera:");
        console.log(this.getCamera().el.getAttribute('position'));
        const camWorldPosition = new THREE.Vector3();
        this.getCamera().el.object3D.getWorldPosition(camWorldPosition);
        console.log(camWorldPosition);
    }

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
        // this.logging();
    }

    static reset (axe) {
        let rig = this.getRig();
        let camera = this.getCamera();

        if(axe == 'vertical'){
            rig.setAttribute('position',{y:0},true);
        }
        else if (axe == 'horizontal'){
            rig.setAttribute('position',{x:0,z:0},true);
        }
        // this.logging();
    }

};
