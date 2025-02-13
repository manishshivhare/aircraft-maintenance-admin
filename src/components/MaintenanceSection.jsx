import React, { useState } from 'react';
import { Plus, Trash, Edit } from "lucide-react";

const MaintenanceSection = ({ maintenance, onAdd, onUpdate, onDelete }) => {
  const [newMaintenance, setNewMaintenance] = useState({
    aircraft: '',
    type: '',
    dueDate: '',
    flightHours: ''
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAdd(newMaintenance);
    setNewMaintenance({ aircraft: '', type: '', dueDate: '', flightHours: '' });
  };

  // Calculate days until maintenance
  const getDaysUntil = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="mb-8 bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Upcoming Maintenance</h2>
        <div className="text-sm text-gray-500">
          Scheduled Tasks: {maintenance.length}
        </div>
      </div>

      {/* Column Headers */}
      <div className="flex items-center space-x-4 px-4 mb-2 font-medium text-gray-600">
        <div className="flex-1">Aircraft</div>
        <div className="flex-1">Maintenance Type</div>
        <div className="flex-1">Due Date</div>
        <div className="flex-1">Flight Hours</div>
        <div className="w-12"></div>
      </div>

      {/* Maintenance List */}
      <div className="space-y-4 mb-8">
        {maintenance.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).map((item) => {
          const daysUntil = getDaysUntil(item.dueDate);
          return (
            <div
              key={item._id}
              className={`flex items-center space-x-4 p-4 rounded
                ${daysUntil <= 7 ? 'bg-red-50' : 
                  daysUntil <= 30 ? 'bg-yellow-50' : 
                  'bg-gray-50'}`}
            >
              <input
                type="text"
                value={item.aircraft}
                onChange={(e) => onUpdate(item._id, "aircraft", e.target.value)}
                placeholder="Aircraft"
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                value={item.type}
                onChange={(e) => onUpdate(item._id, "type", e.target.value)}
                placeholder="Maintenance Type"
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="flex-1 flex flex-col">
                <input
                  type="date"
                  value={item.dueDate ? item.dueDate.split("T")[0] : ""}
                  onChange={(e) => onUpdate(item._id, "dueDate", e.target.value)}
                  className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="text-sm mt-1 text-gray-500">
                  {daysUntil === 0 ? "Due today" :
                   daysUntil < 0 ? `Overdue by ${Math.abs(daysUntil)} days` :
                   `Due in ${daysUntil} days`}
                </span>
              </div>
              <input
                type="number"
                value={item.flightHours}
                onChange={(e) => onUpdate(item._id, "flightHours", parseInt(e.target.value))}
                placeholder="Flight Hours"
                min="0"
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => onDelete(item._id)}
                className="p-2 text-red-500 hover:text-red-600 transition-colors"
                aria-label="Delete maintenance task"
              >
                <Trash className="w-5 h-5" />
              </button>
              
            </div>
          );
        })}
      </div>

      {/* Add New Maintenance Form */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Add New Maintenance Task</h3>
        <form onSubmit={handleAddSubmit}>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={newMaintenance.aircraft}
              onChange={(e) => setNewMaintenance({ ...newMaintenance, aircraft: e.target.value })}
              placeholder="Aircraft"
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              value={newMaintenance.type}
              onChange={(e) => setNewMaintenance({ ...newMaintenance, type: e.target.value })}
              placeholder="Maintenance Type"
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="date"
              value={newMaintenance.dueDate}
              onChange={(e) => setNewMaintenance({ ...newMaintenance, dueDate: e.target.value })}
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              value={newMaintenance.flightHours}
              onChange={(e) => setNewMaintenance({ ...newMaintenance, flightHours: e.target.value })}
              placeholder="Flight Hours"
              min="0"
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

export default MaintenanceSection;