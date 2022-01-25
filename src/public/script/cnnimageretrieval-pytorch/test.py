import os 
import cv2 as cv
from PIL import Image, ImageDraw
args = os.sys.argv

coordinate = {
    'xtop': (int)(args[1]),
    'ytop': (int)(args[2]),
    'xbot': (int)(args[3]),
    'ybot': (int)(args[4]),   
}

input_image_url = args[5]
output_image_url = args[6]

def cropImage(coordinate, input_image_url, output_image_url):
    image = Image.open(input_image_url)
    img = image.crop((coordinate['xtop'], coordinate['ytop'], coordinate['xbot'], coordinate['ybot']))
    img.save(output_image_url)
    
    url = os.path.dirname(__file__)
    
    os.system("cd " + url + " && python3 -m cirtorch.examples.test --gpu-id '0' --network-path 'retrievalSfM120k-resnet101-gem' --datasets 'oxford5k' --whitening 'retrieval-SfM-120k' --multiscale '[1, 1/2**(1/2), 1/2]'")
    os.system("cd " + url + " && python3 transform.py")
  
if __name__=='__main__':
    cropImage(coordinate, input_image_url, output_image_url) 
