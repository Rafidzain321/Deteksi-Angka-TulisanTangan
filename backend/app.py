from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch
import io
from model import CRNN, preprocess_to_fixed_size

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Peta indeks ke karakter digit (0-9 + blank)
idx_to_char = {i: str(i) for i in range(10)}
idx_to_char[10] = ""  # blank token buat CTC

# Load model
model = CRNN(num_classes=11)
model.load_state_dict(torch.load("model_fleksibel_digits2.pth", map_location="cpu"))
model.eval()

# Fungsi decoding hasil model jadi string angka
def greedy_decode(logits, idx_to_char, blank=10):
    pred_indices = torch.argmax(logits, dim=-1)  # (B, T)
    results = []
    for seq in pred_indices:
        digits = []
        prev_idx = -1
        for idx in seq:
            idx = idx.item()
            if idx == blank or idx == prev_idx:
                continue
            digits.append(idx_to_char.get(idx, '?'))
            prev_idx = idx
        results.append(''.join(digits))
    return results

# Endpoint prediksi
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))

        img_tensor = preprocess_to_fixed_size(image)  # (1, 1, 32, 160)
        with torch.no_grad():
            output = model(img_tensor)  # (1, T, C)
            prediction = greedy_decode(output, idx_to_char)

        return {"prediction": prediction[0] if prediction else ""}
    except Exception as e:
        return {"error": str(e)}
