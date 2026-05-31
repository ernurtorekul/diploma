"""
ESP32 Agent Configuration
Edit these values for your setup.
"""

# ============== WIFI ==============
WIFI_SSID = "OPPO A78"
WIFI_PASSWORD = "123123456"

# ============== API ==============
API_URL = "http://10.68.105.149:3000/api"  # Your NestJS API URL (Mac's WiFi IP)
BIN_ID = "9c4bdac7-3d02-4e70-b852-1e60e4e03ab8"  # BIN-ALM-001 - Panfilov Street, near Central Park

# ============== HARDWARE ==============
TRIG_PIN = 5   # HC-SR04 Trigger pin
ECHO_PIN = 18  # HC-SR04 Echo pin

# ============== BIN SETTINGS ==============
BIN_MAX_DEPTH_CM = 80  # Distance from sensor to bin bottom when empty

# ============== MONITORING ==============
CHECK_INTERVAL_SEC = 10  # How often to check fullness (seconds)
GEOLOCATION_INTERVAL_SEC = 900  # How often to scan WiFi for location (15 minutes = 900 seconds)
ENABLE_GEOLOCATION = False  # Set to True to enable WiFi-based location tracking

# ============== DEBUG ==============
DEBUG = True  # Set to False to disable verbose output
