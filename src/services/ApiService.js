export class ApiService {

  static rCommandPOST(var_name, command_name, command_params) {
    let full_command = var_name + " <- " + command_name + "(" + command_params + ")";
    let data = { "command": full_command };

    fetch('http://localhost:3000/command', {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:9000"/*,
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers"*/
      }
    })
    .then(json => console.log(json))
    .catch(err => console.log(err));;
  }
};
