import { CameraController } from '../controllers/CameraController.js';
import { TableController } from '../controllers/TableController.js';

/**
 * Tool that calls corresponding methods to move camera and table's headers down
 * @module moving-tool-down-component
 * @category Components
*/
AFRAME.registerComponent('moving-tool-down', {
    schema: {
        color: { type: 'color', default: '#0000FF' }
    },
    init: function() {
        //Setting 3D model
        this.mesh = new THREE.Mesh();
        this.el.setObject3D('mesh', this.mesh);
        this.el.setAttribute('class', 'links');

        this.el.setAttribute('text', {
            value: "DW",
            color: '#FFFFFF',
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

    },
    events: {
        click: function(evt) {
            if (TableController.isLastCellVisible()) {
                TableController.loadNextPageInTable();
            }
            CameraController.move('down');
            TableController.moveHeaders('down');
        }
    }
});
