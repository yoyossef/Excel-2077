import {config} from '../.env.js';

export class ApiService {

    // Example: ApiService.rCommandPOST("x", "read.table", "\"custom_dataset.csv\" ,header=T, sep=\",\"");
    static rCommandPOST(var_name, command_name, command_params) {
        let full_command = var_name + " <- " + command_name + "(" + command_params + ")";
        let data = { "command": full_command };

        return fetch(config.RSERVER_URL+'command', {
                method: 'POST',
                body: JSON.stringify(data),
                mode: 'cors',
                headers: {
                    "Content-type": "application/json",
                }
            });

    }

    // Example: ApiService.rReadTableGET("x", 2, 1);
    static rReadTableGET(var_name, page, step = 50) {
        let full_url = config.RSERVER_URL+'read/table?name=' + var_name + "&page=" + page + "&number=" + step;

        return fetch(full_url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    "Content-type": "application/json",
                }
            });
    }
};
