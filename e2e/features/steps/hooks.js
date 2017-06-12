'use strict';

var hooks = function() {

  this.After(function(scenario, callback) {
    if (scenario.isFailed()) {
      browser.takeScreenshot().then(
        function(stream) {
          scenario.attach(new Buffer(stream, 'base64'), 'image/png');
          callback();
        },
        function(err) { callback(err); });
    } else {
      callback();
    }
  });

  this.registerHandler('AfterFeatures', function (features, callback) {
    var reporter = require('cucumber-html-reporter');
    var options = {
      theme: 'bootstrap',
      jsonFile: 'e2e/protractor-cucumber-report.json',
      output: 'e2e/protractor-cucumber_report.html',
      reportSuiteAsScenarios: true,
      launchReport: true
    };
    reporter.generate(options);
    callback();
  });
};

module.exports = hooks;
