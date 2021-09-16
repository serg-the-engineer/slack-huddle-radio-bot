const SlackTab = require('./slack');

module.exports = new (class PuppeteerClient {

    constructor() {
        this._slackReady = SlackTab.open();
        process.on('SIGINT', function () {
            console.log('Got SIGINT.  Press Control-D to exit.');
            SlackTab.close();
        });

    }
})();