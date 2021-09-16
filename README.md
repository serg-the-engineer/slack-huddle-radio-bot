This project creates slack user bot for radio streaming via huddles on ubuntu VM. It's a kind of pet-project for idea testing, any code may be better of course. Tested on Ubuntu 20.04.

# How it works

On current setup I choose Liquidsoap as audio streaming, than route this stream via PulseAudio onto default input device. Than browser version of slack finds this input mic by default. Some bot logging in slack account as human and broadcasting in huddle. This browser automation uses node js with puppeteer bot.

# Setup pulseaudio virtual device

Scp radio_to_mic.sh to your server. Then run

```
sudo apt-get -y update
sudo apt-get -y install pulseaudio pulseaudio-utils
pulseaudio --start
chmod +x radio_to_mic.sh
./radio_to_mic.sh
```

# Setup liquidsoap and pulseaudio virtual device

```
sudo apt-get -y install liquidsoap
mkdir liquidsoap
cd liquidsoap
touch daemon_pid.txt
```

Than copy to `~/liquidsoap` some `default.mp3` and `radio.liq`.
Start liquidsoap: `liquidsoap radio.liq`
Check for created `radio.log` for successful start. See something like `Streaming loop starts, synchronized by active sources`

Test default input by recording input to file:

```
sudo apt-get -y install alsa-utils
arecord -f cd test.wav
```

# Setup slack user bot

```
# for google-chrome
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
sudo apt-get update

sudo apt-get -y install nodejs npm google-chrome-stable xvfb
# setup display
Xvfb -ac :99 -screen 0 1280x1024x16 & export DISPLAY=:99
```

Copy repository, `npm install`.
Configure your envs, required list at `slack.js`.

Start bot by `npm install`. Wait for connect and listen to your default.mp3 at slack huddle.

### Troubleshoot

If bot can't connect, check login page and redirect onto channel page. You can do it on your local PC with GUI.

If bot connects, but silent, you can take some screenshots from audio preferences. Default mic must be available. If not found any - something wrong with pulseaudio setup. Check audio device available at `pacmd list-source-outputs`.
