/**
 * Controller that provide many functions for the table
 * @module TableController
 * @category Controllers
*/

export class TableController {

    static displayMode = 'Cylinder'; //Wall HalfCylinder Cylinder
    static cellHeight = 0.096;
    static cellWidth = 0.4;
    static moveDistance = this.cellHeight * 20;
    static moveStep = 0.1;
    static tableRadius = 1;
    static nbrCol = 0;

    /**
     * Gets all the cells component of a given column
     * @function getCellsByColumn
     * @param {int} colIndex the column's index to retrives cells of
     * @return {Array<cell-component>} array of cells corresponding to the column (can be empty)
     */
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

    /**
     * Gets the cell component corresponding to the given coordinates
     * @function getCell
     * @param {int} x the first coordinate (column)
     * @param {int} y the second coordinate (row)
     * @return {cell-component} the cell of id 'x,y' (or null if it doesn't exist)
     */
    static getCell(x, y) {
        return document.getElementById(x + ',' + y).components["cell"];
    }

    /**
     * Gets all the cells component of a given row
     * @function getCellsByRow
     * @param {int} rowIndex the row's index to retrives cells of
     * @return {Array<cell-component>} array of cells corresponding to the row (can be empty)
     */
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

    /**
     * Gets the header cell component of a given column
     * @function getHeader
     * @param {int} colIndex the column's index to retrives header of
     * @return {cell-component} cell corresponding to the column's header (or null if it doesn't exist)
     */
    static getHeader (colIndex) {
        return this.getCell(colIndex,-1);
    }

    /**
     * Gets all header cells component of the displayed table
     * @function getHeaders
     * @return {Array<cell-component>} cell corresponding to the table's headers (can be empty)
     */
    static getHeaders () {
        let res = [];
        res = this.getCellsByRow('-1');
        return res;
    }

    /**
     * Gets the 'more' rings components
     * @function getMoreRings
     * @return {Array<more-component>} "moreUp" and "moreDown" components
     */
    static getMoreRings() {
        return [document.getElementById("moreUp").components["more"], document.getElementById("moreDown").components["more"]];
    }

    /**
     * Moves headers cells and 'more' rings smoothly in the given vertical direction (the distance is TableController.moveDistance)
     * @function moveHeaders
     * @param {'up' | 'down'} direction the vertical direction of the movement
     */
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

    /**
     * Changes the display mode of the table
     * @function changeDisplayMode
     * @param {'up' | 'down'} direction the vertical direction of the movement
     */
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

    /**
     * Resets headers cells and 'more' rings vertical position
     * @function resetHeaders
     */
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

    /**
     * Checks if the first cell (non-header) of the table is visible
     * @function isFirstCellVisible
     * @return {boolean} true if the cell 0,0 is visible, false otherwise
     */
    static isFirstCellVisible() {
        let res = false;
        let cell = this.getCell(0, 0);
        if (cell && cell.el.getAttribute('visible')) {
            res = true;
        }
        return res;
    }

    /**
     * Checks if the fitst cell of the last row of the table is visible
     * @function isLastCellVisible
     * @return {boolean} true if this cell is visible, false otherwise
     */
    static isLastCellVisible() {
        let res = false;
        let table = document.getElementById('table').components["table"];
        let cell = this.getCell(0, table.data.dataMatrix.length - 2); //last is length-2 because headers are idx '-1'
        if (cell && cell.el.getAttribute('visible')) {
            res = true;
        }
        return res;
    }

    /**
     * Calls the 'loadData()' method of the table component with the given data and 'display()' in order to display it
     * @function loadDataInTable
     * @param {Array<Array<any>>} dataMatrix the data to load in the table (dataMatrix[0] row is concidered as headers)
     */
    static loadDataInTable(dataMatrix) {
        let table = document.getElementById('table').components["table"];
        table.loadData(dataMatrix);
        table.display();
    }

    /**
     * Calls the 'addData()' method of the table component with the given data in order to add it to the displayed data
     * @function addDataInTable
     * @param {Array<Array<any>>} dataMatrix the data add in the table
     */
    static addDataInTable(dataMatrix) {
        let table = document.getElementById('table').components["table"];
        table.addData(dataMatrix);
    }

    /**
     * Calls the 'loadNextPage()' method of the table component
     * @function loadNextPageInTable
     */
    static loadNextPageInTable() {
        let table = document.getElementById('table').components["table"];
        table.loadNextPage();
    }
};
