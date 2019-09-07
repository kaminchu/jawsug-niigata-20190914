#!/usr/bin/env bash

git clone https://github.com/serverlesspub/imagemagick-aws-lambda-2.git
cd imagemagick-aws-lambda-2
make all
rm -R build
cd result/bin
ls | grep -v magick | grep  -v convert | xargs rm

