import { ToolController } from '../controllers/ToolController.js';
import { TableController } from '../controllers/TableController.js';
import { CameraController } from '../controllers/CameraController.js';

AFRAME.registerComponent('cell', {
    schema: {
        fulldata: { type: 'string' },
        color: { type: 'color', default: '#FFFFFF' },
        bgColor: { type: 'color', default: '#FF0000' },
        cellH: { type: 'number', default: TableController.cellHeight },
        cellW: { type: 'number', default: TableController.cellWidth},
        type: { type: 'string' },
        position: { type: 'array' },
        angle: { type: 'number' }
    },

    init: function() {
        this.data.position = [this.el.object3D.position.x, this.el.object3D.position.y, this.el.object3D.position.z];
        this.mesh = new THREE.Mesh();
        this.el.setObject3D('mesh', this.mesh);
        this.el.setAttribute('class', 'links');

        this.el.setAttribute('text', {
            value: this.data.fulldata.substring(0,20),
            color: this.data.color,
            align: 'center',
            wrapCount: 20,
            width: this.data.cellW
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
        this.tick = AFRAME.utils.throttleTick(this.tick, 50, this); //to only tick every 50ms (20 instead of 90 times per seconds)

    },

    tick : function(){
        let camera = CameraController.getRig();
        let position = camera.getAttribute('position');
        if(this.el.object3D.position.y > position.y + CameraController.verticalViewDistance
          || this.el.object3D.position.y < position.y - CameraController.verticalViewDistance){
            this.el.setAttribute('visible',false);
        }
        else {
            this.el.setAttribute('visible',true);
        }
    },

    events: {

        /**
         * handle the click event for a cell. (Handle the different tools)
         */
        click: function(evt) {
            switch (ToolController.toolMode) {
                case 'select':
                    let selectTool = document.getElementById('selectTool').components["select-tool"];
                    if (this.data.type == 'header') {
                        let hasBeenSelected = selectTool.selectColumn(this.el.id.split(',')[0]);
                    }
                break;
                case 'group_by':
                    let groupByTool = document.getElementById('groupByTool').components["group_by-tool"];
                    if (this.data.type == 'header') {
                        let hasBeenSelected = groupByTool.selectColumn(this.el.id.split(',')[0]);
                    }
                break;
                case 'filter':
                    let filterTool = document.getElementById('filterTool').components["filter-tool"];
                    if (this.data.type == 'header') {
                        let hasBeenSelected = filterTool.selectColumn(this.el.id.split(',')[0]);
                    }
                break;
                case 'summarise':
                let summariseTool = document.getElementById('summariseTool').components["summarise-tool"];
                    if (this.data.type == 'header') {
                        let hasBeenSelected = summariseTool.selectColumn(this.el.id.split(',')[0]);
                    }
                break;
            }

            // informations for the cell details tool
            let str = this.el.id;
            let char = str.split(',');
            let line = Number(char[1])+1;
            let col =  Number(char[0])+1;
            ToolController.refreshDetail(line,col,this.data.fulldata,'');
        }
    },

    isSelected: false,

    /**
     * Select a cell and change his color
     */
    select: function() {
        if (this.data.type == 'header') {
            this.el.setAttribute('material', { color: '#009900' });
        } else {
            this.el.setAttribute('material', { color: '#00FF00' });
        }
        this.isSelected = true;
    },

    /**
     * Unselect a cell and change his color
     */
    unselect: function() {
        this.el.setAttribute('material', { color: this.data.bgColor });
        this.isSelected = false;
    },

    /**
     * Set the zoom animation for a cell depending of the display method (Wall , cylinder or Half-Cylinder).
     */
    setZoom: function() {

        let zoomedPos = new Array(3);

        // Computin the position animation
        switch (TableController.displayMode) {
            case "Wall":
                if(this.data.type == 'header'){
                    zoomedPos = [this.data.position[0], this.data.position[1], this.data.position[2] + 0.25];
                }
                else {
                    zoomedPos = [this.data.position[0], this.data.position[1], this.data.position[2] + 0.05];
                }
                break;
            case "HalfCylinder":
            case "Cylinder":
                var radius = this.el.parentNode.getAttribute('table').radius - 0.05;
                if(this.data.type == 'header'){
                    radius-=0.2
                }
                var x = radius * Math.sin(Math.PI * 2 * this.data.angle / 360);
                var z = (radius * Math.cos(Math.PI * 2 * this.data.angle / 360)) * -1;
                zoomedPos = [parseFloat(x).toFixed(3), this.data.position[1], parseFloat(z).toFixed(3)];
                break;
        }

        //set the animation
        this.el.setAttribute('animation__positionEnter', {
            property: 'position',
            to: { x: zoomedPos[0], y: zoomedPos[1], z: zoomedPos[2] },
            dur: 150,
            startEvents: 'mouseenter'
        });

        this.el.setAttribute('animation__positionLeave', {
            property: 'position',
            to: { x: this.data.position[0], y: this.data.position[1], z: this.data.position[2] },
            dur: 150,
            startEvents: 'mouseleave'
        });
    },

    /**
     * Moove this cell and recompute the zoom animation.
     * @param {float} x x position 
     * @param {float} y y position 
     * @param {float} z z position 
     */
    move: function(x, y, z) {
        this.el.object3D.position.x = x;
        this.el.object3D.position.y = y;
        this.el.object3D.position.z = z;
        this.data.position = [x, y, z];
        this.setZoom();
    }
});
