export class ToolController {

    toolMode = 'none';

    disableOtherTools = function (toolToKeep) {
        if(toolToKeep != 'select-tool'){
            document.getElementById('selectTool').components['select-tool'].disable();
            console.log('disabling select');
        }
    }

};
