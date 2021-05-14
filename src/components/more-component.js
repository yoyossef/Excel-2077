import {CameraController} from '../controllers/CameraController.js';
import {TableController} from '../controllers/TableController.js';

AFRAME.registerComponent('more', {
    schema: {
        direction: {type:'string', default: 'down'}
    },
    init: function () {
        if(this.data.direction == 'up'){
            this.el.setAttribute('rotation',{x:-90},true);
        }
        else{
            this.el.setAttribute('rotation',{x:90},true);
        }
        this.resetPosition();
        this.defineShape();
    },
    resetPosition : function(){
        if(this.data.direction == 'up'){
            this.el.setAttribute('position',{x:0,y:CameraController.verticalViewDistance+0.2,z:0});
        }
        else{
            this.el.setAttribute('position',{x:0,y:-(CameraController.verticalViewDistance+0.2),z:0});
        }
    },
    defineShape: function(){
        while (this.el.firstChild) {
            this.el.removeChild(this.el.lastChild);
        }
        let ring;
        switch(TableController.displayMode){
            case 'Wall':
                let x,y,width;
                x = (TableController.nbrCol * TableController.cellWidth)/2 - (TableController.cellWidth/2);
                width = TableController.nbrCol * TableController.cellWidth
                if(this.data.direction == 'up'){//handling rotation
                    y = 3;
                }
                else{
                    y = -3;
                }
                ring = document.createElement('a-entity');
                ring.setAttribute('position',{x:x,y:y,z:0});
                ring.setAttribute('rotation',{x:90},true);
                ring.setAttribute('geometry', {
                    primitive: 'plane',
                    height: TableController.cellHeight,
                    width: width
                });
                ring.setAttribute('material', {
                    color: '#DCDCDC',
                    shader: 'flat',
                    side: 'double',
                    visible: true
                });
                this.el.appendChild(ring);

                ring = document.createElement('a-entity');
                ring.setAttribute('position',{x:x,y:y,z:0.8});
                ring.setAttribute('rotation',{x:90},true);
                ring.setAttribute('geometry', {
                    primitive: 'plane',
                    height: TableController.cellHeight,
                    width: width
                });
                ring.setAttribute('material', {
                    color: '#D9D9D9',
                    shader: 'flat',
                    side: 'double',
                    visible: true
                });
                this.el.appendChild(ring);

                ring = document.createElement('a-entity');
                ring.setAttribute('position',{x:x,y:y,z:1.6});
                ring.setAttribute('rotation',{x:90},true);
                ring.setAttribute('geometry', {
                    primitive: 'plane',
                    height: TableController.cellHeight,
                    width: width
                });
                ring.setAttribute('material', {
                    color: '#D9D9D9',
                    shader: 'flat',
                    side: 'double',
                    visible: true
                });
                this.el.appendChild(ring);
            break;
            case 'HalfCylinder':
                let correction;
                if(this.data.direction == 'up'){
                    correction = 3;
                }
                else{
                    correction = -3
                }
                ring = document.createElement('a-entity');
                ring.setAttribute('position',{x:0,y:0,z:0});
                ring.setAttribute('geometry', {
                    primitive: 'ring',
                    radiusInner: TableController.tableRadius - 0.1,
                    radiusOuter: TableController.tableRadius,
                    thetaLength: 180,
                    thetaStart:-90 + correction
                });
                ring.setAttribute('material', {
                    color: '#DCDCDC',
                    shader: 'flat',
                    side: 'double',
                    visible: true
                });
                this.el.appendChild(ring);

                ring = document.createElement('a-entity');
                ring.setAttribute('position',{x:0,y:0,z:0.8});
                ring.setAttribute('geometry', {
                    primitive: 'ring',
                    radiusInner: (TableController.tableRadius)*0.9 - 0.1,
                    radiusOuter: (TableController.tableRadius)*0.9,
                    thetaLength: 180,
                    thetaStart:-90 + correction
                });
                ring.setAttribute('material', {
                    color: '#D9D9D9',
                    shader: 'flat',
                    side: 'double',
                    visible: true
                });
                this.el.appendChild(ring);

                ring = document.createElement('a-entity');
                ring.setAttribute('position',{x:0,y:0,z:1.6});
                ring.setAttribute('geometry', {
                    primitive: 'ring',
                    radiusInner: (TableController.tableRadius)*0.85 - 0.1,
                    radiusOuter: (TableController.tableRadius)*0.85,
                    thetaLength: 180,
                    thetaStart:-90 + correction
                });
                ring.setAttribute('material', {
                    color: '#D9D9D9',
                    shader: 'flat',
                    side: 'double',
                    visible: true
                });
                this.el.appendChild(ring);
            break;

            case 'Cylinder':
                ring = document.createElement('a-entity');
                ring.setAttribute('position',{x:0,y:0,z:0});
                ring.setAttribute('geometry', {
                    primitive: 'ring',
                    radiusInner: TableController.tableRadius - 0.1,
                    radiusOuter: TableController.tableRadius
                });
                ring.setAttribute('material', {
                    color: '#DCDCDC',
                    shader: 'flat',
                    side: 'double',
                    visible: true
                });
                this.el.appendChild(ring);

                ring = document.createElement('a-entity');
                ring.setAttribute('position',{x:0,y:0,z:0.8});
                ring.setAttribute('geometry', {
                    primitive: 'ring',
                    radiusInner: (TableController.tableRadius)*0.75 - 0.1,
                    radiusOuter: (TableController.tableRadius)*0.75
                });
                ring.setAttribute('material', {
                    color: '#D9D9D9',
                    shader: 'flat',
                    side: 'double',
                    visible: true
                });
                this.el.appendChild(ring);

                ring = document.createElement('a-entity');
                ring.setAttribute('position',{x:0,y:0,z:1.6});
                ring.setAttribute('geometry', {
                    primitive: 'ring',
                    radiusInner: (TableController.tableRadius)*0.5625 - 0.1,
                    radiusOuter: (TableController.tableRadius)*0.5625
                });
                ring.setAttribute('material', {
                    color: '#D9D9D9',
                    shader: 'flat',
                    side: 'double',
                    visible: true
                });
                this.el.appendChild(ring);
            break;
        }
    }
});
