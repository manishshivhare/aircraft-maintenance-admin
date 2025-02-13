import { useState, useEffect } from "react";
import { Plus, Trash, Loader } from "lucide-react";
import axios from "axios";

const AdminPanel = () => {
  const [upcomingMaintenance, setUpcomingMaintenance] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [fleetStatus, setFleetStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [maintenanceRes, alertsRes, fleetRes] = await Promise.all([
        axios.get(`/api/maintenance`),
        axios.get(`/api/alerts`),
        axios.get(`/api/fleet`),
      ]);

      setUpcomingMaintenance(maintenanceRes.data);
      setAlerts(alertsRes.data);
      setFleetStatus(fleetRes.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Maintenance handlers
  const addMaintenance = async () => {
    try {
      const newMaintenance = {
        aircraft: "",
        type: "",
        dueDate: new Date().toISOString().split("T")[0],
        flightHours: 0,
      };
      const res = await axios.post(
        `/API/maintenance`,
        newMaintenance
      );
      setUpcomingMaintenance([...upcomingMaintenance, res.data]);
    } catch (err) {
      setError("Failed to add maintenance record");
    }
  };

  const updateMaintenance = async (id, field, value) => {
    try {
      const maintenance = upcomingMaintenance.find((m) => m._id === id);
      const updatedMaintenance = { ...maintenance, [field]: value };
      const res = await axios.put(
        `/api/maintenance/${id}`,
        updatedMaintenance
      );
      setUpcomingMaintenance(
        upcomingMaintenance.map((item) => (item._id === id ? res.data : item))
      );
    } catch (err) {
      setError("Failed to update maintenance record");
    }
  };

  const deleteMaintenance = async (id) => {
    try {
      await axios.delete(`/api/maintenance/${id}`);
      setUpcomingMaintenance(
        upcomingMaintenance.filter((item) => item._id !== id)
      );
    } catch (err) {
      setError("Failed to delete maintenance record");
    }
  };

  // Alert handlers
  const addAlert = async () => {
    try {
      const newAlert = {
        severity: "medium",
        message: "",
      };
      const res = await axios.post(`/api/alerts`, newAlert);
      setAlerts([...alerts, res.data]);
    } catch (err) {
      setError("Failed to add alert");
    }
  };

  const updateAlert = async (id, field, value) => {
    try {
      const alert = alerts.find((a) => a._id === id);
      const updatedAlert = { ...alert, [field]: value };
      const res = await axios.put(`/api/alerts/${id}`, updatedAlert);
      setAlerts(alerts.map((alert) => (alert._id === id ? res.data : alert)));
    } catch (err) {
      setError("Failed to update alert");
    }
  };

  const deleteAlert = async (id) => {
    try {
      await axios.delete(`/api/alerts/${id}`);
      setAlerts(alerts.filter((alert) => alert._id !== id));
    } catch (err) {
      setError("Failed to delete alert");
    }
  };

  // Fleet status handlers
  const addFleetStatus = async () => {
    try {
      const newFleet = {
        type: "",
        total: 0,
        operational: 0,
        maintenance: 0,
      };
      const res = await axios.post(`/api/fleet`, newFleet);
      setFleetStatus([...fleetStatus, res.data]);
    } catch (err) {
      setError("Failed to add fleet status");
    }
  };

  const updateFleetStatus = async (id, field, value) => {
    try {
      const status = fleetStatus.find((f) => f._id === id);
      const updatedStatus = { ...status, [field]: value };
      const res = await axios.put(`/api/fleet/${id}`, updatedStatus);
      setFleetStatus(
        fleetStatus.map((status) => (status._id === id ? res.data : status))
      );
    } catch (err) {
      setError("Failed to update fleet status");
    }
  };

  const deleteFleetStatus = async (id) => {
    try {
      await axios.delete(`/api/fleet/${id}`);
      setFleetStatus(fleetStatus.filter((status) => status._id !== id));
    } catch (err) {
      setError("Failed to delete fleet status");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right font-bold"
          >
            ×
          </button>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8">Maintenance Dashboard Admin</h1>

      {/* Upcoming Maintenance Section */}
      <div className="mb-8 bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upcoming Maintenance</h2>
          <button
            onClick={addMaintenance}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Maintenance
          </button>
        </div>

        <div className="space-y-4">
          {upcomingMaintenance.map((item) => (
            <div
              key={item._id}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded"
            >
              <input
                type="text"
                value={item.aircraft}
                onChange={(e) =>
                  updateMaintenance(item._id, "aircraft", e.target.value)
                }
                placeholder="Aircraft"
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                value={item.type}
                onChange={(e) =>
                  updateMaintenance(item._id, "type", e.target.value)
                }
                placeholder="Type"
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="date"
                value={item.dueDate ? item.dueDate.split("T")[0] : ""}
                onChange={(e) =>
                  updateMaintenance(item._id, "dueDate", e.target.value)
                }
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                value={item.flightHours}
                onChange={(e) =>
                  updateMaintenance(
                    item._id,
                    "flightHours",
                    parseInt(e.target.value)
                  )
                }
                placeholder="Flight Hours"
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => deleteMaintenance(item._id)}
                className="p-2 text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts Section */}
      <div className="mb-8 bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Alerts</h2>
          <button
            onClick={addAlert}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Alert
          </button>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert._id}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded"
            >
              <select
                value={alert.severity}
                onChange={(e) =>
                  updateAlert(alert._id, "severity", e.target.value)
                }
                className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <input
                type="text"
                value={alert.message}
                onChange={(e) =>
                  updateAlert(alert._id, "message", e.target.value)
                }
                placeholder="Alert message"
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => deleteAlert(alert._id)}
                className="p-2 text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Fleet Status Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Fleet Status</h2>
          <button
            onClick={addFleetStatus}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Fleet Status
          </button>
        </div>

        <div className="space-y-4">
          {fleetStatus.map((status) => (
            <div
              key={status._id}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded"
            >
              <input
                type="text"
                value={status.type}
                onChange={(e) =>
                  updateFleetStatus(status._id, "type", e.target.value)
                }
                placeholder="Aircraft Type"
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                value={status.total}
                onChange={(e) =>
                  updateFleetStatus(
                    status._id,
                    "total",
                    parseInt(e.target.value)
                  )
                }
                placeholder="Total"
                className="w-24 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                value={status.operational}
                onChange={(e) =>
                  updateFleetStatus(
                    status._id,
                    "operational",
                    parseInt(e.target.value)
                  )
                }
                placeholder="Operational"
                className="w-24 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                value={status.maintenance}
                onChange={(e) =>
                  updateFleetStatus(
                    status._id,
                    "maintenance",
                    parseInt(e.target.value)
                  )
                }
                placeholder="In Maintenance"
                className="w-24 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => deleteFleetStatus(status._id)}
                className="p-2 text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
