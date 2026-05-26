/**
 * templeService.js
 */
import api from "./api";

/* PUBLIC */

export const getAnnouncements = async () => {
  const { data } = await api.get("/announcements");
  return data.data;
};

export const getEvents = async ({ category, highlight } = {}) => {
  const params = {};
  if (category) params.category = category;
  if (highlight !== undefined) params.highlight = highlight;

  const { data } = await api.get("/events", { params });
  return data.data;
};

export const getEventById = async (id) => {
  const { data } = await api.get(`/events/${id}`);
  return data.data;
};

export const getFAQs = async () => {
  const { data } = await api.get("/faqs");
  return data.data;
};

export const getGallery = async (category = "All") => {
  const params = category && category !== "All" ? { category } : {};
  const { data } = await api.get("/gallery", { params });
  return data.data;
};

export const submitContact = async (formData) => {
  const { data } = await api.post("/contact", formData);
  return data;
};

/* ADMIN AUTH */

export const adminLogin = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });

  if (data.token) {
    localStorage.setItem("tc_admin_token", data.token);
  }

  return data;
};

export const adminLogout = () => {
  localStorage.removeItem("tc_admin_token");
};

export const getAdminMe = async () => {
  const { data } = await api.get("/auth/me");
  return data.admin;
};

/* EVENTS */

export const adminCreateEvent = async (payload) => {
  const { data } = await api.post("/events", payload);
  return data.data;
};

export const adminUpdateEvent = async (id, payload) => {
  const { data } = await api.put(`/events/${id}`, payload);
  return data.data;
};

export const adminDeleteEvent = async (id) => {
  const { data } = await api.delete(`/events/${id}`);
  return data;
};

export const adminToggleEventHighlight = async (id) => {
  const { data } = await api.patch(`/events/${id}/highlight`);
  return data.data;
};

/* FAQ */

export const adminGetAllFAQs = async () => {
  const { data } = await api.get("/faqs/admin/all");
  return data.data;
};

export const adminCreateFAQ = async (payload) => {
  const { data } = await api.post("/faqs", payload);
  return data.data;
};

export const adminUpdateFAQ = async (id, payload) => {
  const { data } = await api.put(`/faqs/${id}`, payload);
  return data.data;
};

export const adminDeleteFAQ = async (id) => {
  const { data } = await api.delete(`/faqs/${id}`);
  return data;
};

/* ANNOUNCEMENTS */

export const adminGetAllAnnouncements = async () => {
  const { data } = await api.get("/announcements/admin/all");
  return data.data;
};

export const adminCreateAnnouncement = async (payload) => {
  const { data } = await api.post("/announcements", payload);
  return data.data;
};

export const adminUpdateAnnouncement = async (id, payload) => {
  const { data } = await api.put(`/announcements/${id}`, payload);
  return data.data;
};

export const adminDeleteAnnouncement = async (id) => {
  const { data } = await api.delete(`/announcements/${id}`);
  return data;
};

export const adminToggleAnnouncement = async (id) => {
  const { data } = await api.patch(`/announcements/${id}/toggle`);
  return data.data;
};

/* GALLERY */

export const adminGetAllGalleryImages = async () => {
  const { data } = await api.get("/gallery/admin/all");
  return data.data;
};

export const adminUploadImage = async (formData) => {
  const { data } = await api.post("/gallery", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
};

export const adminDeleteImage = async (id) => {
  const { data } = await api.delete(`/gallery/${id}`);
  return data;
};

export const adminToggleImageVisibility = async (id) => {
  const { data } = await api.patch(`/gallery/${id}/toggle`);
  return data.data;
};

/* CONTACT */

export const adminGetMessages = async ({
  page = 1,
  limit = 20,
  unreadOnly = false,
} = {}) => {
  const params = { page, limit };
  if (unreadOnly) params.read = "false";

  const { data } = await api.get("/contact/admin/messages", { params });
  return data;
};

export const adminMarkMessageRead = async (id) => {
  const { data } = await api.patch(`/contact/admin/messages/${id}/read`);
  return data.data;
};

export const adminDeleteMessage = async (id) => {
  const { data } = await api.delete(`/contact/admin/messages/${id}`);
  return data;
};