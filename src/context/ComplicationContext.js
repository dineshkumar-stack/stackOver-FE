import React, { createContext, useState, useEffect } from 'react';

export const ComplicationContext = createContext();

export const ComplicationProvider = ({ children }) => {
  const [taskBarStatus, setTaskBarStatus] = useState(0);
  const [taskCount, setTaskCount] = useState(0);

  const complications = {
    Complete_Task : taskBarStatus,
    Pending_Task: taskCount - taskBarStatus,
  };
  useEffect(() => {
    fetch('https://student-dashboard-be.onrender.com/api/taskbarstatus')
      .then(response => response.json())
      .then(data => setTaskBarStatus(data.length))
      .catch(error => console.error('Error fetching task bar status:', error));

    fetch('https://student-dashboard-be.onrender.com/api/tasks')
      .then(response => response.json())
      .then(data => setTaskCount(data.length))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <ComplicationContext.Provider value={{ complications, taskBarStatus, taskCount }}>
      {children}
    </ComplicationContext.Provider>
  );
};
