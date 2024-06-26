import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Title from '../../components/Title/Title';
import './OTPVerification.css';

export default function OTPVerification() {
    const [message, setMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const history = useHistory();

    const email = location.state ? location.state.email : '';

    useEffect(() => {
        if (!email) {
            setMessage('Email not found, please register again.');
        }
    }, [email]);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/verify-otp', { email, ...data });
            setMessage(response.data.message);
            if (response.status === 200) {
                history.push('/login');
            }
        } catch (error) {
            setMessage(error.response ? error.response.data.error : 'Something went wrong');
        }
    };

    return (
        <div className="container">
            <Title title="OTP Verification" />
            {message && <div className="message">{message}</div>}
            {email && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group">
                        <Input
                            type="text"
                            label="OTP"
                            {...register('otp', { required: 'OTP is required' })}
                            className={errors.otp ? 'input-error' : ''}
                        />
                        {errors.otp && <span className="error-message">{errors.otp.message}</span>}
                    </div>
                    <Button type="submit" text="Verify OTP" className="button" />
                </form>
            )}
        </div>
    );
}
