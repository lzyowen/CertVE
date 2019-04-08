/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'data/appVariables', 'ojs/ojrouter', 'ojs/ojknockout',
    'ojs/ojmodule', 'ojs/ojbutton'
],
        function (oj, ko, $, app, appVar) {

            function certListTabViewModel() {
                var self = this;
                //nls
                self.t1 = ko.observable(oj.Translations.getTranslatedString("title.t1"));
                self.t2 = ko.observable(oj.Translations.getTranslatedString("title.t2"));
                self.t3 = ko.observable(oj.Translations.getTranslatedString("title.t3"));
                
                app.isLoading(false);
                self.isAuthBool = ko.observable(false);
                self.isOracle = ko.observable(false);

                this.currentModule = ko.observable("certList");
                var self = this;
                this.modulePath = ko.pureComputed(
                        function ()
                        {
                            var name = self.currentModule();
                            return name;
                        }
                );

                self.checkAuth = function () {
                    if (appVar.curUser) {
                        if (appVar.curUser.role === 'oracle') {
                            self.isAuthBool(true);
                            self.isOracle(true);
                        }
                        else if (appVar.curUser.role === 'csm') {
                            self.isAuthBool(true);
                            self.currentModule("certPartnerList"); // csm 只可见Partners Tab
                        }
                    }
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
                    self.checkAuth();
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
            return new certListTabViewModel();
        }
);