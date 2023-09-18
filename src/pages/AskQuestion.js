import { Button, Form, Container } from "react-bootstrap";
import React, { useState, useRef } from "react";
// import dateFormat from "dateformat";
import NavBar from "../components/NavBar";
import "../styles.css"


const apiUrl = "https://stackoverclone-be.onrender.com/api";
const authToken = localStorage.getItem("authToken");

const headers = {
  Authorization: `${authToken}`,
  "Content-Type": "application/json",
};

function TaskPage() {
  const [questionTitle, setQuestionTitle] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");



  const newQuestionTitleRef = useRef(null);
  const newContentRef = useRef(null);
  const newTagRef = useRef(null);






  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/question`, {
        method: "POST",
        headers: headers,

        body: JSON.stringify({
          title: questionTitle,
          content: content,
          tag: tag
        }),
      });

      if (response.ok) {
        resetForm()
        console.log("Task submitted successfully");
        TaskPage();
        alert('form submitted');

      } else {
        console.error("Error submitting task");
      }
    } catch (error) {
      console.error("Error submitting task:", error);
    }

    function resetForm() {
      setQuestionTitle('')
      setTag('')
      setContent('')
    }

  };



  return (
    <div>
      <Container className="ask-container container-lg">
        <NavBar />
        <h1 className="mt-4">Ask a Question</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="questionTitle">
            <Form.Label>Question Title</Form.Label>
            <Form.Control
              type="text"
              id='inputNewTitle'
              placeholder="Enter your question title"
              onChange={(e) => setQuestionTitle(e.target.value)}
              value={questionTitle}
              ref={newQuestionTitleRef}
            />
          </Form.Group>
          <Form.Group controlId="questionDescription">
            <Form.Label>Question Description</Form.Label>
            <Form.Control
              as="textarea"

              id='inputNewNoteDescription'
              placeholder="Enter your question title"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              ref={newContentRef}
            />

            <br /> <label className='form-label' htmlFor='selectImportance'>Select the Tag:</label>{" "}
              <select
                id='selectImportance'
                onChange={(e) => setTag(e.target.value)}
                ref={newTagRef}
                className="select-dropdown"
              >
                <option>--Tag--</option>
                <option>Node</option>
                <option>JavaScript</option>
                <option>React</option>
                <option>HTML</option>
                <option>CSS</option>
                <option>Angular</option>
                <option>MongoBD</option>
                <option>AWS</option>
                <option>Java</option>
                <option>Python</option>
                <option>Other</option>
              </select>
          </Form.Group> <br />
          <Button className='AskQbts' variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form><br />
      </Container>
    </div>

  );
}

export default TaskPage;
