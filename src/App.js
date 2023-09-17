import { BrowserRouter as Router } from "react-router-dom";
import Content from "./components/Content";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import { AttendanceProvider } from "./context/AttendanceContext";
import "./styles.css";
import React, {  } from "react";

function App() {

  return (
    <AuthProvider>
      <TaskProvider>
        <AttendanceProvider>
          <Router>
            <div className="App">
              <div className="bg"></div>
              <div className="row">
                  <div className="content-container">
                    <Content />
                  </div>
              </div>
            </div>
          </Router>
        </AttendanceProvider>
      </TaskProvider>
    </AuthProvider>





  );
}

export default App;
