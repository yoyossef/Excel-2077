import {CameraController} from '../../controllers/CameraController.js';

AFRAME.registerComponent('tools-belt', {
	schema: {},
	init: function () {
		// this.el.setAttribute('geometry', {
		// 	primitive: 'torus',
		// 	radius: 1,
		// 	radiusTubular: 0.1,
		// 	arc: '360'
		// });
		this.el.setAttribute('rotation', "-90 0 0");
	},
	tick: function () {
		let camera = CameraController.getCamera();
		let position = Object.assign({},camera.el.getAttribute('position')); //cloning camera position
	    let rotation = camera.el.getAttribute('rotation');//cloning camera rotation

		if (rotation.x >= -40)
			this.el.setAttribute("visible", false);
		else
			this.el.setAttribute("visible", true);

		position.y -= 1.4;
		this.el.setAttribute('position', position);
		this.el.setAttribute('rotation',{y:rotation.y},true); //Comment this line if you want to use the belt with the mouse
	}
});
