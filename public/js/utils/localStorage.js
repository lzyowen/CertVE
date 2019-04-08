define(['jquery', 'data/appVariables'], 
function ($, appVar) {
    function localStorage() {
        var self = this;
        var storage = window.localStorage;
        
        self.setIsLogin = function(isLogin){
            storage.setItem("CERT_IS_LOGIN", isLogin);
        };

        self.getIsLogin = function(){
            return storage.getItem("CERT_IS_LOGIN");
        };

    };

    return new localStorage();
});