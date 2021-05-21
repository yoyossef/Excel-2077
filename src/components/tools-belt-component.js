import {CameraController} from '../controllers/CameraController.js';

/**
 * The main interface component that enables the user to select tools
 * @module tools-belt-component
 * @category Components
*/

AFRAME.registerComponent('tools-belt', {
	schema: {},
	init: function () {
		this.el.setAttribute('rotation', "-65 0 0");
		this.tick = AFRAME.utils.throttleTick(this.tick, 25, this); //to only tick every 25ms (40 instead of 90 times per seconds)
	},

	/**
	 * Makes sure to position the belt following the camera's, and toggle its visibility when rotating the camera down or up
	 * with a specified angle around the x axis
	 */
	tick: function () {
		let camera = CameraController.getCamera();
		let position = Object.assign({},camera.el.getAttribute('position')); //cloning camera position
		let rotation = camera.el.getAttribute('rotation');//cloning camera rotation

		if (rotation.x >= -40){
			this.el.setAttribute("visible", false);
			this.el.setAttribute('rotation',{y:rotation.y},true); //Comment this line if you want to use the belt with the mouse
		}else{
			this.el.setAttribute("visible", true);
		}

		position.y -= 1.4;
		this.el.setAttribute('position', position);
	}
});
