import {CameraController} from '../controllers/CameraController.js';

/**
 * @module moving-tool-component
 * @category Component
*/
AFRAME.registerComponent('moving-tool', {
    schema: {
        color: {type:'color',default:'#0000FF'}
    },
    init: function () {

        let moveBtn = document.createElement("a-entity");
        moveBtn.setAttribute('position', '0 0.04 0');
        moveBtn.setAttribute('moving-tool-up',true);
        moveBtn.setAttribute('id', 'movingToolUp');
        this.el.setAttribute('class', 'links');
        this.el.appendChild(moveBtn);

        moveBtn = document.createElement("a-entity");
        moveBtn.setAttribute('position', '0 0 0');
        moveBtn.setAttribute('moving-tool-down',true);
        moveBtn.setAttribute('id', 'movingToolDown');
        this.el.setAttribute('class', 'links');
        this.el.appendChild(moveBtn);

        moveBtn = document.createElement("a-entity");
        moveBtn.setAttribute('position', '0.05 0.04 0');
        moveBtn.setAttribute('moving-tool-vreset',true);
        moveBtn.setAttribute('id', 'movingToolVreset');
        this.el.setAttribute('class', 'links');
        this.el.appendChild(moveBtn);

        moveBtn = document.createElement("a-entity");
        moveBtn.setAttribute('position', '0.05 0 0');
        moveBtn.setAttribute('moving-tool-hreset',true);
        moveBtn.setAttribute('id', 'movingToolHreset');
        this.el.setAttribute('class', 'links');
        this.el.appendChild(moveBtn);

    }
});
