import React, { useState } from "react";

const ImageUploader = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string); // Base64データURL
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />

      {imageSrc && (
        <div className="mt-4">
          <p>アップロードされた画像：</p>
          <img
            src={imageSrc}
            alt="Uploaded"
            className="max-w-full h-auto rounded shadow"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
