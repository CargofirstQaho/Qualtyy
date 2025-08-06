import React from 'react';
import { useQuery } from '../../../../../context/QueryContext';

const DebugNotifications = () => {
  const { notifications, getCurrentInspectorId } = useQuery();
  const currentInspectorId = getCurrentInspectorId();
  
  console.log('🔍 Debug - All notifications:', notifications);
  console.log('🔍 Debug - Current inspector ID:', currentInspectorId);
  console.log('🔍 Debug - Unread notifications:', notifications.filter(n => !n.read));
  
  const unreadNotifications = notifications.filter(n => !n.read);
  const inspectionConfirmedNotifications = notifications.filter(n => n.type === 'inspection_confirmed');
  
  return (
    <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-300 rounded p-3 text-xs z-40 max-w-xs shadow-lg">
      <div className="font-bold text-yellow-800 mb-2">🔧 Debug Info</div>
      <div className="space-y-1 text-yellow-700">
        <div><strong>Inspector ID:</strong> {currentInspectorId}</div>
        <div><strong>Total Notifications:</strong> {notifications.length}</div>
        <div><strong>Unread:</strong> {unreadNotifications.length}</div>
        <div><strong>Inspection Confirmed:</strong> {inspectionConfirmedNotifications.length}</div>
        <div><strong>Current Inspector Unread:</strong> {
          notifications.filter(n => 
            !n.read && 
            n.type === 'inspection_confirmed' && 
            n.inspectorId === currentInspectorId
          ).length
        }</div>
      </div>
      {unreadNotifications.length > 0 && (
        <div className="mt-2 p-2 bg-yellow-200 rounded text-xs">
          <div className="font-bold">Latest Unread:</div>
          <div>{unreadNotifications[0].type}</div>
          <div>For: {unreadNotifications[0].inspectorId}</div>
        </div>
      )}
    </div>
  );
};

export default DebugNotifications;