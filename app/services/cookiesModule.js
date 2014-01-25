var cookiesModule = angular.module('cookiesModule', []);

cookiesModule.constant('infinity_date', 'Fri, 31 Dec 9999 23:59:59 GMT');

cookiesModule.factory('Cookies', ['infinity_date' ,function (infinity_date) {

  return {

    getItem: function (sKey) {
      return decodeURI(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURI(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
    },

    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
      var sExpires = '';
      if (vEnd) {
        switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? '; expires=' + infinity_date : '; max-age=' + vEnd;
          break;
        case String:
          sExpires = '; expires=' + vEnd;
          break;
        case Date:
          sExpires = '; expires=' + vEnd.toGMTString();
          break;
        }
      }
      document.cookie = encodeURI(sKey) + '=' + encodeURI(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '');
      return true;
    },

    removeItem: function (sKey, sPath) {
      if (!sKey || !this.hasItem(sKey)) { return false; }
      document.cookie = encodeURI(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sPath ? '; path=' + sPath : '');
      return true;
    },

    hasItem: function (sKey) {
      return (new RegExp('(?:^|;\\s*)' + encodeURI(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
    },

    keys: /* optional method: you can safely remove it! */ function () {
      var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
      for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURI(aKeys[nIdx]); }
      return aKeys;
    }

  };

}]);
