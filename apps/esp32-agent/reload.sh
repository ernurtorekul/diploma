#!/bin/bash

# Quick reload script for ESP32 agent
# Usage: ./reload.sh [config|main|boot] (default: config)

AMPY_PATH="/Users/ernurtorekul/Library/Python/3.11/bin/ampy"
DEVICE="/dev/tty.usbserial-0001"
FILE=${1:-config}

echo "📤 Uploading $FILE.py to ESP32..."

if [ "$FILE" = "all" ]; then
    echo "   Uploading config.py..."
    "$AMPY_PATH" --port "$DEVICE" put config.py
    echo "   Uploading main.py..."
    "$AMPY_PATH" --port "$DEVICE" put main.py
    echo "   Uploading boot.py..."
    "$AMPY_PATH" --port "$DEVICE" put boot.py
    echo "✅ All files uploaded!"
else
    "$AMPY_PATH" --port "$DEVICE" put "$FILE.py"
    echo "✅ $FILE.py uploaded!"
fi

echo ""
echo "💡 Monitor with: screen $DEVICE 115200"
