import {CameraController} from '../controllers/CameraController.js';
import {TableController} from '../controllers/TableController.js';

/**
 * @module moving-tool-up-component
 * @category Components
*/
AFRAME.registerComponent('moving-tool-up', {
    schema: {
        color: {type:'color',default:'#0000FF'}
    },
    init: function () {
        //Setting 3D model
        // this.geometry = new THREE.BoxBufferGeometry(0.2,0.2, 0);
        // this.material = new THREE.MeshStandardMaterial({color: this.data.color});
        // this.mesh = new THREE.Mesh(this.geometry, this.material);
        // this.el.setObject3D('mesh', this.mesh);
        this.mesh = new THREE.Mesh();
        this.el.setObject3D('mesh', this.mesh);
        this.el.setAttribute('class', 'links');

        this.el.setAttribute('text', {
            value: "UP",
            color: '#FFFFFF',
            align: 'center',
            wrapCount: 15,
            width: 0.20
        });

        this.el.setAttribute('geometry', {
            primitive: 'plane',
            height: 0.04,
            width: 0.045
        });

        this.el.setAttribute('material', {
            color: '#222222',
            shader: 'flat',
            visible: true
        });

    },
    events: {
        click: function (evt) {
                CameraController.move('up');
                TableController.moveHeaders('up');
        }
    }
});
