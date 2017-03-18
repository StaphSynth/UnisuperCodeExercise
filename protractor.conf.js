var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
   seleniumAddress: 'http://localhost:4444/wd/hub',

   specs: ['todo.spec.js'],

  multiCapabilities: [{
    'browserName': 'chrome'
  }],

  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
  }
}
