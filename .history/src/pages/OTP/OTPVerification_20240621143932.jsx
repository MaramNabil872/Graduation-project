import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Title from '../../components/Title/Title';
import './OTPverification.css';

export default function OTPVerification() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const history = useHistory();

    const email = location.state ? location.state.email : '';

    useEffect(() => {
        if (!email) {
            Swal.fire({
                icon: 'error',
                title: 'Email not found!',
                text: 'Please register again.',
            }).then(() => {
                history.push('/register'); // Redirect to register page if email is not found
            });
        }
    }, [email, history]);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/verify-otp', { email, ...data });
            Swal.fire({
                icon: 'success',
                title: 'OTP Verified!',
                text: response.data.message,
            }).then(() => {
                history.push('/login'); // Redirect to login page after successful OTP verification
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response ? error.response.data.error : 'Something went wrong!',
            });
        }
    };

    return (
        <div className="container">
            <h1 className='title-otp-password'>OTP Verification</h1>
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
                    <Button type="submit" text="Verify OTP" className="submitBTN" />
                </form>
            )}
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Title from '../../components/Title/Title';
import Swal from 'sweetalert2';
import './OTPverification.css';

export default function OTPVerification() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const history = useHistory();

    const email = location.state ? location.state.email : '';

    useEffect(() => {
        if (!email) {
            Swal.fire({
                icon: 'error',
                title: 'Email not found!',
                text: 'Please register again.',
            }).then(() => {
                history.push('/register'); // Redirect to register page if email is not found
            });
        }
    }, [email, history]);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/verify-otp', { email, ...data });
            Swal.fire({
                icon: 'success',
                title: 'OTP Verified!',
                text: response.data.message,
            }).then(() => {
                history.push('/login'); // Redirect to login page after successful OTP verification
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response ? error.response.data.error : 'Something went wrong!',
            });
        }
    };

    return (
        <div className="container">
            <h1 className='title-otp-password'>OTP Verification</h1>
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
                    <Button type="submit" text="Verify OTP" className="submitBTN" />
                </form>
            )}
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Title from '../../components/Title/Title';
import Swal from 'sweetalert2';
import './OTPverification.css';

export default function OTPVerification() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const history = useHistory();

    const email = location.state ? location.state.email : '';

    useEffect(() => {
        if (!email) {
            Swal.fire({
                icon: 'error',
                title: 'Email not found!',
                text: 'Please register again.',
            }).then(() => {
                history.push('/register'); // Redirect to register page if email is not found
            });
        }
    }, [email, history]);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/verify-otp', { email, ...data });
            Swal.fire({
                icon: 'success',
                title: 'OTP Verified!',
                text: response.data.message,
            }).then(() => {
                history.push('/login'); // Redirect to login page after successful OTP verification
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response ? error.response.data.error : 'Something went wrong!',
            });
        }
    };

    return (
        <div className="container">
            <h1 className='title-otp-password'>OTP Verification</h1>
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
                    <Button type="submit" text="Verify OTP" className="submitBTN" />
                </form>
            )}
        </div>
    );
}
