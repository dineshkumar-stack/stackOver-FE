import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import axios from 'axios';
import "../styles.css"
import { Badge, Modal, Button } from 'react-bootstrap';

const authToken = localStorage.getItem("authToken");

const headers = {
    Authorization: `${authToken}`,
    "Content-Type": "application/json",
};

function QuestionModal({ show, onHide, question }) {
    // console.log(question)
    const [comment, setComment] = useState('');
    const [ID, setID] = useState('');

    const fetchAllNotes = (id) => {
        setID(id);
        axios
            .get('https://stackoverclone-be.onrender.com/api/comment/')
            .then((response) => {
                return response;
            })
            .then((data) => {
            })
    }

    useEffect(() => {
        fetchAllNotes()
    }, []);

    const handleCommentSubmit = async () => {
        try {
            const response = await fetch(`https://stackoverclone-be.onrender.com/api/comment/${ID}`, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify({
                    comment: comment
                }),
            })
            if (response.ok) {
                console.log(ID, 'comments updated')
                setComment('');
                question()
            } else {
                console.error("Error submitting task");
            }
        } catch (error) {
            console.error("Error submitting task:", error);
        }
    }
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
                <Modal.Title id="contained-modal-title-vcenter">{question.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{question.content}</p>
                <Badge variant="primary" key={question.id} className="mr-1">
                    {question.questionuser}
                </Badge>
                <textarea
                    id='inputNewNoteContent'
                    value={comment}
                    placeholder='type a new note...'
                    onChange={e => setComment(e.target.value)}
                    onClick={() => fetchAllNotes(question._id)}
                ></textarea>
            </Modal.Body>
            {question.usercomments.map(comment => (
                <ul>
                    <li>{comment.usercomment}</li>
                    <small>{comment.comment}</small><br />
                    <span className='comdate'>{dateFormat(comment.timeStamp, "mmmm dS, yyyy, h:MM TT")}</span>
                </ul>
            ))}
            <Modal.Footer>
                <button onClick={handleCommentSubmit}>Add Comment</button>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default QuestionModal;
