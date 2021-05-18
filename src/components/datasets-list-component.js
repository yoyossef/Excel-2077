import {DataService} from '../services/DataService.js';
import {CameraController} from '../controllers/CameraController.js';

AFRAME.registerComponent('datasets-list', {
    schema: {
        name : {type:'string', default:''},
        command: {type:'string',default:''}
    },
    multiple: true,
    init: function () {
        this.el.setAttribute('visible',false);
    },
    show : function(){
        let newDatasetDetails;
        let nb = 0;
        let dataSets = Object.keys(DataService.data);
        for(let dataSet of dataSets){
            newDatasetDetails = document.createElement("a-entity");
            newDatasetDetails.setAttribute('dataset-details', 'name:'+dataSet+'; command: '+DataService.data[dataSet].command+';');
            newDatasetDetails.setAttribute('position',{y:-0.09*nb,z:-0.7},true);
            if(dataSet == DataService.displayedData){
                console.log("oui");
            }
            this.el.appendChild(newDatasetDetails);
            nb++;
            if(nb>3){
                break;
            }
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
    }
});
