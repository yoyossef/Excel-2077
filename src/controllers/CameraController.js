export class CameraController {

    static moveDistance = 0.22 *5;
    static step = 0.1;

    static getCamera(){
        return document.getElementById('camera').components["camera"];
    }

    static async move (direction) {
        let camera = this.getCamera();
        //console.log(camera.el);
        let directionAffect = 0;
        if(direction == 'up'){
            directionAffect = 1;
        }
        else if (direction == 'down'){
            directionAffect = -1;
        }
        for(let i = 0; i<this.moveDistance;i+=this.step){
            camera.el.setAttribute('position',{x:camera.el.object3D.position.x ,y:camera.el.object3D.position.y +  (this.step * directionAffect), z:camera.el.object3D.position.z});
            await new Promise(done => setTimeout(() => done(), 5));
        }
    }

};
