import {ApiService} from './ApiService.js';
import {TableController} from '../controllers/TableController.js';
import {config} from  '../.env.js';

export class DataService {

    static loadDataset(){
        let data = [];
        ApiService.rCommandPOST('main','read.table',"'"+config.DATASET+"', header=T, sep=','").then((response) => {
                response.json().then((body) => {
                    data.push(body.columnsName);//headers
                    setTimeout(function(){//Wait 100ms because R seems to crash if read is too quick
                        ApiService.rReadTableGET('main',1).then((response) => {
                            response.json().then((body) => {
                                for(let i = 0; i<body.results.length;i++){
                                    data.push(Object.values(body.results[i]));
                                }
                                console.log(data);
                                TableController.loadDataInTable(data);
                            });
                        });
                    }, 100);
                });
            }
        );
    }
};
