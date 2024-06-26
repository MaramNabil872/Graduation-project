import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Title from '../../components/Title/Title';
import classes from './OTPVerification.module.css';
import { useLocation } from 'react-router-dom';

export default function OTPVerification() {
    const [message, setMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const email = location.state.email; // Get email from location state

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/verify-otp', { ...data, email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response ? error.response.data.error : 'Something went wrong');
        }
    };

    return (
        <div className={classes.container}>
            <Title title="OTP Verification" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    label="OTP"
                    {...register('otp', { required: 'OTP is required' })}
                    error={errors.otp}
                />
                <Button type="submit" text="Verify OTP" />
            </form>
            {message && <div className={classes.message}>{message}</div>}
        </div>
    );
}
