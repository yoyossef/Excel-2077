import {CameraController} from '../controllers/CameraController.js';

/**
 * Tool that calls corresponding methods to reset camera horizontal's position
 * @module moving-tool-hreset-component
 * @category Components
*/
AFRAME.registerComponent('moving-tool-hreset', {
    schema: {
        color: {type:'color',default:'#0000FF'}
    },
    init: function () {
        //Setting 3D model
        this.mesh = new THREE.Mesh();
        this.el.setObject3D('mesh', this.mesh);
        this.el.setAttribute('class', 'links');

        this.el.setAttribute('text', {
            value: "CE",
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
                CameraController.reset('horizontal');
        }
    }
});
