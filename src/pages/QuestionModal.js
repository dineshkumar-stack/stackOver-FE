import React from 'react';
import { Badge, Modal, Button } from 'react-bootstrap';

function QuestionModal({ show, onHide, question }) {
    if (!question) {
        return null; // Return null if question is not available
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{question.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{question.content}</p>
                <Badge variant="primary" key={question.id} className="mr-1">
                    {question.important}
                </Badge>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>





    );
}

export default QuestionModal;
