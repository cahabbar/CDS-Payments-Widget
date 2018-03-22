/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');


module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    emberCliConcat: {
      js: {
        concat: true
      },
      css: {
        concat: true
      }
    },
    fingerprint: {
      prepend: 'https://cdn.rawgit.com/CDSGlobal/CDS-Payments-Widget/master/docs/'
    },
    babel: {
      plugins: [
        'transform-object-rest-spread',
      ]
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('vendor/cds-process.min.css');-
  app.import('vendor/material.min.css');-
  //app.import('vendor/jquery-3.3.1.slim.min.js');-

  app.import('node_modules/card-validator/index.js', {
    using: [{ transformation: 'cjs', as: 'card-validator' }]
  });
  app.import('node_modules/card-validator/src/card-number.js', {
    using: [{ transformation: 'cjs', as: 'src/card-number' }]
  });
  app.import('node_modules/card-validator/src/expiration-date.js', {
    using: [{ transformation: 'cjs', as: 'src/expiration-date' }]
  });
  app.import('node_modules/card-validator/src/parse-date.js', {
    using: [{ transformation: 'cjs', as: 'src/parse-date' }]
  });
  app.import('node_modules/card-validator/src/expiration-year.js', {
    using: [{ transformation: 'cjs', as: 'src/expiration-year' }]
  });
  app.import('node_modules/card-validator/src/lib/is-array.js', {
    using: [{ transformation: 'cjs', as: 'src/lib/is-array' }]
  });
  app.import('node_modules/card-validator/src/expiration-month.js', {
    using: [{ transformation: 'cjs', as: 'src/expiration-month' }]
  });
  app.import('node_modules/card-validator/src/cvv.js', {
    using: [{ transformation: 'cjs', as: 'src/cvv' }]
  });
  app.import('node_modules/card-validator/src/postal-code.js', {
    using: [{ transformation: 'cjs', as: 'src/postal-code' }]
  });
  app.import('node_modules/credit-card-type/index.js', {
    using: [{ transformation: 'cjs', as: 'credit-card-type' }]
  });
  app.import('node_modules/card-validator/src/luhn-10.js', {
    using: [{ transformation: 'cjs', as: 'src/luhn-10' }]
  });



  return app.toTree();
};
