import React, { Component } from 'react';
import Input from "../../components/Input/Input";
import './forgetPasswordPage.css';
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { EMAIL } from "../../constants/patterns";

class ForgetPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: '',
            message: ''
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, error: '', message: '' });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email } = this.state;
        
        if (!EMAIL.test(email)) {
            this.setState({ error: "Invalid email address" });
            return;
        }

        try {
            // Replace this URL with your actual forget password endpoint
            const response = await axios.post('/api/forget-password', { email });
            this.setState({ message: 'A reset link has been sent to your email', error: '' });
        } catch (error) {
            this.setState({ error: 'Failed to send reset link. Please try again.', message: '' });
        }
    };

    render() {
        const { email, error, message } = this.state;

        return (
            <div className="container">
                <div className="title-forget-password">FORGET PASSWORD</div>
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className="form-group">
                        <Input
                            type="email"
                            className={`form-input noto-sans ${error ? "input-error" : ""}`}
                            label="Email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                        />
                        {error && <span className="error-message">{error}</span>}
                        {message && <span className="success-message">{message}</span>}
                    </div>
                    <button type="submit" className="submitBTN">Submit</button>
                </form>
                <div className="back-to-login noto-sans">
                    <Link to="/login">Back to login</Link>
                </div>
            </div>
        );
    }
}

export default ForgetPasswordPage;
