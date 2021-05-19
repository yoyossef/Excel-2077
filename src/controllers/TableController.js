export class TableController {

    static displayMode = 'Cylinder'; //Wall HalfCylinder Cylinder
    static cellHeight = 0.096;
    static cellWidth = 0.4;
    static moveDistance = this.cellHeight * 20;
    static moveStep = 0.1;
    static tableRadius = 1;
    static nbrCol = 0;

    static getCellsByColumn(colIndex) {
        let res = [];
        if (colIndex >= 0) {
            let cellEntities = document.querySelectorAll('[id^="' + colIndex + ',"]');
            for (let i = 0; i < cellEntities.length; i++) {
                res.push(cellEntities[i].components["cell"]);
            }
        }
        return res;
    }

    static getCell(x, y) {
        return document.getElementById(x + ',' + y).components["cell"];
    }

    static getCellsByRow(rowIndex) {
        let res = [];
        if (rowIndex >= -1) {
            let cellEntities = document.querySelectorAll('[id$=",' + rowIndex + '"]');
            for (let i = 0; i < cellEntities.length; i++) {
                res.push(cellEntities[i].components["cell"]);
            }
        }
        return res;
    }

    static getHeader (colIndex) {
        return this.getCell(colIndex,-1);
    }

    static getHeaders () {
        let res = [];
        res = this.getCellsByRow('-1');
        return res;
    }

    static getMoreRings() {
        return [document.getElementById("moreUp").components["more"], document.getElementById("moreDown").components["more"]];
    }

    static async moveHeaders(direction) {
        let headers = this.getHeaders();
        let rings = this.getMoreRings();
        let directionAffect = 0;
        if (direction == 'up') {
            directionAffect = 1;
        } else if (direction == 'down') {
            directionAffect = -1;
        }
        for (let i = 0; i < this.moveDistance; i += this.moveStep) {
            for (let j = 0; j < headers.length; j++) {
                headers[j].move(headers[j].data.position[0], headers[j].data.position[1] + (this.moveStep * directionAffect), headers[j].data.position[2]);
            }
            for (let j = 0; j < rings.length; j++) {
                rings[j].el.setAttribute('position', { y: rings[j].el.getAttribute('position').y + (this.moveStep * directionAffect) }, true);
            }
            await new Promise(done => setTimeout(() => done(), 5));
        }
    }

    static changeDisplayMode(mode) {
        this.displayMode = mode;
        document.getElementById('table').components["table"].changeDisplayMode();
        let rings = this.getMoreRings();
        for (let i = 0; i < rings.length; i++) {
            rings[i].defineShape();
        }
        //Test ajout de données
        /*let dataMatrix = [  // BOUCHON !
            ["NewData1Col1", "NewData1Col2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10"],
            ["NewData2Col1", "NewData2Col2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10"],
        ];
        document.getElementById('table').components["table"].addData(dataMatrix);*/
    }

    static resetHeaders() {
        let headers = this.getHeaders();
        let rings = this.getMoreRings();
        for (let i = 0; i < headers.length; i++) {
            headers[i].move(headers[i].data.position[0], this.cellHeight, headers[i].data.position[2])
        }
        for (let i = 0; i < rings.length; i++) {
            rings[i].resetPosition();
        }
    }

    static isFirstCellVisible() {
        let res = false;
        let cell = this.getCell(0, 0);
        if (cell && cell.el.getAttribute('visible')) {
            res = true;
        }
        return res;
    }

    static isLastCellVisible() {
        let res = false;
        let table = document.getElementById('table').components["table"];
        let cell = this.getCell(0, table.data.dataMatrix.length - 2); //last is length-2 because headers are idx '-1'
        if (cell && cell.el.getAttribute('visible')) {
            res = true;
        }
        return res;
    }

    static loadDataInTable(dataMatrix) {
        let table = document.getElementById('table').components["table"];
        table.loadData(dataMatrix);
        table.display();
    }

    static addDataInTable(dataMatrix) {
        let table = document.getElementById('table').components["table"];
        table.addData(dataMatrix);
    }

    static loadNextPageInTable() {
        let table = document.getElementById('table').components["table"];
        table.loadNextPage();
    }
};