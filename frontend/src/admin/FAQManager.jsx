import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import {
  adminGetAllFAQs,
  adminCreateFAQ,
  adminUpdateFAQ,
  adminDeleteFAQ,
} from "../services/templeService";

function FAQManager() {
  const emptyForm = {
    q: "",
    a: "",
  };

  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadFaqs = async () => {
    try {
      const data = await adminGetAllFAQs();
      setFaqs(data);
    } catch (err) {
      alert("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      if (editingId) {
        await adminUpdateFAQ(editingId, form);
        alert("FAQ updated");
      } else {
        await adminCreateFAQ(form);
        alert("FAQ created");
      }

      setForm(emptyForm);
      setEditingId(null);
      loadFaqs();
    } catch (err) {
      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (faq) => {
    setEditingId(faq._id);

    setForm({
      q: faq.q,
      a: faq.a,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this FAQ?")) return;

    try {
      await adminDeleteFAQ(id);
      loadFaqs();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 p-6">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-orange-500 font-semibold mb-6"
        >
          <FaArrowLeft />
          Back to Dashboard
        </Link>

        <h1 className="text-4xl font-bold text-stone-900 mb-8">
          FAQ Manager
        </h1>

        {/* FORM */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold mb-6">
            {editingId ? "Edit FAQ" : "Create FAQ"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Question"
              value={form.q}
              onChange={(e) =>
                setForm({ ...form, q: e.target.value })
              }
              className="w-full p-4 rounded-xl border"
              required
            />

            <textarea
              rows="6"
              placeholder="Answer"
              value={form.a}
              onChange={(e) =>
                setForm({ ...form, a: e.target.value })
              }
              className="w-full p-4 rounded-xl border"
              required
            />

            <button
              type="submit"
              disabled={saving}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-8 py-4 font-semibold"
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update FAQ"
                : "Create FAQ"}
            </button>
          </form>
        </div>

        {/* FAQ LIST */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">All FAQs</h2>

          {loading ? (
            <p>Loading FAQs...</p>
          ) : faqs.length === 0 ? (
            <p>No FAQs found</p>
          ) : (
            <div className="space-y-5">
              {faqs.map((faq) => (
                <div
                  key={faq._id}
                  className={`border rounded-2xl p-6 ${
                    faq.active ? "" : "opacity-50"
                  }`}
                >
                  <div className="flex justify-between items-start gap-5">
                    <div>
                      <h3 className="text-lg font-bold">{faq.q}</h3>
                      <p className="text-stone-600 mt-3">{faq.a}</p>

                      {!faq.active && (
                        <span className="inline-block mt-4 text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full">
                          Deleted
                        </span>
                      )}
                    </div>

                    {faq.active && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(faq)}
                          className="bg-blue-500 text-white p-3 rounded-xl"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => handleDelete(faq._id)}
                          className="bg-red-500 text-white p-3 rounded-xl"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
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

export default FAQManager;