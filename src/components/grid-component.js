// import {CameraController} from '../controllers/CameraController.js';

AFRAME.registerComponent('grid-component', {
	schema: {
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
        color: {type: 'color', default: '#2c2f33'}
    },
	init: function () {
        const data = this.data;
        const el = this.el;    
        this.geometry = new THREE.PlaneBufferGeometry(data.width, data.height);
        this.geometry.rotateX(-Math.PI / 2);
        this.material = new THREE.MeshBasicMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);
		// this.tick = AFRAME.utils.throttleTick(this.tick, 25, this); //to only tick every 25ms (40 instead of 90 times per seconds)
	},

	// tick: function () {
    //     let el = this.el;    
    //     let rig = CameraController.getRig();
    //     // const camera = CameraController.getCamera();
	// 	this.el.setAttribute('position', {y: rig.getAttribute('position').y}, true);
	// }
});
