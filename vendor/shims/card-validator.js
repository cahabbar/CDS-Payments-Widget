(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['card-validator'],
      __esModule: true,
    };
  }

  define('card-validator', [], vendorModule);
})();
