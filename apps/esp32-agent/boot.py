"""
boot.py - Runs automatically on ESP32 boot
This file runs before main.py
"""

import machine
import time

# Set CPU frequency (optional)
# machine.freq(240000000)  # 240MHz for max performance

# Give time for serial connection before main.py runs
time.sleep(1)

print("ESP32 booting...")
