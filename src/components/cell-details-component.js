AFRAME.registerComponent('cell-details', {
    schema: {
        color:  {type:'color',default:'#0000FF'},
        line:   {type:'string'},
        col:    {type:'string'},
        value:  {type:'string'},
        avg:    {type:'number'},
    },
    init: function () {
        //Setting 3D model
        // this.geometry = new THREE.BoxBufferGeometry(0.2,0.2, 0);
        // this.material = new THREE.MeshStandardMaterial({color: this.data.color});
        // this.mesh = new THREE.Mesh(this.geometry, this.material);
        // this.el.setObject3D('mesh', this.mesh);
        this.mesh = new THREE.Mesh();
        this.el.setObject3D('mesh', this.mesh);

        this.el.setAttribute('scale', '0.3 0.3 1');
        
        this.el.setAttribute('text', {
            value: "Line : " + this.data.line +"\nColumn : "+ this.data.col +"\nValue : "+ this.data.value+"\nAverage : "+this.data.avg ,
            color: '#000000',
            align: 'left',
            wrapCount: 30,
            width: 0.90
        });

        this.el.setAttribute('geometry', {
            primitive: 'plane',
            height: 'auto',
            width: 'auto'
        });

        this.el.setAttribute('material', {
            color: '#2c9b3c',
            emissive:'#2c9b3c',
            opacity: 0.7,
            tranparent: true,
            visible: true
        });

        this.refresh('1','2','test beaucoup','10');

    },

    refresh: function(line,col,value,avg){
        this.data.line =line;
        this.data.col =col;
        this.data.value =value;
        this.data.avg =avg;
        let txt ="Line : " + this.data.line +"\nColumn : "+ this.data.col +"\nValue : "+ this.data.value;
        if (avg != '')
            txt += "\nAverage : "+this.data.avg;    

        this.el.setAttribute('text', {
            value: txt,
        });
    },

    events: {
        click: function (evt) {
        }
    }
});
