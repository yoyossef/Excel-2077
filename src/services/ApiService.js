import { config } from '../.env.js';

export class ApiService {

    /**
     * Call the RserverAPI to read a new file full of data and return it's headers with infos about their types
     * usage: ApiService.rCommandPOST("x", "read.table", "\"custom_dataset.csv\" ,header=T, sep=\",\"");
     * 
     * @param {*} var_name 
     * @param {*} command_name 
     * @param {*} command_params
     * 
     */
    static rCommandPOST(var_name, command_name, command_params) {
        let full_command = var_name + " <- " + command_name + "(" + command_params + ")";
        let data = { "command": full_command };

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
     * usage: ApiService.rReadTableGET("x", 2, 1);
     * 
     * @param {*} var_name 
     * @param {*} page 
     * @param {*} step 
     * 
     */
    static rReadTableGET(var_name, page, step = 50) {
        let full_url = config.RSERVER_URL + 'read/table?name=' + var_name + "&page=" + page + "&number=" + step;

        return fetch(full_url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-type": "application/json",
            }
        });
    }
};