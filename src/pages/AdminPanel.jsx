import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import axios from "axios";
import ErrorAlert from "../components/ErrorAlert";
import MaintenanceSection from "../components/MaintenanceSection";
import AlertsSection from "../components/AlertsSection";
import FleetStatusSection from "../components/FleetStatusSection";

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
  const addMaintenance = async (data) => {
    try {
      const res = await axios.post(`/api/maintenance`, data);
      setUpcomingMaintenance([...upcomingMaintenance, res.data]);
    } catch (err) {
      setError("Failed to add maintenance record");
    }
  };

  const updateMaintenance = async (id, data) => {
    try {
     
      const res = await axios.put(`/api/maintenance/${id}`, data);
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
  const addAlert = async (data) => {
    try {
      const res = await axios.post(`/api/alerts`, data);
      setAlerts([...alerts, res.data]);
    } catch (err) {
      setError("Failed to add alert");
    }
  };

  const updateAlert = async (id, data) => {
    try {
      const res = await axios.put(`/api/alerts/${id}`, data);
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
  const addFleetStatus = async (data) => {
    try {
      const res = await axios.post(`/api/fleet`, data);
      setFleetStatus([...fleetStatus, res.data]);
    } catch (err) {
      setError("Failed to add fleet status");
    }
  };

  const updateFleetStatus = async (id, data) => {
    try {
      const res = await axios.put(`/api/fleet/${id}`, data);
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
      <ErrorAlert error={error} onDismiss={() => setError(null)} />
      <h1 className="text-3xl font-bold mb-8">Maintenance Dashboard Admin</h1>

      <MaintenanceSection
        maintenance={upcomingMaintenance}
        onAdd={addMaintenance}
        onUpdate={updateMaintenance}
        onDelete={deleteMaintenance}
      />

      <AlertsSection
        alerts={alerts}
        onAdd={addAlert}
        onUpdate={updateAlert}
        onDelete={deleteAlert}
      />

      <FleetStatusSection
        fleetStatus={fleetStatus}
        onAdd={addFleetStatus}
        onUpdate={updateFleetStatus}
        onDelete={deleteFleetStatus}
      />
    </div>
  );
};

export default AdminPanel;
