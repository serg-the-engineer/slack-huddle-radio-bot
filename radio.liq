#!/usr/bin/liquidsoap
set("log.file.path","/home/ubuntu/liquidsoap/radio.log")

set("init.daemon.pidfile.path", "/home/ubuntu/liquidsoap/daemon/pid.txt")
set("init.daemon",true)

radio = audio_to_stereo(single("/home/ubuntu/liquidsoap/default.mp3"))
output.pulseaudio(device="Virtual_Sink", radio)