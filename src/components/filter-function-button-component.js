import {ToolController} from '../controllers/ToolController.js';
import {TableController} from '../controllers/TableController.js';

AFRAME.registerComponent('filter-function-button', {
    schema: {
        message: { type: 'string' },
        color: { type: 'color', default: '#222222' },
        enable : {type: 'boolean', default: true}
    },

    init: function () {
        this.mesh = new THREE.Mesh();
        this.el.setObject3D('mesh', this.mesh);
        this.el.setAttribute('class', 'links');

        this.el.setAttribute('text', {
            value: this.data.message,
            color: '#FFFFFF',
            align: 'center',
            wrapCount: 3,
            width: 0.06
        });

        this.el.setAttribute('geometry', {
            primitive: 'plane',
            height: 0.03,
            width: 0.06
        });

        this.el.setAttribute('material', {
            color: this.data.color,
            shader: 'flat',
            visible: true
        });
    },

    events: {
        click : function (evt) {
            if (this.data.enable){
                var el =document.getElementById('filters-manager');
                let childrens = el.childNodes;
                for (var i = 0; i < childrens.length; i++) {
                    childrens[i].components["filter-function-button"].data.enable = true;
                    childrens[i].setAttribute('material', {
                        color: '#222222',
                        shader: 'flat',
                        visible: true
                    });
                }
                this.data.enable = false;
                this.el.setAttribute('material', {
                    color: '#A9A9A9',
                    shader: 'flat',
                    visible: true
                });

            }
        }
    },

    isSelected:false,
});
