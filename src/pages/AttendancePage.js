import React, { useContext } from 'react';
import { AttendanceContext } from '../context/AttendanceContext';
import NavBar from "../components/NavBar";


function AttendancePage() {
  const { attendance, markAttendance } = useContext(AttendanceContext);

  const handleAttendance = (date) => {
    markAttendance(date);
  };

  return (
    <div>
      <NavBar/>
      <h2>Attendance Page</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record) => (
            <tr key={record.date}>
              <td>{record.date}</td>
              <td>{record.present ? 'Present' : 'Absent'}</td>
              <td>
                <button onClick={() => handleAttendance(record.date)}>
                  {record.present ? 'Mark Absent' : 'Mark Present'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendancePage;
