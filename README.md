This project creates slack user bot for radio streaming via huddles on ubuntu VM. It's a kind of pet-project for idea testing, any code may be better of course. Tested on Ubuntu 20.04.

# How it works

On current setup I choose Liquidsoap as audio streaming, than route this stream via PulseAudio onto default input device. That browser verson of slack finds this input mic by default, and some bot logged in slack account as human and starts broadcasting in huddle. This browser automation uses node js with puppeteer bot.

# Setup pulseaudio virtual device

Scp radio_to_mic.sh to your server. Then run

```
sudo apt-get install -y pulseaudio pulseaudio-utils
pulseaudio --start
chmod +x radio_to_mic.sh
./radio_to_mic.sh
```

# Setup liquidsoap and pulseaudio virtua

```
sudo apt-get install liquidsoap
mkdir liquidsoap
cd liquidsoap
touch daemon_pid.txt
```

Than copy to `~/liquidsoap` some `default.mp3` and `radio.liq`.
Start liquidsoap: `liquidsoap radio.liq`
Check for created `radio.log` for successful start. See something like `Streaming loop starts, synchronized by active sources`

Test default input by recording input to file:

```
sudo apt-get install alsa-utils
arecord -f cd test.wav
```