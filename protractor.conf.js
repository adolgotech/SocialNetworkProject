exports.config = {
  framework: 'mocha',
  specs: [
    'test/e2e/**/*.spec.js'
  ],
  mocaOpts: {
    enableTimeouts: false
  },
  onPrepare: function() {
    require('./server')
  }
}
