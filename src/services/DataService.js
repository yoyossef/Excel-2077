import { ApiService } from './ApiService.js';
import { TableController } from '../controllers/TableController.js';
import { config } from '../.env.js';

export class DataService {

    static data = {};
    static nbCommandExecuted = 0;
    static displayedData = '';

    /**
     * Loads the initial dataset in the data object by calling 'read.table' and getting the first page,
     * then sends the table to TableController to display it
     */
    static loadDataset() {
        let tmpData = [];
        DataService.nbCommandExecuted++;
        ApiService.rCommandPOST('c' + DataService.nbCommandExecuted, 'read.table', "'" + config.DATASET + "', header=T, sep=','").then((response) => {
            response.json().then((body) => {
                tmpData.push(body.columnsName); //headers
                setTimeout(function() { //Wait 500ms because R seems to crash if read is too quick
                    ApiService.rReadTableGET('c' + DataService.nbCommandExecuted, 1).then((response) => {
                        response.json().then((body) => {
                            for (let i = 0; i < body.results.length; i++) {
                                tmpData.push(Object.values(body.results[i]));
                            }
                            DataService.data['c' + DataService.nbCommandExecuted] = {
                                command: "read.table(" + config.DATASET + ", header=T, sep=',')",
                                table: tmpData,
                                totalResults: body.totalResults,
                                totalPages: body.totalPages
                            };
                            TableController.loadDataInTable(DataService.data['c' + DataService.nbCommandExecuted].table);
                            DataService.displayedData = 'c' + DataService.nbCommandExecuted;
                        });
                    });
                }, 500);
            });
        });
    }

    static loadPage(varName, page) {
        let tmpData = [];
        DataService.nbCommandExecuted++;
        ApiService.rReadTableGET(varName, page).then((response) => {
            response.json().then((body) => {
                for (let i = 0; i < body.results.length; i++) {
                    tmpData.push(Object.values(body.results[i]));
                }
                DataService.data['c' + DataService.nbCommandExecuted] = {
                    command: "loadPage(" + varName + ", " + page + ")",
                    table: tmpData
                };
                TableController.loadDataInTable(DataService.data['c' + DataService.nbCommandExecuted].table);
                DataService.displayedData = 'c' + DataService.nbCommandExecuted;
            });
        });
    }

    /**
     * Executes an R command, loads the result in data object,
     * then sends the table to TableController in order to display it
     *
     * @param {string} commandName name of the R command to execute
     * @param {string} params R command's parameters
     */
    static executeCommand(commandName, params) {
        let tmpData = [];
        DataService.nbCommandExecuted++;
        ApiService.rCommandPOST('c' + DataService.nbCommandExecuted, commandName, params).then((response) => {
            response.json().then((body) => {
                tmpData.push(Object.keys(body.results[0])); //headers
                for (let i = 0; i < body.results.length; i++) {
                    tmpData.push(Object.values(body.results[i]));
                }
                DataService.data['c' + DataService.nbCommandExecuted] = {
                    command: commandName + "(" + params + ")",
                    table: tmpData,
                    totalResults: body.totalResults,
                    totalPages: body.totalPages
                };
                TableController.loadDataInTable(DataService.data['c' + DataService.nbCommandExecuted].table);
                DataService.displayedData = 'c' + DataService.nbCommandExecuted;
            });
        });
    }

    /**
     * Executes a select command on the currently displayed dataset by calling
     * DataService.executeCommand('select',params);
     *
     * @param {Array<int>} colIndexes the indexes of the columns to select
     */
    static select(colIndexes) {
        let params = DataService.displayedData; //First param of select, the table name
        for (let i = 0; i < colIndexes.length; i++) { //getting columns' name
            params += "," + DataService.data[DataService.displayedData].table[0][colIndexes[i]];
        }
        DataService.executeCommand('select', params);
    }

    /**
     * Executes a group_by command on the currently displayed dataset by calling
     * DataService.executeCommand('group_by',params);
     *
     * @param {Array<int>} colIndex the index of the column to use group_by on
     * @param {boolean} add if true, combines group_by with the previous one (default false)
     */
    static group_by(colIndex, add = false){
        let params = DataService.displayedData; //First param of group_by, the table name
        params += "," + DataService.data[DataService.displayedData].table[0][colIndex];//get column name
        if(add){
            params+=", add = TRUE";
        }
        DataService.executeCommand('group_by',params);
    }
};
