#!/bin/bash

# Script to download placeholder images for the product catalog
# Using picsum.photos for reliable placeholder images

echo "Downloading placeholder images..."

# Create images directory if it doesn't exist
mkdir -p public/images

# Download 800x600 placeholder images
for i in {1..12}; do
  # Format the number with leading zeros (001, 002, etc.)
  num=$(printf "%03d" $i)
  echo "Downloading pony-${num}.jpg..."
  curl -L "https://picsum.photos/800/600" -o "public/images/pony-${num}.jpg"
  sleep 0.5  # Be nice to the API
done

echo ""
echo "Image download complete!"
echo "Images saved to public/images/"
echo ""
echo "NOTE: These are generic placeholder images."
echo "Replace them with actual horse/pony images for production use."
