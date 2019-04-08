/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'data/appVariables',
    'ojs/ojmodule'],
  function (oj, ko, $, app, appVar) {

    function HeaderViewModel() {
      var self = this;
      
      //nls
      self.lblAdmin = oj.Translations.getTranslatedString("top.nav1");
      self.lblProfile = oj.Translations.getTranslatedString("top.nav2");
      self.lblLogout = oj.Translations.getTranslatedString("top.nav3");

      self.toggleDrawer = app.toggleDrawer;
      self.appName = app.appName;
      self.smScreen = app.smScreen;
      self.userLogin = app.userLogin;
      self.router = app.router;
      self.navDataSource = app.navDataSource;
      self.menuLOV = ko.observableArray([]);
      self.isLogin = app.isLogin;
      self.ifOracleRole = ko.observable(false);

      self.onAdmin = function () {
        window.open("https://apex.oracle.com/pls/apex/f?p=42395:101:111404587634397:::::"); 
      };
      
      self.onUserProfile = function () {
        app.router.go('userProfile');
      };
      
      self.onLogout = function () {
      //  app.router.go('login');
        app.router.store({});
        app.router.go('login');
        window.location.reload(true);
      };

      self.init = function () {
        // if (appVar.curUser && appVar.curUser.role === 'oracle') {
        //   self.ifOracleRole(true);
        // }

        // if (self.menuLOV().length === 0) {
        //   console.log("menuLOV init...");
          
        //   if (self.ifOracleRole() == true) {
        //     self.typeLOV().push({ id: "admin", value: "admin", label: "管理", onClickMethod: "onUserProfile" });
        //   }

        //   self.typeLOV().push({ id: "profile", value: "profile", label: "个人信息", onClickMethod: "onUserProfile" });
        //   self.typeLOV().push({ id: "logout", value: "logout", label: "退出", onClickMethod: "onLogout" });

        //   for (let i = 0; i < appVar.certTypeArr.length; i++) {
        //     let it = appVar.certTypeArr[i];
        //     self.typeLOV().push({ value: it.key, label: it.value });
        //   }
        // }
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
        self.init();
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
    return HeaderViewModel;
  }
);