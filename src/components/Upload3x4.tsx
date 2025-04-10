import { IconButton } from "@mui/material";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type Upload3x4Props = {
  onChange: (file: File | null) => void;
  error?: string;
};

function Upload3x4({ onChange, error }: Upload3x4Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const ratio = img.width / img.height;
      if (Math.abs(ratio - 0.75) < 0.05) {
        setPreview(url);
        onChange(file);
      } else {
        onChange(null);
        setPreview(null);
      }
    };

    img.src = url;
  }, [onChange]);

  const removeImage = () => {
    setPreview(null);
    onChange(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024,
  });

  return (
    <div {...getRootProps()} style={{ border: "2px dashed #aaa", padding: 20, textAlign: "center" }}>
      <input {...getInputProps()} />
      {preview && (
        <>
          <img
            src={preview}
            alt="Foto 3x4"
            width={120}
            style={{ aspectRatio: "3 / 4", objectFit: "cover", borderRadius: 4 }}
          />
          <div style={{ marginTop: 10 }}>
            <IconButton onClick={() => removeImage()} size="small" sx={{color: "rgb(25, 118, 210)"}}>
              <i className="fas fa-xmark"></i>
            </IconButton>
          </div>
        </>
      )}
      {!preview && <p>{isDragActive ? "Solte a imagem aqui..." : "Arraste ou clique para selecionar uma foto 3x4"}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Upload3x4;