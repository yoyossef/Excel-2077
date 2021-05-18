AFRAME.registerComponent('dataset-details', {
    schema: {
        name : {type:'string', default:''},
        command: {type:'string',default:''}
    },
    multiple: true,
    init: function () {
        //Setting 3D model
        this.mesh = new THREE.Mesh();
        this.el.setObject3D('mesh', this.mesh);
        this.el.setAttribute('visible',this.data.enable);

        this.el.setAttribute('text', {
            value: this.data.name+ " : " + this.data.command,
            color: '#FFFFFF',
            align: 'left',
            wrapCount: 50,
            width: 0.8,
        });

        this.el.setAttribute('geometry', {
            primitive: 'plane',
            height: 0.09,
            width: 0.85
        });

        this.el.setAttribute('material', {
            color: '#222222',
            opacity: 0.7,
            transparent: true,
        });
    }
});
