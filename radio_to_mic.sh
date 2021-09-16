#!/usr/bin/sh

# Create virtual output for radio stream
pacmd load-module module-null-sink sink_name=Virtual_Sink sink_properties=device.description=Virtual_Sink
# Create virtual input as mic from our radio stream
pacmd load-module module-virtual-source master=Virtual_Sink.monitor source_name=MicOut source_properties=device.description=MicOut format=s16le
# Force to use virtual mic as default
pactl set-default-source MicOut