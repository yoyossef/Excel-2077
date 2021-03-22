import {ToolController} from '../controllers/ToolController.js'

AFRAME.registerComponent('select-tool', {
    schema: {
        color: {type:'color',default:'#FF0000'}
    },
    init: function () {
        //Setting 3D model
        this.geometry = new THREE.BoxBufferGeometry(1,1, 0);
        this.material = new THREE.MeshStandardMaterial({color: this.data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.el.setObject3D('mesh', this.mesh);

    },
    events: {
        click: function (evt) {
            if(!this.isToggled){
                this.enable();
            }
            else {
                this.disable();
            }
        }
    },
    isToggled: false,
    select: function(elt){
        console.log(elt);
        console.log(ToolController.toolMode);
    },
    enable: function (){
        ToolController.disableOtherTools('select-toeol');
        this.el.setAttribute('material','color', '#00FF00');
        this.isToggled=true;
        ToolController.toolMode='select';
    },
    disable: function(){
        this.el.setAttribute('material','color','#FF0000');
        this.isToggled=false;
        ToolController.toolMode ='none';
    }
});
