export class ToolController {

    static toolMode = 'none';

    static disableOtherTools (toolToKeep) {
        if(toolToKeep != 'select-tool'){
            document.getElementById('selectTool').components['select-tool'].disable();
        }
    }

    static refreshDetail(line,col,value,avg){
        document.getElementById('cell-details').components['cell-details'].refresh(line,col,value,avg);    
    }

    static turnOnOffDetails(){
        document.getElementById('cell-details').components['cell-details'].turnOnOff();    
    }

};
