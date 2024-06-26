import React, { Component } from 'react';
import Input from "../../components/Input/Input";
import './ForgetPassword.css';
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
        
        console.log("Form submitted with email:", email);

        if (!EMAIL.value.test(email)) {
            console.log("Invalid email format");
            this.setState({ error: EMAIL.message });
            return;
        }

        try {
            console.log("Sending API request to /api/forget-password with email:", email);
            const response = await axios.post('/api/forget-password', { email });
            console.log("API response:", response);
            this.setState({ message: 'A reset link has been sent to your email', error: '' });
        } catch (error) {
            console.error("API request failed:", error);
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
