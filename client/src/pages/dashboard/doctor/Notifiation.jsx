// src/components/Notification.jsx
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import authAxios from "../../../utils/authAxios";

const formatTime = (t) => {
  if (!t) return "";
  const [hStr, m] = t.split(":");
  const hNum = parseInt(hStr, 10);
  const hours = hNum % 12 || 12;
  const ampm = hNum >= 12 ? "PM" : "AM";
  return `${hours}:${m} ${ampm}`;
};

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [localEdits, setLocalEdits] = useState({}); // { [id]: { newDate, newTime } }
  const [savingIds, setSavingIds] = useState(new Set()); // to track saves in progress
  const [respondingIds, setRespondingIds] = useState(new Set()); // track accept/reject in progress

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await authAxios.get(`/api/appointments/${id}`); // GET /api/notifications
      // expected: res.data = [{ _id, doctorName, profileImage, previousDateTime, newDate, newTime, updatedBy, updatedAgo, ... }, ...]
      setNotifications(res.data || []);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "Failed to load notifications. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // start editing -> populate localEdits
  const handleStartEdit = (notif) => {
    setEditingId(notif._id);
    setLocalEdits((s) => ({
      ...s,
      [notif._id]: {
        newDate: notif.newDate || notif.suggestedDate || "",
        newTime: notif.newTime || notif.suggestedTime || "",
      },
    }));
  };

  const handleChangeEdit = (id, field, value) => {
    setLocalEdits((s) => ({
      ...s,
      [id]: {
        ...(s[id] || {}),
        [field]: value,
      },
    }));
  };

  // Save edited date/time to backend
  const handleSave = async (id) => {
    const edit = localEdits[id];
    if (!edit) return;

    // basic validation
    if (!edit.newDate || !edit.newTime) {
      alert("Please select both date and time.");
      return;
    }

    setSavingIds((prev) => new Set(prev).add(id));
    try {
      // PATCH /api/notifications/:id (adjust as per backend)
      const res = await authAxios.patch(`api/appointments/${id}`, {
        newDate: edit.newDate,
        newTime: edit.newTime,
      });

      // update local list with returned updated notification if backend returns it
      const updated = res.data;
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, ...updated } : n))
      );
      setEditingId(null);
      // optionally clear localEdits for this id
      setLocalEdits((s) => {
        const copy = { ...s };
        delete copy[id];
        return copy;
      });
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.message ||
          "Could not save changes. Please try again later."
      );
    } finally {
      setSavingIds((prev) => {
        const copy = new Set(prev);
        copy.delete(id);
        return copy;
      });
    }
  };

  // Accept / Reject actions
  const handleRespond = async (id, action) => {
    // action: "accept" or "reject"
    setRespondingIds((prev) => new Set(prev).add(id));
    // optimistic update: mark status locally (optional)
    const prevNotifications = notifications;
    setNotifications((prev) =>
      prev.map((n) =>
        n._id === id ? { ...n, status: action === "accept" ? "accepted" : "rejected" } : n
      )
    );

    try {
      // POST /api/notifications/:id/respond with { action }
      await authAxios.post(`/notifications/${id}`, { action });
      // after success, you might want to refetch or update further fields returned by API
    } catch (err) {
      console.error(err);
      // rollback optimistic update
      setNotifications(prevNotifications);
      alert(
        err?.response?.data?.message ||
          `Unable to ${action}. Try again later.`
      );
    } finally {
      setRespondingIds((prev) => {
        const copy = new Set(prev);
        copy.delete(id);
        return copy;
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-[20%] h-screen bg-gray-600 fixed ">
        <div className="mt-20">
          <h1 className="text-white text-2xl font-bold ms-3">
            Welcome Satyam Thakur
          </h1>
        </div>
        <div className="grid ">
          <NavLink
            to="/doctor/dashboard"
            className="text-white -my-10 text-xl hover:text-gray-300 h-12 w-60 hover:bg-gray-700 rounded-2xl ms-[10%] mt-12"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/doctor/dashboard"
            className="text-white -my-10 text-xl hover:text-gray-300 h-12 w-60 hover:bg-gray-700 rounded-2xl ms-[10%] mt-12"
          >
            Appointments
          </NavLink>
          <NavLink
            to="/doctor/dashboard"
            className="text-white -my-10 text-xl hover:text-gray-300 h-12 w-60 hover:bg-gray-700 rounded-2xl ms-[10%] mt-12"
          >
            Today Appointment
          </NavLink>
          <NavLink
            to="/doctor/dashboard"
            className="text-white -my-10 text-xl hover:text-gray-300 h-12 w-60 hover:bg-gray-700 rounded-2xl ms-[10%] mt-12"
          >
            Details
          </NavLink>
        </div>
      </div>

      {/* Notifications list */}
      <div className="flex-1 p-6 ml-[22%]">
        <h1 className="text-2xl font-bold mb-4">Notifications</h1>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">{error}</div>
        )}

        {notifications.length === 0 && (
          <div className="text-gray-600">No notifications at the moment.</div>
        )}

        <div className="space-y-4">
          {notifications.map((notif) => {
            const isEditing = editingId === notif._id;
            const editVals = localEdits[notif._id] || {};
            const saving = savingIds.has(notif._id);
            const responding = respondingIds.has(notif._id);

            return (
              <div
                key={notif._id}
                className="bg-white shadow-md rounded-xl p-4 flex items-start gap-4 hover:shadow-lg transition-all"
              >
                <img
                  src={notif.profileImage || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                  alt="profile"
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    {notif.doctorName || "Dr. Satyam Thakur"}
                  </h2>
                  <p className="text-gray-600">Doctor Appointment Request</p>

                  {isEditing ? (
                    <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mt-2">
                      <p className="text-blue-700 font-semibold mb-2">
                        Edit Date & Time
                      </p>

                      <div className="flex flex-col gap-3">
                        <div>
                          <label className="text-sm font-medium">New Date:</label>
                          <input
                            type="date"
                            className="block w-full p-2 border rounded-lg mt-1"
                            value={editVals.newDate || ""}
                            onChange={(e) =>
                              handleChangeEdit(notif._id, "newDate", e.target.value)
                            }
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium">New Time:</label>
                          <input
                            type="time"
                            className="block w-full p-2 border rounded-lg mt-1"
                            value={editVals.newTime || ""}
                            onChange={(e) =>
                              handleChangeEdit(notif._id, "newTime", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 mt-3">
                        <button
                          className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
                          onClick={() => handleSave(notif._id)}
                          disabled={saving}
                        >
                          {saving ? "Saving..." : "Save"}
                        </button>
                        <button
                          className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                          onClick={() => {
                            setEditingId(null);
                            setLocalEdits((s) => {
                              const copy = { ...s };
                              delete copy[notif._id];
                              return copy;
                            });
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-700 font-medium mt-1">
                        New Time:{" "}
                        <span className="text-blue-600">
                          {formatTime(notif.newTime || notif.suggestedTime || "00:00")}
                        </span>
                      </p>

                      <p className="text-gray-700 font-medium">
                        New Date:{" "}
                        <span className="text-blue-600">
                          {notif.newDate || notif.suggestedDate || "—"}
                        </span>
                      </p>

                      <p className="text-gray-500 text-sm mt-1">
                        Previous: {notif.previousDateFormatted || "10th Aug, 2023 • 10:00 AM"}
                      </p>

                      <p className="text-sm text-gray-400 mt-1">
                        Updated by {notif.updatedBy || "Doctor"} • {notif.updatedAgo || "5 mins ago"}
                      </p>

                      <button
                        className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        onClick={() => handleStartEdit(notif)}
                      >
                        Edit Date & Time
                      </button>
                    </>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    className={`px-4 py-2 text-white rounded-lg ${
                      notif.status === "accepted" ? "bg-green-700" : "bg-green-500 hover:bg-green-600"
                    }`}
                    onClick={() => handleRespond(notif._id, "accept")}
                    disabled={responding || notif.status === "accepted"}
                  >
                    {responding && notif.status !== "accepted" ? "Processing..." : (notif.status === "accepted" ? "Accepted" : "Accept")}
                  </button>

                  <button
                    className={`px-4 py-2 text-white rounded-lg ${
                      notif.status === "rejected" ? "bg-red-700" : "bg-red-500 hover:bg-red-600"
                    }`}
                    onClick={() => handleRespond(notif._id, "reject")}
                    disabled={responding || notif.status === "rejected"}
                  >
                    {responding && notif.status !== "rejected" ? "Processing..." : (notif.status === "rejected" ? "Rejected" : "Reject")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notification;
