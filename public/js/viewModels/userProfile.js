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

    function UserProfileViewModel() {
      var self = this;

      //nls
      self.topTitle = oj.Translations.getTranslatedString("menu.nav4");
      self.lblUsername = oj.Translations.getTranslatedString("label.username");
      self.lblFullname = oj.Translations.getTranslatedString("label.fullname");
      self.lblContacts = oj.Translations.getTranslatedString("label.contacts");
      self.lblMobile = oj.Translations.getTranslatedString("label.mobile");
      self.lblEmail = oj.Translations.getTranslatedString("label.email");
      self.lblInfo = oj.Translations.getTranslatedString("label.info");
      self.lblLastUpdatedate = oj.Translations.getTranslatedString("label.lastUpdatedate");
      self.lblChangePwd = oj.Translations.getTranslatedString("label.changePwd");
      self.lblOldpwd = oj.Translations.getTranslatedString("label.oldpwd");
      self.lblNewpwd = oj.Translations.getTranslatedString("label.newpwd");
      self.lblNewpwdConfirm = oj.Translations.getTranslatedString("label.newpwdConfirm");
      self.btnCancel = oj.Translations.getTranslatedString("button.cancel");
      self.btnSubmit = oj.Translations.getTranslatedString("button.submit");
      self.btnSave = oj.Translations.getTranslatedString("button.save");

      self.ifOracleRole = ko.observable(false);
      self.isSmall = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(
        oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY));
      self.columns = ko.pureComputed(function () {
        return self.isSmall() ? 1 : 2;
      }, this);
      self.labelEdge = ko.pureComputed(function () {
        return self.isSmall() ? "top" : "start";
      }, this);
      self.isChangePwd = ko.observable(false);

      self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter({
        pattern: 'yyyy-MM-dd'
      }));
      self.nowDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
      self.disableSubmit = ko.observable(false);

      //User Info
      self.userID = ko.observable("");
      self.fullname = ko.observable("");
      self.contacts = ko.observable("");
      self.mobile = ko.observable("");
      self.email = ko.observable("");
      self.info = ko.observable("");
      self.lastUpdateDate = ko.observable("");

      //Change Password
      self.oldpassword = ko.observable("");
      self.newpassword = ko.observable("");
      self.newpasswordConfirm = ko.observable("");
      
      self.passwordConfirm = ko.pureComputed(function () {
        return [{  
          'validate' : function(value)
          {
            var firstPassword = self.newpassword();
            var secondPassword = value;
            // "", undefined, null should all compare to equal
            if (!firstPassword)
              firstPassword = "";
            if (!secondPassword)
              secondPassword = "";
  
            if (firstPassword !== secondPassword)
            {
              throw new oj.ValidatorError(
                "请确认", "新密码输入不一致！");
            }
          },
        }];
      });
      
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
        var _contacts = document.getElementById("Contacts");
        var _mobile = document.getElementById("Mobile");
        var _email = document.getElementById("Email");
        var _info = document.getElementById("Info");

        if (_contacts.valid === "valid" && _mobile.valid === "valid" && _email.valid === "valid" && _info.valid === "valid") {
          // submit the form would go here
          return true;
        } else {
          // show messages
          // could instead use the <oj-validation-group> and its showMessages().
          _contacts.showMessages();
          _mobile.showMessages();
          _email.showMessages();
          _info.showMessages();
        }
        return false;
      };

      self.init = function () {
        app.isLoading(false);

        self.isChangePwd(false);
        self.oldpassword("");
        self.newpassword("");
        self.newpasswordConfirm("");

        //User Info
        if (appVar.curUser) {
          self.userID(appVar.curUser.userID);
          self.fullname(appVar.curUser.fullname);
          self.contacts(appVar.curUser.contacts);
          self.mobile(appVar.curUser.mobile);
          self.email(appVar.curUser.email);
          self.info(appVar.curUser.info);
          self.lastUpdateDate(appVar.curUser.lastUpdateDate);
        }
      };

      self.onSubmit = function () {
        if (self.isChangePwd()) {
          var reqBody = {};
          reqBody.username = self.userID();
          reqBody.oldpassword = md5(self.oldpassword());
          reqBody.newpassword = md5(self.newpassword());
          
          ws.changePassword(reqBody).then(function (data) {
            app.isLoading(false);
            self.disableSubmit(false);
            if (data.status === 'Success') {
              appui.openDialog("提示", "修改成功!");
              app.router.go("certListTab");
            }
            else {
              appui.openDialog("警告", "修改失败!");
            }
          }).catch(function (err) {
            self.disableSubmit(false);
            app.isLoading(false);
            console.log(err);
            appui.openDialog("异常", "修改失败!");
          });
        }
        else {
          if (validBeforeSubmit()) {
            var reqBody = {};
            reqBody.username = self.userID();
            reqBody.contacts = self.contacts();
            reqBody.mobile = self.mobile();
            reqBody.email = self.email();
            reqBody.info = self.info();
            // call update service
            self.disableSubmit(true);
            app.isLoading(true);
            ws.changeProfile(reqBody).then(function (data) {
              app.isLoading(false);
              self.disableSubmit(false);
              if (data.status === 'Success') {
                // Refresh Profile
                ws.getUserInfo(self.userID()).then(function (data) {
                  appVar.curUser = data;
                }).catch(function (err) {
                  console.log(err);
                  appui.openDialog("异常", "获取个人信息失败!");
                });
                
                appui.openDialog("提示", "修改成功!");
                app.router.go("certListTab");
              }
              else {
                appui.openDialog("警告", "修改失败!");
              }
            }).catch(function (err) {
              self.disableSubmit(false);
              app.isLoading(false);
              console.log(err);
              appui.openDialog("异常", "修改失败!");
            });

          }
        }
      };

      self.onCancel = function () {
        app.router.go('certListTab');
      };

      self.onChangePwd = function () {
        self.isChangePwd(true);
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
    return new UserProfileViewModel();
  }
);