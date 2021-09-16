require('dotenv').config();

const slack = require('./slack');

module.exports = new (class PuppeteerClient {

    constructor() {
        slack.open();
        process.on('SIGINT', function () {
            console.log('Got SIGINT.  Press Control-D to exit.');
            slack.close();
        });

    }
})();