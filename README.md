# Image Steganography

This is a client-side Javascript tool to steganographically hide images inside the lower "bits" of other images.

## Introduction

Steganography is the practice of concealing a message within another message or a physical object. In computing/electronic contexts, a computer file, message, image, or video is concealed within another file, message, image, or video.

Here we have demonstrated image steganography, where an image is hidden in the lower bits of another image.

## Working

An image is made up of pixels, with each pixel having values ranging from 0 to 255, and is represented using 8 bits in computer memory. The bits present on the right are of lower significance than the bits on left. This face is what is used for concealing images in other images. The less significant bits of the cover image are replaced with the most significant bits of the hidden image. This causes some distortion in the cover image which is based on the number of bits being replaced. The distortion in the images is measured here using the mean square error method. 

## Results

[Link to the website](https://aadilkhalifa.github.io/stegnography/)

This is a demo of the website:

![Alt Text](https://github.com/aadilkhalifa/aadilkhalifa.github.io/blob/main/stegnography/results/demo.gif?raw=true)

Comparison of results for allotting different number of bits for the hidden image:

<img src="https://github.com/aadilkhalifa/aadilkhalifa.github.io/blob/main/stegnography/results/results%20table.png?raw=true" alt="drawing" width="500"/>

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
