import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import axios from "axios";
import "../styles.css";
import { Modal, Button, Row } from "react-bootstrap";

const authToken = localStorage.getItem("authToken");

const headers = {
  Authorization: `${authToken}`,
  "Content-Type": "application/json",
};

function QuestionModal({ show, onHide, question }) {
  console.log(question);
  const [comment, setComment] = useState("");
  const [ID, setID] = useState("");

  const fetchAllNotes = (id) => {
    setID(id);
    axios
      .get("https://stackoverclone-be.onrender.com/api/comment/")
      .then((response) => {
        return response;
      })
      .then((data) => {});
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(
        `https://stackoverclone-be.onrender.com/api/comment/${ID}`,
        {
          method: "PUT",
          headers: headers,
          body: JSON.stringify({
            comment: comment,
          }),
        }
      );
      if (response.ok) {
        console.log(ID, "comments updated");
        setComment("");
        alert("Comments Added")
      } else {
        console.error("Error submitting task");
      }
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };
  if (!question) {
    return null; // Return null if question is not available
  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      dialogClassName="modal-120w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {question.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{question.content}</p>
        <div className="user-info">
          <small className="text-muted">Asked by {question.questionuser}</small>
          <small className="text-muted ml-3">
            {" "}
            {dateFormat(question.timeStamp, "mmmm dS, yyyy, h:MM TT")}
          </small>
        </div>
        <hr />
        <Row>
          <textarea
            id="inputNewNoteContent"
            value={comment}
            placeholder="type your comments..."
            onChange={(e) => setComment(e.target.value)}
            onClick={() => fetchAllNotes(question._id)}
          ></textarea>
        </Row>
        <Button
          variant="primary"
          className="mt-1"
          onClick={handleCommentSubmit}
        >
          Add Comment
        </Button>
      </Modal.Body>
      {question.usercomments.map((comment) => (
        <div className="comments-section mt-4">
          <div className="comment">
            <img
              src="https://via.placeholder.com/30"
              alt="User Avatar"
              className="avatar mr-2"
            />
            <div>
              <strong>{comment.usercomment}</strong>: {comment.comment}.
            </div>

          </div>
          <small className="text-muted ml-3">
            {" "}
            {dateFormat(comment.timeStamp, "mmmm dS, yyyy, h:MM TT")}
          </small>
          <hr/>
        </div>
      ))}

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QuestionModal;
