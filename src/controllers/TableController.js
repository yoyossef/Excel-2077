export class TableController {

    static displayMode = 'tube';

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

};
