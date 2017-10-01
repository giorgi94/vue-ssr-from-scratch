const http = require('http')

var GetData = () => {

    var options = {
      host: 'localhost',
      port: 8000,
      path: '/api/mediabrowser/',
      method: 'GET'
    };

    var req = http.request(options, (res)=>{
        console.log(res.statusCode)
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });

        
    });

req.end();
}

module.exports = GetData;