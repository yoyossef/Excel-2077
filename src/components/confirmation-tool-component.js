import {ToolController} from '../controllers/ToolController.js';

/**
 * @module confirmation-tool-component
 * @category Component
*/
AFRAME.registerComponent('confirmation-tool', {
    schema: {
        color: {type:'color',default:'#0000FF'},
        type: {type:'string',default:'confirm'}
    },
    init: function () {
        //Setting 3D model
        this.mesh = new THREE.Mesh();
        this.el.setObject3D('mesh', this.mesh);
        this.el.setAttribute('class', 'links');

        let text,color;
        switch(this.data.type){
            case 'confirm':
                text = 'GO';
                color = '#00FF00';
            break;
            case 'cancel':
                text = 'X';
                color = '#FF0000';
            break;
            default:
                text = 'I';
                color = '#FFFFFF';
        }

        this.el.setAttribute('text', {
            value: text,
            color: color,
            align: 'center',
            wrapCount: 15,
            width: 0.2
        });

        this.el.setAttribute('geometry', {
            primitive: 'plane',
            height: 0.04,
            width: 0.045
        });

        this.el.setAttribute('material', {
            color: '#222222',
            shader: 'flat',
            visible: true
        });
        this.tick = AFRAME.utils.throttleTick(this.tick, 200, this); //to only tick every 200ms (5 instead of 90 times per seconds)

    },
    tick : function(){
            if(ToolController.toolMode != 'none'){
                this.el.setAttribute("visible", true);
            }
            else{
                this.el.setAttribute("visible", false);
            }
    },
    events: {
        click: function (evt) {
                let tool = ToolController.getActiveTool();
                if(tool){
                    switch(this.data.type){
                        case 'confirm':
                            tool.confirm();
                        break;
                        case 'cancel':
                            tool.cancel();
                        break;
                    }
                }
        }
    }
});
