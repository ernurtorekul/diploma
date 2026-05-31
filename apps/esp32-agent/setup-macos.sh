#!/bin/bash

# Smart Waste ESP32 Setup Script for macOS
# This script helps you set up your ESP32 with MicroPython

set -e

echo "🗑️  Smart Waste ESP32 Setup"
echo "============================="
echo ""

# Check if we're on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "⚠️  This script is designed for macOS"
    echo "   For Linux/Windows, please follow README.md manually"
    exit 1
fi

# Check Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed"
    echo "   Install from: https://www.python.org/downloads/"
    exit 1
fi

echo "✅ Python 3 found"

# Install esptool
echo ""
echo "📦 Installing esptool..."
pip3 install --user esptool

# Install ampy
echo ""
echo "📦 Installing ampy (Adafruit MicroPython Tool)..."
pip3 install --user adafruit-ampy

# Detect ampy path
AMPY_PATH=$(which ampy 2>/dev/null || echo "$HOME/Library/Python/3.11/bin/ampy")
if [ ! -f "$AMPY_PATH" ]; then
    AMPY_PATH="$HOME/Library/Python/3.12/bin/ampy"
fi

if [ ! -f "$AMPY_PATH" ]; then
    echo "⚠️  Could not find ampy. Trying to use from PATH..."
    AMPY_PATH="ampy"
fi

echo "   Using ampy from: $AMPY_PATH"

# Detect esptool path
ESPTOOL_PATH=$(which esptool.py 2>/dev/null || echo "$HOME/Library/Python/3.11/bin/esptool.py")
if [ ! -f "$ESPTOOL_PATH" ]; then
    ESPTOOL_PATH="$HOME/Library/Python/3.12/bin/esptool.py"
fi

if [ ! -f "$ESPTOOL_PATH" ]; then
    echo "⚠️  Could not find esptool.py. Trying to use from PATH..."
    ESPTOOL_PATH="esptool.py"
fi

# Check for ESP32 connection
echo ""
echo "🔍 Looking for ESP32..."
echo "   Connect your ESP32 via USB now if not already connected"
echo ""

# Wait a moment for device to be recognized
sleep 2

# Find USB serial devices
DEVICES=($(ls /dev/tty.usb* 2>/dev/null || true))
WCH_DEVICES=($(ls /dev/tty.wchusb* 2>/dev/null || true))
CP_DEVICES=($(ls /dev/tty.SLAB_USB* 2>/dev/null || true))

# Combine all possible devices
ALL_DEVICES=("${DEVICES[@]}" "${WCH_DEVICES[@]}" "${CP_DEVICES[@]}")

if [ ${#ALL_DEVICES[@]} -eq 0 ]; then
    echo "⚠️  No ESP32 device found"
    echo "   Please check:"
    echo "   - ESP32 is connected via USB"
    echo "   - Drivers are installed (for CH340/CP2102)"
    echo ""
    echo "   Common device paths on macOS:"
    echo "   - /dev/tty.usbserial-xxx"
    echo "   - /dev/tty.wchusbserial-xxx"
    echo "   - /dev/tty.SLAB_USBtoUART-xxx"
    echo ""
    echo "   Run 'ls /dev/tty.*' to see all serial devices"
    exit 1
fi

echo "✅ Found device(s):"
for device in "${ALL_DEVICES[@]}"; do
    echo "   - $device"
done

DEVICE=${ALL_DEVICES[0]}
echo ""
echo "   Using: $DEVICE"

# Ask if user wants to flash firmware
echo ""
read -p "🔄 Do you want to flash MicroPython firmware? (y/N) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "⚠️  IMPORTANT: Download MicroPython firmware first!"
    echo "   1. Go to: https://micropython.org/download/ESP32_GENERIC/"
    echo "   2. Download the latest .bin file"
    echo "   3. Place it in this directory"
    echo ""

    FIRMWARE=$(ls *.bin 2>/dev/null || true)

    if [ -z "$FIRMWARE" ]; then
        echo "❌ No firmware .bin file found in current directory"
        echo "   Please download firmware and run this script again"
        exit 1
    fi

    echo "📁 Found firmware: $FIRMWARE"
    echo ""

    # Flash firmware
    echo "🚀 Flashing MicroPython to ESP32..."
    "$ESPTOOL_PATH" --port "$DEVICE" erase_flash
    "$ESPTOOL_PATH" --port "$DEVICE" --chip esp32 write_flash -z 0x1000 "$FIRMWARE"

    echo ""
    echo "✅ Firmware flashed successfully!"
    echo ""

    # Wait for ESP32 to restart
    echo "⏳ Waiting for ESP32 to restart..."
    sleep 3
fi

# Upload files
echo ""
echo "📤 Uploading files to ESP32..."
echo ""

AMPY_PORT=$DEVICE

# Upload config
echo "   Uploading config.py..."
if [ -f "config.py" ]; then
    "$AMPY_PATH" --port "$AMPY_PORT" put config.py
    echo "   ✅ config.py uploaded"
else
    echo "   ⚠️  config.py not found (you'll need to create it)"
fi

# Upload main
echo "   Uploading main.py..."
"$AMPY_PATH" --port "$AMPY_PORT" put main.py
echo "   ✅ main.py uploaded"

# Upload boot
echo "   Uploading boot.py..."
"$AMPY_PATH" --port "$AMPY_PORT" put boot.py
echo "   ✅ boot.py uploaded"

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎉 Next steps:"
echo "   1. Edit config.py with your WiFi and API settings"
echo "   2. Upload config.py: $AMPY_PATH --port $DEVICE put config.py"
echo "   3. Monitor output: screen $DEVICE 115200"
echo "   4. Check your API to see fullness updates"
echo ""
echo "📚 For more info, see README.md"
echo ""
echo "💡 TIP: To use 'ampy' command directly, add this to your ~/.zshrc:"
echo "   export PATH=\"\$HOME/Library/Python/3.11/bin:\$PATH\""
