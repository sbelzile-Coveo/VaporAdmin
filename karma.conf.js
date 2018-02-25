const webpackConfig = require("./webpack.config.tests.js");

var configuration = {
    frameworks: ["jasmine"],
    preprocessors: {
        "tests/Entry.spec.ts": ["webpack"],
    },

    files: [
        'tests/Entry.spec.ts'
    ],

    mime: {
        'text/x-typescript': ['ts', 'tsx'],
    },
    reporters: ["coverage-istanbul", "spec", "junit"],
    coverageIstanbulReporter: {
        dir: "./bin/coverage",
        reports: [
            'cobertura',
            'json',
            'lcov',
            'text-summary'
        ],
        fixWebpackSourcePaths: true
    },
    junitReporter: {
        outputDir: 'bin/UT'
    },
    webpack: webpackConfig,
    browsers:["ChromeHeadlessNoSandbox"],
    customLaunchers: {
        ChromeDebugging: {
            base: 'Chrome',
            flags: [ '--remote-debugging-port=9222' ]
        },
        ChromeHeadlessNoSandbox: {
            base: 'ChromeHeadless',
            flags: [ '--no-sandbox' ]
        }
    }
};

module.exports = function(config) {
  config.set(configuration);
};