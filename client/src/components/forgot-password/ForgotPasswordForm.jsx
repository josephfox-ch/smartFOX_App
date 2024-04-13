import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        //todo: API call to backend to send reset link
        setMessage('If an account exists for this email, a reset link will be sent.');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Send Reset Link
            </Button>
            {message && <Alert variant="info">{message}</Alert>}
        </Form>
    );
};

export default ForgotPasswordForm;
