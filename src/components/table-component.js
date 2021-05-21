import { TableController } from '../controllers/TableController.js';
import { CameraController } from '../controllers/CameraController.js';
import { config } from '../.env.js';
import { DataService } from '../services/DataService.js';

/**
 * Aframe component that handle the table (regroupment of every cells)
 * @module filter-tool-component
 * @category Components
*/

AFRAME.registerComponent('table', {
    schema: {
        cellHeight: { type: 'number', default: TableController.cellHeight },
        cellWidth: { type: 'number', default: TableController.cellWidth },
        dataMatrix: { type: 'array', default: [] },
        nbrCol: { type: 'int' },
        radius: { type: 'number' }
    },

    multiple: true,

    init: function() {
        DataService.loadDataset();
    },

    display: function() {
        this.clear(); // clearing current content

        //Adding "more" rings indicators (up and down)
        let moreRings = document.createElement('a-entity');
        moreRings.setAttribute('more', "direction: up;");
        moreRings.setAttribute('id', 'moreUp');
        this.el.appendChild(moreRings);
        moreRings = document.createElement('a-entity');
        moreRings.setAttribute('more', "direction: down;");
        moreRings.setAttribute('id', 'moreDown');
        this.el.appendChild(moreRings);

        let color;
        for (var i = 0; i < this.data.dataMatrix.length; i++) {
            for (var j = 0; j < this.data.dataMatrix[i].length; j++) {

                if (i == 0) {
                    color = "#778899";
                } else if (i % 2) {
                    color = "#DCDCDC";
                } else {
                    color = "#D3D3D3";
                }

                this.displayCell(i, j, this.data.dataMatrix[i][j], color, i == 0);
            }
        }
    },

    events: {
        // click: function (evt) {
        //     TableController.moveHeaders('down');
        // }
    },

    clear: function() {
        while (this.el.firstChild) {
            this.el.removeChild(this.el.lastChild);
        }
    },

    changeDisplayMode: function() {
        this.setRadius();
        if (this.el.hasChildNodes()) {
            let numChild = 2; //2 Because firsts two children are "more" rings
            let children = this.el.childNodes;
            for (let i = 0; i < this.data.dataMatrix.length; i++) {
                for (let j = 0; j < this.data.dataMatrix[i].length; j++, numChild++) {
                    let angle;
                    let radius;
                    switch (TableController.displayMode) {
                        case 'Wall': //wall
                            if (children[numChild].components['cell'].data.type == 'header') {
                                children[numChild].components['cell'].move(j * this.data.cellWidth, children[numChild].components['cell'].el.object3D.position.y, -2.9);
                            } else {
                                children[numChild].components['cell'].move(j * this.data.cellWidth, -(i - 1) * this.data.cellHeight, -3);
                            }
                            children[numChild].setAttribute('rotation', '0 0 0');
                            break;

                        case 'HalfCylinder': //half cylinder
                        case 'Cylinder': //full cylinder
                            if (TableController.displayMode == 'HalfCylinder') {
                                angle = ((360 / this.data.dataMatrix[i].length) * j) / 2;
                            } else {
                                angle = (360 / this.data.dataMatrix[i].length) * j;
                            }

                            if (children[numChild].components['cell'].data.type == 'header') {
                                radius = this.data.radius - 0.1;
                            } else {
                                radius = this.data.radius;
                            }

                            let x = radius * Math.sin(Math.PI * 2 * angle / 360);
                            let z = (radius * Math.cos(Math.PI * 2 * angle / 360)) * -1;
                            children[numChild].components['cell'].data.angle = angle;
                            if (children[numChild].components['cell'].data.type == 'header') {
                                children[numChild].components['cell'].move(parseFloat(x).toFixed(5), children[numChild].components['cell'].el.object3D.position.y, parseFloat(z).toFixed(5));
                            } else {
                                children[numChild].components['cell'].move(parseFloat(x).toFixed(5), -(i - 1) * this.data.cellHeight, parseFloat(z).toFixed(5));
                            }
                            children[numChild].setAttribute('rotation', '0 ' + -angle + ' 0');
                            break;
                    }
                }
            }
        }

    },

    loadNextPage: function() {
        DataService.loadNextPage();
    },

    loadData: function(newData) {
        this.data.dataMatrix = newData;
        this.data.nbrCol = this.data.dataMatrix[0].length;
        this.setRadius();
    },

    addData: function(newData) {
        if (this.data.nbrCol == newData[0].length) {
            let newStart = this.data.dataMatrix.length;
            this.data.dataMatrix = this.data.dataMatrix.concat(newData);
            let color;
            for (var i = newStart; i < this.data.dataMatrix.length; i++) {
                for (var j = 0; j < this.data.dataMatrix[i].length; j++) {

                    if (i % 2) {
                        color = "#DCDCDC";
                    } else {
                        color = "#D3D3D3";
                    }

                    this.displayCell(i, j, this.data.dataMatrix[i][j], color);
                }
            }
        }
    },

    setRadius: function() {
        if (TableController.displayMode == 'HalfCylinder') {
            this.data.radius = ((this.data.nbrCol * 2.5) / 15) * 2;
        } else {
            this.data.radius = (this.data.nbrCol * 2.5) / 15;
        }
        this.data.radius *= this.data.cellWidth;
        if (this.data.radius < 1) {
            this.data.radius = 1;
        }
        TableController.tableRadius = this.data.radius;
        TableController.nbrCol = this.data.nbrCol;
    },

    displayCell: function(line, col, content, bgColor, header = false) {
        let newCell = document.createElement("a-entity");
        let angle;
        let radius;
        switch (TableController.displayMode) {
            case 'Wall': //wall
                if (header)
                    newCell.setAttribute('position', col * this.data.cellWidth + ' ' + -(line - 1) * this.data.cellHeight + '  -2.9');
                else
                    newCell.setAttribute('position', col * this.data.cellWidth + ' ' + -(line - 1) * this.data.cellHeight + ' -3');

                newCell.setAttribute('rotation', '0 0 0');
                break;

            case 'HalfCylinder': //half cylinder
            case 'Cylinder': //full cylinder
                if (TableController.displayMode == 'HalfCylinder') {
                    angle = ((360 / this.data.dataMatrix[0].length) * col) / 2;
                } else {
                    angle = (360 / this.data.dataMatrix[0].length) * col;
                }

                if (header)
                    radius = this.data.radius - 0.1;
                else
                    radius = this.data.radius;

                let x = radius * Math.sin(Math.PI * 2 * angle / 360);
                let z = (radius * Math.cos(Math.PI * 2 * angle / 360)) * -1;
                newCell.setAttribute('position', parseFloat(x).toFixed(5) + ' ' + -(line - 1) * this.data.cellHeight + ' ' + parseFloat(z).toFixed(5));
                newCell.setAttribute('rotation', '0 ' + -angle + ' 0');
                break;
        }

        newCell.setAttribute('cell', 'fulldata:' + content + '; color: #000000; bgColor: ' + bgColor + '; type:' + (header ? 'header' : 'data') + '; angle:' + angle);
        let str = line - 1;
        newCell.setAttribute('id', col + ',' + str);
        this.el.appendChild(newCell);
    }
});