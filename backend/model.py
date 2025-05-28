import torch
import torch.nn as nn
import numpy as np
from PIL import Image

class CRNN(nn.Module):
    def __init__(self, num_classes=11):
        super(CRNN, self).__init__()
        self.cnn = nn.Sequential(
            nn.Conv2d(1, 64, 3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2, 2),
            nn.Conv2d(64, 128, 3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2, 2)
        )
        self.rnn = nn.LSTM(128 * 8, 128, num_layers=2, bidirectional=True, batch_first=True)
        self.fc = nn.Linear(128 * 2, num_classes)

    def forward(self, x):
        x = self.cnn(x)
        b, c, h, w = x.size()
        x = x.permute(0, 3, 1, 2)
        x = x.reshape(b, w, c * h)
        x, _ = self.rnn(x)
        x = self.fc(x)
        return x

# Fungsi preprocessing dari image ke tensor input model
def preprocess_to_fixed_size(image: Image.Image, target_width=160, target_height=32):
    image = image.convert("L")
    image = image.resize((target_width, target_height))
    img = np.array(image).astype(np.float32)
    img = (img - img.min()) / (img.max() - img.min() + 1e-5)
    if img.mean() > 0.5:
        img = 1 - img
    img = torch.tensor(img, dtype=torch.float32).unsqueeze(0).unsqueeze(0)
    return img
