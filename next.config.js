const withFonts = require('next-fonts');

module.exports = withFonts({
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    };

    return config;
  },
  // target: 'serverless',
  env: {
    API_URL: 'http://toklah-env.bqzn3mruwd.us-east-2.elasticbeanstalk.com'
  }
});

// http://cashback.us-east-2.elasticbeanstalk.com
// http://192.168.1.105:7070
