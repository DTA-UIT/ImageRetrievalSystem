from numpy import genfromtxt
import os
import matplotlib.pyplot as plt
from PIL import Image as PImage
from cirtorch.datasets.testdataset import configdataset
from cirtorch.utils.general import get_data_root

def loadImages(path):
    img = PImage.open(path)
    return img

res = genfromtxt(os.path.dirname(__file__) + '/cirtorch/examples/output/scores.txt', delimiter=',')
rank = genfromtxt(os.path.dirname(__file__) + '/cirtorch/examples/output/ranks.txt', delimiter=',')

for dataset in ['oxford5k']:
    cfg = configdataset(dataset, os.path.join(get_data_root(), 'test'))
    images = [cfg['im_fname'](cfg,i) for i in range(cfg['n'])]
    qimages = [cfg['qim_fname'](cfg,i) for i in range(cfg['nq'])]

for i in range(50):
    img = loadImages(images[int(rank[i])])
    img.save(os.path.dirname(__file__)[:-len('/script/cnnimageretrieval-pytorch')] + '/img/output' + f'/retrieved_image_{i}.jpg')