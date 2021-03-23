export class ApiService {

  static rApiGET(var_name, command_name, command_param) {
    var full_command = var_name + " <- " + command_name + "(" + command_param + ")";
    
    var url = "http://localhost:3000/command";
    var data = { "command": full_command };

    this.getJSON(url, data, this.callBack);
  }

  static getJSON = function(url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-type', 'json');
    // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    // xhr.setRequestHeader('Access-Control-Allow-Methods', 'DELETE, POST, GET, OPTIONS');
    // xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
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
        console.log('Your received: ' + data.status);
    }
  };

};
