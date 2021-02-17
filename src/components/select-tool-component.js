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
            if(!this.isSelected){
                this.el.setAttribute('material','color', '#00FF00');
                this.isSelected=true;
            }
            else {
                this.el.setAttribute('material','color','#FF0000');
                this.isSelected=false;
            }
        }
    },
    isSelected: false
});
