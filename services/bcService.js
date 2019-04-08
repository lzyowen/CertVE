const rp = require('request-promise');
const settings = require('../settings/settings');


exports.bcQuery = function (reqBody) {
    console.log("blockchain service: bcQuery");
    return new Promise(function (resolve, reject) {
        let options = {
            method: 'POST',
            uri: settings.bcPath + settings.bcQueryPath,
            headers: {
                'User-Agent': 'Request-Promise',
                'Content-Type': 'application/json'
            },
            body: reqBody,
            json: true
        };

        if(settings.enableOracleProxy){
            console.log('oracle proxy enable...');
            options.proxy = 'http://cn-proxy.cn.oracle.com:80';
        }

        rp(options)
            .then(function (data) {
                resolve(data);
            })
            .catch(function (err) {
                reject(err);
            });
    });
}



exports.bcInvocation = function (reqBody) {
    console.log("blockchain service: bcQuery");
    return new Promise(function (resolve, reject) {
        let options = {
            method: 'POST',
            uri: settings.bcPath + settings.bcInvocationPath,
            headers: {
                'User-Agent': 'Request-Promise',
                'Content-Type': 'application/json'
            },
            body: reqBody,
            json: true
        };

        if(settings.enableOracleProxy){
            console.log('oracle proxy enable...');
            options.proxy = 'http://cn-proxy.cn.oracle.com:80';
        }

        rp(options)
            .then(function (data) {
                resolve(data);
            })
            .catch(function (err) {
                reject(err);
            });
    });
}