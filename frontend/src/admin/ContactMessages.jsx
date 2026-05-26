import { useEffect, useState } from "react";
import {
  Mail,
  Trash2,
  CheckCircle,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  adminGetMessages,
  adminMarkMessageRead,
  adminDeleteMessage,
} from "../services/templeService";

export default function ContactMessages() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await adminGetMessages();
      setMessages(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markRead = async (id) => {
    try {
      await adminMarkMessageRead(id);
      fetchMessages();
    } catch {
      alert("Failed to mark message as read");
    }
  };

  const deleteMessage = async (id) => {
    const confirmDelete = window.confirm("Delete this message?");
    if (!confirmDelete) return;

    try {
      await adminDeleteMessage(id);
      fetchMessages();
    } catch {
      alert("Failed to delete message");
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="flex items-center gap-2 text-orange-500 font-semibold mb-3"
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </button>

            <h1 className="text-4xl font-black text-stone-900">
              Contact Messages
            </h1>
            <p className="text-stone-500 mt-2">
              View and manage visitor contact inquiries
            </p>
          </div>

          <button
            onClick={fetchMessages}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 bg-white rounded-2xl shadow p-6 border">
          <div className="flex items-center gap-3">
            <Mail className="text-orange-500" size={28} />
            <div>
              <h2 className="text-2xl font-bold text-stone-900">
                {messages.length} Messages
              </h2>
              <p className="text-stone-500">Total contact inquiries</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        {loading ? (
          <div className="text-center py-20 text-stone-500 text-lg">
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <Mail className="mx-auto text-stone-300 mb-4" size={42} />
            <p className="text-stone-500 text-lg">No messages found</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`bg-white rounded-2xl shadow border p-6 ${
                  msg.read ? "border-stone-200" : "border-orange-300"
                }`}
              >
                <div className="flex flex-col md:flex-row md:justify-between gap-5">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-stone-900">
                        {msg.name}
                      </h3>

                      {!msg.read && (
                        <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full">
                          NEW
                        </span>
                      )}
                    </div>

                    <p className="text-stone-600">
                      <strong>Email:</strong> {msg.email}
                    </p>

                    {msg.phone && (
                      <p className="text-stone-600">
                        <strong>Phone:</strong> {msg.phone}
                      </p>
                    )}

                    {msg.subject && (
                      <p className="text-stone-600">
                        <strong>Subject:</strong> {msg.subject}
                      </p>
                    )}

                    <div className="bg-stone-50 rounded-xl p-4 mt-3">
                      <p className="text-stone-700 whitespace-pre-wrap">
                        {msg.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-3">
                    {!msg.read && (
                      <button
                        onClick={() => markRead(msg._id)}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl font-semibold"
                      >
                        <CheckCircle size={18} />
                        Mark Read
                      </button>
                    )}

                    <button
                      onClick={() => deleteMessage(msg._id)}
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl font-semibold"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}