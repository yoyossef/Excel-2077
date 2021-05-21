/**
 * Aframe component that handle the filter tool 
 * @module filter-tool-component
 * @category Components
*/

import {ToolController} from '../controllers/ToolController.js';
import {TableController} from '../controllers/TableController.js';
import {DataService} from '../services/DataService.js';

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

    /**
     * Adding triplet to the command to execute
     * @param {string} col name of the column to be filtered
     * @param {string} op operator
     * @param {string} arg argument for the operator
     */
    addTriplet: function(col,op,arg){
        let triplet = {col,op,arg};
        this.tripletList.push(triplet);
    },

    /**
     * Enable the filter tool and disabling the other
     */
    enable: function (){
        ToolController.disableOtherTools('filter-tool');
        this.el.setAttribute('material','color', '#A9A9A9');
        this.isToggled=true;
        ToolController.toolMode='filter';
    },

    /**
     * Disable the filter tool and canceling the actual process for the tool.
     */
    disable: function(){
        this.el.setAttribute('material','color','#222222');
        this.isToggled=false;
        ToolController.toolMode ='none';
        this.cancel();
    },

    /**
     * Confirm and execute the command using the triplet buffer.
     */
    confirm : function(){
        if(this.selectedColumns.length){
            DataService.filter(this.tripletList);
            this.selectedColumns = [];
            this.tripletList=[];
            this.disable();
        }
    },

    /**
     * Canceling the actual process for the tool (empty the tripletList for the command execution).
     */
    cancel : function(){
        while(this.selectedColumns.length){//Clearing columns selection
            this.selectColumn(this.selectedColumns[0]);
        }
        this.tripletList=[];
    },

    /**
     * Select the header of the column and store into the buffer. Enable the filters-manager (filter button and keyboard).
     */
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
