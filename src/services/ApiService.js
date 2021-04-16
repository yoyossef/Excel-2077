export class ApiService {

    // Example: ApiService.rCommandPOST("x", "read.table", "\"custom_dataset.csv\" ,header=T, sep=\",\"");
    static rCommandPOST(var_name, command_name, command_params) {
        let full_command = var_name + " <- " + command_name + "(" + command_params + ")";
        let data = { "command": full_command };

        fetch('http://localhost:3000/command', {
                method: 'POST',
                body: JSON.stringify(data),
                mode: 'cors',
                headers: {
                    "Content-type": "application/json",
                }
            })
            .then(response => response.json())
            .then((body) => console.log(body))
            .catch(err => console.log(err));;
    }

    // Example: ApiService.rReadTableGET("x", 2, 1);
    static rReadTableGET(var_name, page, step = 50) {
        let full_url = 'http://localhost:3000/read/table?name=' + var_name + "&page=" + page + "&number=" + step;

        fetch(full_url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    "Content-type": "application/json",
                }
            })
            .then(response => response.json())
            .then((body) => console.log(body))
            .catch(err => console.log(err));;
    }
};