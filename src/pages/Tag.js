import React, { } from 'react';
import NavBar from "../components/NavBar";
import { Container, Row, Col, Card, Badge, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import QuestionView from './QuestionView'; // Import the QuestionModal component

function Tag() {
  const [notes, setNotes] = useState([]);
  const [showStatus, setShowStatus] = useState('all');

  const fetchAllNotes = async () => {
    await axios
      .get('https://stackoverclone-be.onrender.com/api/notes/')
      .then(response => setNotes(response.data));
  }

  useEffect(() => {
    fetchAllNotes();
  }, []);

  const filterNotes = (notes, showStatus) => {
    switch (showStatus) {
      case 'all':
        return notes;
      case 'Node':
        return notes.filter(note => note.tag === "Node");
      case 'JavaScript':
        return notes.filter(note => note.tag === "JavaScript");
      case 'React':
        return notes.filter(note => note.tag === "React");
      case 'HTML':
        return notes.filter(note => note.tag === "HTML");
      case 'CSS':
        return notes.filter(note => note.tag === "CSS");
      case 'Angular':
        return notes.filter(note => note.tag === "Angular");
      case 'MongoBD':
        return notes.filter(note => note.tag === "MongoBD");
      case 'AWS':
        return notes.filter(note => note.tag === "AWS");
      case 'Java':
        return notes.filter(note => note.tag === "Java");
      case 'Python':
        return notes.filter(note => note.tag === "Python");
      case 'Other':
        return notes.filter(note => note.tag === "Other");
      default:
        return notes;
    }
  }
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const handleViewQuestion = (question) => {
    setSelectedQuestion(question);
    setModalShow(true);
  };
  const notesFiltered = filterNotes(notes, showStatus);
  return (
    <Container className='ask-container container-lg'>
      <NavBar />
      <h1 className="mt-4">Read Tag Page</h1>
      <Form>
        <Form.Group>
          <Form.Label>All Tags</Form.Label>
          <Form.Check
            inline
            type='radio'
            name='filter'
            value="all"
            onChange={e => setShowStatus(e.target.value)}
          />

          <Form.Label>Node</Form.Label>
          <Form.Check
            inline
            type='radio'
            name='filter'
            value="Node"
            onChange={e => setShowStatus(e.target.value)}
          />

          <Form.Label>React</Form.Label>
          <Form.Check
            inline
            type='radio'
            name='filter'
            value="React"
            onChange={e => setShowStatus(e.target.value)}
          />


          <Form.Label>JavaScript</Form.Label>
          <Form.Check
            inline
            type='radio'
            name='filter'
            value="JavaScript"
            onChange={e => setShowStatus(e.target.value)}
          />

          <Form.Label>HTML</Form.Label>
          <Form.Check
            inline
            type='radio'
            name='filter'
            value="HTML"
            onChange={e => setShowStatus(e.target.value)}
          />

          <Form.Label>CSS</Form.Label>
          <Form.Check
            inline
            type='radio'
            name='filter'
            value="CSS"
            onChange={e => setShowStatus(e.target.value)}
          />

          <Form.Label>Angular</Form.Label>
          <Form.Check
            inline
            type='radio'
            name='filter'
            value="Angular"
            onChange={e => setShowStatus(e.target.value)}
          />

          <Form.Label>MongoBD</Form.Label>
          <Form.Check
            inline
            type='radio'
            name='filter'
            value="MongoBD"
            onChange={e => setShowStatus(e.target.value)}
          />

          <Form.Label>AWS</Form.Label>
          <Form.Check
            inline
            type='radio'
            name='filter'
            value="AWS"
            onChange={e => setShowStatus(e.target.value)}
          />

          <Form.Label>Java</Form.Label>
          <Form.Check
            inline
            type='radio'
            name='filter'
            value="Java"
            onChange={e => setShowStatus(e.target.value)}
          />

          <Form.Label>Python</Form.Label>
          <Form.Check
            inline
            type='radio'
            name='filter'
            value="Python"
            onChange={e => setShowStatus(e.target.value)}
          />

          <Form.Label>Other</Form.Label>
          <Form.Check
            inline
            type='radio'
            name='filter'
            value="Other"
            onChange={e => setShowStatus(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Row>
        {notesFiltered.map(note => (
          <Col key={note.id} sm={6} md={4} lg={3} className="mt-3">
            <Card>
              <Card.Body>
                {/* <Card.Title>{note.title}</Card.Title> */}
                {/* <Card.Text>{note.content}</Card.Text> */}
                {/* <Card.Text>{note.description}</Card.Text> */}
                <Badge variant="primary" className="mr-1">
                  {note.tag}
                </Badge>
                <Card.Title className="card-title">{
                  `${note.title.slice(0, 50)}...`}</Card.Title>
                <Card.Text className="card-text">
                  {`${note.content.slice(0, 100)}...`}
                </Card.Text>
                <Button variant="primary" onClick={() => handleViewQuestion(note)}>View Question</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <QuestionView show={modalShow} onHide={() => setModalShow(false)} question={selectedQuestion} />

    </Container>
  )
}

export default Tag;
