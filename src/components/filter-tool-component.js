import {ToolController} from '../controllers/ToolController.js';
import {TableController} from '../controllers/TableController.js';
import {DataService} from '../services/DataService.js';

/**
 * @module filter-tool-component
 * @category Component
*/
AFRAME.registerComponent('filter-tool', {
    schema: {
        color: {type:'color',default:'#FF0000'}
    },

    isToggled: false,
    selectedColumns: [],
    tripletList: [],


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

    addTriplet: function(col,op,arg){
        let triplet = {col,op,arg};
        this.tripletList.push(triplet);
    },

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
            DataService.filter(this.tripletList);
            this.selectedColumns = [];
            this.tripletList=[];
            this.disable();
        }
    },
    cancel : function(){
        while(this.selectedColumns.length){//Clearing columns selection
            this.selectColumn(this.selectedColumns[0]);
        }
        this.tripletList=[];
    },

    selectColumn: function (elt){
        let idx;
        let header = TableController.getHeader(elt);
        if((idx = this.selectedColumns.findIndex(item => item == elt)) < 0){
            let selectedHeader;
            for (let idHeader of this.selectedColumns){
                selectedHeader = TableController.getHeader(idHeader);
                selectedHeader.unselect();
            }
            header.select();
            this.selectedColumns.push(elt);
            let filterManager = document.getElementById('filters-manager').components["filters-manager"];
            filterManager.disable();
            filterManager.enable();
            filterManager.choosenCol = header;
        }
        else {
            header.unselect();
            this.selectedColumns.splice(idx,1);
            let filterManager = document.getElementById('filters-manager').components["filters-manager"];
            filterManager.disable();
            filterManager.choosenCol = '';
        }
    },
});
