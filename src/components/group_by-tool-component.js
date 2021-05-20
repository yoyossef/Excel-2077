import {ToolController} from '../controllers/ToolController.js';
import {TableController} from '../controllers/TableController.js';
import {DataService} from '../services/DataService.js';

AFRAME.registerComponent('group_by-tool', {
    schema: {
        color: {type:'color',default:'#FF0000'}
    },
    init: function () {
        //Setting 3D model
        this.mesh = new THREE.Mesh();
        this.el.setObject3D('mesh', this.mesh);
        this.el.setAttribute('class', 'links');

        this.el.setAttribute('text', {
            value: 'Group_by',
            color: '#FFFFFF',
            align: 'center',
            wrapCount: 15,
            width: 0.20
        });

        this.el.setAttribute('geometry', {
            primitive: 'plane',
            height: 0.05,
            width: 'auto'
        });

        this.el.setAttribute('material', {
            color: '#222222',
            shader: 'flat',
            visible: true
        });

    },
    events: {
        click: function (evt) {
            if(!this.isToggled){
                this.enable();
            }
            else {
                this.disable();
            }
        }
    },


    isToggled: false,
    selectedColumn: null,
    /**
     * Enables the tool and calls the ToolController in oder to disable other tools
     */
    enable: function (){
        ToolController.disableOtherTools('group_by-tool');
        this.el.setAttribute('material','color', '#A9A9A9');
        this.isToggled=true;
        ToolController.toolMode='group_by';
    },
    /**
     * Disables the tool and calls it's cancel() method
     */
    disable: function(){
        this.el.setAttribute('material','color','#222222');
        this.isToggled=false;
        ToolController.toolMode ='none';
        this.cancel();
    },
    /**
     * If this.selectedColumn is not null, calls the DataService.group_by(this.selectedColumn) method and this.disable()
     */
    confirm : function(){
        if(this.selectedColumn != null){
            DataService.group_by(this.selectedColumn);
            this.selectedColumns = null;
            this.disable();
        }
    },
    /**
     * If this.selectedColumn is not null, unselects the column by calling this.selectColumn(this.selectedColumn)
     */
    cancel : function(){
        if(this.selectedColumn != null){//Clearing columns selection
            this.selectColumn(this.selectedColumn);
        }
    },
    /**
     * Selects the given column if it is not already selected, unselects it otherwise
     */
    selectColumn: function (elt){
        let idx
        let cells = TableController.getCellsByColumn(elt);
        if (elt != this.selectedColumn){ //Select the column
            if(this.selectedColumn != null){ //If another column is selected, unselect it
                let oldCells = TableController.getCellsByColumn(this.selectedColumn);
                for(let cell of oldCells){
                    cell.unselect();
                }
            }
            for(let cell of cells){
                cell.select();
            }
            this.selectedColumn= elt;
        }
        else { //Unselect the column
            for(let cell of cells){
                cell.unselect();
            }
            this.selectedColumn = null;
        }
    }
});
