import {ToolController} from '../../controllers/ToolController.js'

AFRAME.registerComponent('cell', {
    schema: {
        message:    {type: 'string', default: 'Message par defaut'},
        color:      {type: 'color', default: '#FFFFFF'},
        bgColor:    {type: 'color', default: '#FF0000'}
    },
    init: function () {
        this.mesh = new THREE.Mesh();

        this.el.setObject3D('mesh', this.mesh);
        this.el.setAttribute('class', 'links');
        this.el.setAttribute('text', {  value: this.data.message,
                                        color: this.data.color,
                                        align: 'center',
                                        wrapCount: 20,
                                        width: 1});
        this.el.setAttribute('geometry', {  primitive: 'plane',
                                            height: 'auto',
                                            width: 'auto'});
        this.el.setAttribute('material', {  color: this.data.bgColor,
                                            shader: 'flat',
                                            visible: true});
    },
    events: {
        mouseenter: function (evt) {
            this.el.setAttribute('material',{color: '#FF5100'});
        },
        mouseleave: function (evt) {
            this.el.setAttribute('material',{color: this.data.bgColor});
        },
        click : function (evt) {
            switch(ToolController.toolMode){
                case 'select':
                let selectTool = document.getElementById('selectTool').components["select-tool"];
                selectTool.select(4);
                break;
            }
        }
    }
  });
