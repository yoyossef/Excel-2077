export class ToolController {

    toolMode = 'none';

    static disableOtherTools (toolToKeep) {
        if(toolToKeep != 'select-tool'){
            document.getElementById('selectTool').components['select-tool'].disable();
            console.log('disabling select');
        }
    }

};
