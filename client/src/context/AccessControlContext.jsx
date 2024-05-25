import React, { createContext, useState, useEffect, useContext } from 'react';
import AccessControlService from '../api/services/accessControlService';
import { useUser } from './UserContext';

const AccessControlContext = createContext();

export const AccessControlProvider = ({ children }) => {
  const { user } = useUser();
  const [accessControls, setAccessControls] = useState([]);
  const [accessLevel,setAccessLevel] = useState('children');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  const fetchAccessControls = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await AccessControlService.getAccessControlsByUser(user.id);
      setAccessControls(data.accessControl);
      const permissionLevel = accessControls.length > 0 ? accessControls[0].permissionLevel : null;
      setAccessLevel(permissionLevel);
      console.log('accessControls-fetched', data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAccessControls();
    }
  }, [user]);

  return (
    <AccessControlContext.Provider value={{ accessControls, loading, error, accessLevel }}>
      {children}
    </AccessControlContext.Provider>
  );
};

export const useAccessControls = () => useContext(AccessControlContext);


