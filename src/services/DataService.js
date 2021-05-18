import { ApiService } from './ApiService.js';
import { TableController } from '../controllers/TableController.js';
import { CameraController } from '../controllers/CameraController.js';
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
        DataService.nbCommandExecuted++;
        let varName = 'c' + DataService.nbCommandExecuted;
        let tmpData = [];
        ApiService.rCommandPOST(varName, 'read.table', "'" + config.DATASET + "', header=T, sep=','").then((response) => {
            response.json().then((body) => {
                let colInfo = body.columnsName;
                ApiService.rReadTableGET(varName, 1).then((response) => {
                    response.json().then((body) => {
                        //get response data into tmpData
                        tmpData.push(Object.keys(body.results[0]));//Headers
                        for (let i = 0; i < body.results.length; i++) {
                            tmpData.push(Object.values(body.results[i]));
                        }
                        //update DataService.data
                        DataService.data[varName] = {
                            command: "read.table(" + config.DATASET + ", header=T, sep=',')",
                            table: tmpData,
                            page: 1,
                            totalResults: body.totalResults,
                            totalPages: body.totalPages,
                            colInfo: colInfo
                        };
                        //display DataService.data
                        TableController.loadDataInTable(DataService.data[varName].table);
                        DataService.displayedData = varName;
                    });
                });
            });
        });
    }

    /**
     * Load the next page of data for he current variable then sends it to TableController to display it
     */
    static loadNextPage() {
        let varName = DataService.displayedData;
        let newPage = DataService.data[varName].page + 1;
        if (newPage <= DataService.data[varName].totalPages) {
            let tmpData = [];
            ApiService.rReadTableGET(varName, newPage).then((response) => {
                response.json().then((body) => {
                    //get response data into tmpData
                    for (let i = 0; i < body.results.length; i++) {
                        tmpData.push(Object.values(body.results[i]));
                    }
                    //update DataService.data
                    DataService.data[varName].page = newPage;
                    TableController.addDataInTable(tmpData);
                    //display DataService.data
                });
            });
        }
    }

    /**
     * Executes an R command, loads the result in data object,
     * then sends the table to TableController in order to display it
     *
     * @param {string} commandName name of the R command to execute
     * @param {string} params R command's parameters
     */
    static executeCommand(commandName, params) {
        DataService.nbCommandExecuted++;
        let varName = 'c' + DataService.nbCommandExecuted;
        let tmpData = [];
        ApiService.rCommandPOST(varName, commandName, params).then((response) => {
            response.json().then((body) => {
                //headers
                tmpData.push(Object.keys(body.results[0]));
                //get response data into tmpData
                for (let i = 0; i < body.results.length; i++) {
                    tmpData.push(Object.values(body.results[i]));
                }
                //update DataService.data
                DataService.data[varName] = {
                    command: commandName + "(" + params + ")",
                    table: tmpData,
                    page: 1,
                    totalResults: body.totalResults,
                    totalPages: body.totalPages
                };
                //display DataService.data
                TableController.loadDataInTable(DataService.data[varName].table);
                DataService.displayedData = varName;
                CameraController.reset('vertical'); //Reset vertical position of camera
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
     * @param {int} colIndex the index of the column to use group_by on
     * @param {boolean} add if true, combines group_by with the previous one (default false)
     */
    static group_by(colIndex, add = false) {
        let params = DataService.displayedData; //First param of group_by, the table name
        params += "," + DataService.data[DataService.displayedData].table[0][colIndex]; //get column name
        if (add) {
            params += ", add = TRUE";
        }
        DataService.executeCommand('group_by', params);
    }

    static switchToData(dataName){
        if(dataName != null && dataName != DataService.displayedData && DataService.data[dataName]){
            TableController.loadDataInTable(DataService.data[dataName].table);
            DataService.displayedData = dataName;
        }
        document.getElementById('datasetsList').components['datasets-list'].hide();
    }
};
