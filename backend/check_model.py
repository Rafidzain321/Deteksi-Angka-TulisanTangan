import torch
from model import MultiDigitModel

try:
    model = MultiDigitModel(num_classes=11, num_digits=9, kernel_size=3)
    model.load_state_dict(torch.load("model_fleksibel_digits2.pth", map_location="cpu"), strict=False)
    model.eval()
    print("✅ Model berhasil diload!")

    dummy_input = torch.randn(1, 1, 32, 288)
    with torch.no_grad():
        output = model(dummy_input)
    print("✅ Inferensi dummy berhasil, output shape:", output.shape)

except Exception as e:
    print("❌ Error saat load/inferensi model:", e)
