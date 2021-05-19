export class ToolController {

    static toolMode = 'none';

    static disableOtherTools (toolToKeep) {
        if(toolToKeep != 'select-tool'){
            document.getElementById('selectTool').components['select-tool'].disable();
        }
        if(toolToKeep != 'group_by-tool'){
            document.getElementById('groupByTool').components['group_by-tool'].disable();
        }
        if(toolToKeep != 'filter-tool'){
            document.getElementById('filterTool').components['filter-tool'].disable();
        }
        if(toolToKeep != 'summarise-tool'){
            document.getElementById('summariseTool').components['summarise-tool'].disable();
        }
    }

    static getActiveTool(){
        let res =null;
        switch(ToolController.toolMode){
            case 'select':
                res = document.getElementById('selectTool').components['select-tool'];
            break;
            case 'group_by':
                res = document.getElementById('groupByTool').components['group_by-tool'];
            break;
            case 'filter':
                res = document.getElementById('filterTool').components['filter-tool'];
            break;
            case 'summarise':
                res = document.getElementById('summariseTool').components['summarise-tool'];
            break;
        }
        return res;
    }

    static refreshDetail(line,col,value,avg){
        document.getElementById('cell-details').components['cell-details'].refresh(line,col,value,avg);
    }

    static turnOnOffDetails(){
        document.getElementById('cell-details').components['cell-details'].turnOnOff();
    }

    static validateOperation(operationName, columnName = ''){
        let operationComponent = document.getElementById(operationName).components['summarise-operation'];
        if(operationComponent){
            operationComponent.validate(columnName);
        }
    }

    static showOperationsList(){
        document.getElementById('summariseOperationsList').components['summarise-operations-list'].show();
    }

    static hideOperationsList(){
        document.getElementById('summariseOperationsList').components['summarise-operations-list'].hide();
    }

    static refreshOperationsList(){
        document.getElementById('summariseOperationsList').components['summarise-operations-list'].refresh();
    }

};
