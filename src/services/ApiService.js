export class ApiService {

  static rCommandPOST(var_name, command_name, command_params) {
    let full_command = var_name + " <- " + command_name + "(" + command_params + ")";
    let data = { "command": full_command };

    fetch('http://localhost:3000/command', {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:9000",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers"
      }
    })
    .then(json => console.log(json))
    .catch(err => console.log(err));;
  }

  /*
  static rCommandPOST(var_name, command_name, command_params) {
    var full_command = var_name + " <- " + command_name + "(" + command_params + ")";
    
    var url = "http://localhost:3000/command";
    var data = { "command": full_command };

    this.getJson('POST', url, data, this.callBack);
  }

  static getJson = function(method, url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Access-Control-Allow-Methods', 'DELETE, POST, GET, OPTIONS');
    xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send(data);
  };

  static callBack = function(err, data) {
    // data looking like -> { "result": "[{...},{...}]" }     ???
    if (err !== null) {
        console.log('Something went wrong: ' + err);
    } else {
        console.log('Your received: ' + data.nbLines);
    }
  };
  */
};
