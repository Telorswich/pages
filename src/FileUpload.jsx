import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, UploadCloud } from "lucide-react";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Pilih file terlebih dahulu!");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://upfile-five.vercel.app/api/file", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.download) {
        setDownloadLink(result.download);
      } else {
        alert("Gagal mengupload file");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat mengupload file");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4 text-white">
      <Card className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl text-black">
        <CardContent className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-center mb-4">Upload File</h2>
          <label className="w-full cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all">
            <UploadCloud size={40} className="text-gray-600 mb-2" />
            <p className="text-gray-600">Pilih file untuk diupload</p>
            <Input type="file" onChange={handleFileChange} className="hidden" />
          </label>
          {file && (
            <p className="mt-2 text-sm text-gray-700 font-medium">File: {file.name}</p>
          )}
          <Button onClick={handleUpload} disabled={loading} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
            {loading ? <Loader2 className="animate-spin" /> : "Upload"}
          </Button>
          {downloadLink && (
            <div className="mt-4 text-center">
              <p className="text-sm font-semibold text-gray-800">File berhasil diupload:</p>
              <a
                href={downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-all"
              >
                {downloadLink}
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
        }
