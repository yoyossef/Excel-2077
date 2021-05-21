import {ToolController} from '../controllers/ToolController.js';
import {TableController} from '../controllers/TableController.js';

/**
 * A-frame component that displays a button
 * @module display-button-component
 * @category Components
*/
AFRAME.registerComponent('display-button', {
    schema: {
        message: { type: 'string' },
        color: { type: 'color', default: '#222222' },
        type: { type: 'string' },
        position: { type: 'array' },
        enable : {type: 'boolean', default: true}
    },

    init: function () {
        this.data.position=[this.el.object3D.position.x,this.el.object3D.position.y,this.el.object3D.position.z];
        this.mesh = new THREE.Mesh();
        this.el.setObject3D('mesh', this.mesh);
        this.el.setAttribute('class', 'links');

        this.el.setAttribute('text', {
            value: this.data.message,
            color: '#FFFFFF',
            align: 'center',
            wrapCount: 15,
            width: 0.20
        });

        this.el.setAttribute('geometry', {
            primitive: 'plane',
            height: 0.075,
            width: 'auto'
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
                var el =document.getElementById('display-manager');
                let childrens = el.childNodes;
                for (var i = 0; i < childrens.length; i++) {
                    childrens[i].components["display-button"].data.enable = true;
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

                TableController.changeDisplayMode(this.data.type);
            }
        }
    },

    isSelected:false,

    move : function(x,y,z){
        this.el.object3D.position.x = x ;
        this.el.object3D.position.y = y ;
        this.el.object3D.position.z = z ;
        this.data.position=[x,y,z];
    }
});
