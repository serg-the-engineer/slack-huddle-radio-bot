const puppeteer = require('puppeteer');

const memberCounterSpan = '.p-huddle_activity__member_count_text';

const executable = process.env.EXECUTABLE;
const rootUrl = process.env.ROOT_URL;
const channelUrl = process.env.CHANNEL_URL;
const login = process.env.LOGIN;
const password = process.env.PASSWORD;

module.exports = new (class SlackTab {
    async open() {
        this.browser = await puppeteer.launch({
            headless: false,
            slowMo: 50,
            executablePath: executable,
            userDataDir: '.data/slack',
            args: ['--use-fake-ui-for-media-stream'],
            ignoreDefaultArgs: ["--mute-audio"],
        });
        this.page = await this.browser.newPage();
        await this.page.goto(channelUrl);
        await this.page.waitForTimeout(5 * 1000);
        // this.page.screenshot({ 'path': 'start.png' });
        const url = await this.page.evaluate(() => document.location.href);

        if (url == rootUrl) {
            await this.login();
        }

        await this.checkSoundPreferences();
        await this.joinHuddle();
    }

    async close() {
        const checkbox = await this.page.$('#huddle_toggle');
        const isInHuddle = await (await checkbox.getProperty('checked')).jsonValue();
        if (isInHuddle) {
            await this.page.click('#huddle_toggle');
        }
        return this.browser.close();
    }

    async login() {
        console.log("start login");
        await this.page.focus('#email');
        await this.page.keyboard.type(login);

        await this.page.focus('#password');
        await this.page.keyboard.type(password);
        // this.page.screenshot({ 'path': 'login.png' });

        await this.page.click('#signin_btn');
        console.log("wait for login");
        await this.page.waitForTimeout(5 * 1000);

        await this.page.goto(channelUrl);
        await this.page.waitForTimeout(15 * 1000);
        console.log("logged");
    }

    async checkSoundPreferences() {
        await this.page.click('button[data-qa=user-button]');
        await this.page.waitForTimeout(1 * 1000);
        await this.page.evaluate(() => {
            const target = document.querySelectorAll('div.c-menu__items button')[6];
            target.click();
        });
        await this.page.waitForTimeout(1 * 1000);
        await this.page.evaluate(() => {
            const target = document.querySelectorAll('div.c-tabs__tab_menu button')[7];
            target.click();
        });

        // this.page.screenshot({ 'path': 'audio.png' });
        const checkbox = await this.page.$('.p-prefs_modal--video_audio_camera_video_prop .c-input_checkbox');
        const isVolumeConrolled = await (await checkbox.getProperty('checked')).jsonValue();
        if (isVolumeConrolled) {
            await this.page.click('.p-prefs_modal--video_audio_camera_video_prop .c-input_checkbox');
        }
        // this.page.screenshot({ 'path': 'audio2.png' });

        await this.page.click('button[data-qa=sk_close_modal_button]');
    }

    async joinHuddle() {
        const checkbox = await this.page.$('#huddle_toggle');
        await this.page.click('#huddle_toggle');
        // this.page.screenshot({ 'path': 'huddle.png' });
    }
})();