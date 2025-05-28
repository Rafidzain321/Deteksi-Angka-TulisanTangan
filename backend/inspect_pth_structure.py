import torch

state_dict = torch.load("model_fleksibel_digits2.pth", map_location="cpu")

for k in state_dict.keys():
    print(f"{k:<60} {tuple(state_dict[k].shape)}")
