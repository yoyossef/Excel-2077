export class ToolController {

    static toolMode = 'none';

    static disableOtherTools (toolToKeep) {
        if(toolToKeep != 'select-tool'){
            document.getElementById('selectTool').components['select-tool'].disable();
        }
        if(toolToKeep != 'group_by-tool'){
            document.getElementById('groupByTool').components['group_by-tool'].disable();
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
        }
        return res;
    }

};
