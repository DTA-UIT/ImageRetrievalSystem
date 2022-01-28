<div align="center">

## Multiple techniques to enhance performance in CNN-based Image Retrieval systems
  
</div>

### Abstract 
Activations on Convolutional Neural Networks (CNNs) served as image descriptors have reached its peak in the field of image retrieval due to their outstanding efficiency and compactness of representation. However, there is a massive need of annotated data and high quality annotation is a significance to achieve reasonable results. Throughout this work, we do fine-tune CNNs for image retrieval system on a collection of unordered images automatically. The selection of the train data could be guided using state-of-the-art retrieval and Structure-from-Motion methods to reconstruct 3D models. We additionally apply a novel trainable Generalized-Mean pooling layer generalizing max and average pooling for a boosting in retrieval performance. And we would conduct our experiments with VGG and ResNet architectures on Oxford5k, Paris6k, ROxford5k and RParis6k benchmarks.

<div align='center'>
  
![cnnimageretrieval_network_medium](https://user-images.githubusercontent.com/67086934/151293166-9be21e7d-8af3-4840-9b2d-79841fc187a1.png)
</div>

<b> Keywords: </b> Image Retrieval, Convolutional Neural Networks, Deep Learning

----

### Report 
🎃🎃 Our full report is shown [here](https://github.com/DTA-UIT/ImageRetrieval_System/blob/main/report.pdf)      
🎃🎃 Our demo video is [here](https://drive.google.com/file/d/1HeqgfqGmo6l2jHVyeT0AOWXno2aBkYfH/view)

----
### Table of contents
1. [Introduction](#1-introduction)
2. [Repo structure](#2-repo-structure)
3. [Demo](#3-demo)
4. [Experimental configuration](#4-experimental-configuration)
5. [Results](#5-results)
6. [References](#6-references)

----

### 1. Introduction
Throughout this work, we choose the approach as the unsupervised CNNs fine-tuning for image retrieval. Firstly, we harness SfM information and enforce for both hard unmatched and matched examples for CNNs training. Secondly, we let our architectures learn the whitening through the same training data to avoid the short representations that are the limitations from traditional whitening performance. We choose to use a trainable pooling layer which generalizes existing popular pooling schemes for CNNs and thus both enhances the performance and preserving the same descriptor dimensionality as well, lastly.

### 2. Repo structure
- **src:** All of our source code
  - **public**
    - **css**
    - **img**: assets of our work
    - **script/cnnimageretrieval-pytorch**: the Python core on handling models and systems lies behind our demo
  - **resources**  
    - **scss**
    - **views:** Frontend code 
  - **routes**
    - index.js: Javascript core to process logical beyond Frontend 
  - index.js: main js file to route the demo
  - package.json
- **notebook:** Log results on running our work
- .gitattributes
- .gitignore
- LICENSE
- Procfile
- deploy.sh
- package.json
- requirements.txt
- yarn.lock
- report.pdf: Our final report on this work

### 3. Demo
The  total  time  for  processing  both  cropping  the uploaded  image  into  the  new  one  and  processing  the  query is 18 seconds on average.
#### Run demo
- Install [yarn](https://yarn.en.softonic.com/) 
- Install dependencies:
```bash
pip install -r requirements.txt
```
- Run project:
```bash
yarn 
yarn start
```

#### Screenshot from our demo

<div align='center'>

<img width="1440" alt="demo4" src="https://user-images.githubusercontent.com/67086934/151292940-d2d53858-ecf3-4b59-a101-c16c08124f0e.png">
<img width="1440" alt="demo1" src="https://user-images.githubusercontent.com/67086934/151292955-1c45dde7-664b-4d2f-8e4b-c1a8e3a8cfc0.png">
<img width="1440" alt="demo2" src="https://user-images.githubusercontent.com/67086934/151292956-4a64f28c-0f5c-48e2-b4e2-a10e78dd59f8.png">
<img width="1439" alt="demo3" src="https://user-images.githubusercontent.com/67086934/151292959-6f4899a4-fe48-44bd-afa1-036a3868866d.png">

</div>

### 4. Experimental configuration
We used pre-trained ResNet101-GeM and VGG16-GeM to perform the fine-tuning. We conduct our experiments using NVIDIA @ RTX 3060 GPU, 16GB RAM with 11th Gen Intel® Core™ i7-11700K @ 3.60GHz×16 CPU and PyTorch framework.

### 5. Results
#### Reproduce our final results
```bash
cd src/public/script/cnnimageretrieval-pytorch 

python3 -m cirtorch.examples.test \
          --gpu-id '0' \
          --network-path 'retrievalSfM120k-resnet101-gem' \
          --datasets 'oxford5k' \ 
          --whitening 'retrieval-SfM-120k' \ 
          --multiscale '[1, 1/2**(1/2), 1/2]'
```
Code inspired from:
[CNN Image Retrieval in PyTorch: Training and evaluating CNNs for Image Retrieval in PyTorch
](https://github.com/filipradenovic/cnnimageretrieval-pytorch)
