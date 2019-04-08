/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojmodule-element-utils', 'utils/localStorage','data/appVariables',
    'ojs/ojmodule-element', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource', 'ojs/ojoffcanvas'
],
        function (oj, ko, moduleUtils, localStorage, appVar) {
            function ControllerViewModel() {
                var self = this;

                self.isLogin = ko.observable(false);
                self.isLoading = ko.observable(false);

                // Media queries for repsonsive layouts
                var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
                self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
                var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
                self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);


                // Router setup
                self.router = oj.Router.rootInstance;
                self.router.configure({
                    'login': {
                        label: 'Login',
                        isDefault: true
                    },
                    'home': {
                        label: 'Home'
                    },
                    'certListTab': {
                        label: 'All Certificates'
                    },
                    'certList': {
                        label: 'All Certificates'
                    },
                    'certForm': {
                        label: 'Issue Certificate'
                    },
                    'certDetail/{certKey}': {
                        label: 'Certificate Detail'
                    },
                    'clearHome': {
                        label: 'ClearHome'
                    },
                    'userProfile': {
                        label: 'User Profile'
                    }
                });

                oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

                self.moduleConfig = ko.observable({'view': [], 'viewModel': null});

                self.loadModule = function () {
                    ko.computed(function () {
                        var name = self.router.moduleConfig.name();
                        var viewPath = 'views/' + name + '.html';
                        var modelPath = 'viewModels/' + name;
                        var masterPromise = Promise.all([
                            moduleUtils.createView({'viewPath': viewPath}),
                            moduleUtils.createViewModel({'viewModelPath': modelPath})
                        ]);
                        masterPromise.then(
                                function (values) {
                                    self.moduleConfig({'view': values[0], 'viewModel': values[1]});
                                    if (self.router.stateId() != "certDetail" && self.router.stateId() != "certListTab" && self.router.stateId() != "settings") {
                                        if (self.isLogin() == false && self.router.stateId() != 'login') {
                                            self.router.go('login');
                                            console.log('relogin..1.');
                                        }
                                    }

                                },
                                function (reason) {}
                        );
                    });
                };

                // Navigation setup
                self.navData = ko.observableArray([
                    {
                        name: oj.Translations.getTranslatedString("menu.nav1"),
                        id: 'home',
                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-home-icon-24',
                        visible: false
                    },
                    {
                        name: oj.Translations.getTranslatedString("menu.nav2"),
                        id: 'certListTab',
                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-education-icon-24',
                        visible: true
                    },
                    {
                        name: oj.Translations.getTranslatedString("menu.nav3"),
                        id: 'certForm',
                        iconClass: 'oj-navigationlist-item-icon fas fa-certificate',
                        visible: false
                    }
                    ,
                    {
                        name: oj.Translations.getTranslatedString("menu.nav0"),
                        id: 'login',
                        iconClass: 'oj-navigationlist-item-icon fas fa-user',
                        visible: true
                    }
                ]);

                self.navDataSource = new oj.ArrayTableDataSource(self.navData, {
                    idAttribute: 'id'
                });

                // Drawer
                // Close offcanvas on medium and larger screens
                self.mdScreen.subscribe(function () {
                    oj.OffcanvasUtils.close(self.drawerParams);
                });

                self.drawerParams = {
                    displayMode: 'push',
                    selector: '#navDrawer',
                    content: '#pageContent'
                };
                // Called by navigation drawer toggle button and after selection of nav drawer item
                self.toggleDrawer = function () {
                    return oj.OffcanvasUtils.toggle(self.drawerParams);
                }
                // Add a close listener so we can move focus back to the toggle button when the drawer closes
                $("#navDrawer").on("ojclose", function () {
                    $('#drawerToggleButton').focus();
                });

                // Header
                // Application Name used in Branding Area
                self.appName = ko.observable("CertVE ( Certificate Verification )");
                // User Info used in Global Navigation area
                self.userLogin = ko.observable();

                // Footer
                function footerLink(name, id, linkTarget) {
                    this.name = name;
                    this.linkId = id;
                    this.linkTarget = linkTarget;
                }

                self.footerLinks = ko.observableArray([
                    new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
                    new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
                    new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
                    new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
                    new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
                ]);

            }

            return new ControllerViewModel();
        }
);