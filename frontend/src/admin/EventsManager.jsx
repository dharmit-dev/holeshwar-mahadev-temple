import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaPlus,
  FaTrash,
  FaEdit,
  FaStar,
  FaRegStar,
} from "react-icons/fa";

import {
  getEvents,
  adminCreateEvent,
  adminUpdateEvent,
  adminDeleteEvent,
  adminToggleEventHighlight,
} from "../services/templeService";

function EventsManager() {
  const emptyForm = {
    title: "",
    date: "",
    endDate: "",
    category: "Festival",
    description: "",
    highlight: false,
  };

  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      if (editingId) {
        await adminUpdateEvent(editingId, form);
        alert("Event updated");
      } else {
        await adminCreateEvent(form);
        alert("Event created");
      }

      setForm(emptyForm);
      setEditingId(null);
      loadEvents();
    } catch (err) {
      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (event) => {
    setEditingId(event.id);

    setForm({
      title: event.title,
      date: event.date?.slice(0, 10),
      endDate: event.endDate?.slice(0, 10) || "",
      category: event.category,
      description: event.description,
      highlight: event.highlight,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await adminDeleteEvent(id);
      loadEvents();
    } catch {
      alert("Delete failed");
    }
  };

  const handleHighlight = async (id) => {
    try {
      await adminToggleEventHighlight(id);
      loadEvents();
    } catch {
      alert("Update failed");
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
          Event Manager
        </h1>

        {/* FORM */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold mb-6">
            {editingId ? "Edit Event" : "Create Event"}
          </h2>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Event Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="p-4 rounded-xl border"
              required
            />

            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              className="p-4 rounded-xl border"
            >
              <option>Festival</option>
              <option>Shibir</option>
              <option>Mahotsav</option>
              <option>Satsang</option>
              <option>Other</option>
            </select>

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              className="p-4 rounded-xl border"
              required
            />

            <input
              type="date"
              value={form.endDate}
              onChange={(e) =>
                setForm({ ...form, endDate: e.target.value })
              }
              className="p-4 rounded-xl border"
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="md:col-span-2 p-4 rounded-xl border"
              rows="5"
              required
            />

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.highlight}
                onChange={(e) =>
                  setForm({ ...form, highlight: e.target.checked })
                }
              />
              Highlight Event
            </label>

            <button
              type="submit"
              disabled={saving}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6 py-4 font-semibold"
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update Event"
                : "Create Event"}
            </button>
          </form>
        </div>

        {/* EVENTS LIST */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">All Events</h2>

          {loading ? (
            <p>Loading events...</p>
          ) : events.length === 0 ? (
            <p>No events found</p>
          ) : (
            <div className="space-y-5">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="border rounded-2xl p-6 flex justify-between items-start"
                >
                  <div>
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <p className="text-stone-500 mt-2">
                      {event.category} • {event.date}
                    </p>
                    <p className="mt-3 text-stone-700">
                      {event.description}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleHighlight(event.id)}
                      className="bg-yellow-500 text-white p-3 rounded-xl"
                    >
                      {event.highlight ? <FaStar /> : <FaRegStar />}
                    </button>

                    <button
                      onClick={() => handleEdit(event)}
                      className="bg-blue-500 text-white p-3 rounded-xl"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(event.id)}
                      className="bg-red-500 text-white p-3 rounded-xl"
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

export default EventsManager;