import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import dateFormat from "dateformat";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import axios from "axios";
import { AiFillTags } from "react-icons/ai";
import { FcOvertime } from "react-icons/fc";
import { GrFormViewHide } from "react-icons/gr";
import { BiSolidUserDetail, BiListCheck } from "react-icons/bi";




import { FaVoteYea , FaCommentDots} from "react-icons/fa";

import "../../src/styles.css";
import QuestionModal from "./QuestionModal"; // Import the QuestionModal component

// const apiUrl = "https://stackoverclone-be.onrender.com/api";

function Home() {
  const [questionData, setQuestionData] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const handleViewQuestion = (question) => {
    setSelectedQuestion(question);
    setModalShow(true);
  };

  const fetchAllComments = (id) => {
    axios
      .get("https://stackoverclone-be.onrender.com/api/comment/")
      .then((response) => {
        return response;
      })
      .then((data) => {
        setQuestionData(data.data.recentData);
        console.log(data.data.recentData);
      });
  };

  useEffect(() => {
    fetchAllComments();
  }, []);

  //////////////////////////////////////
  return (
    <div className="home">
      <NavBar />
      <div className="main-question container">
        {questionData.map((user, index) => (
          <div>
            <Container className="mt-1">
              <Card className="mb-2">
                <Card.Body>
                  <Row>
                    <Col md={10}>
                      <small className="tags">
                        <Badge bg="secondary" className="mr-2">
                        <AiFillTags style={{ margin: "0px 0px 0px 0px" }} /> {user.tag}
                        </Badge>
                      </small>
                      <Card.Title>{user.title}</Card.Title>
                    </Col>
                    <Col md={2}>
                      <Button
                        variant="secondary"
                        onClick={() => handleViewQuestion(user)}
                      >
                        <BiListCheck style={{ margin: "0px 0px 0px 0px" }} />{" "}
                        View
                      </Button>
                    </Col>
                  </Row>
                  <hr />
                  <Card.Text>{user.content}</Card.Text>
                  <hr />
                  <div className="user-info">
                    <small className="text-muted">
                    <BiSolidUserDetail style={{ margin: "0px 8px 2px 2px" }}/>
                      Asked by {user.questionuser} 
                    </small>
                    <small className="text-muted ml-3">
                      {" "}
                      {dateFormat(user.timeStamp, "mmmm dS, yyyy, h:MM TT")}
                      <FcOvertime style={{ margin: "0px 2px 2px 8px" }}/>
                    </small>
                  </div>
                  <div className="user-info">
                    <small className="text-muted mr-8">
                    <GrFormViewHide style={{ margin: "0px 8px 2px 2px" }}/>
                      Views: {user.view}
                    </small>{" "}
                    <small className="text-muted mr-2">
                    <FaVoteYea style={{ margin: "0px 2px 2px 2px" }}/>
                      Votes: {user.vote}
                    </small>{" "}
                    <small className="text-muted mr-2">
                      Comments: {user.view}
                      <FaCommentDots style={{ margin: "0px 2px 2px 8px" }}/>

                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Container>
            <br />
          </div>
        ))}
      </div>
      <QuestionModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        question={selectedQuestion}
      />
    </div>
  );
}

export default Home;
