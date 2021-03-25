import {ToolController} from '../../controllers/ToolController.js'
import {ApiService} from '../../services/ApiService.js'

AFRAME.registerComponent('cell', {
    schema: {
        message:    {type: 'string'},
        color:      {type: 'color', default: '#FFFFFF'},
        bgColor:    {type: 'color', default: '#FF0000'},
        cellH :     {type: 'number', default: 0.22}
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
                                            height: this.data.cellH,
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
                case 'none':
                    ApiService.rCommandPOST("x", "read.table", "D:\ClicDeclic\Documents\Cours\M2\rserver\custom_datast_new.csv ,header=T, sep=\",\"");
                    break;
            }
        }
    }
  });
