define(['ojs/ojcore', 'jquery'],
        function (oj, $) {
            /**
             * The view model for the main content view template
             */
            function dummyDataModel() {
                var self = this;
                self.users = [
                    {
                        "userID": "bcadmin",
                        "password": "2d5f71b09737086f18c8b3d22157e001",
                        "contacts": "Sales Consultant",
                        "email": "lichao.li@oracle.com",
                        "info": "This is an administration account just for registering certifications.",
                        "role": "oracle",
                        "lastUpdateDate": "2018-11-06",
                        "status": 1
                    }
                ];

                self.cert_name_opts = {
                    "items": [
                        {"type":"cert_name", "label":"Intermediate Level Partner of Oracle Hybrid Cloud Database Migration And Management", "value":"Intermediate Level Partner of Oracle Hybrid Cloud Database Migration And Management"},
                        {"type":"cert_name", "label":"Intermediate Level Partner of Oracle Hybrid Cloud Data Integration", "value":"Intermediate Level Partner of Oracle Hybrid Cloud Data Integration"},
                        {"type":"cert_name", "label":"Advanced Level Partner of Oracle Hybrid Cloud Data Integration", "value":"Advanced Level Partner of Oracle Hybrid Cloud Data Integration"},
                        {"type":"cert_name", "label":"Advanced Level Partner of Oracle AppDev", "value":"Advanced Level Partner of Oracle AppDev"}
                    ]
                }

                self.cert_type_opts = {
                    "items": [
                        {"type":"cert_type", "label":"Primary", "value":"Primary"},
                        {"type":"cert_type", "label":"Intermediate", "value":"Intermediate"},
                        {"type":"cert_type", "label":"Advanced", "value":"Advanced"}
                    ]
                }

                self.cert_status_opts = {
                    "items": [
                        {"type":"cert_status", "label":"通过", "value":"0"},
                        {"type":"cert_status", "label":"失败", "value":"1"},
                        {"type":"cert_status", "label":"降级通过", "value":"2"},
                        {"type":"cert_status", "label":"取消", "value":"3"},
                    ]
                }

                // var p1 = ws.getCertInfo("cert_name");
                // var p2 = ws.getCertInfo("cert_type");
                // var p3 = ws.getCertInfo("cert_status");
            }

            return new dummyDataModel();
        });