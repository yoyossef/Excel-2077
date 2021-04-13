import {ToolController} from '../../controllers/ToolController.js'

AFRAME.registerComponent('cell', {
    schema: {
        message:    {type: 'string'},
        color:      {type: 'color', default: '#FFFFFF'},
        bgColor:    {type: 'color', default: '#FF0000'},
        cellH :     {type: 'number', default: 0.22},
        type :      {type: 'string'},
        position :  {type: 'array'},
        angle :     {type: 'number'}
    },
    init: function () {
        var mode = this.el.parentNode.getAttribute('table').mode;
        this.data.position=[this.el.object3D.position.x,this.el.object3D.position.y,this.el.object3D.position.z];
       
        var zoomedPos= new Array(3);

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
                                
        // Position animation
        switch (mode){
            case 1: //wall
                zoomedPos = [this.data.position[0],this.data.position[1],this.data.position[2]+0.1];    
                break;
            case 2: //cylinder
            case 3: 
                var radius =  this.el.parentNode.getAttribute('table').radius-0.1; 
                var x = radius * Math.sin(Math.PI * 2 * this.data.angle / 360);
                var z = ( radius * Math.cos(Math.PI * 2 *  this.data.angle / 360) ) * -1;
                zoomedPos = [parseFloat(x).toFixed(3),this.data.position[1],parseFloat(z).toFixed(3)];
                break;      
        }   

        this.el.setAttribute('animation__positionEnter', { property: 'position',
                                            to: {x: zoomedPos[0], y: zoomedPos[1], z: zoomedPos[2]},
                                            dur: 150,
                                            startEvents: 'mouseenter'}); 

        this.el.setAttribute('animation__positionLeave', { property: 'position',
                                            to: {x: this.data.position[0], y: this.data.position[1], z: this.data.position[2]},
                                            dur: 150,
                                            startEvents: 'mouseleave'});  

        // Scale animation
        this.el.setAttribute('animation__scaleEnter', { property: 'scale',
                to: {x:1.1, y:1.1, z: 1},
                dur: 150,
                startEvents: 'mouseenter'});                                      

        this.el.setAttribute('animation__scaleLeave', { property: 'scale',
                to: {x:1, y: 1, z: 1},
                dur: 150,
                startEvents: 'mouseleave'});   
                               
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
