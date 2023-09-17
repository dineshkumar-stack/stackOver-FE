import React, { createContext, useState } from 'react';

export const AttendanceContext = createContext();

export function AttendanceProvider({ children }) {
  const [attendance, setAttendance] = useState([]);

  const markAttendance = (date) => {
    const existingRecord = attendance.find((record) => record.date === date);
    if (existingRecord) {
      existingRecord.present = !existingRecord.present;
      setAttendance([...attendance]);
    } else {
      const newRecord = {
        date,
        present: true,
      };
      setAttendance([...attendance, newRecord]);
    }
  };

  return (
    <AttendanceContext.Provider value={{ attendance, markAttendance }}>
      {children}
    </AttendanceContext.Provider>
  );
}
