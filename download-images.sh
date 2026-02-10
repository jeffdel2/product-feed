#!/bin/bash

# Script to download horse/pony images for the product catalog
# These are sample URLs - you may need to visit the sites and get actual download URLs

echo "Downloading horse and pony images..."

# Create images directory if it doesn't exist
mkdir -p public/images

# Using Lorem Picsum for placeholder images (different sizes for variety)
# You can replace these with actual horse image URLs from Unsplash/Pexels

curl -L "https://loremflickr.com/800/600/miniature-pony,horse" -o public/images/pony-001.jpg
curl -L "https://loremflickr.com/800/600/shetland-pony,horse" -o public/images/pony-002.jpg
curl -L "https://loremflickr.com/800/600/welsh-pony,horse" -o public/images/pony-003.jpg
curl -L "https://loremflickr.com/800/600/pony,white-horse" -o public/images/pony-004.jpg
curl -L "https://loremflickr.com/800/600/connemara-pony,horse" -o public/images/pony-005.jpg
curl -L "https://loremflickr.com/800/600/welsh-cob,horse" -o public/images/pony-006.jpg
curl -L "https://loremflickr.com/800/600/quarter-horse,pony" -o public/images/pony-007.jpg
curl -L "https://loremflickr.com/800/600/draft-horse,pony" -o public/images/pony-008.jpg
curl -L "https://loremflickr.com/800/600/sport-horse,thoroughbred" -o public/images/pony-009.jpg
curl -L "https://loremflickr.com/800/600/thoroughbred,racehorse" -o public/images/pony-010.jpg
curl -L "https://loremflickr.com/800/600/mare,thoroughbred-horse" -o public/images/pony-011.jpg
curl -L "https://loremflickr.com/800/600/hackney-pony,show-horse" -o public/images/pony-012.jpg

echo "Image download complete!"
echo "Images saved to public/images/"
