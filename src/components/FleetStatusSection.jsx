import  { useState } from 'react';
import { Plus, Trash, Edit } from "lucide-react";

const FleetStatusSection = ({ fleetStatus, onAdd, onUpdate, onDelete }) => {
  const [newStatus, setNewStatus] = useState({
    type: '',
    total: '',
    operational: '',
    maintenance: ''
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAdd(newStatus);
    setNewStatus({ type: '', total: '', operational: '', maintenance: '' });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {/* Current Fleet Status Display */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Fleet Status</h2>
        <div className="text-sm text-gray-500">
          Total Aircraft Types: {fleetStatus.length}
        </div>
      </div>

      {/* Column Headers */}
      <div className="flex items-center space-x-4 px-4 mb-2 font-medium text-gray-600">
        <div className="flex-1">Aircraft Type</div>
        <div className="w-24 text-center">Total</div>
        <div className="w-24 text-center">Operational</div>
        <div className="w-24 text-center">Maintenance</div>
        <div className="w-12"></div>
      </div>

      {/* Fleet Status List */}
      <div className="space-y-4 mb-8">
        {fleetStatus.map((status) => (
          <div
            key={status._id}
            className="flex items-center space-x-4 p-4 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
          >
            <input
              type="text"
              value={status.type}
              onChange={(e) => onUpdate(status._id, "type", e.target.value)}
              placeholder="Aircraft Type"
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              value={status.total}
              onChange={(e) => onUpdate(status._id, "total", parseInt(e.target.value))}
              placeholder="Total"
              min="0"
              className="w-24 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              value={status.operational}
              onChange={(e) => onUpdate(status._id, "operational", parseInt(e.target.value))}
              placeholder="Operational"
              min="0"
              className="w-24 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              value={status.maintenance}
              onChange={(e) => onUpdate(status._id, "maintenance", parseInt(e.target.value))}
              placeholder="In Maintenance"
              min="0"
              className="w-24 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={() => onDelete(status._id)}
              className="p-2 text-red-500 hover:text-red-600 transition-colors"
              aria-label="Delete status"
            >
              <Trash className="w-5 h-5" />
            </button>
            
          </div>
        ))}
      </div>

      {/* Add New Fleet Status Form */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Add New Fleet Status</h3>
        <form onSubmit={handleAddSubmit}>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={newStatus.type}
              onChange={(e) => setNewStatus({ ...newStatus, type: e.target.value })}
              placeholder="Aircraft Type"
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              value={newStatus.total}
              onChange={(e) => setNewStatus({ ...newStatus, total: e.target.value })}
              placeholder="Total"
              min="0"
              className="w-24 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              value={newStatus.operational}
              onChange={(e) => setNewStatus({ ...newStatus, operational: e.target.value })}
              placeholder="Operational"
              min="0"
              className="w-24 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              value={newStatus.maintenance}
              onChange={(e) => setNewStatus({ ...newStatus, maintenance: e.target.value })}
              placeholder="In Maintenance"
              min="0"
              className="w-24 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FleetStatusSection;