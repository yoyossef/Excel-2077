import {ToolController} from '../controllers/ToolController.js';
import {TableController} from '../controllers/TableController.js';
import {DataService} from '../services/DataService.js';

AFRAME.registerComponent('summarise-tool', {
    schema: {
        color: {type:'color',default:'#FF0000'}
    },
    init: function () {
        //Setting 3D model
        this.mesh = new THREE.Mesh();
        this.el.setObject3D('mesh', this.mesh);
        this.el.setAttribute('class', 'links');

        this.el.setAttribute('text', {
            value: 'Summarise',
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
    currentSummariseOperation : '',
    summariseObjects: [],
    /**
     * Enables the tool and calls the ToolController in oder to disable other tools and show the operations list
     */
    enable: function (){
        ToolController.disableOtherTools('summarise-tool');
        this.el.setAttribute('material','color', '#A9A9A9');
        this.isToggled=true;
        ToolController.toolMode='summarise';
        ToolController.showOperationsList();
    },
    /**
     * Disables the tool and calls it's cancel() method then hide the operations list
     */
    disable: function(){
        this.el.setAttribute('material','color','#222222');
        this.isToggled=false;
        ToolController.toolMode ='none';
        this.cancel();
        ToolController.hideOperationsList();
    },
    /**
     * If this.summariseObjects.length, calls the DataService.summarise(this.summariseObjects) method and this.disable()
     */
    confirm : function(){
        if(this.summariseObjects.length){
            DataService.summarise(this.summariseObjects);
            this.summariseObjects = [];
            this.disable();
        }
    },
    /**
     * Resets all operations by calling this.removeOperation()
     */
    cancel : function(){
        this.currentSummariseOperation = '';
        while(this.summariseObjects.length){//Clearing columns selection
            this.removeOperation(this.summariseObjects[0].operation);
        }
        ToolController.refreshOperationsList();
    },
    /**
     * Selects a column if this.currentSummariseOperation != '' (ie: if the currently building operation needs a column)
     * @param {int} elt the index of the column to select
     */
    selectColumn: function (elt){
        if(this.currentSummariseOperation != ''){//Can only select a column if there is an operation selected
            let idx
            let cells = TableController.getCellsByColumn(elt);
            if(true){
                for(let cell of cells){
                    cell.select();
                }
                this.summariseObjects.push({operation:this.currentSummariseOperation,colIndex:elt});
                ToolController.validateOperation(this.currentSummariseOperation,DataService.getColumnName(elt));
                this.currentSummariseOperation = '';
            }
        }
    },
    /**
     * Selects/unselects an operation
     * @param {string} operationName the operation to select/unselect
     * @return {boolean} true if the operation has been selected, false otherwise (unselected or not selected)
     */
    selectOperation : function(operationName){
        let res = false;
        if(this.summariseObjects.findIndex(item => item.operation == operationName) >-1){ //if operation is already used => unselect
            this.removeOperation(operationName);
        }
        else if (operationName == this.currentSummariseOperation) { //if the operation is partially selected, clean the currentSummariseOperation value
            this.currentSummariseOperation = '';
        }
        else if(this.currentSummariseOperation == ''){//Can only select an operation if there is no other operation partially selected
            if(operationName == 'n'){//No column needed
                this.summariseObjects.push({operation:operationName,colIndex:-1});
            }
            else {//Column needed
                this.currentSummariseOperation = operationName;
            }
            res = true;
        }
        return res;
    },
    /**
     * Removes an operation from this.summariseObjects and unselects the related column if it not used by another operation
     * @param {string} operationName the name of the operation to remove
     */
    removeOperation: function(operationName){
        let operationIndex = this.summariseObjects.findIndex(item => item.operation == operationName);
        if( operationIndex > -1 ){
            if(this.summariseObjects[operationIndex].colIndex > -1){
                //If column isn't used by another operation, unselect cells
                if(this.summariseObjects.findIndex(item => item.operation != operationName && item.colIndex == this.summariseObjects[operationIndex].colIndex) <0){
                    let cells = TableController.getCellsByColumn(this.summariseObjects[operationIndex].colIndex);
                    for(let cell of cells){
                        cell.unselect();
                    }
                }

            }
            this.summariseObjects.splice(operationIndex,1);
        }
    }
});
