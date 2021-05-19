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
    enable: function (){
        ToolController.disableOtherTools('summarise-tool');
        this.el.setAttribute('material','color', '#A9A9A9');
        this.isToggled=true;
        ToolController.toolMode='summarise';
        ToolController.showOperationsList();
    },
    disable: function(){
        this.el.setAttribute('material','color','#222222');
        this.isToggled=false;
        ToolController.toolMode ='none';
        this.cancel();
        ToolController.hideOperationsList();
    },
    confirm : function(){
        if(this.summariseObjects.length){
            DataService.summarise(this.summariseObjects);
            this.summariseObjects = [];
            this.disable();
        }
    },
    cancel : function(){
        this.currentSummariseOperation = '';
        while(this.summariseObjects.length){//Clearing columns selection
            this.removeOperation(this.summariseObjects[0].operation);
        }
        ToolController.refreshOperationsList();
    },
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
