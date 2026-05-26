import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaImages,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaUpload,
} from "react-icons/fa";

import {
  adminGetAllGalleryImages,
  adminUploadImage,
  adminDeleteImage,
  adminToggleImageVisibility,
} from "../services/templeService";

const categories = [
  "Festivals",
  "Daily Aarti",
  "Architecture",
  "Prasad",
  "Nature",
  "Other",
];

function GalleryManager() {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Other");
  const [imageFile, setImageFile] = useState(null);

  const loadImages = async () => {
    try {
      const data = await adminGetAllGalleryImages();
      setImages(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !imageFile) {
      alert("All fields required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("image", imageFile);

      await adminUploadImage(formData);

      setTitle("");
      setCategory("Other");
      setImageFile(null);

      loadImages();
      alert("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this image permanently?")) return;

    try {
      await adminDeleteImage(id);
      loadImages();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleToggle = async (id) => {
    try {
      await adminToggleImageVisibility(id);
      loadImages();
    } catch (err) {
      console.error(err);
      alert("Toggle failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        Loading gallery...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 p-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium mb-8"
        >
          <FaArrowLeft />
          Back to Dashboard
        </button>

        <h1 className="text-5xl font-bold text-stone-900 mb-10">
          Gallery Manager
        </h1>

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">
          <h2 className="text-3xl font-bold mb-6">Upload New Image</h2>

          <form onSubmit={handleUpload} className="space-y-5">
            <input
              type="text"
              placeholder="Image title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-stone-300 rounded-2xl p-4"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-stone-300 rounded-2xl p-4"
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full border border-stone-300 rounded-2xl p-4"
            />

            <button
              type="submit"
              className="flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-semibold"
            >
              <FaUpload />
              Upload Image
            </button>
          </form>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6">Gallery Images</h2>

          {images.length === 0 ? (
            <p>No images found</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img) => (
                <div
                  key={img._id}
                  className={`rounded-3xl overflow-hidden shadow-md ${
                    !img.active ? "opacity-50" : ""
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-64 object-cover"
                  />

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-orange-500 mb-2">
                      <FaImages />
                      <span>{img.category}</span>
                    </div>

                    <h3 className="text-lg font-bold">{img.title}</h3>

                    <p className="text-sm text-stone-500 mt-2">
                      {img.active ? "Visible" : "Hidden"}
                    </p>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => handleToggle(img._id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-xl"
                      >
                        {img.active ? <FaToggleOn /> : <FaToggleOff />}
                      </button>

                      <button
                        onClick={() => handleDelete(img._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GalleryManager;