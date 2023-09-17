import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "../logo.svg";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import { FcLeave } from "react-icons/fc";
import { BiSolidDashboard, BiUserPin } from "react-icons/bi";
import { AiFillGithub } from "react-icons/ai";
import { GrTasks } from "react-icons/gr";
import { useAuth } from "../context/AuthContext";
import { TbLogout } from "react-icons/tb";
import { ImUserCheck } from "react-icons/im";


const authToken = localStorage.getItem("authToken");

const headers = {
  Authorization: `${authToken}`,
  "Content-Type": "application/json",
};

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const [userData, setUserData] = useState([]);


  const { currentUser, logout } = useAuth();
  const history = useHistory();


  const apiUrl = 'https://student-dashboard-be.onrender.com/api/userdetail';

  fetch(apiUrl, {
    method: 'GET',
    headers: headers
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setUserData(data.userDetails);


    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });


  const handleLogout = async () => {

    try {
      logout();
      history.push("/");
      localStorage.removeItem('authToken');
      window.location.assign("/")


    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar border-bottom"}
    >

      <Container>
        <Navbar.Brand href="/" className="d-flex">
          <img src={logo} className="img-fluid logo" alt="brand" />
        </Navbar.Brand >
        <Nav.Item>
          {userData.map((user, index) => (
            <span key={user} className="nav-link-name"><ImUserCheck style={{ marginBottom: "2px" }} /> {user.name}</span>
          ))}
        </Nav.Item>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/Home"
                onClick={() => updateExpanded(false)}
              >
                <BiSolidDashboard style={{ marginBottom: "2px" }} /> Dashboard
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/tasks"
                onClick={() => updateExpanded(false)}
              >
                <GrTasks style={{ color: "white", marginBottom: "2px" }} /> Task
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/userdetail"
                onClick={() => updateExpanded(false)}
              >
                <BiUserPin style={{ marginBottom: "2px" }} /> User
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/attendance"
                onClick={() => updateExpanded(false)}
              >
                <FcLeave style={{ marginBottom: "2px" }} /> Attendance
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="fork-btn">
              <Button
                href="https://github.com/dineshkumar-stack"
                target="_blank"
                className="git-user fork-btn-inner btn btn-dark"
              >
                <AiFillGithub style={{ fontSize: "1.2em" }} />{" "}
              </Button>
            </Nav.Item>
            <Nav.Item className="fork-btn">
              <div id="navbarNav">
                <ul className="navbar-nav ml-auto">
                  {currentUser ? (
                    <li className="nav-item">
                      <button className="btn btn-danger" onClick={handleLogout}>
                        <TbLogout style={{ marginBottom: "2px" }} />{" "}
                        Logout
                      </button>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <Link className="btn btn-danger" to="/login">
                        <TbLogout style={{ marginBottom: "2px" }} />{" "}
                        Logout
                      </Link>
                    </li>
                  )}

                </ul>
              </div>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>

    </Navbar>
  );
}

export default NavBar;
