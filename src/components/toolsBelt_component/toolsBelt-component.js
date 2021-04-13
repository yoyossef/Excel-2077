AFRAME.registerComponent('tools-belt', {
	schema: {},
	init: function () {
		this.el.setAttribute('geometry', {
			primitive: 'torus',
			radius: 1,
			radiusTubular: 0.1,
			arc: '360'
		});
		this.el.setAttribute('rotation', "-90 0 0");
		this.el.setAttribute('position', "0 -1 0");
	},
	update: function () { },
	tick: function () {
		let positionX = document.getElementById("camera").components["camera"].el.object3D.position.x;
		let positionY = document.getElementById("camera").components["camera"].el.object3D.position.y;
		let positionZ = document.getElementById("camera").components["camera"].el.object3D.position.z;
		let rotationX = document.getElementById("camera").components["camera"].el.object3D.rotation.x;
		// let rotationY = document.getElementById("camera").components["camera"].el.object3D.rotation.y;
		// let rotationZ = document.getElementById("camera").components["camera"].el.object3D.rotation.z;

		if (rotationX >= 0)
			this.el.setAttribute("visible", false);
		else
			this.el.setAttribute("visible", true);
		
		positionY -= 1;
		// rotationX -= 90;
		this.el.setAttribute('position', positionX + " " + positionY + " " + positionZ);
		// this.el.setAttribute('rotation', rotationX + " " + rotationY + " " + rotationZ);
	},
	remove: function () { },
	pause: function () { },
	play: function () { }
});