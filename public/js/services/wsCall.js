/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['ojs/ojcore', 'jquery', 'data/dummyData', 'data/appVariables'],
        function (oj, $, dummyData, AppVar) {
            function wsCallModule() {
                var self = this;
                var getTranslation = oj.Translations.getResource;

                var blockchainHost = "/bc"; //"http://localhost:3008/bc   http://129.213.25.125:3008/bc";
                
                var bcChannel = "certchannel",
                        bcChaincode = "certificate",
                        bcChaincodeVer = "1.6";

                self.authUser = function (user, password) {
                    return new Promise(function (resolve, reject) {
                        var validUser = false;

                        var url = '/authUser';
                        var reqBody = {};
                        reqBody.username = user;
                        reqBody.password = password; //md5

                        var successCallback = function (data) {
                            console.log("Login Successfully");

                            if (data) {
                                setTimeout(function () {
                                    resolve({
                                        "status": "OK",
                                        "user": data
                                    });
                                }, 1000);
                            } else {
                                console.error("Login Failed:" + data);
                                reject({
                                    "status": "err",
                                    "message": "User is not valid! Please verify your user and password again."
                                });
                            }
                        };

                        var errorCallback = function (data) {
                            console.error("Login Failed:" + JSON.stringify(data));
                            reject({
                                "status": "err",
                                "message": "User is not valid! Please verify your user and password again."
                            });
                        };

                        $.ajax({
                            url: url,
                            method: 'POST',
                            data: JSON.stringify(reqBody),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            success: successCallback,
                            error: errorCallback
                        });
                    });
                };

                self.getPartnerList = function (csmUserId) {
                    return new Promise(function (resolve, reject) {
                        var url = '/getPartnerList/' + csmUserId;
                        var successCallback = function (data) {
                            if (data) {
                                setTimeout(function () {
                                    resolve({
                                        "status": "OK",
                                        "list": data
                                    });
                                }, 1000);
                            } else {
                                console.error("Login Failed:" + data);
                                reject({
                                    "status": "err",
                                    "message": "p list failed."
                                });
                            }
                        };

                        var errorCallback = function (data) {
                            console.error("partner list failed:" + JSON.stringify(data));
                            reject({
                                "status": "err",
                                "message": "p list failed."
                            });
                        };

                        $.ajax({
                            url: url,
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            success: successCallback,
                            error: errorCallback
                        });
                    });
                };

                self.changeProfile = function (reqBody) {
                    return new Promise(function (resolve, reject) {
                        var url = '/changeProfile';

                        var successCallback = function (data) {
                            console.log("change profile from APEX");
                            console.log(data);
                            resolve({"status": "Success"});
                        };

                        var errorCallback = function (data) {
                            console.error("change profile from APEX fail!");
                            reject(data);
                        };

                        $.ajax({
                            url: url,
                            method: 'PUT',
                            data: JSON.stringify(reqBody),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            success: successCallback,
                            error: errorCallback
                        });
                    });
                };

                self.changePassword = function (reqBody) {
                    return new Promise(function (resolve, reject) {
                        var url = '/changePassword';

                        var successCallback = function (data) {
                            console.log("change password from APEX");
                            console.log(data);
                            resolve({"status": "Success"});
                        };

                        var errorCallback = function (data) {
                            console.error("change password from APEX fail!");
                            reject(data);
                        };

                        $.ajax({
                            url: url,
                            method: 'PUT',
                            data: JSON.stringify(reqBody),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            success: successCallback,
                            error: errorCallback
                        });
                    });
                };

                self.getUserInfo = function (username) {
                    return new Promise(function (resolve, reject) {
                        var url = '/userInfo?username=' + username;

                        var successCallback = function (data) {
                            console.log("get user info from APEX");
                            console.log(data);
                            resolve(data);
                        };

                        var errorCallback = function (data) {
                            console.error("get user info from APEX fail!");
                            reject(data);
                        };

                        $.ajax({
                            url: url,
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            success: successCallback,
                            error: errorCallback
                        });
                    });
                };

                // update certificate
                self.updateCert = function (objArray) {
                    return new Promise(function (resolve, reject) {
                        var url = blockchainHost + '/invocation';
                        var reqBody = {};
                        reqBody.channel = bcChannel;
                        reqBody.chaincode = bcChaincode;
                        reqBody.chaincodeVer = bcChaincodeVer;
                        reqBody.method = "updateCertificate";
                        reqBody.args = objArray;

                        var successCallback = function (data) {
                            console.log("update certificate from OBCS");
                            console.log(data);
                            resolve(data);
                        };

                        var errorCallback = function (data) {
                            console.error("update certificate from OBCS fail!");
                            reject(data);
                        };

                        $.ajax({
                            url: url,
                            method: 'POST',
                            data: JSON.stringify(reqBody),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            success: successCallback,
                            error: errorCallback
                        });


                    });
                };

                // create certificate
                self.createCert = function (objArray) {
                    return new Promise(function (resolve, reject) {
                        var url = blockchainHost + '/invocation';
                        var reqBody = {};
                        reqBody.channel = bcChannel;
                        reqBody.chaincode = bcChaincode;
                        reqBody.chaincodeVer = bcChaincodeVer;
                        reqBody.method = "createCertificate";
                        reqBody.args = objArray;

                        var successCallback = function (data) {
                            console.log("create certificate to OBCS");
                            console.log(data);
                            resolve(data);
                        };

                        var errorCallback = function (data) {
                            console.error("create certificate to OBCS fail!");
                            reject(data);
                        };

                        $.ajax({
                            url: url,
                            method: 'POST',
                            data: JSON.stringify(reqBody),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            success: successCallback,
                            error: errorCallback
                        });


                    });
                };

                // delete certificate
                self.deleteCert = function (key) {
                    return new Promise(function (resolve, reject) {
                        var url = blockchainHost + '/invocation';
                        var reqBody = {};
                        reqBody.channel = bcChannel;
                        reqBody.chaincode = bcChaincode;
                        reqBody.chaincodeVer = bcChaincodeVer;
                        reqBody.method = "removeCertificate";
                        reqBody.args = [key];

                        var successCallback = function (data) {
                            console.log("delete certificate from OBCS");
                            console.log(data);
                            resolve(data);
                        };

                        var errorCallback = function (data) {
                            console.error("delete certificate from OBCS fail!");
                            reject(data);
                        };

                        $.ajax({
                            url: url,
                            method: 'POST',
                            data: JSON.stringify(reqBody),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            success: successCallback,
                            error: errorCallback
                        });
                    });
                };

                // get certificate by key
                self.queryCertByKey = function (key) {
                    return new Promise(function (resolve, reject) {
                        var url = blockchainHost + '/query';
                        var reqBody = {};
                        reqBody.channel = bcChannel;
                        reqBody.chaincode = bcChaincode;
                        reqBody.chaincodeVer = bcChaincodeVer;
                        reqBody.method = "queryCertificate";
                        reqBody.args = [key];

                        var successCallback = function (data) {
                            console.log("queryCert Data from Blockchain");
                            console.log(data);
                            resolve(data);
                        };

                        var errorCallback = function (data) {
                            console.error("queryCert from Blockchain fail!");
                            //    console.log(data);
                            /*     $.getJSON("js/data/ws/queryCertRes.json",
                             function (dummyData) {
                             console.log("Using dummy data instead!");
                             alert("Call service fail! Using dummy data instead!");
                             resolve(dummyData);
                             }); */
                            reject(data);
                        };

                        $.ajax({
                            url: url,
                            method: 'POST',
                            data: JSON.stringify(reqBody),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            success: successCallback,
                            error: errorCallback
                        });


                    });
                };
                
                
                // query history list
                self.getHistoryForRecord = function (key) {
                    return new Promise(function (resolve, reject) {
                        var url = blockchainHost + '/query';
                        var reqBody = {};
                        reqBody.channel = bcChannel;
                        reqBody.chaincode = bcChaincode;
                        reqBody.chaincodeVer = bcChaincodeVer;
                        reqBody.method = "getHistoryForRecord";
                        reqBody.args = [key];

                        var successCallback = function (data) {
                            console.log("queryCert Data from Blockchain");
                            console.log(data);
                            resolve(data);
                        };

                        var errorCallback = function (data) {
                            console.error("queryCert from Blockchain fail!");
                            //    console.log(data);
                            /*     $.getJSON("js/data/ws/queryCertRes.json",
                             function (dummyData) {
                             console.log("Using dummy data instead!");
                             alert("Call service fail! Using dummy data instead!");
                             resolve(dummyData);
                             }); */
                            reject(data);
                        };

                        $.ajax({
                            url: url,
                            method: 'POST',
                            data: JSON.stringify(reqBody),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            success: successCallback,
                            error: errorCallback
                        });


                    });
                };


                // get certificate by partner name and cert name
                self.queryCertByName = function (input) {
                    return new Promise(function (resolve, reject) {
                        var url = blockchainHost + '/query';
                        var reqBody = {};
                        reqBody.channel = bcChannel;
                        reqBody.chaincode = bcChaincode;
                        reqBody.chaincodeVer = bcChaincodeVer;
                        reqBody.method = "queryCertificateBasedOnName";
                        reqBody.args = [input.n, input.v];
                        console.log(reqBody);
                        var successCallback = function (data) {
                            console.log("queryCert Data from Blockchain");
                            console.log(data);
                            resolve(data);
                        };

                        var errorCallback = function (data) {
                            console.error("queryCert from Blockchain fail!");
                            //    console.log(data);
                            /*     $.getJSON("js/data/ws/queryCertRes.json",
                             function (dummyData) {
                             console.log("Using dummy data instead!");
                             alert("Call service fail! Using dummy data instead!");
                             resolve(dummyData);
                             }); */
                            reject(data);
                        };

//                        console.log(JSON.stringify(reqBody));
                        $.ajax({
                            url: url,
                            method: 'POST',
                            data: JSON.stringify(reqBody),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            success: successCallback,
                            error: errorCallback
                        });
                    });
                };


                // get all certificates
                self.queryAllCert = function () {
                    return new Promise(function (resolve, reject) {
                        var url = blockchainHost + '/query';
                        var reqBody = {};
                        reqBody.channel = bcChannel;
                        reqBody.chaincode = bcChaincode;
                        reqBody.chaincodeVer = bcChaincodeVer;
                        reqBody.method = "queryAllCertificate";
                        reqBody.args = [""];

                        var successCallback = function (data) {
                            console.log(data);
                            resolve(data);
                        };

                        var errorCallback = function (data) {
                            console.error("queryAllCert from Blockchain fail!");
                            //    console.log(data);
//                            $.getJSON("js/data/ws/queryAllCertsRes.json",
//                                    function (dummyData) {
//                                        console.log("Using dummy data instead!");
////                                alert("Call service fail! Using dummy data instead!");
//                                        resolve(dummyData);
//                                    });
//                           reject(data);
                        };

                        $.ajax({
                            url: url,
                            method: 'POST',
                            data: JSON.stringify(reqBody),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            success: successCallback,
                            error: errorCallback
                        });
                    });
                };

                self.getCertLOV = function (type) {
                    return new Promise(function (resolve, reject) {
                        var url = '/certLOV?type=' + type;

                        var successCallback = function (data) {
                            console.log("get cert info from APEX");
                            console.log(data);
                            resolve(data);
                        };

                        var errorCallback = function (data) {
                            console.error("get cert info from APEX fail!");
                            reject(data);
                        };

                        $.ajax({
                            url: url,
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            success: successCallback,
                            error: errorCallback
                        });
                    });
                };

            }

            return new wsCallModule();
        }
);