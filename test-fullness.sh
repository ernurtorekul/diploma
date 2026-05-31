#!/bin/bash

echo "=== Smart Waste - Full Notification Flow Test ==="
echo ""

# Get first bin ID
BIN_ID=$(curl -s http://localhost:3000/api/bins | jq -r '.data[0].id')
echo "🔍 Testing with Bin ID: $BIN_ID"
echo ""

# Test 1: Mark bin as full (should trigger Telegram notification)
echo "📤 Test 1: Marking bin as full..."
curl -s -X POST http://localhost:3000/api/bins/$BIN_ID/fullness \
  -H "Content-Type: application/json" \
  -d '{"isFull": true}' | jq '.'

echo ""
echo "✅ Test 1 Complete"
echo ""
echo "📊 Check notifications:"
curl -s http://localhost:3000/api/notifications | jq '.data | length'
echo ""

# Test 2: Mark bin as available
echo "📤 Test 2: Marking bin as available..."
curl -s -X POST http://localhost:3000/api/bins/$BIN_ID/fullness \
  -H "Content-Type: application/json" \
  -d '{"isFull": false}' | jq '.'

echo ""
echo "✅ Test 2 Complete"
echo ""
echo "📊 Updated notifications:"
curl -s http://localhost:3000/api/notifications | jq '.data | length'
