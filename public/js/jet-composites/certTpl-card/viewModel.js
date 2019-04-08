define(['knockout', 'qrcode', 'appController', 'data/appVariables',
  'ojs/ojavatar', 'ojs/ojknockout'],
  function (ko, qrcode, app, appVar) {
    function model(context) {
      var self = this;
      self.initials = null;
      self.workFormatted = null;
      var element = context.element;
      self.qrOpts = {
        size: 60,
        text: 'http://www.oracle.com',
        background: "#ffffff"
      }
      self.certKey = ko.observable(context.properties.certificateHash);
    //  self.certType = ko.observable(null);

      var init = function () {
        self.qrOpts.text = window.location.origin + '/?root=certDetail/' + self.certKey();
        $("#certQR").attr("id", "certQR_" + self.certKey());
        $("#certQR_" + self.certKey()).qrcode(self.qrOpts);
/*         for (let i = 0; i < appVar.curUser.certs.length; i++) {
          let it = appVar.curUser.certs[i];
          if (it.CertificateHash === self.certKey()) {
            self.certType(it.CertificateType);
            break;
          }
        } */
      };

      self.onMoreInfo = function () {
        for (let i = 0; i < appVar.curUser.certs.length; i++) {
          let it = appVar.curUser.certs[i];
          if (it.CertificateHash === self.certKey()) {
            let routerPar = { "Key": self.certKey() };
            routerPar.Record = it;
            app.router.store(routerPar);
            break;
          }
        }
        app.router.go('certDetail/' + self.certKey());
      };

      self.connected = function () {
        init();
      };

      /**
       * Formats a 10 digit number as a phone number.
       * @param  {number} number The number to format
       * @return {string}        The formatted phone number
       */
      var formatPhoneNumber = function (number) {
        return Number(number).toString().replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      }

      // if (context.properties.name) {
      //   var initials = context.properties.name.match(/\b\w/g);
      //   self.initials = (initials.shift() + initials.pop()).toUpperCase();
      // }

      // if (context.properties.workNumber)
      //   self.workFormatted = formatPhoneNumber(context.properties.workNumber);

      /**
       * Flips a card
       * @param  {MouseEvent} event The click event
       */
      self.flipCard = function (event) {
        if (event.type === 'click' || (event.type === 'keypress' && event.keyCode === 13)) {
          // It's better to look for View elements using a selector 
          // instead of by DOM node order which isn't gauranteed.
          $(element).children('.demo-card-flip-container').toggleClass('demo-card-flipped');
        }
      };
    }

    return model;
  }
)
