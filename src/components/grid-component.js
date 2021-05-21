/**
 * Creates the component's mesh and rotates it to be parallel to the ground.
 * It is used as the collision entity for the teleport-controls component, to have a "ground" where to teleport 
 *  even when ascending/descending with the move function from the cameraController
 * @module grid-component
 * @category Components
*/
AFRAME.registerComponent('grid-component', {
	schema: {
        width: { type: 'number', default: 10 },
        height: { type: 'number', default: 10 },
        },
	init: function () {
        const data = this.data;
        const el = this.el;    
        this.geometry = new THREE.PlaneBufferGeometry(data.width, data.height);
        this.geometry.rotateX(-Math.PI / 2);
        this.material = new THREE.MeshBasicMaterial({transparent: true, opacity: 0.0});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);
	},
});
