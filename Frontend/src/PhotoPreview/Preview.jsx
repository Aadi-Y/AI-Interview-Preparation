import { useState, useEffect } from "react";
import { LuUser, LuTrash, LuUpload } from "react-icons/lu";

function Preview() {
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const formData = new FormData();
  formData.append("Image",image);

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setImagePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [image]);

  function handleInputImage(event) {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  }

  function handleRemoveImage() {
    setImage(null);
    setImagePreviewUrl(null);
  }

  return (
    <section className="relative w-30 h-30 rounded-full bg-blue-200 flex items-center justify-center">
      {imagePreviewUrl ? (
        <img
          src={imagePreviewUrl}
          alt="Preview"
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <LuUser size={70} className="text-blue-500"/>
      )}

      <div className="absolute -bottom-2 right-2">
        {image ? (
          <button onClick={handleRemoveImage}
          className="bg-red-400 h-10 w-10 rounded-full flex items-center justify-center p-2"
          >
            <LuTrash />
          </button>
        ) : (
          <label style={{ cursor: "pointer" }} 
          className="bg-blue-500 h-10 w-10 rounded-full flex items-center justify-center p-2 text-white"
          >
            <LuUpload />
            <input
              type="file"
              accept="image/*"
              onChange={handleInputImage}
              style={{ display: "none" }}
            />
          </label>
        )}
      </div>
    </section>
  );
}

export default Preview;
