import {ToolController} from '../controllers/ToolController.js';
import {TableController} from '../controllers/TableController.js';
import {DataService} from '../services/DataService.js';

AFRAME.registerComponent('filter-tool', {
    schema: {
        color: {type:'color',default:'#FF0000'}
    },
    init: function () {
        //Setting 3D model
        this.mesh = new THREE.Mesh();
        this.el.setObject3D('mesh', this.mesh);
        this.el.setAttribute('class', 'links');

        this.el.setAttribute('text', {
            value: 'Filter',
            color: '#FFFFFF',
            align: 'center',
            wrapCount: 15,
            width: 0.20
        });

        this.el.setAttribute('geometry', {
            primitive: 'plane',
            height: 0.075,
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
    selectedItems: [],
    selectedColumns: [],
    enable: function (){
        ToolController.disableOtherTools('filter-tool');
        this.el.setAttribute('material','color', '#A9A9A9');
        this.isToggled=true;
        ToolController.toolMode='filter';
    },
    disable: function(){
        this.el.setAttribute('material','color','#222222');
        this.isToggled=false;
        ToolController.toolMode ='none';
        this.cancel();
    },
    confirm : function(){
        if(this.selectedColumns.length){
            DataService.select(this.selectedColumns);
            this.selectedItems = [];
            this.selectedColumns = [];
            this.disable();
        }
    },
    cancel : function(){
        while(this.selectedColumns.length){//Clearing columns selection
            this.selectColumn(this.selectedColumns[0]);
        }
    },

    selectColumn: function (elt){
        let idx
        let cells = TableController.getCellsByColumn(elt);
        
        if((idx = this.selectedColumns.findIndex(item => item == elt)) < 0){
            for(let cell of cells){
                cell.select();
                if(this.selectedItems.findIndex(item => item == elt) < 0){
                    this.selectedItems.push(cell.el.id);
                }
            }
            this.selectedColumns.push(elt);
        }
        else {
            let cellIdx;
            for(let cell of cells){
                cell.unselect();
                if((cellIdx = this.selectedItems.findIndex(item => item == cell.el.id)) >= 0){
                    this.selectedItems.splice(cellIdx,1);
                }
            }
            this.selectedColumns.splice(idx,1);
        }
    }
});
