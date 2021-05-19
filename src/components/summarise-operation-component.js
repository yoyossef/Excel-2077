import {DataService} from '../services/DataService.js';

AFRAME.registerComponent('summarise-operation', {
    schema: {
        name : {type:'string', default:''},
        needsColumn: {type:'boolean',default:false}
    },
    multiple: true,
    init: function () {
        //Setting 3D model
        this.mesh = new THREE.Mesh();
        this.el.setObject3D('mesh', this.mesh);

        this.el.setAttribute('text', {
            value: this.data.name+ "("+(this.data.needsColumn ? '...' : '')+")",
            color: '#FFFFFF',
            align: 'center',
            wrapCount: 30,
            width: 0.4,
        });

        this.el.setAttribute('geometry', {
            primitive: 'plane',
            height: 0.09,
            width: 0.85
        });

        this.el.setAttribute('material', {
            color: "#222222",
            shader: 'flat'
        });

        let position = Object.assign({},this.el.getAttribute('position'));

        this.el.setAttribute('animation__positionEnter', {
            property: 'position',
            to: {x:position.x,y:position.y,z:-0.65},
            dur: 150,
            startEvents: 'mouseenter'
        });

        this.el.setAttribute('animation__positionLeave', {
            property: 'position',
            to: {x:position.x,y:position.y,z:-0.7},
            dur: 150,
            startEvents: 'mouseleave'
        });
    },
    events: {
        click : function (evt) {
            this.el.setAttribute('material',{color:'#00FF00'});
            let summariseTool = document.getElementById('summariseTool').components['summarise-tool'];
            if(summariseTool.selectOperation(this.data.name)){
                this.select();
            }
            else{
                this.unselect();
            }
        }
    },
    select: function(){
        if(!this.data.needsColumn){//No columns needed => selection == validation
            this.validate();
        }
        else{
            this.el.setAttribute('material',{color:'#FFFF00'});
        }
    },
    unselect: function(){
        this.el.setAttribute('material',{color:'#222222'});
        this.el.setAttribute('text', {
            value: this.data.name+ "("+(this.data.needsColumn ? '...' : '')+")",
        });
    },
    validate: function(colName = ''){
        this.el.setAttribute('material',{color:'#00FF00'});
        if(colName != ''){
            this.el.setAttribute('text', {
                value: this.data.name+ "("+colName+")"
            });
        }
    }
});
