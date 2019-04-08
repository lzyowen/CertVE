/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * settings module
 */
define(['ojs/ojcore', 'knockout', 'data/appVariables', 'services/wsCall', 'ojs/ojbutton', 'ojs/ojinputtext'
], function (oj, ko, appVar, ws) {
    /**
     * The view model for the main content view template
     */
    function settingsContentViewModel() {
        var self = this;
        self.hostURL = ko.observable(appVar.hostURL);
        self.hostURLtitle = ko.observable("后台URL:");
        self.onConfirm = function () {
            window.localStorage.setItem("HOST_URL", self.hostURL());
            appVar.hostURL = self.hostURL();
            ws.reloadServerConfig();
            self.hostURLtitle("后台URL(已更新):");
        }

        self.disconnected = function () {
            self.hostURLtitle("后台URL:");
        };
    }

    return new settingsContentViewModel;
});
