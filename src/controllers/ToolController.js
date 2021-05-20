/**
 * The main interface component that enables the user to select tools
 * @module tools-belt-component
 * @category Controller
*/

export class ToolController {

    static toolMode = 'none';

    /**
     * Calls the 'disable()' method of all tools except the one given in parameter
     * @param {string} toolToKeep the name of the tool to keep (to not disable)
     */
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

    /**
     * Gets the component of the currently activated tool
     * @return {Aframe-component} the component of the currently activated tool (or null if none is active)
     */
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

    /**
     * Validates the 'summarise' operation so the related component knows that it is valid
     * @param {string} operationName the operation's name
     * @param {string} columnName used to transmit the used column's name to the 'summarise-component' (default '')
     */
    static validateOperation(operationName, columnName = ''){
        let operationComponent = document.getElementById(operationName).components['summarise-operation'];
        if(operationComponent){
            operationComponent.validate(columnName);
        }
    }

    /**
     * Calls the 'show()' method of the 'summarise-operations-list' component
     */
    static showOperationsList(){
        document.getElementById('summariseOperationsList').components['summarise-operations-list'].show();
    }

    /**
     * Calls the 'hide()' method of the 'summarise-operations-list' component
     */
    static hideOperationsList(){
        document.getElementById('summariseOperationsList').components['summarise-operations-list'].hide();
    }

    /**
     * Calls the 'refresh()' method of the 'summarise-operations-list' component
     */
    static refreshOperationsList(){
        document.getElementById('summariseOperationsList').components['summarise-operations-list'].refresh();
    }

};
