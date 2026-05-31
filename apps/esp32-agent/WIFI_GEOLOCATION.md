# WiFi Geolocation Setup Guide

The ESP32 now supports automatic location tracking using WiFi geolocation (no extra hardware needed!).

## How It Works

1. ESP32 scans nearby WiFi networks (BSSID + signal strength)
2. Sends this data to your API with each fullness update
3. API calls Google Geolocation API to estimate location
4. Bin's coordinates are automatically updated in the database

## Setup Instructions

### 1. Get Google Geolocation API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Geolocation API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Geolocation API"
   - Click "Enable"
4. Create API credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API key"
5. Restrict the API key (recommended):
   - Click on the API key
   - Under "Application restrictions", select "IP addresses"
   - Add your server IP
   - Under "API restrictions", select "Geolocation API"
6. Copy the API key

### 2. Configure Backend

Add the API key to your `.env` file:

```bash
cd apps/api
nano .env
```

Add this line:
```
GOOGLE_GEOLOCATION_API_KEY="your-actual-api-key-here"
```

Restart the API server.

### 3. Update ESP32 Code

Upload the updated `main.py` to your ESP32:

```bash
cd apps/esp32-agent
./reload.sh main
```

Or manually:
```bash
/Users/ernurtorekul/Library/Python/3.11/bin/ampy --port /dev/tty.usbserial-0001 put main.py
```

### 4. Test It

1. Replug the ESP32
2. Monitor the serial output:
   ```bash
   screen /dev/tty.usbserial-0001 115200
   ```
3. You should see:
   ```
   📡 Scanning nearby WiFi networks for geolocation...
      Found 15 networks
   Sending POST to: http://...
   ```

4. Check your admin dashboard — the bin's location should update automatically!

## API Usage & Limits

Google Geolocation API limits:
- **Free tier**: 100 requests/day
- **Paid**: $0.01 per additional request (after free tier)

With ESP32 checking every 5 minutes:
- 288 requests/day → will exceed free tier
- Solution: Only geolocate periodically (e.g., every hour) or when bin is first installed

## Optimization (Optional)

To reduce API calls, you can modify `main.py` to only scan WiFi:

- On first boot
- Every hour instead of every check
- When fullness changes significantly

Example (scan every 60 minutes):
```python
# Add to main() before the loop
last_geolocation_scan = 0
GEOLOCATION_INTERVAL_SEC = 3600  # 1 hour

# In the main loop, replace the wifi scan line:
wifi_networks = None
if time.ticks_diff(time.ticks_ms(), last_geolocation_scan) > GEOLOCATION_INTERVAL_SEC * 1000:
    wifi_networks = scan_wifi_networks(wlan)
    last_geolocation_scan = time.ticks_ms()
```

## Privacy Note

WiFi geolocation works by:
- Scanning nearby WiFi network MAC addresses (BSSIDs)
- Sending these to Google, which matches them to known locations
- No personal data is transmitted — only network identifiers

This is the same technology used by browsers and phones for location services.
