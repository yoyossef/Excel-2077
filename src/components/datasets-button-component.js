import {ToolController} from '../controllers/ToolController.js';

/**
 * @module datasets-button-component
 * @category Components
*/
AFRAME.registerComponent('datasets-button', {
    schema: {
    },
    isToggled: false,
    init: function () {
        this.mesh = new THREE.Mesh();
        this.el.setObject3D('mesh', this.mesh);
        this.el.setAttribute('class', 'links');

        this.el.setAttribute('text', {
            value: 'Datasets list',
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
            this.isToggled = !this.isToggled;
            let datasetsList = document.getElementById('datasetsList').components['datasets-list'];
            if (this.isToggled){
                c = '#2c9b3c';
                datasetsList.show();
            }
            else{
                c = '#222222';
                datasetsList.hide();
            }

            this.el.setAttribute('material', {
                color: c,
            });



        }
    },

});
