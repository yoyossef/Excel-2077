import {ToolController} from '../../controllers/ToolController.js'

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
            if(!this.isSelected){
                this.el.setAttribute('material',{color: '#FF5100'});
            }
        },
        mouseleave: function (evt) {
            if(!this.isSelected){
                this.el.setAttribute('material',{color: this.data.bgColor});
            }
        },
        click : function (evt) {
            switch(ToolController.toolMode){
                case 'select':
                let selectTool = document.getElementById('selectTool').components["select-tool"];
                let hasBeenSelected = selectTool.select(this.el.id);
                if(hasBeenSelected){
                    this.el.setAttribute('material',{color: '#00FF00'});
                    this.isSelected = true;
                }
                else{
                    this.el.setAttribute('material',{color: this.data.bgColor});
                    this.isSelected=false;
                }
                break;
            }
        }
    },
    isSelected:false
  });
