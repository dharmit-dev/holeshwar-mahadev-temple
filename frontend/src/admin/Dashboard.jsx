import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaImages,
  FaEnvelope,
  FaBullhorn,
  FaQuestionCircle,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa";

import { adminLogout, getAdminMe } from "../services/templeService";

function Dashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAdmin = async () => {
      try {
        const token = localStorage.getItem("tc_admin_token");

        if (!token) {
          navigate("/admin/login");
          return;
        }

        const adminData = await getAdminMe();
        setAdmin(adminData);
      } catch {
        adminLogout();
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    loadAdmin();
  }, [navigate]);

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login");
  };

  const cards = [
    {
      title: "Manage Events",
      icon: <FaCalendarAlt />,
      desc: "Create, edit, and manage temple events",
      color: "from-orange-500 to-amber-500",
      path: "/admin/events",
    },
    {
      title: "Gallery Manager",
      icon: <FaImages />,
      desc: "Upload and organize temple images",
      color: "from-blue-500 to-cyan-500",
      path: "/admin/gallery",
    },
    {
      title: "Contact Messages",
      icon: <FaEnvelope />,
      desc: "View visitor contact messages",
      color: "from-green-500 to-emerald-500",
      path: "/admin/messages",
    },
    {
      title: "Announcements",
      icon: <FaBullhorn />,
      desc: "Manage temple announcements",
      color: "from-purple-500 to-pink-500",
      path: "/admin/announcements",
    },
    {
      title: "FAQ Manager",
      icon: <FaQuestionCircle />,
      desc: "Update frequently asked questions",
      color: "from-red-500 to-rose-500",
      path: "/admin/faqs",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <div className="text-2xl font-semibold text-stone-700">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-stone-900">
              Admin Dashboard
            </h1>
            <p className="text-stone-500 mt-1">
              Holeshwar Mahadev Temple Management
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-2xl">
              <FaUserShield />
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                Welcome, {admin?.name || "Admin"}
              </h2>
              <p className="text-orange-100 mt-1">{admin?.email}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition p-6"
            >
              <div
                className={`h-14 w-14 rounded-2xl bg-gradient-to-r ${card.color} text-white flex items-center justify-center text-2xl mb-5`}
              >
                {card.icon}
              </div>

              <h3 className="text-xl font-bold text-stone-900">
                {card.title}
              </h3>

              <p className="text-stone-500 mt-3 leading-relaxed">
                {card.desc}
              </p>

              <button
                onClick={() => navigate(card.path)}
                className="mt-5 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition"
              >
                Open
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;