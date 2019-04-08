/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'services/wsCall', 'blueimpMD5', 'utils/appui', 'data/appVariables',
    'ojs/ojlabel', 'ojs/ojinputtext', 'ojs/ojformlayout', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber'
],

        function (oj, ko, $, app, ws, md5, appui, appVar) {

            function CertFormViewModel() {
                var self = this;

                //nls
                self.topTitle = ko.observable(oj.Translations.getTranslatedString("menu.nav3"));
                self.lblSelectDefault = oj.Translations.getTranslatedString("label.selectDefault");
                self.lblKey = oj.Translations.getTranslatedString("label.key");
                self.lblCertName = oj.Translations.getTranslatedString("label.certName");
                self.lblPartnerName = oj.Translations.getTranslatedString("label.partnerName");
                self.lblParticipant = oj.Translations.getTranslatedString("label.participant");
                self.lblContacts = oj.Translations.getTranslatedString("label.contacts");
                self.lblMobile = oj.Translations.getTranslatedString("label.mobile");
                self.lblPassingdate = oj.Translations.getTranslatedString("label.passingdate");
                self.lblExpirydate = oj.Translations.getTranslatedString("label.expirydate");
                self.lblEmail = oj.Translations.getTranslatedString("label.email");
                self.lblCertType = oj.Translations.getTranslatedString("label.certType");
                self.lblCertStatus = oj.Translations.getTranslatedString("label.certStatus");
                self.lblScore = oj.Translations.getTranslatedString("label.score");
                self.btnCancel = oj.Translations.getTranslatedString("button.cancel");
                self.btnSubmit = oj.Translations.getTranslatedString("button.submit");
                self.btnDelete = oj.Translations.getTranslatedString("button.delete");

                self.ifOracleRole = ko.observable(false);
                self.isSmall = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(
                        oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY));
                self.columns = ko.pureComputed(function () {
                    return self.isSmall() ? 1 : 2;
                }, this);
                self.labelEdge = ko.pureComputed(function () {
                    return self.isSmall() ? "top" : "start";
                }, this);

                self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter({
                    pattern: 'yyyy-MM-dd'
                }));
                self.nowDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
                // Below are a set of the ViewModel methods invoked by the oj-module component.
                // Please reference the oj-module jsDoc for additional information.
                var delimiter = '/';
                self.certNameLOV = ko.observableArray([{label: "x", value: "0"}]);
                self.certTypeLOV = ko.observableArray([{label: "x", value: "0"}]);
                self.certStatusLOV = ko.observableArray([{label: "x", value: "0"}]);
                self.ifCreate = true;
                self.disableSubmit = ko.observable(false);
                self.disableDel = ko.observable(false);
                self.key = ko.observable("");
                self.partnerName = ko.observable("");
                self.contacts = ko.observable("");
                self.mobile = ko.observable("");
                self.email = ko.observable("");
                self.certName = ko.observable("");
                self.participant = ko.observable("");
                self.passingDate = ko.observable(self.nowDate());
                self.expiryDate = ko.observable();
                self.score = ko.observable(100);
                self.certType = ko.observable("");
                self.certStatus = ko.observable("0");
                self.label = ko.observable("");



                self.emailPatternValidator = ko.pureComputed(function () {
                    return [{
                            type: 'regExp',
                            options: {
                                pattern: "[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*",
                                hint: "enter a valid email format",
                                messageDetail: "Not a valid email format"
                            }
                        }];
                });

                self.mobilePatternValidator = ko.pureComputed(function () {
                    return [{
                            type: 'regExp',
                            options: {
                                pattern: "\\+?[0-9]*",
                                hint: "enter a valid mobile format",
                                messageDetail: "Not a valid mobile format"
                            }
                        }];
                });

                var validBeforeSubmit = function () {
                    var _certName = document.getElementById("CertificateName");
                    var _partnerName = document.getElementById("PartnerName");
                    var _mobile = document.getElementById("Mobile");
                    var _email = document.getElementById("Email");
                    var _certType = document.getElementById("CertificateType");
                    var _passingDate = document.getElementById("PassingDate");
                    var _expiryDate = document.getElementById("ExpiryDate");
                    var _certStatus = document.getElementById("CertificateStatus");
                    var _score = document.getElementById("Score");


                    if (_certName.valid === "valid" && _partnerName.valid === "valid" && _certType.valid === "valid" && _passingDate.valid === "valid" &&
                            _expiryDate.valid === "valid" && _certStatus.valid === "valid" && _score.valid === "valid" &&
                            _email.valid === "valid" && _mobile.valid === "valid") {
                        // submit the form would go here
                        return true;
                    } else {
                        // show messages
                        // could instead use the <oj-validation-group> and its showMessages().
                        _certName.showMessages();
                        _partnerName.showMessages();
                        _certType.showMessages();
                        _passingDate.showMessages();
                        _expiryDate.showMessages();
                        _certStatus.showMessages();
                        _score.showMessages();
                        _mobile.showMessages();
                        _email.showMessages();
                    }
                    return false;
                };

                self.init = function () {
                    app.isLoading(false);
                    self.key(null);
                    self.ifCreate = true;
                    self.partnerName("");
                    self.contacts("");
                    self.mobile("");
                    self.email("");
                    self.certName("");
                    self.participant("");
                    self.passingDate(self.nowDate());
                    self.expiryDate(null);
                    self.score(100);
                    self.certType("");
                    self.certStatus("0");
                    if (appVar.curUser && appVar.curUser.role === 'oracle') {
                        self.ifOracleRole(true);
                    }


                    // get key from router store
                    let routerPara = app.router.retrieve();
                    if (routerPara && routerPara.Key && routerPara.Key.length > 0) {
                        self.topTitle(routerPara.curFormTitle);
                        self.key(routerPara.Key);
                        self.ifCreate = false;
                        self.partnerName(routerPara.Record.PartnerName);
                        self.contacts(routerPara.Record.Contacts);
                        self.mobile(routerPara.Record.Mobile);
                        self.email(routerPara.Record.Email);
                        self.certName(routerPara.Record.CertificateName);
                        self.participant(routerPara.Record.Participant);
                        self.passingDate(routerPara.Record.PassingDate);
                        self.expiryDate(routerPara.Record.ExpiryDate);
                        self.score(parseInt(routerPara.Record.Score));
                        self.certType(routerPara.Record.CertificateType);
                        self.certStatus(routerPara.Record.CertificateStatus);
                        app.router.store({});
                    } else {
                        self.ifCreate = true;
                    }
                };

                self.initLOV = function () {
                    app.isLoading(true);
                    var p1 = ws.getCertLOV("cert_name");
                    var p2 = ws.getCertLOV("cert_type");
                    var p3 = ws.getCertLOV("cert_status");

                    self.certNameLOV([]);
                    self.certTypeLOV([]);
                    self.certStatusLOV([]);

                    Promise.all([p1, p2, p3]).then(function (dataArr) {



                        document.getElementById("CertificateName").reset();
                        document.getElementById("CertificateType").reset();
                        document.getElementById("CertificateStatus").reset();

                        self.certNameLOV(dataArr[0].items)
                        self.certTypeLOV(dataArr[1].items);
                        self.certStatusLOV(dataArr[2].items);

                        document.getElementById("CertificateName").refresh();
                        document.getElementById("CertificateType").refresh();
                        document.getElementById("CertificateStatus").refresh();

                        self.init();
                    }).catch(function (err) {
                        app.isLoading(false);
                        console.log(err);
                    });
                }


                self.onDelete = function () {
                    if (self.key() && self.ifOracleRole()) {
                        self.disableDel(true);
                        app.isLoading(true);
                        ws.deleteCert(self.key()).then(function (data) {
                            app.isLoading(false);
                            self.disableDel(false);
                            if (data.returnCode === 'Success') {
                                appui.openDialog("提示", "证书删除成功!");
                                app.router.store({"certListRefresh": true});
                                app.router.go("certListTab");
                            } else {
                                appui.openDialog("警告", "删除证书失败!");
                            }
                        }).catch(function (err) {
                            self.disableDel(false);
                            app.isLoading(false);
                            console.log(err);
                            appui.openDialog("警告", "删除证书失败!");
                        });
                    }
                };

                self.onSubmit = function () {
                    //  let newKey = self.key() + delimiter + self.partnerName() + delimiter + self.certName() + delimiter + self.certType;
                    if (validBeforeSubmit() && self.ifOracleRole()) {
                        // alert(Math.floor(Date.now() / 1000));
                        let objArray = [];
                        objArray.push(self.partnerName());
                        objArray.push(self.contacts());
                        objArray.push(self.mobile());
                        objArray.push(self.email());
                        objArray.push(self.certType());
                        objArray.push(self.certName());
                        objArray.push(self.passingDate());
                        objArray.push(self.expiryDate());
                        objArray.push(self.certStatus());
                        objArray.push(self.participant());
                        objArray.push(self.score());
                        objArray.push(appVar.curUser.userID); // 证书更新人， 传入blockchain api
                        console.log(appVar.curUser.userID);
                        if (!self.key()) {
                            self.key(md5(objArray.toString()));
                        }
                        objArray.unshift(self.key());

                        if (self.ifCreate) {
                            self.disableSubmit(true);
                            app.isLoading(true);
                            ws.createCert(objArray).then(function (data) {
                                self.disableSubmit(false);
                                app.isLoading(false);
                                if (data.returnCode === 'Success') {
                                    app.router.store({"certListRefresh": true});
                                    appui.openDialog("提示", "证书颁发成功!");
                                    app.router.go("certListTab");
                                } else {
                                    self.key(null);
                                    appui.openDialog("警告", "颁发证书失败!");
                                }
                            }).catch(function (err) {
                                self.disableSubmit(false);
                                app.isLoading(false);
                                console.log(err);
                                self.key(null);
                                appui.openDialog("警告", "颁发证书失败!");
                            });
                        } else {
                            self.disableSubmit(true);
                            app.isLoading(true);
                            ws.updateCert(objArray).then(function (data) {
                                app.isLoading(false);
                                self.disableSubmit(false);
                                if (data.returnCode === 'Success') {
                                    app.router.store({"certListRefresh": true});
                                    appui.openDialog("提示", "证书修改成功!");
                                    app.router.go("certListTab");
                                } else {
                                    appui.openDialog("警告", "修改证书失败!");
                                }
                            }).catch(function (err) {
                                self.disableSubmit(false);
                                app.isLoading(false);
                                console.log(err);
                                appui.openDialog("警告", "修改证书失败!");
                            });
                        }


                    }
                };

//                self.initLOV();

                self.onCancel = function () {
                    app.router.go('certListTab');
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
                    self.initLOV();

                    if (appVar.curFormTitle !== self.topTitle()) {
                        self.topTitle(appVar.curFormTitle);
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
    return new CertFormViewModel();
  }
);
