# ESP32 Quick Reference

## Commands

### Find ESP32 Port
```bash
ls /dev/tty.usb*
ls /dev/tty.wchusb*  # For CH340 chips
ls /dev/tty.SLAB_USB*  # For CP2102 chips
```

### Flash MicroPython
```bash
esptool.py --port /dev/tty.xxx erase_flash
esptool.py --port /dev/tty.xxx --chip esp32 write_flash -z 0x1000 firmware.bin
```

### Upload Files
```bash
export AMPY_PORT=/dev/tty.xxx

ampy put config.py
ampy put main.py
ampy put boot.py

# List files on ESP32
ampy ls

# View file contents
ampy get main.py

# Remove file
ampy rm config.py
```

### Monitor Serial Output
```bash
screen /dev/tty.xxx 115200
# Press Ctrl+A, then K to exit

# OR
picocom -b 115200 /dev/tty.xxx
# Press Ctrl+A, Ctrl+Q to exit
```

### Using rshell (Alternative)
```bash
# Connect
rshell -p /dev/tty.xxx

# Inside shell
> cp config.py /pyboard/
> cp main.py /pyboard/
> ls /pyboard
> repl  # Enter REPL
> exit  # Exit rshell
```

## Wiring

```
HC-SR04 → ESP32
VCC  → 3.3V or 5V
GND  → GND
TRIG → GPIO 5
ECHO → GPIO 18
```

## Calibration Formula

```
percentage = (1 - current_distance / max_depth) × 100

Example:
- max_depth = 80cm (empty bin)
- current = 20cm (trash is 20cm from top)
- percentage = (1 - 20/80) × 100 = 75% full
```

## API Endpoint

```
POST /api/bins/{bin_id}/fullness
{
  "percentage": 75
}
```

Response:
```json
{
  "data": { ... },
  "message": "Bin fullness updated to 75%"
}
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "No module named 'config'" | Upload config.py to ESP32 |
| "Echo timeout" | Check HC-SR04 wiring, try 5V instead of 3.3V |
| WiFi won't connect | Check SSID/password, ensure within range |
| API timeout | Check API_URL is correct and accessible |
| "Permission denied" | Use `sudo` or add user to `dialout` group |

## Testing

### Test HC-SR04 Reading
```python
import machine
import time

trig = machine.Pin(5, machine.Pin.OUT)
echo = machine.Pin(18, machine.Pin.IN)

while True:
    trig.off()
    time.sleep_us(2)
    trig.on()
    time.sleep_us(10)
    trig.off()

    while echo.value() == 0: pass
    start = time.time_us()
    while echo.value() == 1: pass
    end = time.time_us()

    dist = (end - start) * 343 / 10000 / 2
    print(f"Distance: {dist:.1f} cm")
    time.sleep(1)
```

### Test WiFi Connection
```python
import network
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect('SSID', 'password')
print(wlan.ifconfig())
```

### Test API Request
```python
import urequests
import ujson

url = "http://your-api.com/api/bins/bin-id/fullness"
data = ujson.dumps({"percentage": 50})
r = urequests.post(url, data=data, headers={"Content-Type": "application/json"})
print(r.status_code)
print(r.text)
r.close()
```
