import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import dateFormat from "dateformat";
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import '../../src/styles.css'
import QuestionModal from './QuestionModal'; // Import the QuestionModal component

// const apiUrl = "https://stackoverclone-be.onrender.com/api";


function Home() {
  const [questionData, setQuestionData] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [modalShow, setModalShow] = useState(false);



  const handleViewQuestion = (question) => {
    setSelectedQuestion(question);
    setModalShow(true);
  };

  const fetchAllNotes = (id) => {
    axios
      .get('https://stackoverclone-be.onrender.com/api/comment/')
      .then((response) => {
        return response;
      })
      .then((data) => {
        setQuestionData(data.data.recentData);
        console.log(data.data.recentData);
      })
  }


  useEffect(() => {
    fetchAllNotes()
  }, []);

  //////////////////////////////////////
  return (
    <div className="home">
      <NavBar />
      <div className="main-question container">
        {questionData.map((user, index) => (
          <div>
            <Card>
              <Card.Header as="h5">

                <blockquote className="blockquote mb-0">
                  <Row>
                    <Col>
                      <footer>
                        <Col xs={10}>
                          {user.questionuser} <cite className="submit-Time" title="Source Title">{dateFormat(user.timeStamp, "mmmm dS, yyyy, h:MM TT")}</cite>
                          {" "} <Badge className="submit-Time" variant="dark">{user.tag}</Badge>
                        </Col>
                      </footer>
                    </Col>
                    <Col xs={2} className="col-md-auto">
                      <Button className="submit-Time" variant="light" >
                        View <span><Badge bg="secondary">{user.view}</Badge></span>
                        <span className="visually-hidden">unread messages</span>
                      </Button>
                    </Col>
                    <Col xs={2} className="col-md-auto">
                      <Button className="submit-Time" variant="light">
                        Vote <span><Badge bg="secondary">{user.vote}</Badge></span>
                        <span className="visually-hidden">unread messages</span>
                      </Button>
                    </Col>
                  </Row>
                </blockquote>
              </Card.Header>
              <Card.Body>
                <Card.Title>{user.title}</Card.Title>
                <Card.Text>
                  {user.content}
                </Card.Text>
                <Button variant="primary" onClick={() => handleViewQuestion(user)}>View</Button>
              </Card.Body>

              <Card.Footer className="text-muted">
                <blockquote className="blockquote mb-0">
                  <p>
                    {' '}
                    {' '}
                  </p>
                  <footer className="blockquote-footer">
                    {user.questionuser} <cite title="Source Title">{dateFormat(user.timeStamp, "mmmm dS, yyyy, h:MM TT")}</cite>
                  </footer>
                </blockquote></Card.Footer>
            </Card><br />
          </div>
        ))}
      </div>
      <QuestionModal show={modalShow} onHide={() => setModalShow(false)} question={selectedQuestion} />
    </div>
  );
}

export default Home;
