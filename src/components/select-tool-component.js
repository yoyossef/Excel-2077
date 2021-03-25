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
    selectedItems: [],
    enable: function (){
        ToolController.disableOtherTools('select-tool');
        this.el.setAttribute('material','color', '#00FF00');
        this.isToggled=true;
        ToolController.toolMode='select';
    },
    disable: function(){
        this.el.setAttribute('material','color','#FF0000');
        this.isToggled=false;
        ToolController.toolMode ='none';
        for(let selectedId of this.selectedItems){
            let cell = document.getElementById(selectedId);
            console.log(cell);
        }
    },
    selectCell: function(elt){
        let idx;
        if((idx = this.selectedItems.findIndex(item => item == elt)) < 0){
            this.selectedItems.push(elt);
            return true;
        }
        else {
            this.selectedItems.splice(idx,1);
            return false;
        }
    },
    selectColumn: function (elt){
        console.log(elt);
    }
});
