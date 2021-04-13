export class TableController {

    static displayMode = 'Wall'; //Wall HalfCylinder Cylinder

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
            if (direction =='haut')
                headers[i].move(headers[i].el.object3D.position.x,headers[i].el.object3D.position.y+cellHeight,headers[i].el.object3D.position.z);            
            else
                headers[i].move(headers[i].el.object3D.position.x,headers[i].el.object3D.position.y-cellHeight,headers[i].el.object3D.position.z);      
        }
    }

};
