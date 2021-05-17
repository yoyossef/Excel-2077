import {ApiService} from './ApiService.js';
import {TableController} from '../controllers/TableController.js';
import {config} from  '../.env.js';

export class DataService {

    static data = {};
    static nbCommandExecuted = 0;
    static displayedData = '';

    static loadDataset(){
        let tmpData = [];
        DataService.nbCommandExecuted++;
        ApiService.rCommandPOST('c'+DataService.nbCommandExecuted,'read.table',"'"+config.DATASET+"', header=T, sep=','").then((response) => {
                response.json().then((body) => {
                    tmpData.push(body.columnsName);//headers
                    setTimeout(function(){//Wait 100ms because R seems to crash if read is too quick
                        ApiService.rReadTableGET('main',1).then((response) => {
                            response.json().then((body) => {
                                for(let i = 0; i<body.results.length;i++){
                                    tmpData.push(Object.values(body.results[i]));
                                }
                                DataService.data['c'+DataService.nbCommandExecuted] = {
                                        command: "read.table("+config.DATASET+", header=T, sep=',')",
                                        table: tmpData,
                                        totalResults: body.totalResults,
                                        totalPages: body.totalPages
                                    };
                                TableController.loadDataInTable(DataService.data['c'+DataService.nbCommandExecuted].table);
                                DataService.displayedData='c'+DataService.nbCommandExecuted;
                            });
                        });
                    }, 100);
                });
            }
        );
    }


    static executeCommand(commandName,params){
        let tmpData = [];
        DataService.nbCommandExecuted++;
        ApiService.rCommandPOST('c'+DataService.nbCommandExecuted,commandName,params).then((response) => {
                response.json().then((body) => {
                    tmpData.push(Object.keys(body.results[0]));//headers
                    for(let i = 0; i<body.results.length;i++){
                        tmpData.push(Object.values(body.results[i]));
                    }
                    DataService.data['c'+DataService.nbCommandExecuted] = {
                            command: commandName+"("+params+")",
                            table: tmpData,
                            totalResults: body.totalResults,
                            totalPages: body.totalPages
                        };
                    TableController.loadDataInTable(DataService.data['c'+DataService.nbCommandExecuted].table);
                    DataService.displayedData='c'+DataService.nbCommandExecuted;
                });
            }
        );
    }

    static select(colIndexes){
        let params = DataService.displayedData; //First param of select, the table name
        for(let i =0;i<colIndexes.length;i++){//getting columns' name
            params+=","+DataService.data[DataService.displayedData].table[0][colIndexes[i]];
        }
        DataService.executeCommand('select',params);
    }
};
