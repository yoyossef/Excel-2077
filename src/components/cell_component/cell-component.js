import {ToolController} from '../../controllers/ToolController.js'

AFRAME.registerComponent('cell', {
    schema: {
        message:    {type: 'string'},
        color:      {type: 'color', default: '#FFFFFF'},
        bgColor:    {type: 'color', default: '#FF0000'},
        cellH :     {type: 'number', default: 0.22},
        type :      {type: 'string'},

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

       /* this.el.setAttribute('animation__mouseenter', { property: 'position',
                                            to: {x:this.el.object3D.position.x, y: this.el.object3D.position.y, z: 0.1},
                                            dur: 150,
                                            startEvents: 'mouseenter'}); 

        this.el.setAttribute('animation__mouseenter2', { property: 'scale',
                                            to: {x:1.1, y:1.1, z: 1},
                                            dur: 150,
                                            startEvents: 'mouseenter'});  

        this.el.setAttribute('animation__mouseleave', { property: 'position',
                                            to: {x:this.el.object3D.position.x, y: this.el.object3D.position.y, z: 0},
                                            dur: 150,
                                            startEvents: 'mouseleave'});  

        this.el.setAttribute('animation__mouseleave2', { property: 'scale',
                                            to: {x:1, y: 1, z: 1},
                                            dur: 150,
                                            startEvents: 'mouseleave'});      */                              
    },
    events: {
        mouseenter: function (evt) {
            //this.el.setAttribute('material',{color: '#FF5100'});
        },
        mouseleave: function (evt) {
            //this.el.setAttribute('material',{color: this.data.bgColor});
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
