import React, { useState, useEffect } from 'react';
import { visitorAPI } from '../utils/api';
import { socketService } from '../utils/socketService';
import VisitorCard from './VisitorCard';

const HRDashboard = () => {
  const [visitors, setVisitors] = useState([]);
  const [filteredVisitors, setFilteredVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  useEffect(() => {
    fetchVisitors();
    setupSocketListeners();

    return () => {
      socketService.disconnect();
    };
  }, []);

  useEffect(() => {
    applyFilters();
  }, [visitors, filter, searchTerm, departmentFilter]);

  const fetchVisitors = async () => {
    try {
      const response = await visitorAPI.getAll();
      setVisitors(response.data);
    } catch (error) {
      console.error('Error fetching visitors:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupSocketListeners = () => {
    socketService.connect();

    socketService.on('newVisitor', (newVisitor) => {
      setVisitors(prev => [newVisitor, ...prev]);
      // Show notification
      if (Notification.permission === 'granted') {
        new Notification('New Visitor Request', {
          body: `${newVisitor.name} wants to meet ${newVisitor.meetingPerson}`,
          icon: '/favicon.ico'
        });
      }
    });

    socketService.on('visitorStatusUpdate', (updatedVisitor) => {
      setVisitors(prev => 
        prev.map(v => v._id === updatedVisitor._id ? updatedVisitor : v)
      );
    });
  };

  const applyFilters = () => {
    let filtered = [...visitors];

    // Status filter
    if (filter !== 'all') {
      filtered = filtered.filter(visitor => visitor.status === filter);
    }

    // Department filter
    if (departmentFilter !== 'all') {
      filtered = filtered.filter(visitor => visitor.department === departmentFilter);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(visitor =>
        visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visitor.meetingPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visitor.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredVisitors(filtered);
  };

  const handleUpdateStatus = async (visitorId, statusData) => {
    try {
      await visitorAPI.updateStatus(visitorId, statusData);
      // Update will come through socket
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating visitor status');
    }
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  };

  const getStatusCounts = () => {
    return {
      total: visitors.length,
      pending: visitors.filter(v => v.status === 'pending').length,
      approved: visitors.filter(v => v.status === 'approved').length,
      in: visitors.filter(v => v.status === 'in').length,
      out: visitors.filter(v => v.status === 'out').length,
      rejected: visitors.filter(v => v.status === 'rejected').length,
    };
  };

  const statusCounts = getStatusCounts();
  const departments = ['all', ...new Set(visitors.map(v => v.department))];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">HR Dashboard</h1>
            <button
              onClick={requestNotificationPermission}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Enable Notifications
            </button>
          </div> */}

          {/* Status Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{statusCounts.total}</div>
              <div className="text-sm text-blue-700">Total</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
              <div className="text-sm text-yellow-700">Pending</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{statusCounts.approved}</div>
              <div className="text-sm text-green-700">Approved</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{statusCounts.in}</div>
              <div className="text-sm text-blue-700">Currently IN</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">{statusCounts.out}</div>
              <div className="text-sm text-gray-700">Checked OUT</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{statusCounts.rejected}</div>
              <div className="text-sm text-red-700">Rejected</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="in">Currently IN</option>
                <option value="out">Checked OUT</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Department
              </label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or meeting person..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Visitors Grid */}
        {filteredVisitors.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-gray-500">
              {visitors.length === 0 ? 'No visitors yet' : 'No visitors match your filters'}
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredVisitors.map((visitor) => (
              <VisitorCard
                key={visitor._id}
                visitor={visitor}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HRDashboard;