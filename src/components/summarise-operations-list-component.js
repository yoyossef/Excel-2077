import {DataService} from '../services/DataService.js';
import {CameraController} from '../controllers/CameraController.js';

AFRAME.registerComponent('summarise-operations-list', {
    schema: {
        name : {type:'string', default:''},
        command: {type:'string',default:''}
    },
    multiple: true,
    operationsList: [['n',false],['mean',true],['min',true],['max',true]],// [name, needColumn?]
    init: function () {
        this.el.setAttribute('visible',false);
    },
    show : function(){
        let newSummariseOperation;
        for(let i = 0; i<this.operationsList.length;i++){
            newSummariseOperation = document.createElement("a-entity");
            newSummariseOperation.setAttribute('summarise-operation', 'name:'+this.operationsList[i][0]+'; needsColumn: '+(this.operationsList[i][1]));
            newSummariseOperation.setAttribute('position',{y:-0.09*(i),z:-0.7},true);
            newSummariseOperation.setAttribute('class', 'links');
            newSummariseOperation.setAttribute('id',this.operationsList[i][0]);

            this.el.appendChild(newSummariseOperation);
        }
        let camera = CameraController.getCamera();
		let position = Object.assign({},camera.el.getAttribute('position')); //cloning camera position
		let rotation = camera.el.getAttribute('rotation');//cloning camera rotation
		this.el.setAttribute('position', position);
        this.el.setAttribute('rotation',{y:rotation.y},true);
        this.el.setAttribute('visible',true);

    },
    hide : function(){
        while (this.el.firstChild) {
            this.el.removeChild(this.el.lastChild);
        }
        this.el.setAttribute('visible',false);
    },
    refresh: function(){
        this.hide();
        this.show();
    }
});
