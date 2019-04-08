/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'qrcode', 'appController', 'services/wsCall', 'utils/appui', 'data/appVariables', 'html2canvas',
    'ojs/ojbutton', 'ojs/ojlabel', 'ojs/ojinputtext', 'ojs/ojcollapsible', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtimeline', 'libs/modernizr.custom'],
        function (oj, ko, $, qrcode, app, ws, appui, appVar, html2canvas) {

            function CertDetailViewModel() {
                var self = this;
                // Below are a set of the ViewModel methods invoked by the oj-module component.
                // Please reference the oj-module jsDoc for additional information.
//                self.isLogin = app.isLogin;
                self.warning = oj.Translations.getTranslatedString("msg4");
                self.msg6 = oj.Translations.getTranslatedString("msg6");
                self.msg11 = oj.Translations.getTranslatedString("msg11");
                self.msg12 = oj.Translations.getTranslatedString("msg12");
                self.msg13 = oj.Translations.getTranslatedString("msg13");
                self.msg14 = oj.Translations.getTranslatedString("msg14");
                self.msg15 = oj.Translations.getTranslatedString("msg15");
                self.historyDataArray = new Array();

                self.oD0 = ko.observable();
                self.oD1 = ko.observable();
                self.oD2 = ko.observable();
                self.oD3 = ko.observable();
                self.oD4 = ko.observable();
                self.oD5 = ko.observable();
                self.oD6 = ko.observable();
                self.oD7 = ko.observable();
                self.oD8 = ko.observable();
                self.oD9 = ko.observable();

                self.nD0 = ko.observable();
                self.nD1 = ko.observable();
                self.nD2 = ko.observable();
                self.nD3 = ko.observable();
                self.nD4 = ko.observable();
                self.nD5 = ko.observable();
                self.nD6 = ko.observable();
                self.nD7 = ko.observable();
                self.nD8 = ko.observable();
                self.nD9 = ko.observable();

                self.dD1 = ko.observable(1);
                self.dD2 = ko.observable(1);
                self.dD3 = ko.observable(1);
                self.dD4 = ko.observable(1);
                self.dD5 = ko.observable(1);
                self.dD6 = ko.observable(1);
                self.dD7 = ko.observable(1);
                self.dD8 = ko.observable(1);
                self.dD9 = ko.observable(1);


                var yuming = "http://bcserver1.opaas.tech";

                self.qrOpts = {
                    size: 80,
                    text: 'http://www.oracle.com',
                    render: 'div'
                }

                self.qrOptsDt = {
                    size: 160,
                    text: 'http://www.oracle.com',
                    render: 'div'
                }
                self.ifOracleRole = ko.observable(false);
                self.router = app.router;
                self.certKey = ko.observable();
                self.detail = ko.observable(null);

                var tempUrl;
                var tempSUrl;

                self.handleBack = function () {
                    self.router.go('certListTab');
                };

                self.onShare = function () {
//                    $('#certQR').removeClass("certTpl-QR");
//                    html2canvas(document.querySelector("#certQR")).then(canvas => {
//                        $('#certQR').addClass("certTpl-QR");
//                        var win = window.open();
//                        win.document.write('<h3>Scan the following QR Code to share</h3><img src="' + canvas.toDataURL("image/png") + '"/><br/>Certificate Key: <strong>' + self.certKey() + '</strong>');
//                    });
                    document.querySelector('#modalDialog1').open();
                };

                var items = ko.observableArray();
                self.timelineSeries = ko.computed(function () {
                    return [{id: 's1', emptyText: self.msg12, label: self.msg11, items: items()}]
                });

                //to extend one month to see whole picture.
                var nextdate = new Date(new Date().setDate(new Date().getDate() + 30));
                self.nowDate = nextdate.toString();

                self.currentDateString = "Feb 1, 2010";
                var currentDate = new Date(self.currentDateString).toISOString();
                self.referenceObjects = [{value: currentDate}];

                self.bindHislistHtml = function (objArr) {
                    var newHtml = "";
                    for (var k = 0; k < objArr.length; k++) {

                        var theUpdater = "";
                        if (objArr[k].Value.Updater) {
                            theUpdater = objArr[k].Value.Updater;
                        } else {
                            theUpdater = "-";
                        }

                        if (objArr[k].Timestamp) {


                            var dateSub1 = objArr[k].Timestamp.substring(0, 10);
                            var dateSub2 = objArr[k].Timestamp.substring(11, 19);

                            var cellHtml = '<li>'
                                    + '<time class="cbp_tmtime"><span>' + dateSub2 + '</span> <span>' + dateSub1 + '</span></time>'
                                    + '<div class="cbp_tmicon cbp_tmicon-phone"></div>'
                                    + '<button class="cbp_tmlabel" onclick = "compareHis(' + k + ')" >'
                                    + '<h2><span>' + self.msg13 + '</span><span>' + theUpdater + '</span></h2>'
                                    + '<p>' + self.msg15 + '</p>'
                                    + '</button>'
                                    + '</li>';

                            newHtml += cellHtml;
                        } else {
                            alert("invalid timeStamp");
                        }
                    }
                    $('#hisListForm').html(newHtml);
                }

                self.initHistroy = function () {
                    ws.getHistoryForRecord(self.certKey()).then(function (data) {
                        app.isLoading(false);
                        if (data.returnCode === "Success") {
                            self.historyDataArray = JSON.parse(data.result.payload);
                            console.log(self.historyDataArray);
                            self.bindHislistHtml(self.historyDataArray);
//                            if (self.historyDataArray.length != 0) {
//                                self.testData = [];
//                                for (var k = 0; k < self.historyDataArray.length; k++) {
//                                    var tempObj = {
//                                        id: 'h' + k,
//                                        title: self.msg13 + self.historyDataArray[k].Value.Updater ,
//                                        start: certArr[k].Timestamp,
//                                        description: self.msg14 + self.historyDataArray[k].Timestamp
//                                    }
//                                    self.testData.push(tempObj);
//                                }
//                                items(self.testData);
//                            } else {
//                                items([]);
//                            }
                        } else {
                            appui.openDialog(self.info, self.msg8);
                        }
                    }).catch(function (err) {
                        console.log(err);
                        app.isLoading(false);
                        appui.openDialog(self.warning, self.msg6);
                    });
                }

                self.onEdit = function () {
                    if (self.ifOracleRole()) {
                        app.router.go("certForm");
                    }
                };

                self.onDownload = function () {
                    html2canvas(document.querySelector("#certTplContent"), {dpi: 360}).then(canvas => {
                        var imageFile;
                        var downloadLink;
                        var filename = "cert_" + self.certKey() + ".png";
                        imageFile = canvas.toDataURL();
                        downloadLink = document.createElement("a");
                        downloadLink.download = filename;
                        downloadLink.href = imageFile;
                        downloadLink.style.display = "none";
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                    });
                };

                self.alertFunc = function () {
                    $("#certQRpopSuccess").css("visibility", "visible");
                    if ($("#certQRpopSuccess").hasClass("alert-success")) {
                        $('#certQRpopSuccess').removeClass("alert-success");

                        setTimeout(function () {
                            $("#certQRpopSuccess").addClass("alert-success");
                        }, 500);
                    } else {
                        $("#certQRpopSuccess").addClass("alert-success");
                    }
                }

                var init = function () {
                    $('#hdp_dialog0').hide();

                    var stateParams = self.router.currentState().parameters;
                    self.certKey(stateParams.certKey);

                    if (appVar.curUser && appVar.curUser.role === 'oracle') {
                        self.ifOracleRole(true);
                    }
                    setDetailByKey(self.certKey());

                    tempUrl = yuming + '/?root=certDetail/' + self.certKey();
                    tempSUrl = yuming + '/?root=certList';
                    self.qrOpts.text = tempUrl;
                    self.qrOptsDt.text = tempUrl;


                    $("#certQR").qrcode(self.qrOpts);
                    $("#certQR_share").qrcode(self.qrOptsDt);

                    self.initHistroy();
                    var clipboardk = new ClipboardJS('#certQRpop0', {
                        text: function () {
                            return self.certKey();
                        }
                    });

                    clipboardk.on('success', function (e) {
                        self.alertFunc();
                    });

                    clipboardk.on('error', function (e) {
                        console.log(e);
                    });


                    var clipboard = new ClipboardJS('#certQRpop1', {
                        text: function () {
                            return tempUrl;
                        }
                    });

                    clipboard.on('success', function (e) {
                        self.alertFunc();
                    });

                    clipboard.on('error', function (e) {
                        console.log(e);
                    });
                    var clipboardS = new ClipboardJS('#certQRpop2', {
                        text: function () {
                            return tempSUrl;
                        }
                    });

                    clipboardS.on('success', function (e) {
                        self.alertFunc();
                    });

                    clipboardS.on('error', function (e) {
                        console.log(e);
                    });
                };


                compareHis = function (int) {
                    $('#hdp_dialog0').toggle("fast");
//                    console.log(self.historyDataArray, int);

                    self.nD0(self.historyDataArray[int].Timestamp.substring(0, 19));
                    self.nD1(self.historyDataArray[int].Value.CertificateHash);
                    self.nD2(self.historyDataArray[int].Value.CertificateName);
                    self.nD3(self.historyDataArray[int].Value.Contacts);
                    self.nD4(self.historyDataArray[int].Value.PassingDate);
                    self.nD5(self.historyDataArray[int].Value.ExpiryDate);
                    self.nD6(self.historyDataArray[int].Value.Mobile);
                    self.nD7(self.historyDataArray[int].Value.Email);
                    self.nD8(self.historyDataArray[int].Value.Participant);
                    self.nD9(self.historyDataArray[int].Value.PartnerName);


                    if (self.historyDataArray[int - 1]) {


                        self.oD0(self.historyDataArray[int - 1].Timestamp.substring(0, 19));
                        self.oD1(self.historyDataArray[int - 1].Value.CertificateHash);
                        self.oD2(self.historyDataArray[int - 1].Value.CertificateName);
                        self.oD3(self.historyDataArray[int - 1].Value.Contacts);
                        self.oD4(self.historyDataArray[int - 1].Value.PassingDate);
                        self.oD5(self.historyDataArray[int - 1].Value.ExpiryDate);
                        self.oD6(self.historyDataArray[int - 1].Value.Mobile);
                        self.oD7(self.historyDataArray[int - 1].Value.Email);
                        self.oD8(self.historyDataArray[int - 1].Value.Participant);
                        self.oD9(self.historyDataArray[int - 1].Value.PartnerName);

                        if (self.oD1() !== self.nD1()) {
                            self.dD1(-1);
                        } else {
                            self.dD1(1);
                        }
                        if (self.oD2() !== self.nD2()) {
                            self.dD2(-1);
                        } else {
                            self.dD2(1);
                        }
                        if (self.oD3() !== self.nD3()) {
                            self.dD3(-1);
                        } else {
                            self.dD3(1);
                        }
                        if (self.oD4() !== self.nD4()) {
                            self.dD4(-1);
                        } else {
                            self.dD4(1);
                        }
                        if (self.oD5() !== self.nD5()) {
                            self.dD5(-1);
                        } else {
                            self.dD5(1);
                        }
                        if (self.oD6() !== self.nD6()) {
                            self.dD6(-1);
                        } else {
                            self.dD6(1);
                        }
                        if (self.oD7() !== self.nD7()) {
                            self.dD7(-1);
                        } else {
                            self.dD7(1);
                        }
                        if (self.oD8() !== self.nD8()) {
                            self.dD8(-1);
                        } else {
                            self.dD8(1);
                        }
                        if (self.oD9() !== self.nD9()) {
                            self.dD9(-1);
                        } else {
                            self.dD9(1);
                        }
                    } else {
                        self.oD0("");
                        self.oD1("");
                        self.oD2("");
                        self.oD3("");
                        self.oD4("");
                        self.oD5("");
                        self.oD6("");
                        self.oD7("");
                        self.oD8("");
                        self.oD9("");


                    }
                }

                function setDetailByKey(key) {
                    let routerPara = app.router.retrieve();
                    if (routerPara && routerPara.Key && routerPara.Key.length > 0) {
                        self.detail(routerPara.Record);
                    } else {
                        // call ws for data
                        app.isLoading(true);
                        ws.queryCertByKey(key).then(function (data) {
                            app.isLoading(false);
                            if (data.returnCode === 'Success') {
                                let obj = JSON.parse(data.result.payload);
                                var tempInt = Number(obj[0].Record.Score);
                                obj[0].Record.Score = forDight(tempInt, 1);
                                obj[0].Record.certTypeName = appVar.getCertTypeName(obj[0].Record.CertificateType);
                                obj[0].Record.certStatusName = appVar.getCertStatusName(obj[0].Record.CertificateStatus);
                                self.detail(obj[0].Record);
                            } else {
                                appui.openDialog("警告", "证书加载失败!");
                            }
                        }).catch(function (err) {
                            app.isLoading(false);
                            appui.openDialog("警告", "证书加载失败!");
                        });
                    }
                }

                function forDight(_num, _x) {

                    var n = 1;

                    for (var i = 0; i < _x; i++) {
                        n = n * 10;
                    }
                    return Math.round(_num * n) / n;
                }
                /**
                 * Optional ViewModel method invoked after the View is inserted into the
                 * document DOM.  The application can put logic that requires the DOM being
                 * attached here. 
                 * This method might be called multiple times - after the View is created 
                 * and inserted into the DOM and after the View is reconnected 
                 * after being disconnected.
                 */
                self.connected = function () {
                    init();
                };
                /**
                 * Optional ViewModel method invoked after the View is disconnected from the DOM.
                 */
                self.disconnected = function () {
                };
                /**
                 * Optional ViewModel method invoked after transition to the new View is complete.
                 * That includes any possible animation between the old and the new View.
                 */
                self.transitionCompleted = function () {
                    // Implement if needed
                };
            }



            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constructed
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new CertDetailViewModel();
        }
);
