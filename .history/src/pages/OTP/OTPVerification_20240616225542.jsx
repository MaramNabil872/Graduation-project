import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Title from '../../components/Title/Title';
import classes from './OTPverification.module.css';

export default function OTPVerification() {
    const [message, setMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const history = useHistory();

    const email = location.state.email;

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
