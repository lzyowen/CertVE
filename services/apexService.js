const rp = require('request-promise');
const settings = require('../settings/settings');


exports.authUser = function (reqBody) {
    console.log("apexService: authUser");
    return new Promise(function (resolve, reject) {
        let options = {
            method: 'POST',
            uri: settings.apexRESTDomain + settings.apexRESTUserInfo,
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

exports.changePassword = function (reqBody) {
    console.log("apexService: changePassword");
    return new Promise(function (resolve, reject) {
        let options = {
            method: 'PUT',
            uri: settings.apexRESTDomain + settings.apexRESTChangePwd,
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

exports.changeProfile = function (reqBody) {
    console.log("apexService: changeProfile");
    return new Promise(function (resolve, reject) {
        let options = {
            method: 'PUT',
            uri: settings.apexRESTDomain + settings.apexRESTUserInfo,
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

exports.getPartnerList = function (reqBody) {
    console.log("apexService: getPartnerList" , reqBody);
    return new Promise(function (resolve, reject) {
        let options = {
            method: 'GET',
            uri: settings.apexRESTDomain + settings.apexPartnersList + reqBody,
            headers: {
                'User-Agent': 'Request-Promise',
                'Content-Type': 'application/json'
            },
            json: true
        };

        console.log(options);
 
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

exports.userInfo = function (username) {
    console.log("apexService: userInfo");
    return new Promise(function (resolve, reject) {
        let options = {
            method: 'GET',
            uri: settings.apexRESTDomain + settings.apexRESTUserInfo + username,
            headers: {
                'User-Agent': 'Request-Promise',
                'Content-Type': 'application/json'
            },
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

exports.certLOV = function (type) {
    console.log("apexService: certLOV");
    return new Promise(function (resolve, reject) {
        let options = {
            method: 'GET',
            uri: settings.apexRESTDomain + settings.apexRESTCertLOV + type,
            headers: {
                'User-Agent': 'Request-Promise',
                'Content-Type': 'application/json'
            },
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