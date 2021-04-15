import {CameraController} from '../controllers/CameraController.js';

AFRAME.registerComponent('moving-tool-down', {
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
            value: "DW",
            color: '#FFFFFF',
            align: 'center',
            wrapCount: 15,
            width: 0.40
        });

        this.el.setAttribute('geometry', {
            primitive: 'plane',
            height: 0.08,
            width: 0.09
        });

        this.el.setAttribute('material', {
            color: '#111111',
            shader: 'flat',
            visible: true
        });

        this.el.setAttribute('material', {  color: '#111111',
                                            shader: 'flat',
                                            visible: true});

    },
    events: {
        click: function (evt) {
                CameraController.move('down');
        }
    }
});
