import React, { useState } from 'react';
import { Plus, Trash, Edit } from "lucide-react";

const AlertsSection = ({ alerts, onAdd, onUpdate, onDelete }) => {
  const [newAlert, setNewAlert] = useState({
    severity: 'medium',
    message: ''
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAdd(newAlert);
    setNewAlert({ severity: 'medium', message: '' });
  };

  return (
    <div className="mb-8 bg-white rounded-lg p-6 shadow-sm">
      {/* Current Alerts Display */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Current Alerts</h2>
        <div className="text-sm text-gray-500">
          Total Alerts: {alerts.length}
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {alerts.map((alert) => (
          <div 
            key={alert._id}
            className={`
              border rounded-lg p-4
              ${alert.severity === 'high' ? 'border-red-500 bg-red-50' : 
                alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' : 
                'border-blue-500 bg-blue-50'}
            `}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`
                    px-2 py-1 rounded text-sm font-medium
                    ${alert.severity === 'high' ? 'bg-red-200 text-red-800' : 
                      alert.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' : 
                      'bg-blue-200 text-blue-800'}
                  `}>
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={alert.severity}
                    onChange={(e) => onUpdate(alert._id, "severity", e.target.value)}
                    className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <input
                    type="text"
                    value={alert.message}
                    onChange={(e) => onUpdate(alert._id, "message", e.target.value)}
                    className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => onDelete(alert._id)}
                    className="p-2 text-red-500 hover:text-red-600 transition-colors"
                    aria-label="Delete alert"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Alert Form */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Add New Alert</h3>
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            <select
              value={newAlert.severity}
              onChange={(e) => setNewAlert({ ...newAlert, severity: e.target.value })}
              className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <input
              type="text"
              value={newAlert.message}
              onChange={(e) => setNewAlert({ ...newAlert, message: e.target.value })}
              placeholder="Enter alert message"
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Alert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlertsSection;