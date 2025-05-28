"use client";

import { useState, useRef } from "react";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [results, setResults] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event?.target?.result) {
          const result = event.target.result as string;
          setSelectedImage(result);
          setResults("");

          const img = new Image();
          img.src = result;
          img.onload = () => {
            if (canvasRef.current) {
              const ctx = canvasRef.current.getContext("2d");
              if (ctx) {
                canvasRef.current.width = img.width;
                canvasRef.current.height = img.height;
                ctx.drawImage(img, 0, 0);
              }
            }
          };
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const detectDigits = async () => {
    if (!selectedImage) return;

    try {
      setIsLoading(true);
      setResults("");

      const blob = await fetch(selectedImage).then((r) => r.blob());
      const formData = new FormData();
      formData.append("file", blob, "uploaded_image.png");

      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.prediction) {
        setResults(data.prediction);
      } else {
        setResults("Gagal memproses gambar.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResults("Terjadi kesalahan.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setResults("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx)
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="relative w-full h-64 bg-gradient-to-r from-blue-700 to-blue-900 overflow-hidden">
        <div className="absolute inset-0">
          <NextImage
            src="/background_angka.png"
            alt="Numbers Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container relative h-full flex items-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Deteksi Angka dari
            <br />
            Tulisan Tangan
          </h2>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <Card className="bg-blue-50 p-8 text-center">
            <h3 className="text-2xl font-bold mb-6">
              Silahkan Unggah Foto Disini
            </h3>
            <div className="mb-2 text-sm text-red-500">
              * Format yang didukung adalah .jpg, .png dan .jpeg
            </div>

            <div className="flex flex-col items-center space-y-6">
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleImageUpload}
                className="hidden"
                ref={fileInputRef}
                id="image-upload"
              />

              <label
                htmlFor="image-upload"
                className="w-full max-w-md h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50"
              >
                {selectedImage ? (
                  <div className="relative w-full h-full">
                    <NextImage
                      src={selectedImage || "/placeholder.svg"}
                      alt="Uploaded image"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                ) : (
                  <div className="text-gray-500">Klik untuk memilih gambar</div>
                )}
              </label>

              {/* Hidden canvas for preview */}
              <canvas ref={canvasRef} className="hidden"></canvas>

              <div className="flex space-x-4">
                <Button
                  onClick={detectDigits}
                  disabled={!selectedImage || isLoading}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-8"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </>
                  ) : (
                    "Detect"
                  )}
                </Button>

                <Button
                  onClick={clearImage}
                  variant="outline"
                  className="px-8"
                  disabled={!selectedImage || isLoading}
                >
                  Clear
                </Button>
              </div>
            </div>

            {results && (
              <div className="mt-8 text-2xl font-bold">
                Hasil angka yang dideteksi:{" "}
                <span className="text-blue-700">{results}</span>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
