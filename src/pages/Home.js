import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import dateFormat from "dateformat";
import '../../src/styles.css'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardSubTitle,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";

const apiUrl = "https://stackoverclone-be.onrender.com/api";

function Home() {
  const [questionData, setQuestionData] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/recent`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestionData(data.recentData);
        // console.log(data.recentData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

  }, []);

  return (
    <div className="home">
      <NavBar />
      <section className="vh-100">
        {questionData.map((user, index) => (
          <MDBContainer className="py-2">
            <MDBRow className="justify-content-center">
              <MDBCol md="10" lg="8" xl="12">
                <MDBCard>
                  <MDBCardBody className="p-4">
                    <small className="username">{user.questionuser}</small>
                    <MDBCardTitle tag="h5">{user.title}</MDBCardTitle>
                    <div className="bb">
                      <MDBRow className="flex-md-row-reverse ">
                        <MDBCol>
                          <small>{dateFormat(user.timeStamp, "mmmm dS, yyyy, h:MM TT")}</small>
                        </MDBCol>
                        <MDBCol>
                          <small>Vote: {user.vote}</small>
                        </MDBCol>
                        <MDBCol>
                          <small>View: {user.view}</small>
                        </MDBCol>
                        <MDBCol>
                          <small className="float-left">{user.questionuser}</small>
                        </MDBCol>
                      </MDBRow>
                    </div>
                    <MDBCardSubTitle >{user.content}</MDBCardSubTitle><br />
                    <div className="d-flex flex-start w-100">
                      <MDBCardImage
                        className="rounded-circle shadow me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
                        alt="avatar"
                        width="65"
                        height="65"
                      />
                      <div className="w-100">
                        <MDBTypography tag="h6" className="addCommnets">Add a comment</MDBTypography>
                        <MDBTextArea rows={1} />
                        <div className="d-flex justify-content-between mt-3">
                          <MDBBtn color="danger">
                            Send <MDBIcon fas icon="long-arrow-alt-right ms-1" />
                          </MDBBtn>
                        </div>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        ))}
      </section>
    </div>
  );
}

export default Home;
