import {DataService} from '../services/DataService.js';
import {CameraController} from '../controllers/CameraController.js';

/**
 * @module datasets-list-component
 * @category Component
*/
AFRAME.registerComponent('datasets-list', {
    schema: {
        name : {type:'string', default:''},
        command: {type:'string',default:''}
    },
    multiple: true,
    init: function () {
        this.el.setAttribute('visible',false);
    },
    /**
     * Sets the component's visible attribute to true and creates a dataset-details for each DataService.data elements
     */
    show : function(){
        let newDatasetDetails;
        let dataSets = Object.keys(DataService.data);
        for(let i = dataSets.length-1; i>-1; i--){
            newDatasetDetails = document.createElement("a-entity");
            newDatasetDetails.setAttribute('dataset-details', 'name:'+dataSets[i]+'; command: '+DataService.data[dataSets[i]].command+'; isCurrentlyDisplayed: '+(dataSets[i] == DataService.displayedData));
            newDatasetDetails.setAttribute('position',{y:-0.09*(dataSets.length-1-i),z:-0.7},true);
            newDatasetDetails.setAttribute('class', 'links');

            this.el.appendChild(newDatasetDetails);
        }
        let camera = CameraController.getCamera();
		let position = Object.assign({},camera.el.getAttribute('position')); //cloning camera position
		let rotation = camera.el.getAttribute('rotation');//cloning camera rotation
		this.el.setAttribute('position', position);
        this.el.setAttribute('rotation',{y:rotation.y},true);
        this.el.setAttribute('visible',true);

    },
    /**
     * Destroys component's children (dataset-details-component) and set it's visible attribute to false
     */
    hide : function(){
        while (this.el.firstChild) {
            this.el.removeChild(this.el.lastChild);
        }
        this.el.setAttribute('visible',false);
    }
});
