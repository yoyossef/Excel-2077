import { config } from '../.env.js';

export class ApiService {

    /**
     * Call the RserverAPI to read a new dataset (from a file) and return it's headers with infos about their types
     * Usages: ApiService.rCommandPOST("x", "read.table", "\"custom_dataset.csv\" ,header=T, sep=\",\"");
     * 
     * @param {string} varName name of the new variable
     * @param {string} commandName R command to be executed
     * @param {string} commandParams R command's parameters
     * @returns fetch's promise
     */
    static rCommandPOST(varName, commandName, commandParams) {
        let fullCommand = varName + " <- " + commandName + "(" + commandParams + ")";
        let data = { "command": fullCommand };

        return fetch(config.RSERVER_URL + 'command', {
            method: 'POST',
            body: JSON.stringify(data),
            mode: 'cors',
            headers: {
                "Content-type": "application/json",
            }
        });

    }

    /**
     * Call the RserverAPI to get 50 more lines of data for a particular variable
     * Usages: ApiService.rReadTableGET("x", 2, 20);
     *         ApiService.rReadTableGET("y", 4);
     * 
     * @param {string} varName variable we want to load data from
     * @param {number} page 
     * @param {number} step represent how many lines we want to load per pages
     * @returns fetch's promise
     */
    static rReadTableGET(varName, page, step = 50) {
        let fullURL = config.RSERVER_URL + 'read/table?name=' + varName + "&page=" + page + "&number=" + step;

        return fetch(fullURL, {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-type": "application/json",
            }
        });
    }
};