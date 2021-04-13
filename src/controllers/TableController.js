export class TableController {

    static displayMode = 'Cylinder';

    static getCellsByColumn (colIndex) {
        let res = [];
        if(colIndex >= 0){
            let cellEntities = document.querySelectorAll('[id^="'+colIndex+',"]');
            for(let i = 0; i< cellEntities.length;i++){
                res.push(cellEntities[i].components["cell"]);
            }
        }
        return res;
    }

    static getCell(x,y) {
        return document.getElementById(x+','+y).components["cell"];
    }

    static getCellsByRow (rowIndex) {
        let res = [];
        if(rowIndex >= 0){
            let cellEntities = document.querySelectorAll('[id$=",'+rowIndex+'"]');
            for(let i = 0; i< cellEntities.length;i++){
                res.push(cellEntities[i].components["cell"]);
            }
        }
        return res;
    }

};
