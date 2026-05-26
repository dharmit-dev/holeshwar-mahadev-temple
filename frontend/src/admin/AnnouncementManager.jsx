import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaBullhorn,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

import {
  adminGetAllAnnouncements,
  adminCreateAnnouncement,
  adminUpdateAnnouncement,
  adminDeleteAnnouncement,
  adminToggleAnnouncement,
} from "../services/templeService";

function AnnouncementManager() {
  const navigate = useNavigate();

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);

  const loadAnnouncements = async () => {
    try {
      const data = await adminGetAllAnnouncements();
      setAnnouncements(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      alert("Announcement text required");
      return;
    }

    try {
      if (editingId) {
        await adminUpdateAnnouncement(editingId, { text });
        setEditingId(null);
      } else {
        await adminCreateAnnouncement({ text });
      }

      setText("");
      loadAnnouncements();
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

  const handleEdit = (item) => {
    setText(item.text);
    setEditingId(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this announcement?")) return;

    try {
      await adminDeleteAnnouncement(id);
      loadAnnouncements();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleToggle = async (id) => {
    try {
      await adminToggleAnnouncement(id);
      loadAnnouncements();
    } catch (err) {
      console.error(err);
      alert("Toggle failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        Loading announcements...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium mb-8"
        >
          <FaArrowLeft />
          Back to Dashboard
        </button>

        {/* Heading */}
        <h1 className="text-5xl font-bold text-stone-900 mb-10">
          Announcement Manager
        </h1>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">
          <h2 className="text-3xl font-bold mb-6">
            {editingId ? "Edit Announcement" : "Create Announcement"}
          </h2>

          <form onSubmit={handleSubmit}>
            <textarea
              rows="5"
              placeholder="Enter announcement text..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border border-stone-300 rounded-2xl p-5 outline-none focus:border-orange-500 resize-none"
            />

            <button
              type="submit"
              className="mt-6 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-semibold transition"
            >
              {editingId ? "Update Announcement" : "Create Announcement"}
            </button>
          </form>
        </div>

        {/* List */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6">
            All Announcements
          </h2>

          {announcements.length === 0 ? (
            <p className="text-stone-500">No announcements found</p>
          ) : (
            <div className="space-y-5">
              {announcements.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-2xl p-6 flex justify-between items-start"
                >
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500 text-xl">
                      <FaBullhorn />
                    </div>

                    <div>
                      <p className="text-lg font-medium text-stone-900">
                        {item.text}
                      </p>

                      <p
                        className={`mt-2 text-sm font-semibold ${
                          item.active
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {item.active ? "Active" : "Inactive"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleToggle(item._id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-xl"
                    >
                      {item.active ? <FaToggleOn /> : <FaToggleOff />}
                    </button>

                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-xl"
                    >
                      <FaTrash />
                    </button>
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

export default AnnouncementManager;