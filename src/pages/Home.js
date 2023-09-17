import React, { } from "react";

import NavBar from "../components/NavBar";
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { Row, Col } from 'react-bootstrap'
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

function Home() {

  return (
    <div className="home">
      <NavBar />
      {/* <Card
          className="text-center"
          key="Warning"
        >
          <Card.Header>
            <Row>
              <Col>
                user Name
              </Col>
              <Col>
                view : 100 | Vote : 05
              </Col>
            </Row></Card.Header>
          <Card.Body>
            <Card.Title> title</Card.Title>
            <Card.Text>
              With supporting text below as a natural lead-in to additional content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
          <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card> */}
      <section className="vh-100">
        <MDBContainer className="py-5" style={{ maxWidth: "1000px" }}>
          <MDBRow className="justify-content-center">
            <MDBCol md="10" lg="8" xl="6">
              <MDBCard>
                <MDBCardBody className="p-4">
                  <MDBCardTitle tag="h3">Content</MDBCardTitle>
                  <MDBCardSubTitle >Content</MDBCardSubTitle><br />
                  <div className="d-flex flex-start w-100">
                    <MDBCardImage
                      className="rounded-circle shadow-1-strong me-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
                      alt="avatar"
                      width="65"
                      height="65"
                    />
                    <div className="w-100">
                      <MDBTypography tag="h6">Add a comment</MDBTypography>
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
      </section>



    </div>
  );
}

export default Home;
