import {CameraController} from '../controllers/CameraController.js';

AFRAME.registerComponent('moving-tool', {
    schema: {
        color: {type:'color',default:'#0000FF'}
    },
    init: function () {
        //Setting 3D model
        this.geometry = new THREE.BoxBufferGeometry(0.2,0.2, 0);
        this.material = new THREE.MeshStandardMaterial({color: this.data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.el.setObject3D('mesh', this.mesh);

    },
    events: {
        click: function (evt) {
                CameraController.move('down');
        }
    },


    isToggled: false
});
