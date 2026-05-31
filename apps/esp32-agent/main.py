"""
Smart Waste ESP32 Agent
Monitors waste bin fullness using HC-SR04 ultrasonic sensor and reports to the API.

Hardware:
- ESP32 microcontroller
- HC-SR04 ultrasonic sensor
  - VCC  -> 3.3V or 5V
  - GND  -> GND
  - Trig -> GPIO 5 (configurable)
  - Echo -> GPIO 18 (configurable)

Requirements:
- MicroPython firmware on ESP32
- WiFi connectivity
"""

import machine
import time
import network
import urequests
import ujson
import ubinascii

# Import configuration
try:
    from config import *
except ImportError:
    # Fallback defaults if config.py is missing
    WIFI_SSID = "YOUR_WIFI_SSID"
    WIFI_PASSWORD = "YOUR_WIFI_PASSWORD"
    API_URL = "http://your-api-url.com/api"
    BIN_ID = "your-bin-id"
    TRIG_PIN = 5
    ECHO_PIN = 18
    BIN_MAX_DEPTH_CM = 80
    CHECK_INTERVAL_SEC = 300
    GEOLOCATION_INTERVAL_SEC = 900  # 15 minutes
    ENABLE_GEOLOCATION = False
    DEBUG = True

# ============== HARDWARE SETUP ==============

def setup_hc_sr04(trigger_pin, echo_pin):
    """Initialize HC-SR04 ultrasonic sensor pins."""
    trig = machine.Pin(trigger_pin, machine.Pin.OUT)
    echo = machine.Pin(echo_pin, machine.Pin.IN)
    return trig, echo

def measure_distance(trig, echo, max_timeout=30000):
    """
    Measure distance using HC-SR04 ultrasonic sensor.
    Returns distance in cm, or None if measurement fails.
    """
    # Send a 10us pulse to trigger
    trig.off()
    time.sleep_us(2)
    trig.on()
    time.sleep_us(10)
    trig.off()

    # Wait for echo to start
    timeout = time.ticks_us()
    while echo.value() == 0:
        if time.ticks_diff(time.ticks_us(), timeout) > max_timeout:
            if DEBUG:
                print("Echo timeout (no start)")
            return None
        pass

    echo_start = time.ticks_us()

    # Wait for echo to end
    timeout = time.ticks_us()
    while echo.value() == 1:
        if time.ticks_diff(time.ticks_us(), timeout) > max_timeout:
            if DEBUG:
                print("Echo timeout (no end)")
            return None
        pass

    echo_end = time.ticks_us()

    # Calculate distance in cm
    # Sound speed is ~343 m/s, round trip is / 2
    duration_us = time.ticks_diff(echo_end, echo_start)
    distance_cm = (duration_us * 343) / (10000 * 2)

    return distance_cm

def distance_to_percentage(distance_cm, max_depth_cm):
    """
    Convert distance measurement to percentage full.

    Examples:
    - Distance = 80cm (empty) -> 0% full
    - Distance = 40cm (half)  -> 50% full
    - Distance = 10cm (full)  -> ~87% full
    """
    if distance_cm is None:
        return None

    if distance_cm >= max_depth_cm:
        return 0

    percentage = ((max_depth_cm - distance_cm) / max_depth_cm) * 100
    return max(0, min(100, int(percentage)))

# ============== WIFI ==============

def connect_wifi(ssid, password, timeout_sec=30):
    """Connect to WiFi network."""
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)

    if not wlan.isconnected():
        if DEBUG:
            print(f"Connecting to WiFi: {ssid}")
        wlan.connect(ssid, password)

        # Wait for connection
        start_time = time.time()
        while not wlan.isconnected():
            if time.time() - start_time > timeout_sec:
                if DEBUG:
                    print("WiFi connection timeout!")
                return None
            time.sleep(1)
            if DEBUG:
                print(".", end="")

    if DEBUG:
        print(f"\nWiFi connected! IP: {wlan.ifconfig()[0]}")

    return wlan

def scan_wifi_networks(wlan):
    """
    Scan nearby WiFi networks for geolocation.
    Returns list of networks with BSSID and signal strength.
    """
    try:
        if DEBUG:
            print("📡 Scanning nearby WiFi networks for geolocation...")

        # Perform WiFi scan
        networks = wlan.scan()

        if not networks:
            if DEBUG:
                print("   No networks found")
            return []

        # Format: [(ssid, bssid, channel, RSSI, authmode, hidden)]
        wifi_data = []
        for net in networks:
            # net[1] is BSSID (MAC address), net[3] is signal strength
            bssid = ubinascii.hexlify(net[1]).decode('ascii')
            # Format BSSID with colons: aa:bb:cc:dd:ee:ff
            bssid_formatted = ':'.join([bssid[i:i+2] for i in range(0, len(bssid), 2)])
            signal_strength = net[3]  # RSSI in dBm

            wifi_data.append({
                'macAddress': bssid_formatted,
                'signalStrength': signal_strength
            })

        if DEBUG:
            print(f"   Found {len(wifi_data)} networks")

        return wifi_data

    except Exception as e:
        if DEBUG:
            print(f"   WiFi scan failed: {e}")
        return []

# ============== API COMMUNICATION ==============

def send_fullness_update(api_url, bin_id, percentage, wifi_networks=None):
    """
    Send bin fullness percentage to the API with optional WiFi scan data for geolocation.

    Args:
        api_url: Base API URL (e.g., "http://localhost:3000/api")
        bin_id: UUID of the bin
        percentage: Fullness percentage (0-100)
        wifi_networks: Optional list of nearby WiFi networks for geolocation

    Returns:
        True if successful, False otherwise
    """
    url = f"{api_url}/bins/{bin_id}/fullness"

    payload_data = {
        "percentage": percentage
    }

    # Add WiFi networks for geolocation if available
    if wifi_networks:
        payload_data["wifiNetworks"] = wifi_networks

    payload = ujson.dumps(payload_data)

    try:
        if DEBUG:
            print(f"Sending POST to: {url}")
            print(f"Payload: {payload}")

        response = urequests.post(
            url,
            data=payload,
            headers={
                "Content-Type": "application/json"
            },
            timeout=10
        )

        if response.status_code in (200, 201):
            if DEBUG:
                print(f"✅ Successfully updated fullness to {percentage}%")
                print(f"   Response: {response.text}")
            response.close()
            return True
        else:
            if DEBUG:
                print(f"❌ API error: HTTP {response.status_code}")
                print(f"   Response: {response.text}")
            response.close()
            return False

    except Exception as e:
        if DEBUG:
            print(f"❌ Request failed: {e}")
        return False

# ============== MAIN LOOP ==============

def main():
    """Main monitoring loop."""

    if DEBUG:
        print("=" * 50)
        print("🗑️  Smart Waste ESP32 Agent")
        print("=" * 50)
        print(f"Bin ID: {BIN_ID}")
        print(f"API URL: {API_URL}")
        print(f"Check Interval: {CHECK_INTERVAL_SEC}s")
        print(f"Geolocation Interval: {GEOLOCATION_INTERVAL_SEC}s")
        print(f"Max Bin Depth: {BIN_MAX_DEPTH_CM}cm")
        print("=" * 50)

    # Setup hardware
    trig, echo = setup_hc_sr04(TRIG_PIN, ECHO_PIN)

    # Connect to WiFi
    wlan = connect_wifi(WIFI_SSID, WIFI_PASSWORD)
    if not wlan or not wlan.isconnected():
        if DEBUG:
            print("❌ Failed to connect to WiFi. Retrying in 30s...")
        time.sleep(30)
        return  # Will restart (watchdog or main loop will retry)

    # Track last geolocation scan
    last_geolocation_scan = 0
    current_time = time.ticks_ms

    # Main monitoring loop
    while True:
        try:
            if DEBUG:
                print(f"\n{'=' * 30}")
                print(f"🔍 Checking bin fullness...")
                print(f"Time: {time.ticks_ms()}")

            # Check WiFi and reconnect if needed
            if not wlan.isconnected():
                if DEBUG:
                    print("⚠️  WiFi disconnected, reconnecting...")
                wlan = connect_wifi(WIFI_SSID, WIFI_PASSWORD)
                if not wlan or not wlan.isconnected():
                    if DEBUG:
                        print("❌ Reconnection failed. Waiting 30s...")
                    time.sleep(30)
                    continue

            # Measure distance
            distance_cm = measure_distance(trig, echo)

            if distance_cm is not None:
                # Convert to percentage
                percentage = distance_to_percentage(distance_cm, BIN_MAX_DEPTH_CM)

                if DEBUG:
                    print(f"📏 Distance: {distance_cm:.1f}cm")
                    print(f"📊 Fullness: {percentage}%")

                # Scan WiFi networks for geolocation (if enabled and at specified intervals)
                wifi_networks = None

                if ENABLE_GEOLOCATION:
                    time_since_last_scan = time.ticks_diff(current_time(), last_geolocation_scan)

                    if time_since_last_scan > GEOLOCATION_INTERVAL_SEC * 1000 or last_geolocation_scan == 0:
                        if DEBUG and last_geolocation_scan != 0:
                            print("📍 Geolocation scan due!")
                        wifi_networks = scan_wifi_networks(wlan)
                        last_geolocation_scan = current_time()
                    else:
                        if DEBUG:
                            time_remaining = (GEOLOCATION_INTERVAL_SEC * 1000 - time_since_last_scan) // 1000
                            print(f"⏰ Next geolocation scan in {time_remaining}s")
                else:
                    if DEBUG:
                        print("⏭️  Geolocation disabled")

                # Send to API with WiFi data for geolocation (if available)
                success = send_fullness_update(API_URL, BIN_ID, percentage, wifi_networks)

                if success:
                    if DEBUG:
                        status = "🗑️  FULL!" if percentage >= 85 else "✅ OK"
                        print(f"   Status: {status}")
                else:
                    if DEBUG:
                        print("   ⚠️  Failed to update API, will retry next cycle")
            else:
                if DEBUG:
                    print("⚠️  Failed to measure distance")

            # Wait before next check
            if DEBUG:
                print(f"⏱️  Next check in {CHECK_INTERVAL_SEC}s...")
            time.sleep(CHECK_INTERVAL_SEC)

        except KeyboardInterrupt:
            if DEBUG:
                print("\n\n🛑 Stopping agent...")
            break
        except Exception as e:
            if DEBUG:
                print(f"\n❌ Unexpected error: {e}")
            time.sleep(60)  # Wait 1 minute before retrying

if __name__ == "__main__":
    main()
