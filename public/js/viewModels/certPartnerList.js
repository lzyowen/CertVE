/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'services/wsCall', 'data/appVariables', 'utils/appui',
    'promise', 'ojs/ojlistview', 'ojs/ojarraydataprovider', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojformlayout',
    'ojs/ojcollectiontabledatasource', 'ojs/ojselectcombobox'
],
        function (oj, ko, $, app, ws, appVar, appui) {

            function certPartnerListViewModel() {
                var self = this;
                //nls
                self.lblPartnerName = oj.Translations.getTranslatedString("label.partnerName");
                self.btnSearch = oj.Translations.getTranslatedString("button.search");
                self.info = oj.Translations.getTranslatedString("msg3");
                self.warning = oj.Translations.getTranslatedString("msg4");
                self.msg6 = oj.Translations.getTranslatedString("msg6");
                self.msg7 = oj.Translations.getTranslatedString("msg7");
                self.msg8 = oj.Translations.getTranslatedString("msg8");
                self.msg9 = oj.Translations.getTranslatedString("msg9");
                self.msg10 = oj.Translations.getTranslatedString("msg10");
                self.t4 = oj.Translations.getTranslatedString("title.t4");
                
                // Below are a set of the ViewModel methods invoked by the oj-module component.
                // Please reference the oj-module jsDoc for additional information.
                self.isAuthed = ko.observable(false);
                self.isOracle = ko.observable(false);

                self.allItems = ko.observableArray([]);
                self.allItemsBU = ko.observableArray([]);
                self.selectedItems = ko.observableArray([]);
                self.searchKey = ko.observable(null);
                self.fPartnerName = ko.observable(null);
                self.fCertificateName = ko.observable(null);
                self.selecFilterName = ko.observable('key');
                self.filterItems = ko.observableArray(appVar.certPartSelection);
                self.searchWords = ko.observable('');
                self.smScreen = app.smScreen;
                self.screenRange = oj.ResponsiveKnockoutUtils.createScreenRangeObservable();
                self.ifOracleRole = ko.observable(false);
                self.isSmall = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(
                        oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY));
                self.columns = ko.pureComputed(function () {
                    return self.isSmall() ? 1 : 2;
                }, this);
                self.labelEdge = ko.pureComputed(function () {
                    return self.isSmall() ? "top" : "start";
                }, this);
                // self.dataProvider = new oj.ArrayDataProvider(this.allItems, {
                //   'idAttribute': 'Key'
                // });

                self.collection = ko.observable(new oj.Collection(self.allItems()));
                self.dataSource = ko.observable(new oj.CollectionTableDataSource(self.collection()));


                self.parSearchWords = ko.observable('');
                self.PartnerListBool = ko.observable(true);
                self.partAllItems = ko.observableArray([]);
                self.partAllItemsBU = ko.observableArray([]);
                self.partSelectedItems = ko.observableArray([]);
                self.partCollection = ko.observable(new oj.Collection(self.partAllItems()));
                self.partDataSource = ko.observable(new oj.CollectionTableDataSource(self.partCollection()));

                let originalCollection = self.collection();

                var partnerList = new Array();
                var newPartnerList = new Array();
                var init = function () {
                    app.isLoading(false);
                    self.ifOracleRole(false);
                    if (appVar.curUser && appVar.curUser.role === 'oracle') {
                        self.ifOracleRole(true);
                    }
                    self.checkAuthState();
                    let routerPara = app.router.retrieve();
                    if (routerPara && routerPara.certListRefresh) {
                        self.allItems([]);
                        self.getParList();

                        app.router.store({});
                    }
                };

                self.checkAuthState = function () {
                    if (appVar.curUser && (appVar.curUser.role === 'oracle' || appVar.curUser.role === 'partner' || appVar.curUser.role === 'csm')) {
                        self.isAuthed(true);
                    }
                }

                self.reBindKeyList = function (certArr) {
                    appVar.setCertTypeName(certArr);
                    appVar.setCertStatusName(certArr);
                    self.allItems(certArr);
                    self.allItemsBU(certArr);
                    self.collection().reset(certArr);
                    originalCollection = certArr;
                }

                self.gotoKeyList = function (data) {
                    self.PartnerListBool(false);
                    if (data.keylist)
                        self.reBindKeyList(data.keylist);
                }

                self.goBackToPList = function () {
                    self.PartnerListBool(true);
                }

                self.pageController = function () {

                    if (self.isAuthed()) {
                        app.isLoading(true);
                        if (appVar.curUser.role === 'csm') {
                            self.getParList();
                        } else {
                            self.onSearch();
                        }
                    }
                }


                self.getParList = function () {

                    if (appVar.curUser) {
                        var csmUserId = appVar.curUser.uuid;
                        ws.getPartnerList(csmUserId).then(function (data) {
                            if (data.status === "OK") {
                                self.onSearch();
                                partnerList = new Array();
                                if (data.list.items) {
                                    partnerList = data.list.items;
                                }
                            } else {
                                app.isLoading(false);
                            }
                        }).catch(function (err) {
                            console.log(err);
                            app.isLoading(false);
                            appui.openDialog(self.warning, self.msg9);
                        });
                    } else {
                        appui.openDialog(self.warning, self.msg10);
                    }
                }

                self.onSearch = function () {
                    //clear
                    if (self.isAuthed()) {
                        self.searchKey(null);
                        self.fPartnerName(null);
                        self.fCertificateName(null);
                        self.allItems([]);
                        self.partAllItems([]);
                        self.partAllItemsBU([]);

                        ws.queryAllCert().then(function (data) {
                            if (data.returnCode === "Success") {
                                var certArr = JSON.parse(data.result.payload);
                                if (appVar.curUser.role === 'csm') {
                                    newPartnerList = new Array();
                                    for (var j = 0; j < partnerList.length; j++) {
                                        var tempArray = new Array();
                                        for (var m = 0; m < certArr.length; m++) {
                                            if (partnerList[j].partnername === certArr[m].Record.PartnerName) {
                                                tempArray.push(certArr[m]);
                                            }
                                        }

                                        var tempObj = {
                                            "partnername": partnerList[j].partnername,
                                            "contacts": partnerList[j].contacts,
                                            "email": partnerList[j].email,
                                            "mobile": partnerList[j].mobile,
                                            "keylist": tempArray
                                        }
                                        newPartnerList.push(tempObj);
                                    }
                                } else {
                                    //oracle account
                                    newPartnerList = [];
                                    var tempObj = {
                                        "partnername": certArr[0].Record.PartnerName,
                                        "contacts": certArr[0].Record.Contacts,
                                        "email": certArr[0].Record.Email,
                                        "keylist": []
                                    };
                                    tempObj.keylist.push(certArr[0]);
                                    newPartnerList.push(tempObj);

                                    for (var m = 1; m < certArr.length - 1; m++) {
                                        var bool = 0;
                                        for (var k = 0; k < newPartnerList.length; k++) {
                                            if (certArr[m].Record.PartnerName === newPartnerList[k].partnername) {
                                                newPartnerList[k].keylist.push(certArr[m]);
                                                bool = 1;
                                            }
                                        }
                                        if (bool === 0)
                                        {
                                            var tempNewObj = {
                                                "partnername": certArr[m].Record.PartnerName,
                                                "contacts": certArr[m].Record.Contacts,
                                                "email": certArr[m].Record.Email,
                                                "keylist": []
                                            }
                                            tempNewObj.keylist.push(certArr[m]);
                                            newPartnerList.push(tempNewObj);
                                        }
                                    }
                                }
                                self.partAllItems(newPartnerList);
                                self.partAllItemsBU(newPartnerList);
                                self.partCollection().reset(newPartnerList);
                            }
                            app.isLoading(false);
                        }).catch(function (err) {
                            app.isLoading(false);
                            appui.openDialog(self.warning, self.msg6);
                        });
                    }
                };

                self.refreshSelection = function () {
                    self.filterItems(appVar.certPartSelection);
                    self.pageController();
                };

                self.onPartFilter = function () {
                    app.isLoading(false);
                    var obj = {
                        detail: {
                            value: self.parSearchWords()
                        }
                    }
                    self.partHandleRawValueChanged(obj);
                }


                self.onFilter = function () {
                    if (!self.searchWords()) {
                        appui.openDialog(self.info, self.msg7);
                    } else {
                        switch (self.selecFilterName()) {
                            case "key" :
                                app.isLoading(true);
                                ws.queryCertByKey(self.searchWords()).then(function (data) {
                                    app.isLoading(false);
                                    if (data.returnCode === "Success") {
                                        var certArr = JSON.parse(data.result.payload);
                                        appVar.setCertTypeName(certArr);
                                        appVar.setCertStatusName(certArr);
                                        self.allItems(certArr);
//                                        self.collection().reset(certArr);
                                        self.gotoDetail(certArr[0]);
                                    } else {
                                        appui.openDialog(self.info, self.msg8);
                                    }
                                }).catch(function (err) {
                                    console.log(err);
                                    app.isLoading(false);
                                    appui.openDialog(self.warning, self.msg6);
                                });
                                return false;
                            case "pName" :
                                app.isLoading(true);
//
//                                if (appVar.curUser.role !== "partner") {
//                                    ws.queryCertByName("PartnerName", self.searchWords()).then(function (data) {
//                                        app.isLoading(false);
//                                        console.log("onSearch resp pname: " + JSON.stringify(data));
//                                        if (data.returnCode === "Success") {
//                                            var certArr = JSON.parse(data.result);
//                                            appVar.setCertTypeName(certArr);
//                                            appVar.setCertStatusName(certArr);
//                                            self.allItems(certArr);
//                                            self.allItemsBU(certArr);
//                                            self.collection().reset(certArr);
//                                        }
//                                    }).catch(function (err) {
//                                        app.isLoading(false);
//                                        appui.openDialog(self.warning, "查询证书失败!", err);
//                                    });
//                                }
                                app.isLoading(false);
                                var obj = {
                                    detail: {
                                        value: self.searchWords()
                                    }
                                }
                                self.handleRawValueChanged(obj);
                                return false;
                            case "cName" :
                                app.isLoading(true);
//                                if (appVar.curUser.role !== "partner") {
//                                    ws.queryCertByName("CertificateName", self.searchWords()).then(function (data) {
//                                        app.isLoading(false);
//                                        console.log("onSearch resp cname: " + JSON.stringify(data));
//                                        if (data.returnCode === "Success") {
//                                            var certArr = JSON.parse(data.result);
//                                            appVar.setCertTypeName(certArr);
//                                            appVar.setCertStatusName(certArr);
//                                            self.allItems(certArr);
//                                            self.allItemsBU(certArr);
//                                            self.collection().reset(certArr);
//                                        }
//                                    }).catch(function (err) {
//                                        app.isLoading(false);
//                                        appui.openDialog(self.warning, "查询证书失败!", err);
//                                    });
//                                } else {
                                app.isLoading(false);
                                var obj = {
                                    detail: {
                                        value: self.searchWords()
                                    }
                                }
                                self.handleRawValueChanged(obj);
//                                }
                                return false;
                            default:
                                return false;
                        }

                        self.collection().reset(originalCollection);
                        //self.dataSource(new oj.CollectionTableDataSource(new oj.Collection(originalCollection)));
                    }
                };

                self.onEdit = function (data) {
                    if (self.ifOracleRole()) {
                        app.router.store(data);
                        app.router.go("certForm");
                    }
                };

                self.gotoDetail = function (data) {
                    if (data && data.Key) {
                        data.curFormTitle = self.t4;
                        var tempInt = Number(data.Record.Score);
                        data.Record.Score = forDight(tempInt, 1);
                        app.router.store(data);
                        app.router.go('certDetail/' + data.Key);
                    }
                }


                function forDight(_num, _x) {

                    var n = 1;

                    for (var i = 0; i < _x; i++) {
                        n = n * 10;
                    }
                    return Math.round(_num * n) / n;
                }


                self.nameFilter = function (model, attr, value)
                {
                    if (self.selecFilterName() === "cName") {
                        var cname = model.get("CertificateName");
                        return (cname.toLowerCase().indexOf(value.toLowerCase()) > -1);
                    } else if (self.selecFilterName() === "pName") {
                        var cname = model.get("PartnerName");
                        return (cname.toLowerCase().indexOf(value.toLowerCase()) > -1);
                    } else if (self.selecFilterName() === "key") {
                        var cname = model.get("CertificateHash");
                        return (cname.toLowerCase().indexOf(value.toLowerCase()) > -1);
                    }
                };

                self.partFilter = function (model, attr, value)
                {

                    var cname = model.get("partnername");
                    return (cname.toLowerCase().indexOf(value.toLowerCase()) > -1);

                };

                self.partHandleRawValueChanged = function (event)
                {

                    var filter = event.detail.value;
                    if (filter.length == 0)
                    {
                        self.partCollection().reset(self.partAllItemsBU());
                    } else
                    {
                        if (self.partFilteredDataSource == undefined)
                        {
                            self.partFilteredCollection = self.partCollection().clone();
                            self.partFilteredDataSource = new oj.CollectionTableDataSource(self.partFilteredCollection);
                        }

                        self.partAllItemsCopy = ko.observableArray(self.partAllItemsBU());

                        self.partOldFilterArray = new Array();
                        self.partNewFilterArray = new Array();
                        for (var k = 0; k < self.partAllItemsCopy().length; k++) {
                            var newItem = self.partAllItemsCopy()[k];
                            self.partOldFilterArray.push(newItem);
                        }
                        self.partOldCollectionforFilter = new oj.Collection(self.partOldFilterArray);

                        var ret = self.partOldCollectionforFilter.where({partnername: {value: filter, comparator: self.partFilter}});

                        for (var m = 0; m < ret.length; m++) {
                            var newObj = ret[m].attributes
                            self.partNewFilterArray.push(newObj);
                        }
                        self.partCollection().reset(self.partNewFilterArray);
                    }
                };

                self.handleRawValueChanged = function (event)
                {
                    var filter = event.detail.value;
                    if (filter.length == 0)
                    {
//                            self.collection(originalCollection);
                        self.collection().reset(self.allItemsBU());
                    } else
                    {
                        if (self.filteredDataSource == undefined)
                        {
                            self.filteredCollection = self.collection().clone();
                            self.filteredDataSource = new oj.CollectionTableDataSource(self.filteredCollection);
                        }

                        self.allItemsCopy = ko.observableArray(self.allItemsBU());

                        self.oldFilterArray = new Array();
                        self.newFilterArray = new Array();
                        for (var k = 0; k < self.allItemsCopy().length; k++) {
                            var newItem = self.allItemsCopy()[k].Record;
                            self.oldFilterArray.push(newItem);
                        }
                        self.oldCollectionforFilter = new oj.Collection(self.oldFilterArray);


                        if (self.selecFilterName() === "cName") {
                            var ret = self.oldCollectionforFilter.where({CertificateName: {value: filter, comparator: self.nameFilter}});
                        } else if (self.selecFilterName() === "pName") {
                            var ret = self.oldCollectionforFilter.where({PartnerName: {value: filter, comparator: self.nameFilter}});
                        } else if (self.selecFilterName() === "key") {
                            var ret = self.oldCollectionforFilter.where({CertificateHash: {value: filter, comparator: self.nameFilter}});
                        }
                        for (var m = 0; m < ret.length; m++) {
                            var newObj = {
                                Key: ret[m].attributes.CertificateHash,
                                Record: ret[m].attributes
                            }
                            self.newFilterArray.push(newObj);
                        }
                        self.collection().reset(self.newFilterArray);
                    }
                };

                self.handleActivated = function (info) {
                    init();
                    self.refreshSelection();
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
                    init();
                    self.refreshSelection();
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
            return new certPartnerListViewModel();
        }
);