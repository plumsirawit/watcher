process.env.NODE_ENV = 'test';

module.exports = {
  plugins: [require('@snowpack/web-test-runner-plugin')()],
  testFramework: {
    config: {
      timeout: '50000'
    }
  }
};
