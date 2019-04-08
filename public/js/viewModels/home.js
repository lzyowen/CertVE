/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'data/appVariables', 'utils/appui', 'services/wsCall',
    'jet-composites/certTpl-card/loader', 'ojs/ojbutton'],
        function (oj, ko, $, app, appVar, appui, ws) {

            function HomeViewModel() {
                var self = this;

                //nls
                self.msg1 = oj.Translations.getTranslatedString("msg1");
                self.msg2 = oj.Translations.getTranslatedString("msg2");

                // Below are a set of the ViewModel methods invoked by the oj-module component.
                // Please reference the oj-module jsDoc for additional information.
                self.doneInitLoad = false;
                self.onIssueCert = function () {
                    app.router.go('certForm');
                };

                self.onGetYourCerts = function () {
                    self.getYourCerts();
                };

                self.yourCerts = ko.observableArray([]);

                self.getYourCerts = function () {
                    self.doneInitLoad = true;
                    self.yourCerts.removeAll();
                    appVar.curUser.certs = [];

                    app.isLoading(true);
                    var tempobt = {
                        n: "PartnerName",
                        v: appVar.curUser.fullname
                    };

                    ws.queryCertByName(tempobt).then(function (data) {
                        app.isLoading(false);
                        if (data.returnCode === "Success") {
                            var tempObj = JSON.parse(data.result.payload);
                            for (var k = 0; k < tempObj.length; k++) {
                                var certObj = tempObj[k].Record;
                                certObj.CertificateTypeName = appVar.getCertTypeName(certObj.CertificateType);
                                certObj.CertificateStatusName = appVar.getCertStatusName(certObj.CertificateStatus);
                                certObj.certTypeName = appVar.getCertTypeName(certObj.CertificateType);
                                certObj.certStatusName = appVar.getCertStatusName(certObj.CertificateStatus);
                                self.yourCerts.push(certObj);
                                appVar.curUser.certs.push(certObj);
                            }
                        } else {
                            appui.openDialog("提示", "无相关记录!");
                        }
                    }).catch(function (err) {
                        console.log(err);
                        app.isLoading(false);
                        appui.openDialog("警告", "查询证书失败!");
                    });
                };
                /**
                 * Optional ViewModel method invoked after the View is inserted into the
                 * document DOM.  The application can put logic that requires the DOM being
                 * attached here. 
                 * This method might be called multiple times - after the View is created 
                 * and inserted into the DOM and after the View is reconnected 
                 * after being disconnected.
                 */
                self.connected = function () {
                    // Implement if needed
                    if (!self.doneInitLoad && appVar.curUser && appVar.curUser.role === 'partner') {
                        self.getYourCerts();
                    }
                };

                /**
                 * Optional ViewModel method invoked after the View is disconnected from the DOM.
                 */
                self.disconnected = function () {
                    // Implement if needed
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
            return new HomeViewModel();
        }
);
