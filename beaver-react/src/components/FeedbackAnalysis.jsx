import { getRequest, postRequest } from '../api/api';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { Container } from 'react-bootstrap';
import { Card, ListGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../components/Components.css';

export default function FeedbackAnalysis(){
    const [feedbackData, setFeedbackData] = useState([]);

    useEffect(() => {
        async function fetchData(){
            try {
                const response = await getRequest('/feedback-analysis');                
                
                if (response.status===200 && response.data) {
                    const feedbackArray = Object.values(response.data.data);
                    setFeedbackData(feedbackArray);
                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
                Swal.fire('Error', 'Failed to fetch data', 'error');
            }
        };
        

        fetchData();
    }, []);

    


    return (
        <Container>
            {feedbackData.length > 0 ? (
                feedbackData.map(courseFeedback => (
                    <Card key={courseFeedback.course} className="mb-3">
                        <Card.Header as="h5">{courseFeedback.course}</Card.Header>
                        <Card.Body>
                            {['Positive', 'Neutral', 'Negative'].map(feedbackType => (
                                <div key={feedbackType}>
                                    <Card.Title className={`${feedbackType.toLowerCase()}-feedback`}>
                                        {feedbackType} Feedback
                                    </Card.Title>
                                    <ListGroup variant="flush">
                                        {courseFeedback.feedbacks[feedbackType.toLowerCase()].length > 0 ? (
                                            courseFeedback.feedbacks[feedbackType.toLowerCase()].map(fb => (
                                                <ListGroup.Item key={fb.feedback_id}>{fb.feedback_text}</ListGroup.Item>
                                            ))
                                        ) : (
                                            <ListGroup.Item>No {feedbackType.toLowerCase()} feedback available.</ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p>No feedback data available.</p>
            )}
        </Container>
    );
}