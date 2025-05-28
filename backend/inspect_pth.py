import torch

pth_path = "model_fleksibel_digits2.pth"  # Pastikan path-nya bener
state_dict = torch.load(pth_path, map_location="cpu")

print("📦 Keys di dalam .pth file:")
for k, v in state_dict.items():
    print(f"{k} : {v.shape if hasattr(v, 'shape') else type(v)}")