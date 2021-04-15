export class TableController {

    static displayMode = 'Cylinder'; //Wall HalfCylinder Cylinder

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
        if(rowIndex >= -1){
            let cellEntities = document.querySelectorAll('[id$=",'+rowIndex+'"]');
            for(let i = 0; i< cellEntities.length;i++){
                res.push(cellEntities[i].components["cell"]);
            }
        }
        return res;
    }

    static getHeaders () {
        let res = [];
        res = this.getCellsByRow('-1');
        return res;
    }

    static moveHeaders (direction){
        let headers = this.getHeaders();
        var el = document.querySelector('#table');
        let cellHeight = el.getAttribute('table').cellHeight;
        for(let i = 0; i< headers.length;i++){
            if (direction =='up')
                headers[i].move(headers[i].data.position[0],headers[i].data.position[1]+cellHeight,headers[i].data.position[2]);
            else
                headers[i].move(headers[i].data.position[0],headers[i].data.position[1]-cellHeight,headers[i].data.position[2]);
        }
    }

    static changeDisplayMode(mode) {
        this.displayMode = mode;
        document.getElementById('table').components["table"].changeDisplayMode();
    }

};
