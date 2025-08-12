import React, { useState } from 'react';

const VisitorCard = ({ visitor, onUpdateStatus }) => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      in: 'bg-blue-100 text-blue-800',
      out: 'bg-gray-100 text-black'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const handleStatusChange = (newStatus) => {
    if (newStatus === 'rejected') {
      setShowRejectModal(true);
    } else {
      onUpdateStatus(visitor._id, { status: newStatus, hrNotes: '' });
    }
  };

  const confirmRejection = () => {
    if (!rejectReason.trim()) {
      alert("Please enter a rejection reason.");
      return;
    }

    onUpdateStatus(visitor._id, {
      status: 'rejected',
      hrNotes: rejectReason.trim()
    });

    setRejectReason('');
    setShowRejectModal(false);
  };

  const cancelRejection = () => {
    setRejectReason('');
    setShowRejectModal(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow relative">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{visitor.name}</h3>
          <p className="text-gray-600">{visitor.email}</p>
        </div>
        {getStatusBadge(visitor.status)}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="text-gray-500">Mobile:</span>
          <p className="font-medium">{visitor.mobile}</p>
        </div>
        <div>
          <span className="text-gray-500">Visitors:</span>
          <p className="font-medium">{visitor.visitorCount}</p>
        </div>
        <div>
          <span className="text-gray-500">Meeting:</span>
          <p className="font-medium">{visitor.meetingPerson}</p>
        </div>
        <div>
          <span className="text-gray-500">Designation:</span>
          <p className="font-medium">{visitor.meetingPersonDesignation}</p>
        </div>
        <div className="col-span-2">
          <span className="text-gray-500">Department:</span>
          <p className="font-medium">{visitor.department}</p>
        </div>
        <div className="col-span-2">
          <span className="text-gray-500">Purpose:</span>
          <p className="font-medium">{visitor.purpose}</p>
        </div>
      </div>

      <div className="border-t pt-4 mb-4">
        <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
          <div>
            <span>Submitted:</span>
            <p>{formatDateTime(visitor.submittedAt)}</p>
          </div>
          <div>
            <span>Reviewed:</span>
            <p>{formatDateTime(visitor.reviewedAt)}</p>
          </div>
          {visitor.entryTime && (
            <div>
              <span>Entry:</span>
              <p>{formatDateTime(visitor.entryTime)}</p>
            </div>
          )}
          {visitor.exitTime && (
            <div>
              <span>Exit:</span>
              <p>{formatDateTime(visitor.exitTime)}</p>
            </div>
          )}
        </div>
      </div>

      {visitor.hrNotes && (
        <div className="bg-gray-50 p-3 rounded mb-4">
          <span className="text-gray-500 text-sm">HR Notes:</span>
          <p className="text-sm text-black">{visitor.hrNotes}</p>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {visitor.status === 'pending' && (
          <>
            <button
              onClick={() => handleStatusChange('approved')}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            >
              Approve
            </button>
            <button
              onClick={() => handleStatusChange('rejected')}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Reject
            </button>
          </>
        )}
        {visitor.status === 'approved' && (
          <button
            onClick={() => handleStatusChange('in')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Mark as IN
          </button>
        )}
        {visitor.status === 'in' && (
          <button
            onClick={() => handleStatusChange('out')}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
          >
            Mark as OUT
          </button>
        )}
      </div>

      {showRejectModal && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-2">Reject Visitor</h2>
            <textarea
              rows="3"
              className="w-full border border-gray-300 rounded p-2 mb-4"
              placeholder="Enter reason for rejection..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelRejection}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmRejection}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorCard;
