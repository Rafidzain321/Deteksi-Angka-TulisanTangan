import torch

pth_file = "model_fleksibel_digits2.pth"
state_dict = torch.load(pth_file, map_location="cpu")

print("🔥 Layer Keys:")
for k, v in state_dict.items():
    print(f"{k:50} {tuple(v.shape)}")
