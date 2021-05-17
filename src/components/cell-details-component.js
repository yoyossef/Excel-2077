import {CameraController} from '../controllers/CameraController.js';
import {TableController} from '../controllers/TableController.js';

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
        this.el.setAttribute('class', 'links');
        
        this.el.setAttribute('text', {
            value: "Line : " + this.data.line +"\nColumn : "+ this.data.col +"\nValue : "+ this.data.value+"\nAverage : "+this.data.avg ,
            color: '#000000',
            align: 'left',
            wrapCount: 30,
            width: 1
        });

        this.el.setAttribute('geometry', {
            primitive: 'plane',
            height: 'auto',
            width: 'auto'
        });

        this.el.setAttribute('material', {
            color: '#DDDDDD',
            shader: 'flat',
            visible: true
        });

        this.refresh('1','2','value','10');

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
