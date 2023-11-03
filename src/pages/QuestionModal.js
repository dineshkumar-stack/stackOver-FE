import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import axios from "axios";
import "../styles.css";
import { Modal, Button } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';

const authToken = localStorage.getItem("authToken");

const headers = {
  Authorization: `${authToken}`,
  "Content-Type": "application/json",
};

function QuestionModal({ show, onHide, question }) {
  const [comment, setComment] = useState("");
  const [ID, setID] = useState("");

  const fetchAllNotes = (id) => {
    setID(id);
    axios
      .get("https://stackoverclone-be.onrender.com/api/comment/")
      .then((response) => {
        return response;
      })
      .then((data) => { });
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
        question()
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
      className="block"
      dialogClassName="modal-120w form-control-sm"
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
        <div class="title"
        >
          <h5>Comments</h5>
          <div class="tag">{question.view}</div>
        </div>
        <div class="writing">
          <textarea contenteditable="true"
            required="true"
            class="textarea"
            autofocus spellcheck="true"
            id="inputNewNoteContent"
            value={comment}
            placeholder="type your comments..."
            onChange={(e) => setComment(e.target.value)}
            onClick={() => fetchAllNotes(question._id)}
          >
          </textarea>
          <div class="footer">

            <div class="group-button">
              <Button
                class="btn primary"
                variant="light"
                className="mt-1"
                onClick={handleCommentSubmit}
              >Add Comments</Button>
            </div>
          </div>
        </div>
        {question.usercomments.map((comment) => (

          <div class="comment">
            <div class="user-banner">
              <div class="user">
                <div class="avatar avatarComments">
                  {comment.usercomment.charAt(0)}{comment.usercomment.charAt(1)}
                  <span class="stat green"></span>
                </div>
                <h5 class="avatarName card-text" >{comment.usercomment}</h5>
              </div>
            </div>
            <div class="contentComments">
              <p>{comment.comment}</p>
            </div>
            <div class="footer">
              <span class="text-muted commentsDate">{dateFormat(comment.timeStamp, "mmmm dS, yyyy, h:MM TT")}</span>
            </div>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QuestionModal;
