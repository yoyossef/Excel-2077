export class ToolController {

    static toolMode = 'none';

    static disableOtherTools (toolToKeep) {
        if(toolToKeep != 'select-tool'){
            document.getElementById('selectTool').components['select-tool'].disable();
        }
    }

    static getActiveTool(){
        let res =null;
        switch(ToolController.toolMode){
            case 'select':
                res = document.getElementById('selectTool').components['select-tool'];
            break;
        }
        return res;
    }

};
