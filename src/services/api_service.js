function rApiGET(var_name, command_name, command_param) {
    var full_command = var_name + " <- " + command_name + "(" + command_param + ")";
    
    var url = "https://http://localhost:9000/command";
    var data = { "command": full_command };

    getJSON(url, data, callback);
}

var getJSON = function(url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
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

var callBack = function(err, data) {
    // data looking like -> { "result": "[{...},{...}]" }    
    if (err !== null) {
        alert('Something went wrong: ' + err);
    } else {
        alert('Your received: ' + data.result);
    }
};
