/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'blueimpMD5', 'services/wsCall', 'data/appVariables', 'utils/appui', 'viewModels/certList',
    'ojs/ojinputtext', 'ojs/ojlabel', 'ojs/ojbutton', 'ojs/ojrouter'
],
        function (oj, ko, $, app, md5, ws, appVar, appui, sertList) {

            function LoginViewModel() {
                var self = this;
                self.router = oj.Router.rootInstance;

                //nls
                self.lblusername = oj.Translations.getTranslatedString("label.username");
                self.lblpassword = oj.Translations.getTranslatedString("label.password");
                self.btnLogin = oj.Translations.getTranslatedString("button.login");
                self.msg4 = oj.Translations.getTranslatedString("msg4");
                self.msg5 = oj.Translations.getTranslatedString("msg5");
                self.username = ko.observable('');
                self.password = ko.observable('');

                self.onLogin = function () {
                    app.isLoading(true);
                    ws.authUser(self.username(), md5(self.password())).then(self.loginSuccess, self.loginError);
                };

                self.loginSuccess = function (data) {
                    if (data.status === 'OK') {
                        console.log("login: ", data.user);
                        app.isLogin(true);
                        appVar.curUser = data.user;
                        app.userLogin(appVar.curUser.userID);
                        self.setNavByCurUser();
                        self.setCertSeletion(appVar.curUser.role);
                        app.router.go('clearHome');
                    }
                    app.isLoading(false);
                };

                EnterPress = function () {
                    var e = e || window.event;
                    if (e.keyCode == 13) {
                        // self.username, self.password赋值有延迟，设置setTimeout
                        setTimeout(function () {
                            self.onLogin();
                        }, 100);
                    }
                }


                self.setCertSeletion = function (role) {
                    switch (role) {
                        case "oracle":
                            appVar.certSelection = [
                                {value: 'key', label: oj.Translations.getTranslatedString("label.hKey")},
                                {value: 'pName', label: oj.Translations.getTranslatedString("label.partnerName")},
                                {value: 'cName', label: oj.Translations.getTranslatedString("label.certName")}
                            ];
                             appVar.certPartSelection = [
                                {value: 'key', label: oj.Translations.getTranslatedString("label.hKey")},
                                {value: 'cName', label: oj.Translations.getTranslatedString("label.certName")}
                            ];
                            return false;
                        case "partner":
                            appVar.certSelection = [
                                {value: 'key', label: oj.Translations.getTranslatedString("label.hKey")},
                                {value: 'cName', label: oj.Translations.getTranslatedString("label.certName")}
                            ]
                            return false;
                        case "csm":
                            appVar.certSelection = [
                                {value: 'key', label: oj.Translations.getTranslatedString("label.hKey")},
                                {value: 'pName', label: oj.Translations.getTranslatedString("label.partnerName")},
                                {value: 'cName', label: oj.Translations.getTranslatedString("label.certName")}
                            ];
                         appVar.certPartSelection = [
                                {value: 'key', label: oj.Translations.getTranslatedString("label.hKey")},
                                {value: 'cName', label: oj.Translations.getTranslatedString("label.certName")}
                            ];
                            return false;
                        default :
                            appVar.certSelection = [
                                {value: 'key', label: oj.Translations.getTranslatedString("label.hKey")}
                            ]
                            return false;
                    }
                }

                self.loginError = function (data) {
                    app.isLoading(false);
                    appui.openDialog(self.msg4, self.msg5);
                    console.error(data);
                };

                self.onReset = function () {
                    self.username('');
                    self.password('');
                };

                self.setNavByCurUser = function () {
                    if (appVar.curUser && appVar.curUser.role) {
                        let newNavArr = app.navData();
                        for (let i = 0; i < newNavArr.length; i++) {
                            let it = newNavArr[i];
                            if (it.id === 'certForm' && appVar.curUser.role === 'oracle') {
                                newNavArr[i].visible = true;
                            }
                            if (it.id === 'home' && (appVar.curUser.role === 'customer' || appVar.curUser.role === 'oracle' || appVar.curUser.role === 'csm')) {
                                newNavArr[i].visible = false;
                            }
                            if (it.id === 'login' && (appVar.curUser.role === 'partner' || appVar.curUser.role === 'oracle' || appVar.curUser.role === 'csm')) {
                                newNavArr[i].visible = false;
                            }

                            if (it.id === 'home' && appVar.curUser.role === 'partner') {
                                newNavArr[i].visible = true;
                            }
                        }
                        app.navData([]);
                        app.navData(newNavArr);
                    }
                };



                // Below are a set of the ViewModel methods invoked by the oj-module component.
                // Please reference the oj-module jsDoc for additional information.

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
            return new LoginViewModel();
        }
);