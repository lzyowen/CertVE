define(['ojs/ojcore', 'jquery'],
        function (oj, $) {
            /**
             * The view model for the main content view template
             */
            function appVariablesModel() {
                var self = this;
                self.curUser = null;

                self.certStatusArr = [{"key": "0", "value": "通过"},
                    {"key": "1", "value": "失败"}, {"key": "2", "value": "降级通过"}, {"key": "3", "value": "取消"}];
                self.certTypeArr = [{"key": "Primary", "value": "Primary"},
                    {"key": "Intermediate", "value": "Intermediate"}, {"key": "Advanced", "value": "Advanced"}];

                self.certSelection = [
                    {value: 'key', label: oj.Translations.getTranslatedString("label.hKey")}
                ];
                self.certPartSelection = [
                    {value: 'key', label: oj.Translations.getTranslatedString("label.hKey")},
                ];

                self.getCertStatusName = function (certStatus) {
                    for (let i = 0; i < self.certStatusArr.length; i++) {
                        if (certStatus === self.certStatusArr[i].key) {
                            return self.certStatusArr[i].value;
                        }
                    }
                    return certStatus;
                };

                self.getCertTypeName = function (certType) {
                    for (let i = 0; i < self.certTypeArr.length; i++) {
                        if (certType === self.certTypeArr[i].key) {
                            return self.certTypeArr[i].value;
                        }
                    }
                    return certType;
                };

                self.setCertTypeName = function (certArr) {
                    for (let i = 0; i < certArr.length; i++) {
                        certArr[i].Record.certTypeName = self.getCertTypeName(certArr[i].Record.CertificateType);
                    }
                };

                self.setCertStatusName = function (certArr) {
                    for (let i = 0; i < certArr.length; i++) {
                        certArr[i].Record.certStatusName = self.getCertStatusName(certArr[i].Record.CertificateStatus);
                    }
                };
            }

            return new appVariablesModel();
        });