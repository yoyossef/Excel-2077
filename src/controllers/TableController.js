export class TableController {

    static displayMode = 'Cylinder'; //Wall HalfCylinder Cylinder
    static cellHeight = 0.096;
    static cellWidth = 0.4;
    static moveDistance = this.cellHeight *20;
    static moveStep = 0.1;

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

    static async moveHeaders (direction){
        let headers = this.getHeaders();
        let directionAffect = 0;
        if(direction == 'up'){
            directionAffect = 1;
        }
        else if (direction == 'down'){
            directionAffect = -1;
        }
        for(let i = 0; i<this.moveDistance;i+=this.moveStep){
            for(let j = 0; j< headers.length;j++){
                    headers[j].move(headers[j].data.position[0],headers[j].data.position[1]+(this.moveStep * directionAffect),headers[j].data.position[2]);
            }
            await new Promise(done => setTimeout(() => done(), 5));
        }
    }

    static changeDisplayMode(mode) {
        this.displayMode = mode;
        document.getElementById('table').components["table"].changeDisplayMode();
        //Test ajout de données
        /*let dataMatrix = [  // BOUCHON !
            ["NewData1Col1", "NewData1Col2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10"],
            ["NewData2Col1", "NewData2Col2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "1", "2", "3", "4", "5", "6", "7", "8", "9","10"],
        ];
        document.getElementById('table').components["table"].addData(dataMatrix);*/
    }

    static resetHeaders (){
        let headers = this.getHeaders();
        for(let i = 0; i< headers.length;i++){
                headers[i].move(headers[i].data.position[0],this.cellHeight,headers[i].data.position[2])
        }
    }



};
