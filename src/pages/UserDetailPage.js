import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import NavBar from "../components/NavBar";
import "../styles.css";

const apiUrl = "https://student-dashboard-be.onrender.com/api";
const authToken = localStorage.getItem("authToken");

const headers = {
  Authorization: `${authToken}`,
  "Content-Type": "application/json",
};

console.log("ccccccccccccccccccc", authToken);

function UserProfile() {
  const [userData, setUserData] = useState({});
  const [userDataView, setUserDataView] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState([]);



  function source() {

    fetch(`${apiUrl}/userdetail`, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      // .then((data) => {
      //   console.log('Score Data:', setUserDataView(data.userDetails));
      // })
      .then((data) => {
        setUserData(data.userDetails);
        setUserDataView(data.userDetails);
        setEditedUserData(data.userDetails);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }

  useEffect(() => {
    source()
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
    setEditedUserData(userData);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleSaveClick = async () => {
    try {
      const response = await fetch(`${apiUrl}/userdetail`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(editedUserData),
      });

      if (response.ok) {
        // User data updated successfully
        setEditMode(false);
        setUserData(editedUserData);
        source()

        console.log("User data updated successfully");
      } else {
        // Handle error scenario
        console.error("Error updating user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="user-profile-container Container">
      <NavBar />
      <div className="main-user-detail">
        <Row>
          <Col xs={10}>
            <h2 className="mb-5">User Profile</h2>
          </Col>
          <Col>
            {editMode && (
              <div className="edit-buttons float-lg-end">
                <Button variant="success" onClick={handleSaveClick}>
                  Save
                </Button>{" "}
                <Button variant="danger" onClick={handleCancelClick}>
                  Cancel
                </Button>
              </div>
            )}
            {!editMode && (
              <div className="edit-buttons float-lg-end">
                <Button
                  className="float-lg-end"
                  variant="dark"
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
              </div>
            )}
          </Col>
        </Row>

        <Form>
          {userDataView.map((user, idx) => (
            <Form.Group
              as={Row} className="mb-1" controlId="name">
              <Form.Label className="align-self-center" column sm={2}>
                Name
              </Form.Label>
              <Col key={user.id} sm={4}>
                <Form.Control
                  type="text"
                  name="name"
                  value={editMode ? editedUserData.name : user.name}
                  onChange={handleInputChange}
                  readOnly={!editMode}
                  disabled={!editMode}
                />
              </Col>
            </Form.Group>
          ))}

          {userDataView.map((user, idx) => (
            <Form.Group
              as={Row} className="mb-1" controlId="email">
              <Form.Label className="align-self-center" column sm={2}>
                Email
              </Form.Label>
              <Col key={user.id} sm={4}>
                <Form.Control
                  type="text"
                  name="email"
                  value={editMode ? editedUserData.email : user.email}
                  onChange={handleInputChange}
                  readOnly={!editMode}
                  disabled={!editMode}
                />
              </Col>
            </Form.Group>
          ))}

          {userDataView.map((user, idx) => (
            <Form.Group
              as={Row} className="mb-1" controlId="phone">
              <Form.Label className="align-self-center" column sm={2}>
                Phone
              </Form.Label>
              <Col key={user.id} sm={4}>
                <Form.Control
                  type="text"
                  name="phone"
                  value={editMode ? editedUserData.phone : user.phone}
                  onChange={handleInputChange}
                  readOnly={!editMode}
                  disabled={!editMode}
                />
              </Col>
            </Form.Group>
          ))}

          {userDataView.map((user, idx) => (
            <Form.Group
              as={Row} className="mb-1" controlId="batch">
              <Form.Label className="align-self-center" column sm={2}>
                Batch
              </Form.Label>
              <Col key={user.id} sm={4}>
                <Form.Control
                  type="text"
                  name="batch"
                  value={editMode ? editedUserData.batch : user.batch}
                  onChange={handleInputChange}
                  readOnly={!editMode}
                  disabled={!editMode}
                />
              </Col>
            </Form.Group>
          ))}

          {userDataView.map((user, idx) => (
            <Form.Group
              as={Row} className="mb-1" controlId="Qualification">
              <Form.Label className="align-self-center" column sm={2}>
                Qualification
              </Form.Label>
              <Col key={user.id} sm={4}>
                <Form.Control
                  type="text"
                  name="Qualification"
                  value={
                    editMode ? editedUserData.Qualification : user.Qualification
                  }
                  onChange={handleInputChange}
                  readOnly={!editMode}
                  disabled={!editMode}
                />
              </Col>
            </Form.Group>
          ))}

          {userDataView.map((user, idx) => (
            <Form.Group
              as={Row} className="mb-1" controlId="yearOfExperience">
              <Form.Label className="align-self-center" column sm={2}>
                Year of Experience
              </Form.Label>
              <Col key={user.id} sm={4}>
                <Form.Control
                  type="text"
                  name="yearOfExperience"
                  value={
                    editMode
                      ? editedUserData.yearOfExperience
                      : user.yearOfExperience
                  }
                  onChange={handleInputChange}
                  readOnly={!editMode}
                  disabled={!editMode}
                />
              </Col>
            </Form.Group>
          ))}

          {userDataView.map((user, idx) => (
            <Form.Group
              as={Row} className="mb-1" controlId="noticePeriod">
              <Form.Label className="align-self-center" column sm={2}>
                Notice Period
              </Form.Label>
              <Col key={user.id} sm={4}>
                <Form.Control
                  type="text"
                  name="noticePeriod"
                  value={
                    editMode ? editedUserData.noticePeriod : user.noticePeriod
                  }
                  onChange={handleInputChange}
                  readOnly={!editMode}
                  disabled={!editMode}
                />
              </Col>
            </Form.Group>
          ))}

          {userDataView.map((user, idx) => (
            <Form.Group
              as={Row} className="mb-1" controlId="gifhud">
              <Form.Label className="align-self-center" column sm={2}>
                Gif Hud
              </Form.Label>
              <Col key={user.id} sm={4}>
                <Form.Control
                  type="text"
                  name="noticePeriod"
                  value={editMode ? editedUserData.gifhud : user.gifhud}
                  onChange={handleInputChange}
                  readOnly={!editMode}
                  disabled={!editMode}
                />
              </Col>
            </Form.Group>
          ))}

          {userDataView.map((user, idx) => (
            <Form.Group
              as={Row} className="mb-1" controlId="resume">
              <Form.Label className="align-self-center" column sm={2}>
                Resume
              </Form.Label>
              <Col key={user.id} sm={4}>
                <Form.Control
                  type="text"
                  name="resume"
                  value={editMode ? editedUserData.resume : user.resume}
                  onChange={handleInputChange}
                  readOnly={!editMode}
                  disabled={!editMode}
                />
              </Col>
            </Form.Group>
          ))}

          {userDataView.map((user, idx) => (
            <Form.Group
              as={Row} className="mb-1" controlId="portfolioURL">
              <Form.Label className="align-self-center" column sm={2}>
                Portfolio URL
              </Form.Label>
              <Col key={user.id} sm={4}>
                <Form.Control
                  type="text"
                  name="portfolioURL"
                  value={
                    editMode ? editedUserData.portfolioURL : user.portfolioURL
                  }
                  onChange={handleInputChange}
                  readOnly={!editMode}
                  disabled={!editMode}
                />
              </Col>
            </Form.Group>
          ))}
        </Form>
      </div>
    </div>
  );
}

export default UserProfile;
