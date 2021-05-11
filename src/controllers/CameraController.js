export class CameraController {

    static moveDistance = 0.22 *20;
    static step = 0.1;
    static verticalViewDistance = 2;

    static getCamera(){
        return document.getElementById('camera').components["camera"];
    }

    static getRig(){
        return document.getElementById('rig');
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
        for(let i = 0; i<this.moveDistance;i+=this.step){
            rig.setAttribute('position',{x:rig.getAttribute('position').x ,y:rig.getAttribute('position').y +  (this.step * directionAffect), z:rig.getAttribute('position').z});
            await new Promise(done => setTimeout(() => done(), 5));
        }
    }

};
