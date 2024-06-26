import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input/Input'; // Adjust path as necessary
import Button from '../../components/Button/Button'; // Adjust path as necessary
import Title from '../../components/Title/Title'; // Adjust path as necessary
import classes from './OTPVerification.module.css'; // Ensure the CSS file exists

export default function OTPVerification() {
    const [message, setMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/verify-otp', data);
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
                    type="email"
                    label="Email"
                    {...register('email', { required: 'Email is required' })}
                    error={errors.email}
                />
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
