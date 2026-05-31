# ESP32 Agent for Smart Waste

MicroPython-based agent for monitoring waste bin fullness using ESP32 and HC-SR04 ultrasonic sensor.

## Hardware Required

- ESP32 development board
- HC-SR04 ultrasonic sensor
- Jumper wires
- (Optional) USB cable for power and programming

## Wiring Diagram

```
HC-SR04 Sensor          ESP32
┌─────────────┐        ┌─────────────┐
│             │        │             │
│ VCC    ─────┼────────┼──► 3.3V or 5V
│ GND    ─────┼────────┼──► GND
│ TRIG   ─────┼────────┼──► GPIO 5   (configurable)
│ ECHO   ─────┼────────┼──► GPIO 18  (configurable)
│             │        │             │
└─────────────┘        └─────────────┘
```

## Setup Instructions

### 1. Flash MicroPython Firmware

First, you need to flash MicroPython onto your ESP32.

#### Install esptool
```bash
pip install esptool
```

#### Download MicroPython Firmware
Download the latest ESP32 firmware from: https://micropython.org/download/ESP32_GENERIC/

#### Flash the Firmware

Connect your ESP32 via USB and find the port:
```bash
ls /dev/tty.usb*
# On macOS: /dev/tty.usbserial-xxx or /dev/tty.wchusbserial-xxx
```

Erase flash and install MicroPython:
```bash
esptool.py --port /dev/tty.usbserial-xxx erase_flash
esptool.py --port /dev/tty.usbserial-xxx --chip esp32 write_flash -z 0x1000 ESP32_GENERIC-*.bin
```

### 2. Install Tools

Install `ampy` (Adafruit MicroPython Tool) for uploading files:
```bash
pip install adafruit-ampy
```

Or install `rshell` for more features:
```bash
pip install rshell
```

### 3. Configure Your Settings

Edit `config.py` and set your values:
```python
WIFI_SSID = "YOUR_WIFI_SSID"
WIFI_PASSWORD = "YOUR_WIFI_PASSWORD"
API_URL = "http://your-api-url.com/api"
BIN_ID = "your-bin-uuid-from-database"
```

**Important:** The `BIN_ID` should match a bin UUID from your database. You can get this from the admin dashboard or via API.

### 4. Upload Files to ESP32

#### Using ampy
```bash
# Set your ESP32 port
export AMPY_PORT=/dev/tty.usbserial-xxx

# Upload files
ampy put config.py
ampy put main.py

# Set main.py to run on boot (optional)
ampy mkdir /lib
# You can create boot.py if needed
```

#### Using rshell
```bash
# Connect to ESP32
rshell -p /dev/tty.usbserial-xxx

# Inside rshell shell
> cp config.py /pyboard/config.py
> cp main.py /pyboard/main.py
> exit
```

### 5. Monitor Serial Output

You can monitor the ESP32 output using:

#### Using screen
```bash
screen /dev/tty.usbserial-xxx 115200
```

#### Using picocom
```bash
picocom -b 115200 /dev/tty.usbserial-xxx
```

Press `Ctrl+A` then `K` to exit screen.

### 6. Auto-start on Boot

MicroPython automatically runs `main.py` on boot if it exists. Simply ensure `main.py` is uploaded to the root directory.

To create a `boot.py` (runs before main.py):
```python
# boot.py
import machine

# Configure frequency if needed
machine.freq(240000000)  # 240MHz for maximum performance
```

## Calibration

Before deployment, you need to calibrate the `BIN_MAX_DEPTH_CM` value:

1. Place the sensor at the position it will be mounted (on the lid)
2. Measure the distance to the bottom of an empty bin
3. Set this value as `BIN_MAX_DEPTH_CM` in `config.py`

Example:
- Empty bin distance: 80cm
- Full bin (trash near top): 10cm
- Set `BIN_MAX_DEPTH_CM = 80`

## API Endpoint

The ESP32 sends POST requests to:
```
POST /api/bins/{bin_id}/fullness
Content-Type: application/json

{
  "percentage": 75
}
```

The API will:
- Update the bin's `fullnessPercentage` field
- Automatically set `isFull = true` if percentage >= threshold (default 85%)
- Send Telegram notification if bin becomes full
- Send notification if bin was full and is now below threshold

## Troubleshooting

### WiFi won't connect
- Check SSID and password in `config.py`
- Ensure ESP32 is within range of your WiFi router
- Try power cycling the ESP32

### "Echo timeout" errors
- Check HC-SR04 wiring
- Ensure sensor is powered properly (try 5V instead of 3.3V)
- Check that TRIG and ECHO pins are correct

### API requests failing
- Verify `API_URL` is correct and accessible from your network
- Check that `BIN_ID` exists in the database
- Try accessing the API from your browser first
- Check firewall settings

### Need to reset configuration
```bash
ampy rm config.py
ampy put config.py
# Or use rshell to remove and re-upload
```

## Development

### Running without flashing (testing)

You can test the logic on your computer using regular Python:

```bash
python3 -c "
# Mock the MicroPython modules
import sys
class MockMachine:
    class Pin:
        def __init__(self, pin, mode): pass
        def on(self): pass
        def off(self): pass
        def value(self): return 0
    @staticmethod
    def time_us(): return 1000
    class WLAN:
        def __init__(self, mode): pass
        def active(self, state): pass
        def isconnected(self): return True
        def ifconfig(self): return ['192.168.1.100']
        def connect(self, ssid, pwd): pass

sys.modules['machine'] = MockMachine
sys.modules['urequests'] = __import__('requests')

# Now run your main logic
"
```

## Production Deployment

For production deployment:
1. Use permanent power supply (USB adapter or battery + solar)
2. Mount sensor securely on bin lid
3. Weather-proof the ESP32 and sensor
4. Set appropriate `CHECK_INTERVAL_SEC` (300-600 seconds recommended)
5. Set `DEBUG = False` in config.py to reduce serial output

## License

MIT
