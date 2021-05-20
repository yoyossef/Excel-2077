/**
 * 
 * @module cell-details-component
 * @category Component
*/

AFRAME.registerComponent('cell-details', {
    schema: {
        color:  {type:'color',default:'#0000FF'},
        line:   {type:'string'},
        col:    {type:'string'},
        value:  {type:'string'},
        avg:    {type:'string'},
        enable: {type:'boolean',default: false}
    },
    init: function () {
        //Setting 3D model
        this.mesh = new THREE.Mesh();
        this.el.setObject3D('mesh', this.mesh);

        this.el.setAttribute('scale', '0.3 0.3 1');

        this.el.setAttribute('visible',this.data.enable);
        
        this.el.setAttribute('text', {
            value: "Line : " + this.data.line +"\nColumn : "+ this.data.col +"\nValue : "+ this.data.value+"\nAverage : "+this.data.avg ,
            color: '#000000',
            align: 'left',
            wrapCount: 30,
            width: 0.90,
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
            transparent: true,
        });

    },

    /**
     * Set the information for the cell details tool.
     * @param {int} line line number
     * @param {int} col col number
     * @param {string} value actual value of the cell
     * @param {avg} float average of the column
     */
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

    /**
     * Enable / disable the cell details tool.
     */
    turnOnOff: function(){
        this.data.enable = !this.data.enable; 
        this.el.setAttribute('visible',this.data.enable);
    }
});
