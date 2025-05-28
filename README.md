# Deteksi Angka Tulisan Tangan

Web aplikasi berbasis Next.js dengan backend Python (PyTorch) untuk mendeteksi angka dari gambar tulisan tangan menggunakan model CRNN (CNN + LSTM).

---

## Fitur
- Upload gambar tulisan tangan angka
- Model deep learning memproses gambar & memprediksi angka
- Output hasil prediksi ditampilkan ke user
- Backend Python terpisah untuk handle inference model `.pth`
- Akurasi model: **76.03%**

---

## Model AI
Model dikembangkan menggunakan:
- **PyTorch**
- **CRNN (CNN + BiLSTM)**
- Dataset dari Kaggle (Multi Digit MNIST)
- Training dilakukan di Google Colab

---

## Arsitektur Model
```text
Input Image → CNN (2 layer) → BiLSTM (2 layer) → FC → CTC Decoder → Prediksi Angka
