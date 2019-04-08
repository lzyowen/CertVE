/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['ojs/ojcore', 'jquery', 'data/dummyData'],
        function (oj, $, dummyData) {
            function wsCallModule() {
                var self = this;
                var getTranslation = oj.Translations.getResource;

                var blockchainHost = "/bc"; //"http://localhost:3008/bc";

                var bcChannel = "certificate.test.channel",
                        bcChaincode = "certificate",
                        bcChaincodeVer = "v1.4";

                self.authUser = function (user, password) {
                    return new Promise(function (resolve, reject) {
                        var validUser = false;

                        var url = '/authUser';
                        var reqBody = {};
                        reqBody.username = user;
                        reqBody.password = password; //md5

                        var successCallback = function (data) {
                            console.log("Login Successfully");
                            console.log(data);
                            
                            if (data) {
                                setTimeout(function () {
                                    resolve({
                                        "status": "OK",
                                        "user": data
                                    });
                                }, 1000);
                            }
                            else {
                                console.error("Login Failed:" + data);
                                reject({
                                    "status": "err",
                                    "message": "User is not valid! Please verify your user and password again."
                                });
                            }
                        };

                        var errorCallback = function (data) {
                            console.error("Login Failed:" + data);
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

                        // for (var i = 0; i < dummyData.users.length; i++) {
                        //     if (dummyData.users[i].userID === user && dummyData.users[i].password === password) {
                        //         validUser = true;
                        //         curUser = dummyData.users[i];
                        //         break;
                        //     }
                        // }
                        // if (validUser) {
                        //     setTimeout(function () {
                        //         resolve({
                        //             "status": "OK",
                        //             "user": curUser
                        //         });
                        //     }, 1000);
                        // } else {
                        //     reject({
                        //         "status": "err",
                        //         "message": "User is not valid! Please verify your user and password again."
                        //     });
                        // }
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


                // get certificate by partner name and cert name
                self.queryCertByName = function (type, input) {
                    return new Promise(function (resolve, reject) {
                        var url = blockchainHost + '/query';
                        var reqBody = {};
                        reqBody.channel = bcChannel;
                        reqBody.chaincode = bcChaincode;
                        reqBody.chaincodeVer = bcChaincodeVer;
                        reqBody.method = "queryCertificateBasedOnName";
                        reqBody.args = [type, input];

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
                            console.log("queryAllCert Data from Blockchain");
                            console.log(data);
                            resolve(data);
                        };

                        var errorCallback = function (data) {
                            console.error("queryAllCert from Blockchain fail!");
                            //    console.log(data);
                            $.getJSON("js/data/ws/queryAllCertsRes.json",
                                    function (dummyData) {
                                        console.log("Using dummy data instead!");
//                                alert("Call service fail! Using dummy data instead!");
                                        resolve(dummyData);
                                    });
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

            }

            return new wsCallModule();
        }
);