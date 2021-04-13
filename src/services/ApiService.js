export class ApiService {

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
            .then(json => console.log(json))
            .catch(err => console.log(err));;
    }

    static rReadTableGET(var_name, page, step = 50) {
        let full_url = 'http://localhost:3000/read/table?name=' + var_name + "&page=" + page + "&number=" + step;

        fetch(full_url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    "Content-type": "application/json",
                }
            })
            .then(json => console.log(json))
            .catch(err => console.log(err));;
    }
};