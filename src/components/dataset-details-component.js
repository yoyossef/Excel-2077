import { DataService } from '../services/DataService.js';

AFRAME.registerComponent('dataset-details', {
    schema: {
        name: { type: 'string', default: '' },
        command: { type: 'string', default: '' },
        isCurrentlyDisplayed: { type: 'boolean', default: false }
    },
    multiple: true,
    init: function() {
        //Setting 3D model
        this.mesh = new THREE.Mesh();
        this.el.setObject3D('mesh', this.mesh);

        let color;
        if (this.data.isCurrentlyDisplayed) {
            color = "#004400";
        } else {
            color = "#222222";
        }

        if (this.data.command.length > 120) {
            console.log("lenght: " + this.data.command.length);
            this.data.command = this.data.command.substring(0, 116) + "...";
        }
        this.el.setAttribute('text', {
            value: this.data.name + " : " + this.data.command,
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
            color: color,
            shader: 'flat',
            opacity: 0.7,
            transparent: true,
        });

        let position = Object.assign({}, this.el.getAttribute('position'));

        this.el.setAttribute('animation__positionEnter', {
            property: 'position',
            to: { x: position.x, y: position.y, z: -0.6 },
            dur: 150,
            startEvents: 'mouseenter'
        });

        this.el.setAttribute('animation__positionLeave', {
            property: 'position',
            to: { x: position.x, y: position.y, z: -0.7 },
            dur: 150,
            startEvents: 'mouseleave'
        });
    },
    events: {
        click: function(evt) {
            this.el.setAttribute('material', { color: '#00FF00' });
            DataService.switchToData(this.data.name);
        }
    },
});