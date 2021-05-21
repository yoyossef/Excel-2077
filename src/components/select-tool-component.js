import {ToolController} from '../controllers/ToolController.js';
import {TableController} from '../controllers/TableController.js';
import {DataService} from '../services/DataService.js';

/**
 * Tool corresponding to the select R command
 * @module select-tool-component
 * @category Components
*/
AFRAME.registerComponent('select-tool', {
    schema: {
        color: {type:'color',default:'#FF0000'}
    },
    init: function () {
        //Setting 3D model
        this.mesh = new THREE.Mesh();
        this.el.setObject3D('mesh', this.mesh);
        this.el.setAttribute('class', 'links');

        this.el.setAttribute('text', {
            value: 'Select',
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
    selectedColumns: [],
    /**
     * Enables the tool and calls the ToolController in oder to disable other tools
     */
    enable: function (){
        ToolController.disableOtherTools('select-tool');
        this.el.setAttribute('material','color', '#A9A9A9');
        this.isToggled=true;
        ToolController.toolMode='select';
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
     * If this.selectedColumns.length, calls the DataService.select(this.selectedColumns) method and this.disable()
     */
    confirm : function(){
        if(this.selectedColumns.length){
            DataService.select(this.selectedColumns);
            this.selectedColumns = [];
            this.disable();
        }
    },
    /**
     * Unselects all the columns by calling this.selectColumn()
     */
    cancel : function(){
        while(this.selectedColumns.length){//Clearing columns selection
            this.selectColumn(this.selectedColumns[0]);
        }
    },
    /**
     * Selects a column if it is not selected, unselects it otherwise
     * @param {int} elt the index of the column to select
     */
    selectColumn: function (elt){
        let idx
        let cells = TableController.getCellsByColumn(elt);
        if((idx = this.selectedColumns.findIndex(item => item == elt)) < 0){
            for(let cell of cells){
                cell.select();
            }
            this.selectedColumns.push(elt);
        }
        else {
            let cellIdx;
            for(let cell of cells){
                cell.unselect();
            }
            this.selectedColumns.splice(idx,1);
        }
    }
});
