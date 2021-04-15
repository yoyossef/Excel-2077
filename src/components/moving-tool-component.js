import {CameraController} from '../controllers/CameraController.js';

AFRAME.registerComponent('moving-tool', {
    schema: {
        color: {type:'color',default:'#0000FF'}
    },
    init: function () {

        let moveBtn = document.createElement("a-entity");
        moveBtn.setAttribute('position', '0 0.08 0');
        moveBtn.setAttribute('moving-tool-up',true);
        moveBtn.setAttribute('id', 'movingToolUp');
        this.el.appendChild(moveBtn);

        moveBtn = document.createElement("a-entity");
        moveBtn.setAttribute('position', '0 0 0');
        moveBtn.setAttribute('moving-tool-down',true);
        moveBtn.setAttribute('id', 'movingToolDown');
        this.el.appendChild(moveBtn);

    }
});
