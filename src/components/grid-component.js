AFRAME.registerComponent('grid', {
	schema: {
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
    },
	init: function () {
        const data = this.data;
        const el = this.el;    
        this.geometry = new THREE.PlaneBufferGeometry(data.width, data.height);
        this.geometry.rotateX(-Math.PI / 2);
        this.material = new THREE.MeshBasicMaterial();
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);
	},

	tick: function () {
	}
});
