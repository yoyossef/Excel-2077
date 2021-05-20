import {ToolController} from '../controllers/ToolController.js';

/**
 * @module details-button-component
 * @category Component
*/
AFRAME.registerComponent('details-button', {
    schema: {
        enable : {type: 'boolean', default: false}
    },

    init: function () {
        this.mesh = new THREE.Mesh();
        this.el.setObject3D('mesh', this.mesh);
        this.el.setAttribute('class', 'links');

        this.el.setAttribute('text', {
            value: 'Cell details',
            color: '#FFFFFF',
            align: 'center',
            wrapCount: 15,
            width: 0.15
        });

        this.el.setAttribute('geometry', {
            primitive: 'plane',
            height: 0.05,
            width: 'auto'
        });

        this.el.setAttribute('material', {
            color: '#222222',
            shader: 'flat',
            visible: true
        });
    },

    events: {
        click : function (evt) {
            let c;
            this.data.enable = ! this.data.enable;
            if (this.data.enable)
                c = '#2c9b3c'
            else
                c = '#222222'

            this.el.setAttribute('material', {
                color: c,
            });

            ToolController.turnOnOffDetails();

        }
    },

});
