#!/bin/bash
mkdir images
for i in {1..294}; do
    wget "https://www.bau.edu.jo/media/dalel2/files/mobile/${i}.jpg" -P images
done
cd images
ls -v *.jpg > image_list.txt
convert $(<image_list.txt) -resize "638x900!" -density "150x150" daleel.pdf
mv daleel.pdf ../daleel.pdf
cd ..
rm -rf images