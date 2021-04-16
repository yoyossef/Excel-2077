import {ToolController} from '../controllers/ToolController.js';
import {TableController} from '../controllers/TableController.js';

AFRAME.registerComponent('cell', {
    schema: {
        fulldata: { type: 'string' },
        color: { type: 'color', default: '#FFFFFF' },
        bgColor: { type: 'color', default: '#FF0000' },
        cellH: { type: 'number', default: 0.22 },
        type: { type: 'string' },
        position: { type: 'array' },
        angle: { type: 'number' }
    },

    init: function () {
        this.data.position=[this.el.object3D.position.x,this.el.object3D.position.y,this.el.object3D.position.z];
        this.mesh = new THREE.Mesh();
        this.el.setObject3D('mesh', this.mesh);
        this.el.setAttribute('class', 'links');

        this.el.setAttribute('text', {
            value: this.data.fulldata.substring(0,20),
            color: this.data.color,
            align: 'center',
            wrapCount: 20,
            width: 1
        });

        this.el.setAttribute('geometry', {
            primitive: 'plane',
            height: this.data.cellH,
            width: 'auto'
        });

        this.el.setAttribute('material', {
            color: this.data.bgColor,
            shader: 'flat',
            visible: true
        });

        this.el.setAttribute('material', {  color: this.data.bgColor,
                                            shader: 'flat',
                                            visible: true});

        // Scale animation
        this.el.setAttribute('animation__scaleEnter', {
            property: 'scale',
            to: { x: 1.1, y: 1.1, z: 1 },
            dur: 150,
            startEvents: 'mouseenter'
        });

        this.el.setAttribute('animation__scaleLeave', {
            property: 'scale',
            to: { x: 1, y: 1, z: 1 },
            dur: 150,
            startEvents: 'mouseleave'
        });
        
        this.setZoom();
                               
    },

    events: {
        click : function (evt) {
            switch(ToolController.toolMode){
                case 'select':
                    let selectTool = document.getElementById('selectTool').components["select-tool"];
                    if (this.data.type == 'data') {
                        let hasBeenSelected = selectTool.selectCell(this.el.id);
                        if (hasBeenSelected) {
                            this.select();
                        } else {
                            this.unselect();
                        }
                    } else if (this.data.type == 'header') {
                        let hasBeenSelected = selectTool.selectColumn(this.el.id.split(',')[0]);
                    }

                    break;

                    /*
                    case 'none':
                        ApiService.rCommandPOST("x", "read.table", "\"D:/ClicDeclic/Documents/Cours/M2/rservercustom_datast_new.csv\" ,header=T, sep=\",\"");
                        break;
                    */
            }
        }
    },

    isSelected:false,

    select: function(){
        if(this.data.type == 'header'){
            this.el.setAttribute('material',{color: '#009900'});
        }
        else {
            this.el.setAttribute('material',{color: '#00FF00'});
        }
        this.isSelected = true;
    },

    unselect : function(){
        this.el.setAttribute('material',{color: this.data.bgColor});
        this.isSelected=false;
    },

    setZoom : function() {
        
        let zoomedPos = new Array(3); 

        // Position animation
        switch (TableController.displayMode){
            case "Wall": 
                zoomedPos = [this.data.position[0],this.data.position[1],this.data.position[2]+0.05]; 
                break;
            case "HalfCylinder": 
            case "Cylinder": 
                var radius =  this.el.parentNode.getAttribute('table').radius-0.05; 
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
    },

    move : function(x,y,z){
        this.el.object3D.position.x = x ;
        this.el.object3D.position.y = y ;
        this.el.object3D.position.z = z ;
        this.data.position=[x,y,z];
        this.setZoom();
    }
});