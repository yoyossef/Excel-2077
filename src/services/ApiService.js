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
};
